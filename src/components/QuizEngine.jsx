import { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, HelpCircle, RefreshCw } from 'lucide-react';

export function QuizEngine({ quizzes }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const activeQuiz = quizzes[currentIndex];
  const optionLabels = ['A', 'B', 'C', 'D'];

  const handleSelect = (index) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === activeQuiz.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setCurrentIndex((prev) => prev + 1);
  };

  if (!activeQuiz) {
    return (
      <div className="w-full max-w-sm mx-auto text-center py-10 px-6 bg-[#F4EDE8] rounded-2xl border border-[#DDD5CD] shadow-md space-y-3">
        <h3 className="text-lg font-bold text-[#262322]">Quiz Complete!</h3>
        <p className="text-[#736C68] text-xs">
          You scored <span className="text-[#527358] font-bold">{score}</span> out of {quizzes.length}
        </p>
        <button
          onClick={() => {
            setCurrentIndex(0);
            setScore(0);
            setSelectedOption(null);
            setIsSubmitted(false);
          }}
          className="mt-4 px-5 py-2.5 bg-[#527358] hover:bg-[#415D46] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 mx-auto active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="flex justify-between items-center text-xs font-semibold px-1">
        <span className="text-[#736C68]">Question {currentIndex + 1} of {quizzes.length}</span>
        <span className="text-[#527358] bg-[#EBF0EC] px-3 py-1 rounded-full border border-[#A3B899]/50">
          Score: {score}
        </span>
      </div>

      <div className="p-7 bg-[#F4EDE8] border border-[#DDD5CD] rounded-2xl space-y-6 shadow-sm">
        <h3 className="text-sm font-bold text-[#262322] leading-relaxed">
          {activeQuiz.question}
        </h3>

        <div className="space-y-3">
          {activeQuiz.options.map((option, idx) => {
            let containerStyles = 'border-[#DDD5CD] bg-[#FBF8F5] text-[#363231] hover:bg-[#EFE7E0] hover:border-[#9E7B66]';
            let bubbleStyles = 'bg-[#EAE4DD] text-[#615B57] border-[#D0C7BC]';

            if (selectedOption === idx) {
              containerStyles = 'border-[#9E7B66] bg-[#F4EDE8] text-[#262322] ring-1 ring-[#9E7B66]';
              bubbleStyles = 'bg-[#9E7B66] text-white border-[#805C47]';
            }

            if (isSubmitted) {
              if (idx === activeQuiz.correctIndex) {
                containerStyles = 'border-[#527358] bg-[#EBF0EC] text-[#262322] ring-1 ring-[#527358]';
                bubbleStyles = 'bg-[#527358] text-white border-[#415D46]';
              } else if (selectedOption === idx) {
                containerStyles = 'border-[#C05621] bg-[#FEEBC8] text-[#7B341E] ring-1 ring-[#C05621]';
                bubbleStyles = 'bg-[#C05621] text-white border-[#9C4221]';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`group w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all duration-200 flex justify-between items-center gap-3 ${containerStyles}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-lg border text-[10px] font-bold flex items-center justify-center shrink-0 transition-all ${bubbleStyles}`}>
                    {optionLabels[idx] || idx + 1}
                  </span>
                  <span className="leading-relaxed">{option}</span>
                </div>
                
                {isSubmitted && idx === activeQuiz.correctIndex && (
                  <CheckCircle2 className="w-4 h-4 text-[#527358] shrink-0" />
                )}
                {isSubmitted && selectedOption === idx && idx !== activeQuiz.correctIndex && (
                  <XCircle className="w-4 h-4 text-[#C05621] shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {isSubmitted && (
          <div className="p-4 rounded-xl bg-[#EBF0EC] border border-[#A3B899]/60 text-xs text-[#262322] flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-[#527358] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#527358] block mb-0.5">Explanation:</span>
              {activeQuiz.explanation}
            </div>
          </div>
        )}

        <div className="flex justify-end pt-2">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#527358] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#415D46] text-white text-xs font-bold rounded-xl transition-all shadow-xs text-center"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#527358] hover:bg-[#415D46] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              Next Question <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}