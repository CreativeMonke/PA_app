import { type Node, type Edge } from "@xyflow/react";

interface LayoutOptions {
  ringRadiusX?: number;
  ringRadiusY?: number;
  nodeRadialOffset?: number;
  nodeGap?: number;
}

const SIZE: Record<string, { w: number; h: number }> = {
  root: { w: 120, h: 40 },
  topic: { w: 170, h: 62 },
  quiz: { w: 150, h: 30 },
};

function sizeFor(type?: string) {
  return SIZE[type ?? "topic"] ?? SIZE.topic;
}

type Side = "top" | "right" | "bottom" | "left";

function sideFromAngle(deg: number): Side {
  const a = ((deg % 360) + 360) % 360;
  if (a >= 315 || a < 45) return "right";
  if (a < 135) return "bottom";
  if (a < 225) return "left";
  return "top";
}

const OPPOSITE: Record<Side, Side> = { top: "bottom", bottom: "top", left: "right", right: "left" };

export function getLayoutedElements(
  nodes: Node[],
  edges: Edge[],
  options: LayoutOptions = {},
): { nodes: Node[]; edges: Edge[] } {
  const {
    ringRadiusX = 380,
    ringRadiusY = 200,
    nodeRadialOffset = 60,
    nodeGap = 36,
  } = options;

  const centers = new Map<string, { x: number; y: number }>();

  const root = nodes.find((n) => n.type === "root");
  if (root) centers.set(root.id, { x: 0, y: 0 });

  const topicNodes = nodes.filter((n) => n.type === "topic");
  const N = topicNodes.length;

  topicNodes.forEach((node, i) => {
    const angle = (-90 + (i * 360) / Math.max(N, 1)) * (Math.PI / 180);
    centers.set(node.id, {
      x: ringRadiusX * Math.cos(angle),
      y: ringRadiusY * Math.sin(angle),
    });
  });

  const quizzesByTopic = new Map<string, Node[]>();
  nodes
    .filter((n) => n.type === "quiz")
    .forEach((node) => {
      const topicKey = node.id.split("-").slice(0, 2).join("-");
      const arr = quizzesByTopic.get(topicKey) ?? [];
      arr.push(node);
      quizzesByTopic.set(topicKey, arr);
    });

  quizzesByTopic.forEach((quizzes, topicKey) => {
    const base = centers.get(topicKey);
    if (!base) return;
    const M = quizzes.length;
    const colHalf = ((M - 1) * nodeGap) / 2 + SIZE.quiz.h / 2;
    const len = Math.hypot(base.x, base.y) || 1;
    const ux = base.x / len;
    const uy = base.y / len;
    const dist = nodeRadialOffset + colHalf;
    const colX = base.x + ux * dist;
    const colY = base.y + uy * dist;
    const startY = colY - ((M - 1) * nodeGap) / 2;
    quizzes.forEach((node, j) => {
      centers.set(node.id, { x: colX, y: startY + j * nodeGap });
    });
  });

  const layoutedNodes = nodes.map((node) => {
    const center = centers.get(node.id) ?? { x: 0, y: 0 };
    const { w, h } = sizeFor(node.type);
    return { ...node, position: { x: center.x - w / 2, y: center.y - h / 2 } };
  });

  const layoutedEdges = edges.map((edge) => {
    const sc = centers.get(String(edge.source));
    const tc = centers.get(String(edge.target));
    if (!sc || !tc) return edge;
    const deg = (Math.atan2(tc.y - sc.y, tc.x - sc.x) * 180) / Math.PI;
    const srcSide = sideFromAngle(deg);
    const tgtSide = OPPOSITE[srcSide];
    return {
      ...edge,
      type: "straight",
      sourceHandle: `s-${srcSide}`,
      targetHandle: `t-${tgtSide}`,
    };
  });

  return { nodes: layoutedNodes, edges: layoutedEdges };
}
