import { Shield, Truck, RotateCcw, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustBadges = ({ variant = 'horizontal' }) => {
  const badges = [
    {
      icon: Shield,
      title: 'Authenticity Guaranteed',
      description: '100% genuine jewelry'
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over $100'
    },
    {
      icon: RotateCcw,
      title: '30-Day Returns',
      description: 'Money-back guarantee'
    },
    {
      icon: Lock,
      title: 'Secure Checkout',
      description: 'SSL encrypted payment'
    }
  ];

  if (variant === 'compact') {
    return (
      <div className="flex items-center justify-center gap-8 py-4 px-6 bg-white/5 rounded-lg">
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2"
          >
            <badge.icon className="w-5 h-5 text-zlfr-gold" />
            <span className="text-sm">{badge.title}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid ${variant === 'grid' ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'} gap-6`}>
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center text-center p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
        >
          <div className="w-12 h-12 bg-zlfr-gold/10 rounded-full flex items-center justify-center mb-3">
            <badge.icon className="w-6 h-6 text-zlfr-gold" />
          </div>
          <h4 className="font-medium mb-1">{badge.title}</h4>
          <p className="text-sm text-white/60">{badge.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default TrustBadges;
