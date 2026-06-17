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
import { Binary } from "lucide-react";
import { useProgressStore } from "@/store/useProgressStore";
import { useAppStore } from "@/store/useAppStore";
import { getLayoutedElements } from "@/lib/layout";
import { TOPICS } from "@/data/topics";
import { QUIZZES } from "@/data/quizzes";
import RootNodeComponent from "./RootNode";
import TopicNodeComponent from "./TopicNode";
import QuizNodeComponent from "./QuizNode";

interface ConceptTreeProps {
  nextTopicId: string | null;
}

const nodeTypes: NodeTypes = {
  root: RootNodeComponent,
  topic: TopicNodeComponent,
  quiz: QuizNodeComponent,
};

function ConceptTreeFlow({ nextTopicId }: ConceptTreeProps) {
  const navigate = useNavigate();
  const { setActiveTopicId } = useAppStore();
  const { isDifficultyPassed, getPassedQuizCount } = useProgressStore();
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);
  const rf = useReactFlow();

  const toggleExpand = useCallback((id: string) => {
    setExpandedTopicId((prev) => (prev === id ? null : id));
  }, []);

  const handleQuizClick = useCallback(
    (topicId: string) => {
      setActiveTopicId(topicId);
      navigate("/learn");
    },
    [navigate, setActiveTopicId],
  );

  const { nodes, edges } = useMemo(() => {
    const nodeList: Node[] = [];
    const edgeList: Edge[] = [];

    nodeList.push({
      id: "root-pa",
      type: "root",
      position: { x: 0, y: 0 },
      data: {},
    });

    TOPICS.forEach((topic) => {
      const quizSets = QUIZZES[topic.id] ?? [];
      const passedCount = getPassedQuizCount(topic.id);
      const totalQuizzes = quizSets.length;
      const topicNodeId = `topic-${topic.id}`;

      nodeList.push({
        id: topicNodeId,
        type: "topic",
        position: { x: 0, y: 0 },
        data: {
          topicId: topic.id,
          title: topic.title,
          icon: topic.icon,
          passedCount,
          totalQuizzes,
          quizCompletions: quizSets.map((qs) =>
            isDifficultyPassed(topic.id, qs.difficulty),
          ),
          isExpanded: expandedTopicId === topic.id,
          hasNext: nextTopicId === topic.id,
          onToggle: () => toggleExpand(topic.id),
        },
      });

      edgeList.push({
        id: `e-root-pa-${topicNodeId}`,
        source: "root-pa",
        target: topicNodeId,
        sourceHandle: "right",
        targetHandle: "left",
        type: "smoothstep",
        style: {
          stroke:
            nextTopicId === topic.id
              ? "rgba(251,191,36,0.22)"
              : "rgba(255,255,255,0.06)",
          strokeWidth: nextTopicId === topic.id ? 1.5 : 1,
        },
        animated: nextTopicId === topic.id,
      });
    });

    if (expandedTopicId !== null) {
      const quizSets = QUIZZES[expandedTopicId] ?? [];
      quizSets.forEach((qs, idx) => {
        const quizNodeId = `quiz-${expandedTopicId}-${idx}`;
        const passed = isDifficultyPassed(expandedTopicId, qs.difficulty);

        nodeList.push({
          id: quizNodeId,
          type: "quiz",
          position: { x: 0, y: 0 },
          data: {
            difficulty: qs.difficulty,
            passed,
            topicId: expandedTopicId,
            quizIndex: idx,
            onClick: () => handleQuizClick(expandedTopicId),
          },
        });

        edgeList.push({
          id: `e-${expandedTopicId}-${quizNodeId}`,
          source: `topic-${expandedTopicId}`,
          target: quizNodeId,
          sourceHandle: "right",
          targetHandle: "left",
          type: "smoothstep",
          style: {
            stroke: passed
              ? "rgba(52,211,153,0.18)"
              : "rgba(255,255,255,0.05)",
            strokeWidth: 1,
          },
          animated: false,
        });
      });
    }

    return getLayoutedElements(nodeList, edgeList);
  }, [expandedTopicId, nextTopicId, toggleExpand, handleQuizClick, isDifficultyPassed, getPassedQuizCount]);

  useEffect(() => {
    if (rf && nodes.length > 0) {
      rf.fitView({ padding: 0.2, duration: 300 });
    }
  }, [nodes.length, expandedTopicId, rf]);

  return (
    <div
      className="glass-panel rounded-xl overflow-hidden"
      style={{ height: 520 }}
    >
      <div className="px-4 pt-3 pb-1 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2">
          <Binary size={14} style={{ color: "var(--color-amber)" }} />
          <h3 className="text-sm font-semibold">Arborele Temelor</h3>
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

export default function ConceptTree(props: ConceptTreeProps) {
  return (
    <ReactFlowProvider>
      <ConceptTreeFlow {...props} />
    </ReactFlowProvider>
  );
}
