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
  examCategory: { w: 160, h: 50 },
  exam: { w: 170, h: 36 },
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

function positionChildren(
  parentId: string,
  children: Node[],
  centers: Map<string, { x: number; y: number }>,
  childSizeKey: string,
  radialOffset: number,
  gap: number,
) {
  const base = centers.get(parentId);
  if (!base) return;
  const M = children.length;
  const ch = SIZE[childSizeKey]?.h ?? 30;
  const colHalf = ((M - 1) * gap) / 2 + ch / 2;
  const len = Math.hypot(base.x, base.y) || 1;
  const ux = base.x / len;
  const uy = base.y / len;
  const dist = radialOffset + colHalf;
  const colX = base.x + ux * dist;
  const colY = base.y + uy * dist;
  const startY = colY - ((M - 1) * gap) / 2;
  children.forEach((node, j) => {
    centers.set(node.id, { x: colX, y: startY + j * gap });
  });
}

export function getLayoutedElements(
  nodes: Node[],
  edges: Edge[],
  options: LayoutOptions = {},
): { nodes: Node[]; edges: Edge[] } {
  const {
    ringRadiusX = 380,
    ringRadiusY = 200,
    nodeRadialOffset = 78,
    nodeGap = 36,
  } = options;

  const centers = new Map<string, { x: number; y: number }>();

  const root = nodes.find((n) => n.type === "root");
  if (root) centers.set(root.id, { x: 0, y: 0 });

  const ringTypes = new Set(["topic", "examCategory"]);
  const ringNodes = nodes.filter((n) => ringTypes.has(n.type ?? ""));
  const N = ringNodes.length;

  ringNodes.forEach((node, i) => {
    const angle = (-90 + (i * 360) / Math.max(N, 1)) * (Math.PI / 180);
    centers.set(node.id, {
      x: ringRadiusX * Math.cos(angle),
      y: ringRadiusY * Math.sin(angle),
    });
  });

  // Quiz nodes: parent key from node.id
  const quizzesByTopic = new Map<string, Node[]>();
  nodes
    .filter((n) => n.type === "quiz")
    .forEach((node) => {
      const topicKey = `topic-${node.id.split("-")[1]}`;
      const arr = quizzesByTopic.get(topicKey) ?? [];
      arr.push(node);
      quizzesByTopic.set(topicKey, arr);
    });
  quizzesByTopic.forEach((quizzes, topicKey) => {
    positionChildren(topicKey, quizzes, centers, "quiz", nodeRadialOffset, nodeGap);
  });

  // Exam nodes: parent key from data.parentCategoryId
  const examsByCategory = new Map<string, Node[]>();
  nodes
    .filter((n) => n.type === "exam")
    .forEach((node) => {
      const parentId = (node.data as Record<string, unknown>)?.parentCategoryId as string | undefined;
      if (!parentId) return;
      const arr = examsByCategory.get(parentId) ?? [];
      arr.push(node);
      examsByCategory.set(parentId, arr);
    });
  examsByCategory.forEach((exams, catKey) => {
    positionChildren(catKey, exams, centers, "exam", nodeRadialOffset, nodeGap);
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
