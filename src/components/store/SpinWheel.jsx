import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Gift } from 'lucide-react';
import { useState, useEffect } from 'react';

const SpinWheel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [showPrize, setShowPrize] = useState(false);

  // Wheel segments - decorative fakes are present but never chosen
  const segments = [
    { id: 1, label: '5% OFF', color: '#C9A961' },          // index 0 (real)
    { id: 2, label: 'FREE SHIPPING', color: '#1F1F1F' },   // index 1 (fake)
    { id: 3, label: '10% OFF', color: '#C9A961' },         // index 2 (real)
    { id: 4, label: 'FREE PRODUCT', color: '#1F1F1F' },    // index 3 (fake)
    { id: 5, label: '15% OFF', color: '#C9A961' },         // index 4 (real)
    { id: 6, label: '50% OFF', color: '#1F1F1F' },         // index 5 (fake)
    { id: 7, label: '10% OFF', color: '#C9A961' },         // index 6 (real duplicate visual)
    { id: 8, label: 'TRY AGAIN', color: '#1F1F1F' },       // index 7 (try again)
  ];

  // Allowed outcomes map to specific segment indices so visuals and codes always match
  const outcomes = [
    { label: '5% OFF', code: 'SPIN5', discount: 5, segmentIndex: 0 },
    { label: '10% OFF', code: 'SPIN10', discount: 10, segmentIndex: 2 },
    { label: '15% OFF', code: 'SPIN15', discount: 15, segmentIndex: 4 },
    { label: 'TRY AGAIN', code: null, discount: null, segmentIndex: 7, isTryAgain: true },
  ];

  const segmentAngle = 360 / segments.length;

  useEffect(() => {
    // TODO: Re-enable localStorage check after testing
    // const hasSpun = localStorage.getItem('hasSpunWheel');
    // if (!hasSpun) {
      // Show popup after 2 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    // }
  }, []);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowPrize(false);

    // Allowed outcomes: 5%, 10%, 15%, or Try Again only (mapped to fixed segment indices)
    const winner = outcomes[Math.floor(Math.random() * outcomes.length)];
    const winnerIndex = winner.segmentIndex;
    
    console.log('Winner:', winner.label, 'at index:', winnerIndex);
    
    // Calculate rotation to land the winner at the top pointer
    // Segments start at 0deg (right) and run clockwise. Pointer is at top (-90deg).
    const spins = 5 + Math.random() * 2; // 5-7 full rotations
    const segmentStartAngle = (winnerIndex * segmentAngle);
    const segmentCenterAngle = segmentStartAngle + (segmentAngle / 2);

    // We need segmentCenterAngle to align to -90deg (top).
    // rotationNeeded + segmentCenterAngle = -90deg  => rotationNeeded = -90 - segmentCenterAngle
    let rotationNeeded = -90 - segmentCenterAngle;
    rotationNeeded = ((rotationNeeded % 360) + 360) % 360; // normalize to 0..359

    const totalRotation = (360 * spins) + rotationNeeded;

    console.log('Segment center angle:', segmentCenterAngle, 'Rotation needed:', rotationNeeded);

    setRotation(rotation + totalRotation);

    // Show prize after spin completes (6s spin + 0.5s settle)
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedPrize(winner);
      setShowPrize(true);
      localStorage.setItem('hasSpunWheel', 'true');
    }, 6500);
  };

  const copyCode = () => {
    if (!selectedPrize || !selectedPrize.code) return;
    navigator.clipboard.writeText(selectedPrize.code);
    alert('Coupon code copied!');
  };

  const closeModal = () => {
    setIsOpen(false);
    localStorage.setItem('hasSpunWheel', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl max-w-lg w-full p-8 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-zlfr-gold rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-zlfr-gold rounded-full blur-3xl" />
            </div>

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {!showPrize ? (
              <div className="relative text-center">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="mb-6"
                >
                  <Gift className="w-12 h-12 text-zlfr-gold mx-auto mb-3" />
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Spin The Wheel For A Lucky Discount! 🎡
                  </h2>
                  <p className="text-white/70">
                    First-time visitors get a special treat!
                  </p>
                </motion.div>

                {/* Wheel Container */}
                <div className="relative w-80 h-80 mx-auto mb-6">
                  {/* Pointer */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
                    <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-zlfr-gold drop-shadow-lg" />
                  </div>

                  {/* Wheel */}
                  <motion.div
                    className="w-full h-full rounded-full relative shadow-2xl border-4 border-white/20"
                    animate={{
                      rotate: rotation,
                    }}
                    transition={{
                      duration: 6,
                      ease: [0.17, 0.67, 0.12, 0.99],
                    }}
                  >
                    {/* Segments using conic gradient background */}
                    <svg className="w-full h-full" viewBox="0 0 200 200">
                      {segments.map((segment, index) => {
                        const startAngle = (index * segmentAngle);
                        const endAngle = startAngle + segmentAngle;
                        const startRad = (startAngle * Math.PI) / 180;
                        const endRad = (endAngle * Math.PI) / 180;
                        
                        const x1 = 100 + 100 * Math.cos(startRad);
                        const y1 = 100 + 100 * Math.sin(startRad);
                        const x2 = 100 + 100 * Math.cos(endRad);
                        const y2 = 100 + 100 * Math.sin(endRad);
                        
                        const midAngle = startAngle + segmentAngle / 2;
                        const midRad = (midAngle * Math.PI) / 180;
                        const textX = 100 + 60 * Math.cos(midRad);
                        const textY = 100 + 60 * Math.sin(midRad);
                        
                        return (
                          <g key={segment.id}>
                            <path
                              d={`M 100 100 L ${x1} ${y1} A 100 100 0 0 1 ${x2} ${y2} Z`}
                              fill={segment.color}
                              stroke="white"
                              strokeWidth="1"
                            />
                            <text
                              x={textX}
                              y={textY}
                              fill="white"
                              fontSize="10"
                              fontWeight="bold"
                              textAnchor="middle"
                              dominantBaseline="middle"
                              transform={`rotate(${midAngle}, ${textX}, ${textY})`}
                            >
                              {segment.label}
                            </text>
                          </g>
                        );
                      })}
                    </svg>

                    {/* Center circle */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-zlfr-gold" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={spinWheel}
                  disabled={isSpinning}
                  className={`w-full bg-gradient-to-r from-zlfr-gold to-yellow-600 text-black font-bold py-4 rounded-xl transition-all ${
                    isSpinning ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
                  }`}
                >
                  {isSpinning ? 'SPINNING...' : 'SPIN THE WHEEL!'}
                </motion.button>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center relative"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="mb-4"
                >
                  <Gift className="w-16 h-16 text-zlfr-gold mx-auto" />
                </motion.div>

                {selectedPrize.isReal === 'tryAgain' ? (
                  <>
                    <h3 className="text-4xl font-bold text-white mb-2">
                      Try Again! 😊
                    </h3>
                    
                    <p className="text-white/70 mb-6">
                      Better luck next time!
                    </p>

                    <div className="bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl p-6 mb-6">
                      <div className="text-2xl font-bold mb-2">
                        Don't worry!
                      </div>
                      <p className="text-sm opacity-90">
                        Check out our amazing collection anyway and enjoy our quality jewelry.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setShowPrize(false);
                          setSelectedPrize(null);
                          spinWheel();
                        }}
                        disabled={isSpinning}
                        className={`w-full bg-white text-black font-bold py-3 rounded-xl transition-all ${isSpinning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/90'}`}
                      >
                        Spin Again
                      </motion.button>

                      <button
                        onClick={closeModal}
                        className="w-full text-white/60 hover:text-white font-semibold py-2 transition-colors"
                      >
                        Start Shopping
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-4xl font-bold text-white mb-2">
                      🎉 Congratulations! 🎉
                    </h3>
                    
                    <p className="text-white/70 mb-6">
                      You won
                    </p>

                    <div className="bg-gradient-to-r from-zlfr-gold to-yellow-600 text-black rounded-xl p-6 mb-6">
                      <div className="text-5xl font-bold mb-2">
                        {selectedPrize.label}
                      </div>
                      <div className="text-sm font-semibold mb-3">
                        Use code at checkout:
                      </div>
                      <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-3 text-2xl font-mono font-bold tracking-wider">
                        {selectedPrize.code}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={copyCode}
                        className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-white/90 transition-all"
                      >
                        COPY CODE
                      </motion.button>

                      <button
                        onClick={closeModal}
                        className="w-full text-white/60 hover:text-white font-semibold py-2 transition-colors"
                      >
                        Start Shopping →
                      </button>
                    </div>

                    <p className="text-xs text-white/40 mt-4">
                      * Code valid on your first purchase
                    </p>
                  </>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpinWheel;
