'use client'

import Link from 'next/link'
import { useLinkStatus } from 'next/link'
import { memo } from 'react'
import Logo from '@/components/Logo'

const Hint = memo(function Hint() {
  const { pending } = useLinkStatus()
  return (
    <span 
      aria-hidden 
      className={pending ? 'link-hint is-pending' : 'link-hint'} 
    />
  )
})

Hint.displayName = 'Hint'

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <Link href="/" className="flex items-center">
        <Logo />
      </Link>
      <nav>
        <Link href="/dashboard" prefetch={true} className="flex items-center gap-2">
          <span className="label">Dashboard</span>
          <Hint />
        </Link>
      </nav>
    </header>
  )
}