import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from './components/store/Navigation'
import Footer from './components/store/Footer'
import CartSidebar from './components/store/CartSidebar'
import { useStore } from './store'

export default function Layout() {
  const { cartOpen, setCartOpen } = useStore()

  return (
    <div className="min-h-screen bg-zlfr-ink text-white">
      <Navigation />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}
