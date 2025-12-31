import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'

export default function ProductCard({ product, onQuickView }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[4/5] bg-white/5 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            loading="lazy"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Quick View Button */}
          {onQuickView && (
            <motion.button
              onClick={(e) => {
                e.preventDefault()
                onQuickView()
              }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-white/90 text-zlfr-ink rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-4 h-4" />
              Quick View
            </motion.button>
          )}
        </div>

        {/* Product Info */}
        <div className="pt-4 space-y-1">
          {product.collection && (
            <div className="text-xs text-zlfr-gold uppercase tracking-wider opacity-70">
              {product.collection}
            </div>
          )}
          <div className="text-sm font-light group-hover:text-zlfr-gold transition-colors">
            {product.name}
          </div>
          <div className="text-sm text-white/60">${product.price}</div>
        </div>
      </Link>

      {/* Hover Shadow Effect */}
      <div className="absolute inset-0 -z-10 rounded-lg bg-zlfr-gold/0 group-hover:bg-zlfr-gold/5 blur-xl transition-all duration-300" />
    </motion.div>
  )
}
