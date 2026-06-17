import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  useReactFlow,
  type Node,
  type Edge,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/base.css";
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { useProgressStore } from "@/store/useProgressStore";
import { useAppStore } from "@/store/useAppStore";
import { getLayoutedElements } from "@/lib/layout";
import { PRACTICE_EXAMS } from "@/data/practiceExams";
import ExamCategoryNodeComponent from "./ExamCategoryNode";
import ExamNodeComponent from "./ExamNode";

const CATEGORIES = [
  { id: "cat-legacy", label: "Legacy", icon: "📜" },
  { id: "cat-sesiuni", label: "Sesiuni", icon: "📝" },
  { id: "cat-partiale", label: "Parțiale", icon: "📐" },
  { id: "cat-modele", label: "Modele", icon: "📋" },
];

const CATEGORY_BOUNDS = [
  { id: "cat-legacy", start: 0, end: 2 },
  { id: "cat-sesiuni", start: 2, end: 12 },
  { id: "cat-partiale", start: 12, end: 19 },
  { id: "cat-modele", start: 19, end: 29 },
];

const nodeTypes: NodeTypes = {
  examCategory: ExamCategoryNodeComponent,
  exam: ExamNodeComponent,
};

function ExamTreeFlow() {
  const navigate = useNavigate();
  const { setActiveExamId, setActiveProblemIndex } = useAppStore();
  const { isProblemSolved } = useProgressStore();
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);
  const rf = useReactFlow();

  const toggleExpand = useCallback((id: string) => {
    setExpandedCategoryId((prev) => (prev === id ? null : id));
  }, []);

  const handleExamClick = useCallback(
    (examId: string) => {
      setActiveExamId(examId);
      setActiveProblemIndex(0);
      navigate("/practice");
    },
    [navigate, setActiveExamId, setActiveProblemIndex],
  );

  const { nodes, edges } = useMemo(() => {
    const nodeList: Node[] = [];
    const edgeList: Edge[] = [];

    nodeList.push({
      id: "root-exams",
      type: "root",
      position: { x: 0, y: 0 },
      data: {},
    });

    CATEGORIES.forEach((cat) => {
      const bound = CATEGORY_BOUNDS.find((b) => b.id === cat.id);
      const exams = bound ? PRACTICE_EXAMS.slice(bound.start, bound.end) : [];
      const totalCount = exams.reduce((s, e) => s + e.problems.length, 0);
      const solvedCount = exams.reduce(
        (s, e) => s + e.problems.filter((p) => isProblemSolved(`${e.id}-${p.id}`)).length,
        0,
      );

      nodeList.push({
        id: cat.id,
        type: "examCategory",
        position: { x: 0, y: 0 },
        data: {
          categoryId: cat.id,
          label: cat.label,
          icon: cat.icon,
          solvedCount,
          totalCount,
          isExpanded: expandedCategoryId === cat.id,
          onToggle: () => toggleExpand(cat.id),
        },
      });

      edgeList.push({
        id: `e-root-exams-${cat.id}`,
        source: "root-exams",
        target: cat.id,
        sourceHandle: "right",
        targetHandle: "left",
        type: "smoothstep",
        style: {
          stroke: pctColor(solvedCount / Math.max(totalCount, 1)),
          strokeWidth: 1,
        },
        animated: false,
      });
    });

    if (expandedCategoryId !== null) {
      const bound = CATEGORY_BOUNDS.find((b) => b.id === expandedCategoryId);
      const exams = bound ? PRACTICE_EXAMS.slice(bound.start, bound.end) : [];

      exams.forEach((exam) => {
        const examNodeId = `exam-${exam.id}`;
        const solvedCount = exam.problems.filter((p) =>
          isProblemSolved(`${exam.id}-${p.id}`),
        ).length;
        const problemProgress = exam.problems.map((p) =>
          isProblemSolved(`${exam.id}-${p.id}`),
        );

        nodeList.push({
          id: examNodeId,
          type: "exam",
          position: { x: 0, y: 0 },
          data: {
            examId: exam.id,
            title: exam.title,
            solvedCount,
            totalCount: exam.problems.length,
            problemProgress,
            parentCategoryId: expandedCategoryId,
            onClick: () => handleExamClick(exam.id),
          },
        });

        edgeList.push({
          id: `e-${expandedCategoryId}-${examNodeId}`,
          source: expandedCategoryId,
          target: examNodeId,
          sourceHandle: "right",
          targetHandle: "left",
          type: "smoothstep",
          style: {
            stroke: solvedCount === exam.problems.length
              ? "rgba(52,211,153,0.18)"
              : "rgba(255,255,255,0.05)",
            strokeWidth: 1,
          },
          animated: false,
        });
      });
    }

    return getLayoutedElements(nodeList, edgeList, {
      ringRadiusX: 200,
      ringRadiusY: 120,
      nodeRadialOffset: 55,
      nodeGap: 34,
    });
  }, [expandedCategoryId, toggleExpand, handleExamClick, isProblemSolved]);

  useEffect(() => {
    if (rf && nodes.length > 0) {
      rf.fitView({ padding: 0.25, duration: 300 });
    }
  }, [nodes.length, expandedCategoryId, rf]);

  return (
    <div
      className="glass-panel rounded-xl overflow-hidden"
      style={{ height: 420 }}
    >
      <div className="px-4 pt-3 pb-1 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2">
          <GraduationCap size={14} style={{ color: "var(--color-amber)" }} />
          <h3 className="text-sm font-semibold">Examene de Restanță</h3>
        </div>
        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>
          {expandedCategoryId !== null
            ? "click category to collapse"
            : "click a category to expand"}
        </span>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
        minZoom={0.2}
        maxZoom={2}
        panOnDrag
        zoomOnScroll
        defaultEdgeOptions={{
          type: "smoothstep",
          style: { stroke: "rgba(255,255,255,0.06)", strokeWidth: 1 },
        }}
        connectionLineStyle={{ stroke: "transparent" }}
      >
        <Background gap={28} size={1} color="rgba(255,255,255,0.03)" />
        <Controls
          showInteractive={false}
          position="bottom-left"
          style={{
            display: "flex",
            gap: 4,
            background: "transparent",
            border: "none",
            boxShadow: "none",
          }}
        />
      </ReactFlow>
    </div>
  );
}

function pctColor(ratio: number): string {
  if (ratio >= 1) return "rgba(52,211,153,0.25)";
  if (ratio > 0) return "rgba(251,191,36,0.15)";
  return "rgba(255,255,255,0.06)";
}

export default function ExamTree() {
  return (
    <ReactFlowProvider>
      <ExamTreeFlow />
    </ReactFlowProvider>
  );
}
