import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, CheckCircle, Clock, Sparkles, RefreshCw } from 'lucide-react';

export function FlashcardDeck({ cards }) {
  const [deck, setDeck] = useState(cards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const activeCard = deck[currentIndex];

  const handleStatusChange = (status) => {
    if (!activeCard) return;
    const updatedDeck = [...deck];
    updatedDeck[currentIndex].status = status;
    setDeck(updatedDeck);
    setIsFlipped(false);

    if (currentIndex < deck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(deck.length);
    }
  };

  const masteredCount = deck.filter((c) => c.status === 'mastered').length;

  return (
    <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#262322] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#9E7B66]" /> Active Flashcard Deck
          </h2>
          <p className="text-xs text-[#736C68]">Click card to reveal full answer</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-medium text-[#736C68]">Progress</span>
          <p className="text-xs sm:text-sm font-bold text-[#527358]">
            {masteredCount} / {deck.length} Mastered
          </p>
        </div>
      </div>

      <div className="relative h-64 sm:h-72 w-full perspective-1000">
        <AnimatePresence mode="wait">
          {activeCard ? (
            <motion.div
              key={activeCard.id + (isFlipped ? '-back' : '-front')}
              initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsFlipped(!isFlipped)}
              className="absolute inset-0 w-full h-full cursor-pointer"
            >
              <div className="w-full h-full rounded-2xl p-6 sm:p-7 bg-[#F4EDE8] border border-[#DDD5CD] shadow-lg flex flex-col justify-between hover:border-[#9E7B66] transition-colors">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#9E7B66]/15 text-[#805C47] border border-[#9E7B66]/20">
                    {activeCard.category}
                  </span>
                  <span className="text-xs text-[#736C68] flex items-center gap-1 hover:text-[#262322] transition-colors">
                    <RotateCw className="w-3 h-3" /> Flip
                  </span>
                </div>

                <div className="text-center my-auto px-2 sm:px-4">
                  <h3 className="text-base sm:text-lg font-semibold text-[#262322] leading-relaxed">
                    {isFlipped ? activeCard.answer : activeCard.question}
                  </h3>
                </div>

                <div className="text-center">
                  <span className="text-xs text-[#9E7B66] uppercase tracking-widest font-bold">
                    {isFlipped ? 'Answer' : 'Question'}
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="w-full h-full rounded-2xl p-6 bg-[#F4EDE8] border border-[#DDD5CD] flex flex-col items-center justify-center text-[#262322] space-y-4 shadow-md">
              <CheckCircle className="w-12 h-12 text-[#527358]" />
              <p className="text-lg font-bold">Deck Completed!</p>
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#527358] hover:bg-[#415D46] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Restart Deck
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>

      {activeCard && (
        <div className="flex gap-3 sm:gap-4">
          <button
            onClick={() => handleStatusChange('review')}
            className="flex-1 py-3 px-3 sm:px-4 rounded-xl bg-[#F3EFEA] border border-[#DDD5CD] text-[#805C47] hover:bg-[#EFE7E0] hover:border-[#9E7B66] font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <Clock className="w-4 h-4" /> Review Later
          </button>
          <button
            onClick={() => handleStatusChange('mastered')}
            className="flex-1 py-3 px-3 sm:px-4 rounded-xl bg-[#527358] hover:bg-[#415D46] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
          >
            <CheckCircle className="w-4 h-4" /> Mastered
          </button>
        </div>
      )}
    </div>
  );
}
    
