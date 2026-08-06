import React, { useState } from 'react';
import { MapPin, Info, Layers, Eye, Compass, Quote, Sparkles, X, ChevronRight, Waves, Flame, Building2 } from 'lucide-react';
import { Hotspot } from '../types';
import { HOTSPOTS } from '../data/earthquakeData';
import confetti from 'canvas-confetti';

interface InteractiveMapProps {
  onUnlockBadge: (badgeId: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onUnlockBadge }) => {
  const [filter, setFilter] = useState<'all' | 'lisbon' | 'istanbul'>('all');
  const [showFaults, setShowFaults] = useState<boolean>(true);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [visitedHotspotIds, setVisitedHotspotIds] = useState<string[]>([]);

  const filteredHotspots = HOTSPOTS.filter(h => {
    if (filter === 'lisbon') return h.city === 'lisbon';
    if (filter === 'istanbul') return h.city === 'istanbul';
    return true;
  });

  const handleSelectHotspot = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot);
    if (!visitedHotspotIds.includes(hotspot.id)) {
      const updated = [...visitedHotspotIds, hotspot.id];
      setVisitedHotspotIds(updated);
      
      // If all hotspots visited, unlock badge
      if (updated.length >= HOTSPOTS.length) {
        onUnlockBadge('badge-map');
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const isAllVisited = visitedHotspotIds.length >= HOTSPOTS.length;

  return (
    <div className="space-y-6">

      {/* 1. Bölüm Mühür İlerleme Çubuğu */}
      <div className="bg-[#28303a] border border-[#3d4959] p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${isAllVisited ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'}`}>
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider font-cinzel">
              1. Bölüm Mühür Şartı (Keşif Mührü)
            </h4>
            <p className="text-xs text-slate-300 font-medium mt-0.5">
              {isAllVisited
                ? '✓ Haritadaki tüm sıcak noktalar incelendi ve 1. Bölüm Mührü kazanıldı!'
                : 'Mührün açılması için haritadaki 9 sıcak noktanın tamamına tıklayıp incelemeniz gerekmektedir.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-[#1e242b] px-4 py-2 rounded-2xl border border-[#3d4959] shrink-0">
          <span className="text-xs font-bold text-slate-300 font-mono">
            İncelenen: <span className={isAllVisited ? 'text-emerald-400' : 'text-amber-400'}>{visitedHotspotIds.length}</span> / {HOTSPOTS.length}
          </span>
          <div className="w-20 bg-[#12171e] h-2.5 rounded-full overflow-hidden border border-[#3d4959]">
            <div
              className={`h-full transition-all duration-300 ${isAllVisited ? 'bg-emerald-400' : 'bg-amber-400'}`}
              style={{ width: `${(visitedHotspotIds.length / HOTSPOTS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Interactive Map Visual Stage Card */}
      <div className="relative bg-[#181d23] border-2 border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl min-h-[540px] flex flex-col justify-between p-3 sm:p-5">
        
        {/* High Resolution Dual Event Map Background Image */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/1.OLAY_HARİTA.png"
            alt="1755 Lizbon Tsunami ve 1766 İstanbul Depremi Olay Haritası"
            className="w-full h-full object-cover object-center select-none"
          />
          {/* Subtle dark gradient overlay to make pins and text popping readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-slate-950/50" />
        </div>

        {/* Region Headers Overlay */}
        <div className="relative z-10 flex justify-between items-start pointer-events-none mb-4 gap-2">
          {/* Left Region Header: Lizbon */}
          <div className="bg-[#181d23]/85 border border-sky-400/50 backdrop-blur-md p-3 rounded-2xl max-w-[260px] sm:max-w-xs shadow-xl">
            <div className="flex items-center gap-2 text-sky-300 font-bold text-xs uppercase tracking-wide font-cinzel">
              <Waves className="w-4 h-4 text-sky-400 shrink-0" />
              <span>1755 Lizbon Tsunami Odağı</span>
            </div>
            <div className="text-[11px] text-slate-200 mt-1 font-medium leading-tight">
              Atlantik tabanlı kırılma (~8,3 büyüklük), 45 dk sonra dev tsunami ve 6 günlük yangın felaketi.
            </div>
          </div>

          {/* Right Region Header: İstanbul */}
          <div className="bg-[#181d23]/85 border border-orange-400/50 backdrop-blur-md p-3 rounded-2xl max-w-[260px] sm:max-w-xs shadow-xl">
            <div className="flex items-center gap-2 text-orange-300 font-bold text-xs uppercase tracking-wide font-cinzel">
              <Flame className="w-4 h-4 text-orange-400 shrink-0" />
              <span>1766 İstanbul Deprem Odağı</span>
            </div>
            <div className="text-[11px] text-slate-200 mt-1 font-medium leading-tight">
              Marmara fayı kırılması (~7,5 büyüklük, Kurban Bayramı 3. günü), Fatih Camii yıkımı ve kriz yönetimi.
            </div>
          </div>
        </div>

        {/* Hotspot Pins on Map */}
        <div className="relative z-20 min-h-[350px]">
          {filteredHotspots.map((hotspot) => {
            const isVisited = visitedHotspotIds.includes(hotspot.id);
            const isSelected = selectedHotspot?.id === hotspot.id;
            const isLisbon = hotspot.city === 'lisbon';

            // Short compact title label for map pins to save space
            const shortLabelMap: Record<string, string> = {
              'lisbon-epicenter': 'Atlantik',
              'lisbon-cathedral': 'Katedral',
              'lisbon-palace': 'Kraliyet Sarayı',
              'lisbon-baixa': 'Baixa Planı',
              'istanbul-marmara': 'Marmara Fayı',
              'istanbul-fatih': 'Fatih Camii',
              'istanbul-housing': 'Ahşap Evler',
              'istanbul-topkapi': 'Topkapı Sarayı',
              'istanbul-bazaar': 'Kapalıçarşı'
            };
            const pinLabel = shortLabelMap[hotspot.id] || hotspot.title;

            return (
              <div
                key={hotspot.id}
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group hover:z-50 z-20"
              >
                {/* Slow Gentle Radar Ring Pulse (3s duration, low opacity) */}
                <div
                  style={{ animationDuration: '3.2s' }}
                  className={`absolute -inset-2 rounded-full animate-ping opacity-30 pointer-events-none ${
                    isLisbon ? 'bg-sky-400' : 'bg-orange-400'
                  }`}
                />

                {/* Pin Button */}
                <button
                  onClick={() => handleSelectHotspot(hotspot)}
                  className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-full border shadow-xl transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'scale-115 ring-4 ring-amber-400 bg-amber-500 text-slate-950 font-extrabold border-amber-300 z-40'
                      : isVisited
                      ? 'bg-emerald-700 text-white border-emerald-400 hover:bg-emerald-600 shadow-emerald-950/40'
                      : isLisbon
                      ? 'bg-[#0284c7] text-white border-sky-300 hover:bg-sky-500 shadow-sky-950/50'
                      : 'bg-[#ea580c] text-white border-orange-300 hover:bg-orange-500 shadow-orange-950/50'
                  }`}
                >
                  <MapPin className="w-3 h-3 text-white shrink-0" />
                  
                  {/* Compact Short Label */}
                  <span className="text-[11px] font-bold font-cinzel whitespace-nowrap tracking-tight">
                    {pinLabel}
                  </span>

                  {isVisited && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 shrink-0" title="İncelendi" />
                  )}
                </button>

                {/* Hover Tooltip Card */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 bg-[#28303a] border-2 border-amber-400/80 text-slate-100 text-xs p-3 rounded-2xl whitespace-nowrap shadow-2xl pointer-events-none min-w-[200px]">
                  <div className="flex items-center gap-1.5 mb-1 text-amber-300 font-bold text-xs uppercase tracking-wider font-cinzel">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" /> {hotspot.title}
                  </div>
                  <div className="text-[11px] text-slate-300 max-w-[220px] whitespace-normal leading-relaxed font-medium">
                    {hotspot.shortDesc}
                  </div>
                  <div className="mt-2 text-[10px] text-emerald-400 font-bold font-mono">
                    {isVisited ? '✓ İncelendi' : '👉 İncelemek için tıklayın'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Selected Hotspot Detail Modal */}
      {selectedHotspot && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#252d37] border border-[#3d4959] rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto text-slate-100">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#3d4959] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    selectedHotspot.city === 'lisbon'
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                      : 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                  }`}>
                    {selectedHotspot.city === 'lisbon' ? '🌊 1755 Lizbon Tsunami Felaketi' : '🕌 1766 İstanbul Depremi'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-100 font-cinzel">{selectedHotspot.title}</h3>
              </div>

              <button
                onClick={() => setSelectedHotspot(null)}
                className="p-2 text-slate-400 hover:text-slate-100 bg-[#1e242b] hover:bg-[#313b48] rounded-xl transition-colors cursor-pointer border border-[#3d4959]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {selectedHotspot.fullDesc}
              </p>
            </div>

            {/* Primary Quote if available */}
            {selectedHotspot.primaryQuote && (
              <div className="bg-[#1a2027] border-l-4 border-amber-500 p-4 rounded-r-2xl space-y-2 border-t border-b border-r border-[#3d4959]">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider font-cinzel">
                  <Quote className="w-4 h-4 text-amber-400" />
                  <span>Dönemin Birincil Tarihsel Kaynağı</span>
                </div>
                <blockquote className="text-sm italic text-amber-100/90 font-serif">
                  "{selectedHotspot.primaryQuote.text}"
                </blockquote>
                <div className="text-xs text-amber-300/90 text-right font-semibold font-cinzel">
                  — {selectedHotspot.primaryQuote.author} ({selectedHotspot.primaryQuote.source})
                </div>
              </div>
            )}

            {/* Action Footer */}
            <div className="pt-3 border-t border-[#3d4959] flex justify-end">
              <button
                onClick={() => setSelectedHotspot(null)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition-all text-sm cursor-pointer shadow-md font-cinzel"
              >
                İncelemeyi Tamamla
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
