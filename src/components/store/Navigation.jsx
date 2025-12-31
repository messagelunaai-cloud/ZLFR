import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingBag } from 'lucide-react'
import { useStore } from '@/store'

export default function Navigation() {
  const { cartItems, setCartOpen } = useStore()
  const count = cartItems.reduce((s, i) => s + i.qty, 0)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-zlfr-ink/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="opacity-70 hover:opacity-100 transition-opacity p-2"
          aria-label="Search"
        >
          <Search size={20} />
        </button>

        <Link to="/" className="text-lg tracking-[0.3em] uppercase hover:text-zlfr-gold transition-colors">
          ZLFR
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/about" className="text-sm hover:text-zlfr-gold transition-colors hidden md:block">
            About
          </Link>
          <Link to="/products" className="text-sm hover:text-zlfr-gold transition-colors">
            Shop
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            className="relative opacity-70 hover:opacity-100 transition-opacity p-2"
            aria-label="Cart"
          >
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 text-xs px-2 py-0.5 rounded-full bg-zlfr-gold text-zlfr-ink font-medium">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="absolute top-full left-0 right-0 bg-zlfr-ink/95 backdrop-blur-lg border-b border-white/10 p-6">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/20 rounded-lg px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:border-zlfr-gold transition-colors"
              autoFocus
            />
            <p className="mt-2 text-xs text-white/40 text-center">Press Enter to search</p>
          </form>
        </div>
      )}
    </header>
  )
}
