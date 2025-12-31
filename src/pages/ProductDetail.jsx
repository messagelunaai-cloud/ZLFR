import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProduct, getProducts } from '@/lib/shopify'
import { useStore } from '@/store'
import { motion, AnimatePresence } from 'framer-motion'
import { Ruler, ShoppingCart, Check } from 'lucide-react'
import ImageGallery from '@/components/store/ImageGallery'
import TrustBadges from '@/components/store/TrustBadges'
import SizeGuide from '@/components/store/SizeGuide'
import Reviews from '@/components/store/Reviews'
import RelatedProducts from '@/components/store/RelatedProducts'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useStore()
  const [qty, setQty] = React.useState(1)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [showCartAnimation, setShowCartAnimation] = useState(false)

  useEffect(() => {
    async function loadProduct() {
      try {
        const [productData, allProductsData] = await Promise.all([
          getProduct(id),
          getProducts()
        ])
        console.log('Loaded product:', productData)
        console.log('Product has variantId?', !!productData?.variantId)
        setProduct(productData)
        setAllProducts(allProductsData)
      } catch (error) {
        console.error('Error loading product:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [id])

  if (loading) {
    return (
      <div className="container-page py-16">
        <div className="text-sm text-white/70">Loading...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container-page py-16">
        <div className="text-sm text-white/70">Product not found.</div>
        <Link className="mt-4 inline-block text-xs text-zlfr-gold" to="/products">Back to products</Link>
      </div>
    )
  }

  const productImages = product.images || [product.image];

  const handleAddToCart = () => {
    console.log('Adding to cart - product:', product)
    console.log('Adding to cart - variantId:', product.variantId)
    addToCart({ ...product, variantId: product.variantId }, qty)
    setAddedToCart(true)
    setShowCartAnimation(true)
    setTimeout(() => {
      setAddedToCart(false)
      setShowCartAnimation(false)
    }, 3000)
  };

  return (
    <>
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="text-sm text-white/50 mb-8">
            <Link className="hover:text-white transition-colors" to="/products">Products</Link> 
            <span className="mx-2">/</span> 
            {product.name}
          </div>

          {/* Product Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Image Gallery */}
            <ImageGallery images={productImages} productName={product.name} />

            {/* Product Info */}
            <div className="space-y-6">
              {product.collection && (
                <span className="text-sm text-zlfr-gold uppercase tracking-wider">
                  {product.collection}
                </span>
              )}
              
              <h1 className="text-4xl md:text-5xl font-light">{product.name}</h1>
              
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-light text-zlfr-gold">${product.price}</span>
                <span className="text-sm text-white/50">Free shipping</span>
              </div>

              <p className="text-white/70 leading-relaxed">{product.desc}</p>

              {/* Size Guide Link */}
              <button
                onClick={() => setShowSizeGuide(true)}
                className="flex items-center gap-2 text-sm text-zlfr-gold hover:text-zlfr-gold/80 transition-colors"
              >
                <Ruler className="w-4 h-4" />
                Care Guide
              </button>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <label className="text-sm text-white/60">Quantity</label>
                <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
                  <motion.button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-4 py-2 hover:bg-white/5 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9, backgroundColor: "rgba(200, 160, 74, 0.2)" }}
                    transition={{ duration: 0.15 }}
                  >
                    −
                  </motion.button>
                  <motion.span 
                    key={qty}
                    initial={{ scale: 1.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
                    className="px-6 py-2 border-x border-white/10"
                  >
                    {qty}
                  </motion.span>
                  <motion.button
                    onClick={() => setQty(qty + 1)}
                    className="px-4 py-2 hover:bg-white/5 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9, backgroundColor: "rgba(200, 160, 74, 0.2)" }}
                    transition={{ duration: 0.15 }}
                  >
                    +
                  </motion.button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="relative">
                <motion.button
                  onClick={handleAddToCart}
                  className={`w-full py-4 rounded-lg font-medium transition-all duration-500 ${
                    addedToCart 
                      ? 'bg-green-500 text-white' 
                      : 'bg-zlfr-gold text-zlfr-ink hover:bg-zlfr-gold/90'
                  }`}
                  whileHover={{ scale: addedToCart ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={addedToCart ? {
                    scale: [1, 1.05, 1],
                    transition: { duration: 0.3 }
                  } : {}}
                >
                  <AnimatePresence mode="wait">
                    {addedToCart ? (
                      <motion.span
                        key="added"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <Check className="w-5 h-5" />
                        Added to Cart!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Floating Success Animation */}
                <AnimatePresence>
                  {showCartAnimation && (
                    <motion.div
                      initial={{ opacity: 1, y: 0, scale: 1 }}
                      animate={{ 
                        opacity: 0, 
                        y: -100, 
                        scale: 0.5,
                        transition: { duration: 1, ease: "easeOut" }
                      }}
                      exit={{ opacity: 0 }}
                      className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
                    >
                      <div className="bg-zlfr-gold text-zlfr-ink px-6 py-3 rounded-full font-medium shadow-lg flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        +{qty}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Trust Badges */}
              <div className="pt-6">
                <TrustBadges variant="compact" />
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="border-t border-white/10 pt-12">
            <Reviews productId={product.id} />
          </div>
        </div>
      </section>

      {/* Related Products */}
      <RelatedProducts 
        currentProductId={product.id}
        collection={product.collection}
        allProducts={allProducts}
      />

      {/* Size Guide Modal */}
      <SizeGuide isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
    </>
  )
}
