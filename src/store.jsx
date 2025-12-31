import React from 'react'

export const StoreContext = React.createContext(null)

export function StoreProvider({ children }) {
  const [cartOpen, setCartOpen] = React.useState(false)
  const [cartItems, setCartItems] = React.useState([]) // {id, name, price, image, qty, variantId}

  const addToCart = (product, qty = 1) => {
    setCartItems(prev => {
      const found = prev.find(i => i.id === product.id)
      if (found) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i)
      return [...prev, { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        image: product.image, 
        qty,
        variantId: product.variantId // IMPORTANT: preserve variantId for checkout
      }]
    })
    setCartOpen(true)
  }

  const updateQty = (id, qty) => {
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
  }

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id))
  }

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0)

  const value = {
    cartOpen, setCartOpen,
    cartItems, addToCart, updateQty, removeItem,
    subtotal,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = React.useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
