import { memo } from "react";
import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";

interface ExamCategoryNodeData extends Record<string, unknown> {
  categoryId: string;
  label: string;
  icon: string;
  solvedCount: number;
  totalCount: number;
  isExpanded: boolean;
  onToggle: () => void;
}

type ExamCategoryNodeType = Node<ExamCategoryNodeData, "examCategory">;

const CATEGORY_GRADIENTS: Record<string, string> = {
  "cat-legacy": "rgba(148,163,184,0.15)",
  "cat-sesiuni": "rgba(251,191,36,0.15)",
  "cat-partiale": "rgba(34,211,238,0.15)",
  "cat-modele": "rgba(129,140,248,0.15)",
};

const CATEGORY_BORDERS: Record<string, string> = {
  "cat-legacy": "rgba(148,163,184,0.3)",
  "cat-sesiuni": "rgba(251,191,36,0.3)",
  "cat-partiale": "rgba(34,211,238,0.3)",
  "cat-modele": "rgba(129,140,248,0.3)",
};

function ExamCategoryNodeComponent({ data }: NodeProps<ExamCategoryNodeType>) {
  const { label, icon, solvedCount, totalCount, isExpanded, categoryId, onToggle } = data;
  const pct = totalCount ? (solvedCount / totalCount) * 100 : 0;

  return (
    <div
      className="rounded-xl cursor-pointer select-none"
      style={{
        padding: "10px 14px",
        width: 160,
        background: CATEGORY_GRADIENTS[categoryId] ?? "rgba(255,255,255,0.04)",
        border: `1px solid ${CATEGORY_BORDERS[categoryId] ?? "rgba(255,255,255,0.07)"}`,
        boxShadow: isExpanded ? `0 0 16px ${CATEGORY_BORDERS[categoryId] ?? "transparent"}` : "none",
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
          {label}
        </span>
        <div
          className="flex items-center justify-center shrink-0 rounded"
          style={{
            padding: "1px 5px",
            fontSize: 10,
            fontWeight: 600,
            background: pct === 100 ? "rgba(52,211,153,0.2)" : "rgba(255,255,255,0.06)",
            color: pct === 100 ? "var(--color-emerald)" : "rgba(255,255,255,0.4)",
          }}
        >
          {solvedCount}/{totalCount}
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

export default memo(ExamCategoryNodeComponent);
