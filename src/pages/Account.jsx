import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getToken, removeToken } from '@/lib/auth'

export default function Account() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (!token) {
      navigate('/login')
      return
    }
    setIsLoggedIn(true)
    setLoading(false)
  }, [navigate])

  const handleLogout = () => {
    removeToken()
    navigate('/')
  }

  if (loading) {
    return (
      <section className="py-20">
        <div className="container-page">
          <div className="text-sm text-white/70">Loading...</div>
        </div>
      </section>
    )
  }

  if (!isLoggedIn) {
    return (
      <section className="py-20">
        <div className="container-page">
          <div className="text-sm text-white/70">Redirecting to login...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20">
      <div className="container-page max-w-2xl">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-light">My Account</h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 border border-white/20 text-xs tracking-[0.2em] uppercase hover:border-white/40 transition"
          >
            Sign Out
          </button>
        </div>

        {/* Account Welcome */}
        <div className="mb-12 p-6 border border-white/10 bg-white/5">
          <h2 className="text-lg font-light mb-4">Welcome!</h2>
          <p className="text-sm text-white/70">
            You're logged into your ZLFR account. Your order information and account details are available through your Shopify account.
          </p>
          <p className="mt-4 text-sm text-white/70">
            To view your orders, profile, and manage your account, visit your Shopify customer account dashboard.
          </p>
          <a
            href={`https://zlfr-collection.myshopify.com/account`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-2 border border-zlfr-gold/60 text-xs tracking-[0.2em] uppercase hover:bg-zlfr-gold hover:text-black transition"
          >
            View Shopify Account
          </a>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            to="/products"
            className="p-4 border border-white/10 bg-white/5 text-center hover:bg-white/10 transition text-sm"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="p-4 border border-white/10 bg-white/5 text-center hover:bg-white/10 transition text-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  )
}