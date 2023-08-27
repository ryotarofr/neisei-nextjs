import { ButtonHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface NormalButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> { }


const NormalButton = forwardRef<HTMLButtonElement, NormalButtonProps>(({
  className,
  children,
  disabled,
  type = "button",
  ...props
}, ref) => {
  return (
    <button
      type={type}
      className={twMerge(`
        w-full 
        rounded-full
        bg-white
        border
        border-transparent
        px-3
        py-3
        disabled:cursor-not-allowed
        disabled:opacity-50
        text-black
        font-bold
        hover:opacity-75
        transition
      `, className)}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

NormalButton.displayName = "NormalButton"

export default NormalButton