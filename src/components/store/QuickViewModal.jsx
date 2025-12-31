import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store';

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useStore();

  if (!product) return null;

  // Disable scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleAddToCart = () => {
    addToCart(product);
    // Optional: Show success message or auto-close
    setTimeout(() => onClose(), 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -50 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-zlfr-ink border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden max-h-[85vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="grid md:grid-cols-2 h-full max-h-[85vh] overflow-y-auto">
              {/* Image */}
              <div className="aspect-square md:aspect-auto bg-white/5 p-8 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Details */}
              <div className="p-8 flex flex-col overflow-y-auto max-h-[85vh]">
                {/* Product Info */}
                <div className="flex-1">
                  {product.collection && (
                    <span className="text-sm text-zlfr-gold uppercase tracking-wider">
                      {product.collection}
                    </span>
                  )}
                  <h2 className="text-2xl md:text-3xl font-light mt-2 mb-4">
                    {product.name}
                  </h2>
                  <p className="text-3xl font-light text-zlfr-gold mb-6">
                    ${product.price}
                  </p>
                  
                  {product.description && (
                    <p className="text-white/70 leading-relaxed mb-6">
                      {product.description}
                    </p>
                  )}

                  {/* Features */}
                  {product.features && product.features.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm uppercase tracking-wider text-white/60 mb-2">
                        Features
                      </h4>
                      <ul className="space-y-2">
                        {product.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="text-sm text-white/70 flex items-center gap-2">
                            <span className="w-1 h-1 bg-zlfr-gold rounded-full"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-3 mt-6">
                  <motion.button
                    onClick={handleAddToCart}
                    className="w-full bg-zlfr-gold text-zlfr-ink py-4 rounded-lg font-medium hover:bg-zlfr-gold/90 transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </motion.button>
                  
                  <Link
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="block w-full text-center py-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    View Full Details
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
