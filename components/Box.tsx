import { FC, ReactNode } from "react"
import { twMerge } from "tailwind-merge"


interface BoxProps {
  children: ReactNode
  className?: string
}

export const Box: FC<BoxProps> = ({ children, className }) => {
  return (
    <div className={twMerge(`
    rounded-lg
    h-fit
     max-w-[40px]
   `,
      className
    )}>
      {children}
    </div>
  )
}