import React from 'react';
import { BookOpen, Sparkles, Map, Layers, LayoutGrid, ArrowRight, Compass, ShieldCheck } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border-2 border-amber-400/80 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[92vh] overflow-y-auto text-slate-800 animate-fadeIn">
        
        {/* Module Header Badge & Title */}
        <div className="text-center space-y-2.5 border-b border-slate-300 pb-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-cinzel leading-tight space-y-1">
            <span className="block text-amber-700 tracking-wider">Sarsılan Başkentler</span>
            <span className="block text-slate-900 text-lg sm:text-2xl font-bold">1755 Lizbon ve 1766 İstanbul Depremleri</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-medium leading-relaxed">
            Afet Yönetimi, İdari Kararlar, Düşünsel Sarsıntılar ve Mimari Dönüşüm Karşılaştırmalı Analiz Etkinliği
          </p>
        </div>

        {/* Learning Outcome Box (Öğrenme Çıktısı) */}
        <div className="bg-amber-50/80 border-l-4 border-amber-500 p-5 rounded-2xl space-y-3 shadow-none border-t border-b border-r border-amber-300">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider font-cinzel">
            <BookOpen className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Öğrenme Çıktısı</span>
          </div>

          <div className="text-sm font-bold text-slate-900 font-cinzel leading-snug">
            TAR.11.1.3. 1755 Lizbon ve 1766 İstanbul depremlerini ortaya çıkardığı etkiler bakımından karşılaştırabilme
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="flex items-start gap-2 text-xs text-slate-800 font-medium leading-relaxed">
              <span className="font-bold text-amber-700 shrink-0">a)</span>
              <span>Lizbon ve İstanbul depremlerinin etkilerini belirler.</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-800 font-medium leading-relaxed">
              <span className="font-bold text-amber-700 shrink-0">b)</span>
              <span>Lizbon ve İstanbul depremlerinin etkilerinin benzerliklerini listeler.</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-800 font-medium leading-relaxed">
              <span className="font-bold text-amber-700 shrink-0">c)</span>
              <span>Lizbon ve İstanbul depremlerinin etkilerinin farklılıklarını listeler.</span>
            </div>
          </div>
        </div>

        {/* 3 Step Activity Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="bg-slate-50 p-3.5 rounded-2xl border-2 border-slate-300 space-y-1.5">
            <div className="flex items-center gap-2 text-sky-800 font-bold text-xs font-cinzel">
              <Map className="w-4 h-4 shrink-0" />
              <span>1. Etkileşimli Harita</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
              Sıcak noktalara tıklayarak deprem büyüklüklerini, tsunami etkisini ve arşiv belgelerini inceleyin.
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border-2 border-slate-300 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs font-cinzel">
              <Layers className="w-4 h-4 shrink-0" />
              <span>2. Görsel Analiz</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
              Tarihi gravürleri ve vakaları Sosyal, İdari, Mimari ve Ekonomik boyutlarda eşleştirin.
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border-2 border-slate-300 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-xs font-cinzel">
              <LayoutGrid className="w-4 h-4 shrink-0" />
              <span>3. Karşılaştırma</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
              Afet sonuçlarını Sadece Lizbon, Ortak Etkiler ve Sadece İstanbul sütunlarına yerleştirin.
            </p>
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-3 border-t border-slate-300 flex justify-center">
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold px-8 py-3.5 rounded-2xl transition-all text-sm cursor-pointer shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2.5 font-cinzel tracking-wide active:scale-95"
          >
            <span>Etkinliğe Başla</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>

      </div>
    </div>
  );
};
