import React from 'react'
import { motion } from 'framer-motion'
import { products } from '@/data/products'
import ProductCard from './ProductCard'

export default function FeaturedProducts() {
  const featured = products.slice(0, 4)

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-16"
    >
      <div className="container-page">
        <div className="text-center text-[10px] tracking-[0.35em] uppercase text-white/80">Featured</div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {featured.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}
