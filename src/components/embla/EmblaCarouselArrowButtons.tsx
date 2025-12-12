import React, { ComponentPropsWithRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export { usePrevNextButtons } from './hooks/usePrevNextButtons'

type PropType = ComponentPropsWithRef<'button'>

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, className, ...restProps } = props

  return (
    <button
      className={cn(
        "absolute left-4 top-1/3 -translate-y-1/2 z-20",
        "bg-black/50 hover:bg-black/70 text-white",
        "p-3 rounded-full transition-all duration-200",
        "disabled:opacity-30 disabled:cursor-not-allowed",
        "hover:scale-110 active:scale-95",
        className
      )}
      type="button"
      {...restProps}
    >
      <ChevronLeft className="w-8 h-8" />
      {children}
    </button>
  )
}

export const NextButton: React.FC<PropType> = (props) => {
  const { children, className, ...restProps } = props

  return (
    <button
      className={cn(
        "absolute right-4 top-1/3 -translate-y-1/2 z-20",
        "bg-black/50 hover:bg-black/70 text-white",
        "p-3 rounded-full transition-all duration-200",
        "disabled:opacity-30 disabled:cursor-not-allowed",
        "hover:scale-110 active:scale-95",
        className
      )}
      type="button"
      {...restProps}
    >
      <ChevronRight className="w-8 h-8" />
      {children}
    </button>
  )
}
