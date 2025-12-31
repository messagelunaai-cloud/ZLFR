import React from 'react'

export default function UserNotRegisteredError() {
  return (
    <div className="container-page py-16">
      <div className="border border-white/10 bg-white/5 p-6">
        <div className="text-sm tracking-[0.22em] uppercase">Access Restricted</div>
        <p className="mt-3 text-sm text-white/70">This page is not available.</p>
      </div>
    </div>
  )
}
