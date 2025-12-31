import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ShoppingBag, User } from 'lucide-react'
import { useStore } from '@/store'

export default function Navigation() {
  const { cartItems, setCartOpen } = useStore()
  const count = cartItems.reduce((s, i) => s + i.qty, 0)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="container-page h-16 flex items-center justify-between">
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="opacity-80 hover:opacity-100"
          aria-label="Search"
        >
          <Search size={18} />
        </button>

        <Link to="/" className="text-sm tracking-[0.45em] uppercase opacity-90 hover:opacity-100">
          ZLFR
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/account" className="opacity-80 hover:opacity-100" aria-label="Account">
            <User size={18} />
          </Link>

          <button
            onClick={() => setCartOpen(true)}
            className="relative opacity-80 hover:opacity-100"
            aria-label="Cart"
          >
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5 rounded-full bg-zlfr-gold text-black">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="absolute top-16 left-0 right-0 bg-black/90 backdrop-blur p-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-transparent border border-white/20 rounded px-3 py-2 text-white placeholder-white/50"
          />
        </div>
      )}
    </header>
  )
}
