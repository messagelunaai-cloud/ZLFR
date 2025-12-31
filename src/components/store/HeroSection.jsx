import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[72vh] flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.62),rgba(0,0,0,.62)), url('https://i.imgur.com/Td4ND3U.jpg')",
        }}
      />
      <div className="relative container-page text-center py-20">
        <h1 className="text-5xl md:text-7xl font-light tracking-[0.24em] uppercase">ZLFR</h1>
        <p className="mt-6 text-[11px] md:text-xs tracking-[0.35em] uppercase text-zlfr-gold">
          Forged in legacy. Worn with meaning.
        </p>

        <div className="mt-10 flex items-center justify-center">
          <Link
            to="/products"
            className="px-8 py-3 border border-zlfr-gold/60 text-[11px] tracking-[0.3em] uppercase hover:bg-zlfr-gold hover:text-black transition"
          >
            Shop Collection
          </Link>
        </div>
      </div>
    </motion.section>
  )
}
