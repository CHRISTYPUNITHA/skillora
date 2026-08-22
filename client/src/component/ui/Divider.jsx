import * as React from "react"
import { cn } from "../../utils/cn"

/**
 * Divider — Thin horizontal separator line
 * Props:
 *   gradient  {boolean} Use a purple gradient fade instead of solid color
 *   className {string}  Extra wrapper classes
 */
export function Divider({ gradient = false, className }) {
  return (
    <div
      className={cn(
        "w-full h-px",
        gradient
          ? "bg-gradient-to-r from-transparent via-purple-300 to-transparent"
          : "bg-gray-100",
        className
      )}
      aria-hidden="true"
    />
  )
}
