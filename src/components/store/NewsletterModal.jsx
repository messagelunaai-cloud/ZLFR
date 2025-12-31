import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function NewsletterModal({ open, onClose }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create customer in Shopify via Storefront API
      const response = await fetch(`https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          query: `
            mutation customerCreate($input: CustomerCreateInput!) {
              customerCreate(input: $input) {
                customer {
                  id
                  email
                }
                customerUserErrors {
                  field
                  message
                }
              }
            }
          `,
          variables: {
            input: {
              email: email,
              firstName: name,
              acceptsMarketing: true,
            },
          },
        }),
      })

      const data = await response.json()
      
      if (data.data.customerCreate.customer) {
        setSubscribed(true)
      } else {
        console.error('Error creating customer:', data.data.customerCreate.customerUserErrors)
        alert('Error subscribing. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error subscribing. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-md w-full mx-4 bg-zlfr-smoke border border-white/10 rounded-lg p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {!subscribed ? (
              <>
                <h2 className="text-xl font-light tracking-[0.24em] uppercase mb-4 text-center">Join Our Newsletter</h2>
                <p className="text-sm text-white/70 mb-6 text-center">
                  Get exclusive updates, early access to new collections, and a 10% off promo code.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border border-white/20 rounded px-3 py-2 text-white placeholder-white/50 focus:border-zlfr-gold focus:outline-none"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border border-white/20 rounded px-3 py-2 text-white placeholder-white/50 focus:border-zlfr-gold focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 border border-zlfr-gold/60 text-[11px] tracking-[0.3em] uppercase hover:bg-zlfr-gold hover:text-black transition disabled:opacity-50"
                  >
                    {loading ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
                <p className="text-xs text-white/50 mt-4 text-center">
                  By subscribing, you agree to our <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Privacy Policy</a>.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-light tracking-[0.24em] uppercase mb-4 text-center">Thank You!</h2>
                <p className="text-sm text-white/70 mb-4 text-center">
                  Welcome to the ZLFR family. Click below to shop with your exclusive 10% discount automatically applied!
                </p>
                <a
                  href={`https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}/discount/WELCOME10`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-zlfr-gold text-black text-center font-bold tracking-[0.2em] uppercase rounded hover:bg-zlfr-gold/90 transition"
                >
                  Shop with 10% Off
                </a>
                <p className="text-xs text-white/50 mt-4 text-center">
                  Your discount is already applied when you click the link above. No code needed!
                </p>
                <button
                  onClick={onClose}
                  className="w-full mt-4 py-3 border border-white/20 text-[11px] tracking-[0.3em] uppercase hover:border-white transition"
                >
                  Continue Browsing
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}