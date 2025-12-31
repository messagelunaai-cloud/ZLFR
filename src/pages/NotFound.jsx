import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Home, ShoppingBag, Search } from 'lucide-react'
import { useState } from 'react'

export default function NotFound({ onClose }) {
  const navigate = useNavigate()
  const [isExiting, setIsExiting] = useState(false)

  const handleNavigation = (path) => {
    setIsExiting(true)
    setTimeout(() => {
      if (onClose) {
        onClose()
      }
      navigate(path)
    }, 400)
  }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, type: 'spring', stiffness: 100 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-black/80 flex items-center justify-center px-4 py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isExiting ? "exit" : "visible"}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ duration: 0.4, ease: "easeIn" }}
        className="text-center max-w-2xl"
      >
        {/* Animated 404 */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-9xl font-bold text-zlfr-gold mb-4"
          >
            4💎4
          </motion.div>
        </motion.div>

        {/* Main Message */}
        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-light mb-4">
          Oops! This piece doesn't exist
        </motion.h1>

        {/* Funny Subtitle */}
        <motion.p variants={itemVariants} className="text-xl text-white/70 mb-8">
          Looks like you've stumbled upon a page that's <span className="text-zlfr-gold font-semibold">rarer than our rarest diamond</span>...
          <br />
          <span className="text-sm text-white/50 italic mt-2 block">And we don't sell those. 😅</span>
        </motion.p>

        {/* Funny Messages Carousel */}
        <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-white/60 italic"
          >
            <p>💭 "Is this a new collection we don't know about?"</p>
            <p className="mt-2 text-sm">— Our website, probably</p>
          </motion.div>
        </motion.div>

        {/* Additional Humor */}
        <motion.div variants={itemVariants} className="mb-12">
          <p className="text-white/50 mb-6">
            ✨ Pro tip: This page is 100% real, unlike your ex's excuses ✨
          </p>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            <p className="text-3xl">🔍</p>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={() => handleNavigation('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-zlfr-gold text-zlfr-ink rounded-lg font-medium hover:bg-zlfr-gold/90 transition-colors"
          >
            <Home className="w-5 h-5" />
            Back Home
          </motion.button>

          <motion.button
            onClick={() => handleNavigation('/products')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 border border-zlfr-gold text-zlfr-gold rounded-lg font-medium hover:bg-zlfr-gold/10 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            Find Real Pieces
          </motion.button>
        </motion.div>

        {/* Easter Egg */}
        <motion.div
          variants={itemVariants}
          className="mt-16 text-white/40 text-sm"
        >
          <p>Lost? Try <span className="text-zlfr-gold">/products</span>, <span className="text-zlfr-gold">/about</span>, or just refresh your life choices 🤷</p>
          <motion.p
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="mt-3 text-xs text-white/20"
          >
            (psst... if you found this page on purpose, you're either curious or very lost. Either way, welcome! 💎)
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  )
}
