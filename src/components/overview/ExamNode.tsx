import { memo } from "react";
import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import { CheckCircle2 } from "lucide-react";

interface ExamNodeData extends Record<string, unknown> {
  examId: string;
  title: string;
  solvedCount: number;
  totalCount: number;
  problemProgress: boolean[];
  parentCategoryId: string;
  onClick: () => void;
}

type ExamNodeType = Node<ExamNodeData, "exam">;

function ExamNodeComponent({ data }: NodeProps<ExamNodeType>) {
  const { title, solvedCount, totalCount, problemProgress, onClick } = data;
  const allSolved = totalCount > 0 && solvedCount === totalCount;

  return (
    <div
      className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all duration-200 select-none"
      style={{
        width: 170,
        background: allSolved
          ? "rgba(52,211,153,0.08)"
          : "rgba(255,255,255,0.025)",
        border: `1px solid ${
          allSolved
            ? "rgba(52,211,153,0.15)"
            : "rgba(255,255,255,0.05)"
        }`,
        transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = allSolved
          ? "rgba(52,211,153,0.14)"
          : "rgba(255,255,255,0.06)";
        e.currentTarget.style.transform = "translateX(3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = allSolved
          ? "rgba(52,211,153,0.08)"
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
      <div className="flex flex-1 items-center gap-1.5 min-w-0">
        <span className="text-[10px] truncate font-medium" style={{ color: allSolved ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.35)" }}>
          {title}
        </span>
        <span className="text-[9px] font-mono shrink-0" style={{ color: allSolved ? "var(--color-emerald)" : "rgba(255,255,255,0.3)" }}>
          {solvedCount}/{totalCount}
        </span>
      </div>
      <div className="flex items-center gap-[2px] shrink-0">
        {problemProgress.map((solved, i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: solved
                ? "var(--color-emerald)"
                : "rgba(255,255,255,0.1)",
              transition: "all 0.15s",
            }}
          />
        ))}
      </div>
      {allSolved && (
        <CheckCircle2 size={10} style={{ color: "var(--color-emerald)", flexShrink: 0 }} />
      )}
    </div>
  );
}

export default memo(ExamNodeComponent);
