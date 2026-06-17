import { memo } from "react";
import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import { CheckCircle2 } from "lucide-react";
import { getDifficultyConfig } from "@/data/difficultyConfig";

interface QuizNodeData extends Record<string, unknown> {
  difficulty: string;
  passed: boolean;
  topicId: string;
  quizIndex: number;
  onClick: () => void;
}

type QuizNodeType = Node<QuizNodeData, "quiz">;

function QuizNodeComponent({ data }: NodeProps<QuizNodeType>) {
  const { difficulty, passed, onClick } = data;
  const cfg = getDifficultyConfig(difficulty);

  return (
    <div
      className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all duration-200 select-none"
      style={{
        width: 150,
        background: passed ? cfg.bgColor : "rgba(255,255,255,0.025)",
        border: `1px solid ${
          passed ? cfg.borderColor : "rgba(255,255,255,0.05)"
        }`,
        transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = passed
          ? cfg.bgColor
          : "rgba(255,255,255,0.06)";
        e.currentTarget.style.transform = "translateX(3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = passed
          ? cfg.bgColor
          : "rgba(255,255,255,0.025)";
        e.currentTarget.style.transform = "translateX(0)";
      }}
    >
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Handle
          key={`t-${side}`}
          type="target"
          id={`t-${side}`}
          position={
            side === "top"
              ? Position.Top
              : side === "right"
                ? Position.Right
                : side === "bottom"
                  ? Position.Bottom
                  : Position.Left
          }
          style={{ width: 0, height: 0, background: "transparent", border: "none", minWidth: 0, minHeight: 0 }}
        />
      ))}
      <div
        className="w-2 h-2 rounded-full shrink-0"
        style={{ background: cfg.color }}
      />
      <span
        className="text-[10px] truncate font-medium flex-1"
        style={{
          color: passed
            ? "rgba(255,255,255,0.65)"
            : "rgba(255,255,255,0.3)",
        }}
      >
        {difficulty}
      </span>
      {passed && (
        <CheckCircle2 size={11} style={{ color: "var(--color-emerald)", flexShrink: 0 }} />
      )}
    </div>
  );
}

export default memo(QuizNodeComponent);
