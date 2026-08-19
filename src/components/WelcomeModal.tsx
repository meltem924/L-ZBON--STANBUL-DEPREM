import React from 'react';
import { ArrowRight } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white border-2 border-amber-400/80 rounded-3xl max-w-2xl w-full p-8 sm:p-10 md:p-12 shadow-2xl space-y-8 relative text-slate-800 animate-fadeIn text-center">

        {/* Module Header Badge & Title */}
        <div className="space-y-3">
          <h2 className="font-extrabold font-cinzel leading-tight space-y-2">
            <span className="block text-2xl sm:text-3xl md:text-4xl text-amber-700 tracking-wider font-black">
              Sarsılan Başkentler
            </span>
            <span className="block text-xl sm:text-2xl md:text-3xl text-slate-900 font-bold">
              1755 Lizbon ve 1766 İstanbul Depremleri
            </span>
          </h2>
        </div>

        {/* General Single Instruction */}
        <div className="bg-slate-50 border-2 border-slate-300 p-6 sm:p-7 rounded-2xl shadow-2xs">
          <p className="text-base sm:text-lg md:text-xl text-slate-700 font-medium leading-relaxed">
            Etkinlikteki aşamaları sırasıyla takip ederek 1755 Lizbon ve 1766 İstanbul depremlerinin ortaya çıkardığı etkileri inceleyip karşılaştırınız.
          </p>
        </div>

        {/* Start Button */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold px-12 py-4 sm:px-14 sm:py-4.5 rounded-2xl transition-all text-base sm:text-lg cursor-pointer shadow-lg shadow-amber-500/20 flex items-center justify-center gap-3 font-cinzel tracking-wide active:scale-95 border-2 border-amber-600/60"
          >
            <span>Etkinliğe Başla</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950" />
          </button>
        </div>

      </div>
    </div>
  );
};
