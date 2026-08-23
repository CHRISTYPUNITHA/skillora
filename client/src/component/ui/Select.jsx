import * as React from "react"
import { cn } from "../../utils/cn"
import { ChevronDown } from "lucide-react"

const Select = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <select
        ref={ref}
        className={cn(
          "flex h-10 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 pr-10 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
        <ChevronDown size={16} />
      </div>
    </div>
  )
})
Select.displayName = "Select"

export { Select }
