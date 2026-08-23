import * as React from "react"
import { cn } from "../../utils/cn"

const Input = React.forwardRef(({ className, type, icon: Icon, ...props }, ref) => {
  return (
    <div className="relative flex items-center w-full">
      {Icon && (
        <div className="absolute left-3 flex items-center justify-center pointer-events-none text-gray-500">
          <Icon size={16} />
        </div>
      )}
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          Icon && "pl-9",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  )
})
Input.displayName = "Input"

export { Input }
