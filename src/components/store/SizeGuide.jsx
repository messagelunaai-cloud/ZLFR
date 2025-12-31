import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Droplet, Sun, Trash2, Sparkles, Wind } from 'lucide-react';

const SizeGuide = ({ isOpen, onClose }) => {
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

  const careInstructions = [
    {
      icon: Droplet,
      title: 'Avoid Water & Moisture',
      description: 'Remove your necklace before showering, swimming, or washing hands. Water can cause tarnishing and damage the plating.'
    },
    {
      icon: Sun,
      title: 'Store Properly',
      description: 'Keep in a cool, dry place away from direct sunlight. Use an airtight pouch or jewelry box to prevent oxidation.'
    },
    {
      icon: Heart,
      title: 'Handle with Care',
      description: 'Put your necklace on last when getting dressed and remove it first. Avoid pulling or tugging on the chain.'
    },
    {
      icon: Trash2,
      title: 'Avoid Chemicals',
      description: 'Keep away from perfumes, lotions, and harsh cleaning products. These can damage silver and strip gold plating.'
    },
    {
      icon: Sparkles,
      title: 'Regular Cleaning',
      description: 'Gently wipe with a soft, dry cloth after each wear. For deep cleaning, use a silver polish cloth or mild soap with lukewarm water.'
    },
    {
      icon: Wind,
      title: 'Air Dry Completely',
      description: 'Always pat dry thoroughly with a soft cloth and let air dry completely before storing away.'
    }
  ];

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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed left-1/2 top-10 -translate-x-1/2 w-full max-w-3xl bg-zlfr-ink border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-zlfr-gold" />
                <h2 className="text-2xl font-light">Care Guide</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[90vh] overflow-y-auto">
              {/* Material Info */}
              <div className="mb-8 p-4 bg-white/5 rounded-lg border border-white/10">
                <h3 className="text-lg font-medium mb-3">Our Necklaces</h3>
                <div className="space-y-3 text-sm text-white/70">
                  <p><span className="text-zlfr-gold font-medium">Pure Silver:</span> Solid sterling silver or fine silver. May develop a natural patina over time, which adds character and vintage appeal.</p>
                  <p><span className="text-zlfr-gold font-medium">Gold Plated:</span> Premium base metal with a layer of gold plating. Requires gentle care to preserve the plating.</p>
                </div>
              </div>

              {/* Care Instructions */}
              <div>
                <h3 className="text-xl font-light mb-4">Care Instructions</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {careInstructions.map((instruction, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-white/5 rounded-lg"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-zlfr-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <instruction.icon className="w-5 h-5 text-zlfr-gold" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">{instruction.title}</h4>
                          <p className="text-sm text-white/60">{instruction.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-zlfr-gold/10 border border-zlfr-gold/20 rounded-lg">
                  <p className="text-sm">
                    <strong className="text-zlfr-gold">Pro Tip:</strong> With proper care, your necklace will last a lifetime. Silver develops a beautiful patina that adds to its character and vintage appeal. Gold-plated pieces should be stored separately to prevent scratching and contact with other metals.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SizeGuide;
