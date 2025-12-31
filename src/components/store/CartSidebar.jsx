import React, { useState } from 'react'
import { X, Minus, Plus, Trash2 } from 'lucide-react'
import { useStore } from '@/store'
import { createCheckout } from '@/lib/shopify'
import { motion, AnimatePresence } from 'framer-motion'

export default function CartSidebar({ open, onClose }) {
  const { cartItems, updateQty, removeItem, subtotal } = useStore()
  const [checkingOut, setCheckingOut] = useState(false)

  const handleCheckout = async () => {
    setCheckingOut(true)
    try {
      console.log('Cart items:', cartItems)
      const checkoutUrl = await createCheckout(cartItems)
      window.location.href = checkoutUrl
    } catch (error) {
      console.error('Checkout error:', error)
      alert(`Error creating checkout: ${error.message}\n\nPlease check the browser console for details.`)
      setCheckingOut(false)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 z-40 bg-black/60 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
        onClick={onClose}
      />
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: open ? 0 : '100%' }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 z-50 h-full w-[360px] max-w-[92vw] bg-zlfr-smoke border-l border-white/10"
      >
        <div className="h-16 px-5 flex items-center justify-between border-b border-white/10">
          <div className="text-[11px] tracking-[0.35em] uppercase">Cart</div>
          <button onClick={onClose} className="opacity-80 hover:opacity-100" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-5 overflow-auto h-[calc(100%-180px)]">
          {cartItems.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-white/60"
            >
              Your cart is empty.
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              {cartItems.map(item => (
                <motion.div 
                  key={item.id} 
                  className="flex gap-3"
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0, 
                    height: "auto",
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  exit={{ 
                    opacity: 0,
                    x: 100,
                    height: 0,
                    marginBottom: 0,
                    transition: { duration: 0.4, ease: "easeIn" }
                  }}
                  layout
                >
                  <img src={item.image} alt={item.name} className="h-16 w-16 object-cover bg-white/5" />
                <div className="flex-1">
                  <div className="text-[11px] tracking-[0.22em] uppercase">{item.name}</div>
                  <div className="mt-1 text-xs text-white/60">${item.price}</div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 border border-white/10 px-2 py-1 rounded">
                      <motion.button 
                        onClick={() => updateQty(item.id, item.qty - 1)} 
                        aria-label="Decrease"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8, backgroundColor: "rgba(200, 160, 74, 0.2)" }}
                        transition={{ duration: 0.15 }}
                        className="rounded"
                      >
                        <Minus size={14} />
                      </motion.button>
                      <motion.div 
                        key={`${item.id}-${item.qty}`}
                        initial={{ scale: 1.3, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
                        className="text-xs w-6 text-center"
                      >
                        {item.qty}
                      </motion.div>
                      <motion.button 
                        onClick={() => updateQty(item.id, item.qty + 1)} 
                        aria-label="Increase"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8, backgroundColor: "rgba(200, 160, 74, 0.2)" }}
                        transition={{ duration: 0.15 }}
                        className="rounded"
                      >
                        <Plus size={14} />
                      </motion.button>
                    </div>

                    <motion.button 
                      onClick={() => removeItem(item.id)} 
                      className="opacity-70 hover:opacity-100" 
                      aria-label="Remove"
                      whileHover={{ scale: 1.1, color: "#ef4444" }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-5 bg-black/20">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="mt-4 space-y-2">
            <button
              onClick={onClose}
              className="w-full py-2 text-xs tracking-[0.2em] uppercase border border-white/20 hover:border-white/40 transition"
            >
              Continue Shopping
            </button>
            <button
              className="w-full py-3 border border-zlfr-gold/60 text-[11px] tracking-[0.3em] uppercase hover:bg-zlfr-gold hover:text-black transition disabled:opacity-40"
              disabled={cartItems.length === 0 || checkingOut}
              onClick={handleCheckout}
            >
              {checkingOut ? 'Creating Checkout...' : 'Continue to Checkout'}
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
