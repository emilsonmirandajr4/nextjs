import React, { ComponentPropsWithRef } from 'react'
export { useDotButton } from './hooks/useDotButton'


type PropType = ComponentPropsWithRef<'button'>


export const DotButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props


  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  )
}
