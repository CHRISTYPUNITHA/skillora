import * as React from "react"
import { cn } from "../../utils/cn"

/**
 * CircularProgress — SVG-based circular progress ring component
 * Props:
 *   value      {number}  0–100 percentage
 *   size       {number}  SVG viewBox size in px (default: 120)
 *   stroke     {number}  Track stroke width (default: 10)
 *   trackColor {string}  SVG stroke color of the background ring
 *   fillColor  {string}  SVG stroke color of the filled arc
 *   className  {string}  Extra classes on the wrapper div
 *   children   {node}    Content rendered inside the ring (label)
 */
export function CircularProgress({
  value = 0,
  size = 120,
  stroke = 10,
  trackColor = "#EEF0F6",
  fillColor = "#7C5CFC",
  className,
  children,
}) {
  const clamped = Math.min(100, Math.max(0, value))
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clamped / 100) * circumference

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        {/* Track ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={stroke}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={fillColor}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children ?? (
          <span className="text-xl font-bold text-gray-800">{clamped}%</span>
        )}
      </div>
    </div>
  )
}
