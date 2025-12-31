import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const [policiesOpen, setPoliciesOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPoliciesOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <footer className="border-t border-white/10 mt-14 relative">
      <div className="container-page py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="text-sm tracking-[0.35em] uppercase">ZLFR</div>
            <div className="mt-1 text-sm tracking-[0.35em] uppercase text-white">Collection</div>
          </div>

          <div className="text-center">
            <div className="text-[10px] tracking-[0.35em] uppercase text-white/60">Follow our socials <span className="text-zlfr-gold">💚</span></div>
            <div className="mt-3 flex items-center justify-center gap-3 text-xs text-white/60">
              <a className="hover:text-white" href="https://www.instagram.com/zlfr.collection/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <span className="text-white/20">•</span>
              <a className="hover:text-white" href="https://www.tiktok.com/@zlfr.collection" target="_blank" rel="noopener noreferrer">TikTok</a>
            </div>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setPoliciesOpen(!policiesOpen)}
              className="text-xs text-white/50 hover:text-white"
            >
              Terms & Policies
            </button>
            {policiesOpen && (
              <div className="absolute bottom-full mb-2 right-0 bg-black/90 backdrop-blur border border-white/10 rounded p-4 min-w-[200px]">
                <Link to="/privacy" className="block text-xs text-white/80 hover:text-white mb-2">Privacy Policy</Link>
                <Link to="/terms" className="block text-xs text-white/80 hover:text-white mb-2">Terms of Service</Link>
                <Link to="/shipping" className="block text-xs text-white/80 hover:text-white mb-2">Shipping Policy</Link>
                <Link to="/returns" className="block text-xs text-white/80 hover:text-white mb-2">Refund Policy</Link>
                <Link to="/contact" className="block text-xs text-white/80 hover:text-white">Contact Information</Link>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-white/35">© {new Date().getFullYear()} ZLFR Collection</div>
      </div>

      {/* Scrolling Text */}
      <div className="overflow-hidden bg-black/50 py-2">
        <div className="animate-scroll whitespace-nowrap text-xs tracking-[0.35em] uppercase text-white/60">
          ZLFR.collection • ZLFR.collection • ZLFR.collection • ZLFR.collection • ZLFR.collection • ZLFR.collection • ZLFR.collection • ZLFR.collection • ZLFR.collection • ZLFR.collection • ZLFR.collection • ZLFR.collection • ZLFR.collection • ZLFR.collection • ZLFR.collection • ZLFR.collection • ZLFR.collection • ZLFR.collection • ZLFR.collection • ZLFR.collection • ZLFR.collection • ZLFR.collection • ZLFR.collection •
        </div>
      </div>
    </footer>
  )
}
