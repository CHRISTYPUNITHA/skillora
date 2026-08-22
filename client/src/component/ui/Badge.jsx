import * as React from "react"
import { cn } from "../../utils/cn"

function Badge({ className, variant = "default", ...props }) {
  const variants = {
    default: "bg-purple-100 text-purple-700 hover:bg-purple-200 border-transparent",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 border-transparent",
    destructive: "bg-red-100 text-red-700 hover:bg-red-200 border-transparent",
    outline: "text-gray-700 border-gray-200",
    success: "bg-green-100 text-green-700 hover:bg-green-200 border-transparent",
    warning: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-transparent",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
