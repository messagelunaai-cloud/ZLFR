import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { products } from '@/data/products'
import { useStore } from '@/store'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find(p => p.id === id)
  const { addToCart } = useStore()
  const [qty, setQty] = React.useState(1)

  if (!product) {
    return (
      <div className="container-page py-16">
        <div className="text-sm text-white/70">Product not found.</div>
        <Link className="mt-4 inline-block text-xs text-zlfr-gold" to="/products">Back to products</Link>
      </div>
    )
  }

  return (
    <section className="py-14">
      <div className="container-page">
        <div className="text-xs text-white/50">
          <Link className="hover:text-white" to="/products">Products</Link> <span className="mx-2">/</span> {product.name}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="aspect-[4/5] bg-white/5 overflow-hidden">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>

          <div>
            <h1 className="text-3xl font-light">{product.name}</h1>
            <div className="mt-3 text-lg text-white/80">${product.price}</div>

            <p className="mt-6 text-sm leading-7 text-white/70">{product.desc}</p>

            <div className="mt-8 flex items-center gap-3">
              <label className="text-xs text-white/60">Qty</label>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e)=>setQty(Math.max(1, parseInt(e.target.value || '1', 10)))}
                className="w-20 bg-black/40 border border-white/10 px-3 py-2 outline-none text-sm"
              />
            </div>

            <button
              onClick={() => addToCart(product, qty)}
              className="mt-6 w-full md:w-auto px-8 py-3 border border-zlfr-gold/60 text-[11px] tracking-[0.3em] uppercase hover:bg-zlfr-gold hover:text-black transition"
            >
              Add to cart
            </button>

            <div className="mt-8 border-t border-white/10 pt-6 text-xs text-white/50">
              Free shipping on orders over $150 (placeholder).
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
