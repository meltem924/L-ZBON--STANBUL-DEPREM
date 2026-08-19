import React from 'react';
import { CheckCircle, RotateCcw, XCircle } from 'lucide-react';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({ isOpen, onClose, onRestart }) => {
  if (!isOpen) return null;

  const handleCloseTab = () => {
    onClose();
    try {
      window.close();
      setTimeout(() => {
        window.open('', '_self', '');
        window.close();
      }, 100);
    } catch (e) {
      console.log('Tab close attempted.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border-2 border-emerald-500 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative text-slate-800 animate-fadeIn text-center">
        
        {/* Completion Icon */}
        <div className="inline-flex p-4 bg-emerald-50 text-emerald-600 border-2 border-emerald-300 rounded-full shadow-sm">
          <CheckCircle className="w-12 h-12 text-emerald-600" />
        </div>

        {/* Header & Message */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-cinzel tracking-wide">
            Etkinlik Tamamlandı
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto font-medium leading-relaxed">
            1755 Lizbon ve 1766 İstanbul depremlerinin etkilerini ve hangi başkente ait olduğunu başarıyla belirleyerek tüm aşamaları tamamladınız.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onRestart}
            className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3 rounded-2xl transition-all text-xs cursor-pointer border-2 border-slate-300 flex items-center justify-center gap-2 font-cinzel shadow-xs active:scale-95"
          >
            <RotateCcw className="w-4 h-4 text-slate-700" />
            <span>Etkinliği Yeniden Başlat</span>
          </button>

          <button
            onClick={handleCloseTab}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3 rounded-2xl transition-all text-xs cursor-pointer shadow-lg border border-amber-600 flex items-center justify-center gap-2 font-cinzel tracking-wide active:scale-95"
          >
            <XCircle className="w-4 h-4 text-slate-950" />
            <span>Etkinliği Kapat</span>
          </button>
        </div>

      </div>
    </div>
  );
};
