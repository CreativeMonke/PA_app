import { memo } from "react";
import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";

interface ExamTopicNodeData extends Record<string, unknown> {
  topicId: string;
  icon: string;
  title: string;
  problemCount: number;
  isExpanded: boolean;
  hasNext: boolean;
  onToggle: () => void;
}

type ExamTopicNodeType = Node<ExamTopicNodeData, "examTopic">;

function ExamTopicNodeComponent({ data }: NodeProps<ExamTopicNodeType>) {
  const { icon, title, problemCount, isExpanded, hasNext, onToggle } = data;

  return (
    <div
      className="rounded-xl cursor-pointer select-none"
      style={{
        padding: "10px 14px",
        width: 160,
        background: isExpanded
          ? "linear-gradient(180deg, rgba(52,211,153,0.13), rgba(52,211,153,0.05))"
          : "rgba(255,255,255,0.04)",
        border: `1px solid ${
          hasNext
            ? "rgba(52,211,153,0.35)"
            : isExpanded
              ? "rgba(52,211,153,0.2)"
              : "rgba(255,255,255,0.07)"
        }`,
        boxShadow:
          hasNext
            ? "0 0 16px rgba(52,211,153,0.12)"
            : "inset 0 1px 0 rgba(255,255,255,0.04)",
        transition: "all 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      onClick={onToggle}
    >
      {(["top", "right", "bottom", "left"] as const).map((side) => {
        const pos =
          side === "top"
            ? Position.Top
            : side === "right"
              ? Position.Right
              : side === "bottom"
                ? Position.Bottom
                : Position.Left;
        const hidden = { width: 0, height: 0, background: "transparent", border: "none", minWidth: 0, minHeight: 0 } as const;
        return (
          <span key={side}>
            <Handle type="target" id={`t-${side}`} position={pos} style={hidden} />
            <Handle type="source" id={`s-${side}`} position={pos} style={hidden} />
          </span>
        );
      })}

      <div className="flex items-center gap-2">
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span className="text-[11px] font-medium truncate flex-1 min-w-0" style={{ color: "#e2e8f0" }}>
          {title}
        </span>
        <div
          className="flex items-center justify-center shrink-0 rounded"
          style={{
            padding: "1px 5px",
            fontSize: 10,
            fontWeight: 600,
            background: problemCount > 0 ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.06)",
            color: problemCount > 0 ? "var(--color-emerald)" : "rgba(255,255,255,0.3)",
          }}
        >
          {problemCount}
        </div>
        <div
          className="w-3 h-3 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "4px solid rgba(255,255,255,0.25)",
              borderTop: "3px solid transparent",
              borderBottom: "3px solid transparent",
              transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(ExamTopicNodeComponent);
