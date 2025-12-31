import React from 'react'
import { motion } from 'framer-motion'

export default function BrandMeaning() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-16 border-t border-white/10"
    >
      <div className="container-page text-center">
        <h2 className="text-2xl font-light tracking-[0.24em] uppercase mb-6">The Legacy of Imam Ali</h2>
        <p className="text-sm text-white/80 max-w-2xl mx-auto leading-relaxed">
          The Zulfiqar represents strength, faith, and heritage. Forged in the legacy of Imam Ali, this iconic sword symbolizes courage, justice, and the enduring spirit of resilience. At ZLFR, we honor this tradition through timeless pieces that carry meaning and craftsmanship.
        </p>
      </div>
    </motion.section>
  )
}