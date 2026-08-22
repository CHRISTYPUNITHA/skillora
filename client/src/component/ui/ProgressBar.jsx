import * as React from "react"
import { cn } from "../../utils/cn"

/**
 * ProgressBar — Reusable horizontal progress bar component
 * Props:
 *   value      {number}  0–100 percentage fill
 *   color      {string}  Tailwind bg class for the fill (default: bg-purple-500)
 *   size       {string}  "sm" | "md" | "lg" — track height
 *   className  {string}  Extra classes for the outer track
 *   showLabel  {boolean} Show percentage label on the right
 */
export function ProgressBar({
  value = 0,
  color = "bg-purple-500",
  size = "md",
  className,
  showLabel = false,
}) {
  const clamped = Math.min(100, Math.max(0, value))

  const trackHeight = {
    sm: "h-1",
    md: "h-1.5",
    lg: "h-2.5",
  }[size] ?? "h-1.5"

  return (
    <div className={cn("flex items-center gap-2 w-full", className)}>
      <div
        className={cn(
          "flex-1 rounded-full bg-gray-100 overflow-hidden",
          trackHeight
        )}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-500", color)}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-semibold text-gray-500 min-w-[2.5rem] text-right">
          {clamped}%
        </span>
      )}
    </div>
  )
}
