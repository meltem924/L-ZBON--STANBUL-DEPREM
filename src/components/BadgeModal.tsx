import React from 'react';
import { Award, CheckCircle, X, Sparkles, MapPin, Compass, Layers, ShieldCheck, Printer } from 'lucide-react';
import { Badge } from '../types';

interface BadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  badges: Badge[];
}

export const BadgeModal: React.FC<BadgeModalProps> = ({ isOpen, onClose, badges }) => {
  if (!isOpen) return null;

  const unlockedCount = badges.filter(b => b.unlocked).length;
  const isAllUnlocked = unlockedCount === badges.length;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MapPin': return <MapPin className="w-6 h-6 text-sky-400" />;
      case 'Compass': return <Compass className="w-6 h-6 text-amber-400" />;
      case 'Layers': return <Layers className="w-6 h-6 text-emerald-400" />;
      case 'Award': return <Award className="w-6 h-6 text-rose-400" />;
      default: return <Sparkles className="w-6 h-6 text-amber-400" />;
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border-2 border-slate-300 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto text-slate-800">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-300 pb-4">
          <div>
            <div className="flex items-center gap-2 text-amber-900 text-xs font-bold uppercase tracking-wider mb-1 font-cinzel">
              <Award className="w-4 h-4 text-amber-600" /> Tarihsel Mühür ve Başarım Koleksiyonu
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-cinzel">
              Kazanılan Mühürler ({unlockedCount}/{badges.length})
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer border border-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {badges.map(badge => (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border-2 flex items-start gap-3.5 transition-all ${
                badge.unlocked
                  ? 'bg-amber-50/80 border-amber-400 text-slate-800 shadow-xs ring-1 ring-amber-400/40'
                  : 'bg-slate-50 border-slate-300 text-slate-400 opacity-70'
              }`}
            >
              <div className={`p-3 rounded-2xl shrink-0 ${badge.unlocked ? 'bg-white border-2 border-amber-300 shadow-xs' : 'bg-slate-100 border border-slate-200'}`}>
                {getIcon(badge.iconName)}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-sm font-cinzel text-slate-900">
                  <span>{badge.title}</span>
                  {badge.unlocked && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">{badge.description}</p>
                {badge.unlocked && (
                  <span className="inline-block text-[10px] font-bold text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-400 font-cinzel">
                    Mühürlendi
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-slate-300 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer border border-slate-300"
          >
            Kapat
          </button>
        </div>

      </div>
    </div>
  );
};
