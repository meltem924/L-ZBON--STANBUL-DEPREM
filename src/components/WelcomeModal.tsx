import React from 'react';
import { Map, Layers, LayoutGrid, ArrowRight } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
      <div className="bg-white border-2 border-amber-400/80 rounded-3xl max-w-5xl w-full p-6 sm:p-10 md:p-12 shadow-2xl space-y-8 relative max-h-[92vh] overflow-y-auto text-slate-800 animate-fadeIn">

        {/* Module Header Badge & Title */}
        <div className="text-center space-y-3 border-b border-slate-300 pb-6">
          <h2 className="font-extrabold font-cinzel leading-tight space-y-2">
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-amber-700 tracking-wider font-black">
              Sarsılan Başkentler
            </span>
            <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl text-slate-900 font-bold">
              1755 Lizbon ve 1766 İstanbul Depremleri
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed pt-1">
            Afet Yönetimi, İdari Kararlar, Düşünsel Sarsıntılar ve Mimari Dönüşüm Karşılaştırmalı Analiz Etkinliği
          </p>
        </div>

        {/* 3 Step Activity Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border-2 border-slate-300 space-y-2.5 shadow-2xs hover:border-sky-300 transition-colors">
            <div className="flex items-center gap-2.5 text-sky-800 font-bold text-sm sm:text-base md:text-lg font-cinzel">
              <Map className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-sky-600" />
              <span>1. Etkileşimli Harita</span>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed font-medium">
              Noktalara tıklayarak deprem büyüklüklerini, tsunami etkisini ve arşiv belgelerini inceleyiniz.
            </p>
          </div>

          <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border-2 border-slate-300 space-y-2.5 shadow-2xs hover:border-emerald-300 transition-colors">
            <div className="flex items-center gap-2.5 text-emerald-800 font-bold text-sm sm:text-base md:text-lg font-cinzel">
              <Layers className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-emerald-600" />
              <span>2. Görsel Analiz</span>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed font-medium">
              Tarihi gravürleri ve vakaları Sosyal, İdari, Mimari ve Ekonomik boyutlarda eşleştiriniz.
            </p>
          </div>

          <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border-2 border-slate-300 space-y-2.5 shadow-2xs hover:border-amber-300 transition-colors">
            <div className="flex items-center gap-2.5 text-amber-800 font-bold text-sm sm:text-base md:text-lg font-cinzel">
              <LayoutGrid className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-amber-600" />
              <span>3. Karşılaştırma</span>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed font-medium">
              Afet sonuçlarını Sadece Lizbon, Ortak Etkiler ve Sadece İstanbul sütunlarına yerleştiriniz.
            </p>
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-4 border-t border-slate-300 flex justify-center">
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold px-10 py-4 sm:px-12 sm:py-4.5 rounded-2xl transition-all text-base sm:text-lg md:text-xl cursor-pointer shadow-lg shadow-amber-500/20 flex items-center justify-center gap-3 font-cinzel tracking-wide active:scale-95 border-2 border-amber-600/60"
          >
            <span>Etkinliğe Başla</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950" />
          </button>
        </div>

      </div>
    </div>
  );
};
