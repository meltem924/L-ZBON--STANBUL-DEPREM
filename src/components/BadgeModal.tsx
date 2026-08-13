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
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#252d37] border border-[#3d4959] rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto text-slate-100">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-[#3d4959] pb-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1 font-cinzel">
              <Award className="w-4 h-4 text-amber-400" /> Tarihsel Mühür ve Başarım Koleksiyonu
            </div>
            <h3 className="text-xl font-bold text-slate-100 font-cinzel">
              Keşif Mühürlerin ({unlockedCount}/{badges.length})
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 bg-[#1e242b] hover:bg-[#313b48] rounded-xl transition-colors cursor-pointer border border-[#3d4959]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {badges.map(badge => (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border flex items-start gap-3.5 transition-all ${
                badge.unlocked
                  ? 'bg-[#1e2733] border-amber-400/60 text-slate-100 shadow-md ring-1 ring-amber-400/30'
                  : 'bg-[#1a2027] border-[#374352] text-slate-500 opacity-60'
              }`}
            >
              <div className={`p-3 rounded-2xl shrink-0 ${badge.unlocked ? 'bg-[#283240] border border-amber-400/50 shadow-inner' : 'bg-[#171d24]'}`}>
                {getIcon(badge.iconName)}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-sm font-cinzel text-slate-100">
                  <span>{badge.title}</span>
                  {badge.unlocked && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">{badge.description}</p>
                {badge.unlocked && (
                  <span className="inline-block text-[10px] font-bold text-emerald-300 bg-emerald-950/90 px-2.5 py-0.5 rounded-full border border-emerald-700/60 font-cinzel">
                    Mühürlendi
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-[#3d4959] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#3d4959] hover:bg-[#4b586a] text-slate-100 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Kapat
          </button>
        </div>

      </div>
    </div>
  );
};
