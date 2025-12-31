import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="group block card-hover">
      <div className="aspect-[4/5] bg-white/5 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover opacity-95 group-hover:opacity-100 transition"
          loading="lazy"
        />
      </div>
      <div className="pt-4">
        <div className="text-[11px] tracking-[0.22em] uppercase">{product.name}</div>
        <div className="mt-1 text-[11px] text-white/60">${product.price}</div>
      </div>
    </Link>
  )
}
