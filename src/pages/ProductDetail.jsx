import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProduct, getProducts } from '@/lib/shopify'
import { useStore } from '@/store'
import { motion } from 'framer-motion'
import { Ruler } from 'lucide-react'
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
    setTimeout(() => setAddedToCart(false), 2000)
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
                <div className="flex items-center border border-white/10 rounded-lg">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-4 py-2 hover:bg-white/5 transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 border-x border-white/10">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-4 py-2 hover:bg-white/5 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                onClick={handleAddToCart}
                className="w-full bg-zlfr-gold text-zlfr-ink py-4 rounded-lg font-medium hover:bg-zlfr-gold/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
              </motion.button>

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
