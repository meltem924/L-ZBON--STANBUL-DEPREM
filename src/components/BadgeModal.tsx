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
              TAR.11.1.3 Keşif Mühürlerin ({unlockedCount}/{badges.length})
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

        {/* Certificate Display when all unlocked */}
        {isAllUnlocked && (
          <div className="bg-gradient-to-br from-[#3b2a1a] via-[#212933] to-[#182924] border-2 border-amber-400/80 p-6 rounded-3xl text-center space-y-3 shadow-xl relative overflow-hidden">
            <div className="inline-flex p-3 bg-amber-500 text-slate-950 rounded-2xl mb-1 shadow-md border border-amber-300">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-extrabold text-amber-300 font-cinzel">
              TAR.11.1.3 MÜKEMMEL TARİHSEL ANALİZ SERTİFİKASI
            </h4>
            <p className="text-xs text-slate-200 max-w-lg mx-auto leading-relaxed font-serif font-medium">
              1755 Lizbon ve 1766 İstanbul depremlerinin ortaya çıkardığı etkileri, benzerlikleri ve farklılıkları eksiksiz karşılaştırarak müfredat öğrenme çıktısını üstün başarıyla tamamladın.
            </p>

            <button
              onClick={handlePrintCertificate}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition-all text-xs cursor-pointer shadow-md mt-2 font-cinzel border border-amber-300/40"
            >
              <Printer className="w-4 h-4" />
              <span>Sertifikayı Yazdır / Yazdırılabilir Sürüm</span>
            </button>
          </div>
        )}

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
