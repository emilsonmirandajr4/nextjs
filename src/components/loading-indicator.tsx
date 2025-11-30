'use client'

import { useLinkStatus } from 'next/link'
import { memo } from 'react'

const LoadingIndicator = memo(function LoadingIndicator() {
  const { pending } = useLinkStatus()
  return (
    <span 
      aria-hidden 
      className={pending ? 'link-hint is-pending' : 'link-hint'} 
    />
  )
})

LoadingIndicator.displayName = 'LoadingIndicator'

export default LoadingIndicator
