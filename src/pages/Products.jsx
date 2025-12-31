import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProducts } from '@/lib/shopify'
import ProductCard from '@/components/store/ProductCard'
import FilterBar from '@/components/store/FilterBar'
import { motion } from 'framer-motion'

export default function Products() {
  const [params, setParams] = useSearchParams()
  const collection = params.get('collection') || 'all'
  const sort = params.get('sort') || 'featured'
  const search = params.get('search') || ''
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [priceRange, setPriceRange] = useState([0, 1000])

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  const filtered = products.filter(p => {
    const matchesCollection = collection === 'all' ? true : p.collection === collection
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase())
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1]
    return matchesCollection && matchesSearch && matchesPrice
  })

  const sorted = [...filtered].sort((a,b) => {
    if (sort === 'price-low') return a.price - b.price
    if (sort === 'price-high') return b.price - a.price
    if (sort === 'name') return a.name.localeCompare(b.name)
    return 0
  })

  const set = (k,v) => {
    const next = new URLSearchParams(params)
    if (!v || v === 'all') next.delete(k)
    else next.set(k,v)
    setParams(next, { replace: true })
  }

  const handleFilterChange = (filters) => {
    setPriceRange(filters.priceRange)
    const next = new URLSearchParams(params)
    
    if (filters.sortBy && filters.sortBy !== 'featured') {
      next.set('sort', filters.sortBy)
    } else {
      next.delete('sort')
    }
    
    if (filters.collection && filters.collection !== 'all') {
      next.set('collection', filters.collection)
    } else {
      next.delete('collection')
    }
    
    setParams(next, { replace: true })
  }

  if (loading) {
    return (
      <section className="py-14">
        <div className="container-page">
          <motion.div 
            className="text-center py-20 text-white/60"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="text-lg">Loading products...</div>
            <div className="mt-4 flex justify-center gap-2">
              <motion.div 
                className="w-2 h-2 rounded-full bg-zlfr-gold"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, delay: 0 }}
              />
              <motion.div 
                className="w-2 h-2 rounded-full bg-zlfr-gold"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <motion.div 
                className="w-2 h-2 rounded-full bg-zlfr-gold"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-14">
      <motion.div 
        className="max-w-7xl mx-auto px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div 
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div>
            <h2 className="text-4xl font-light">Products</h2>
            <div className="mt-2 text-sm text-white/60">{sorted.length} items</div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e)=>set('search', e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-zlfr-gold transition-colors"
            />
            <FilterBar onFilterChange={handleFilterChange} products={products} />
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {sorted.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
