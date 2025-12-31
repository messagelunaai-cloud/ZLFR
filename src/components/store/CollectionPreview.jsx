import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { collections } from '@/data/products'

export default function CollectionPreview() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-16 border-t border-white/10"
    >
      <div className="container-page">
        <div className="text-center text-[10px] tracking-[0.35em] uppercase text-white/80">Collections</div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map(c => (
            <Link
              key={c.id}
              to={`/products?collection=${c.id}`}
              className="relative aspect-[4/3] overflow-hidden border border-white/10 card-hover"
            >
              <img src={c.hero} alt={c.name} className="absolute inset-0 h-full w-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-black/35" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[11px] tracking-[0.35em] uppercase">{c.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
