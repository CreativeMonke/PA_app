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
import { TOPICS } from "@/data/topics";
import { PRACTICE_EXAMS } from "@/data/practiceExams";
import RootNodeComponent from "./RootNode";
import ExamTopicNodeComponent from "./ExamTopicNode";
import ExamNodeComponent from "./ExamNode";

interface TopicExamInfo {
  examId: string;
  examTitle: string;
  problemCount: number;
}

interface TopicDataEntry {
  problemCount: number;
  exams: TopicExamInfo[];
}

function computeTopicData(): Map<string, TopicDataEntry> {
  const topicMap = new Map<string, TopicDataEntry>();

  for (const topic of TOPICS) {
    topicMap.set(topic.id, { problemCount: 0, exams: [] });
  }

  for (const exam of PRACTICE_EXAMS) {
    const countPerTopic = new Map<string, number>();
    for (const problem of exam.problems) {
      if (topicMap.has(problem.topic)) {
        countPerTopic.set(
          problem.topic,
          (countPerTopic.get(problem.topic) || 0) + 1,
        );
      }
    }
    for (const [topicId, count] of countPerTopic) {
      const entry = topicMap.get(topicId)!;
      entry.problemCount += count;
      entry.exams.push({
        examId: exam.id,
        examTitle: exam.title,
        problemCount: count,
      });
    }
  }

  return topicMap;
}

const nodeTypes: NodeTypes = {
  root: RootNodeComponent,
  examTopic: ExamTopicNodeComponent,
  exam: ExamNodeComponent,
};

function ExamTreeFlow() {
  const navigate = useNavigate();
  const { setActiveExamId, setActiveProblemIndex } = useAppStore();
  const { isProblemSolved } = useProgressStore();
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);
  const rf = useReactFlow();

  const topicData = useMemo(() => computeTopicData(), []);

  const toggleExpand = useCallback((id: string) => {
    setExpandedTopicId((prev) => (prev === id ? null : id));
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

    TOPICS.forEach((topic) => {
      const info = topicData.get(topic.id);
      const totalCount = info?.problemCount ?? 0;

      nodeList.push({
        id: topic.id,
        type: "examTopic",
        position: { x: 0, y: 0 },
        data: {
          topicId: topic.id,
          icon: topic.icon,
          title: topic.title,
          problemCount: totalCount,
          isExpanded: expandedTopicId === topic.id,
          hasNext: totalCount > 0,
          onToggle: () => toggleExpand(topic.id),
        },
      });

      edgeList.push({
        id: `e-root-exams-${topic.id}`,
        source: "root-exams",
        target: topic.id,
        sourceHandle: "right",
        targetHandle: "left",
        type: "smoothstep",
        style: {
          stroke:
            totalCount > 0
              ? "rgba(52,211,153,0.15)"
              : "rgba(255,255,255,0.06)",
          strokeWidth: 1,
        },
        animated: false,
      });
    });

    if (expandedTopicId !== null && topicData.has(expandedTopicId)) {
      const info = topicData.get(expandedTopicId)!;
      info.exams.forEach((examInfo) => {
        const examNodeId = `exam-${examInfo.examId}`;
        const exam = PRACTICE_EXAMS.find((e) => e.id === examInfo.examId);
        if (!exam) return;

        const examSolvedCount = exam.problems.filter((p) =>
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
            solvedCount: examSolvedCount,
            totalCount: exam.problems.length,
            problemProgress,
            parentCategoryId: expandedTopicId,
            onClick: () => handleExamClick(exam.id),
          },
        });

        edgeList.push({
          id: `e-${expandedTopicId}-${examNodeId}`,
          source: expandedTopicId,
          target: examNodeId,
          sourceHandle: "right",
          targetHandle: "left",
          type: "smoothstep",
          label: `${examInfo.problemCount} probleme`,
          labelStyle: { fontSize: 9, fontWeight: 500, color: "rgba(255,255,255,0.35)" },
          labelBgStyle: { fill: "rgba(10,10,20,0.85)", rx: 4, ry: 4 },
          labelBgPadding: [6, 3] as [number, number],
          labelBgBorderRadius: 4,
          style: {
            stroke:
              examSolvedCount === exam.problems.length
                ? "rgba(52,211,153,0.18)"
                : "rgba(255,255,255,0.05)",
            strokeWidth: 1,
          },
          animated: false,
        });
      });
    }

    return getLayoutedElements(nodeList, edgeList, {
      ringRadiusX: 380,
      ringRadiusY: 200,
      nodeRadialOffset: 65,
      nodeGap: 34,
    });
  }, [expandedTopicId, toggleExpand, handleExamClick, isProblemSolved, topicData]);

  useEffect(() => {
    if (rf && nodes.length > 0) {
      rf.fitView({ padding: 0.25, duration: 300 });
    }
  }, [nodes.length, expandedTopicId, rf]);

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
          {expandedTopicId !== null
            ? "click topic to collapse"
            : "click a topic to expand"}
        </span>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
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

export default function ExamTree() {
  return (
    <ReactFlowProvider>
      <ExamTreeFlow />
    </ReactFlowProvider>
  );
}
