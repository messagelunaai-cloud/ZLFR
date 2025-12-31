import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createCustomerAccessToken, createCustomer, saveToken } from '@/lib/auth'

export default function Login() {
  const navigate = useNavigate()
  const [isSignup, setIsSignup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    console.log('Login attempt with:', formData.email)

    try {
      console.log('Calling createCustomerAccessToken...')
      const token = await createCustomerAccessToken(formData.email, formData.password)
      console.log('Token received:', token)
      saveToken(token.accessToken)
      console.log('Token saved, navigating to account...')
      navigate('/account')
    } catch (err) {
      console.error('Login error:', err)
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    console.log('Signup attempt with:', formData.email)

    try {
      console.log('Creating customer...')
      await createCustomer({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      })
      
      console.log('Customer created, logging in...')
      // Auto-login after signup
      const token = await createCustomerAccessToken(formData.email, formData.password)
      console.log('Token received:', token)
      saveToken(token.accessToken)
      console.log('Token saved, navigating to account...')
      navigate('/account')
    } catch (err) {
      console.error('Signup error:', err)
      setError(err.message || 'Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20">
      <div className="container-page max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light">{isSignup ? 'Create Account' : 'Sign In'}</h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-300 text-sm rounded">
            {error}
          </div>
        )}

        <form onSubmit={isSignup ? handleSignup : handleLogin} className="space-y-4">
          {isSignup && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required={isSignup}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-zlfr-gold/50 transition"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required={isSignup}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-zlfr-gold/50 transition"
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-zlfr-gold/50 transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-zlfr-gold/50 transition"
          />

          {isSignup && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required={isSignup}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-zlfr-gold/50 transition"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-6 border border-zlfr-gold/60 text-[11px] tracking-[0.3em] uppercase hover:bg-zlfr-gold hover:text-black transition disabled:opacity-50"
          >
            {loading ? 'Loading...' : isSignup ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsSignup(!isSignup)
              setError('')
              setFormData({ email: '', password: '', firstName: '', lastName: '', confirmPassword: '' })
            }}
            className="text-xs text-white/70 hover:text-white transition"
          >
            {isSignup ? 'Already have an account?' : 'Create a new account'}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-xs text-white/50 text-center">
            Not ready to sign in?{' '}
            <Link to="/products" className="text-zlfr-gold hover:text-zlfr-gold/80">
              Continue shopping
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
