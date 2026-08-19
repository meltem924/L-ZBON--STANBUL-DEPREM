import React, { useState } from 'react';
import { MapPin, Info, Layers, Eye, Compass, Quote, Sparkles, X, ChevronRight, Waves, Flame, Building2 } from 'lucide-react';
import { Hotspot } from '../types';
import { HOTSPOTS } from '../data/earthquakeData';
import confetti from 'canvas-confetti';

interface InteractiveMapProps {
  onUnlockBadge: (badgeId: string) => void;
  onNavigateNext?: () => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onUnlockBadge, onNavigateNext }) => {
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

      {/* Region Overview Cards (Side by side on desktop, stacked on mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Left Region Card: Lizbon */}
        <div className="bg-sky-50/95 border-2 border-sky-300 p-3 sm:p-3.5 rounded-2xl shadow-xs">
          <div className="flex items-center gap-2 text-sky-900 font-bold text-xs uppercase tracking-wide font-cinzel">
            <Waves className="w-4 h-4 text-sky-600 shrink-0" />
            <span>1755 Lizbon Tsunami Odağı</span>
          </div>
          <div className="text-[11px] sm:text-xs text-slate-700 mt-1 font-medium leading-relaxed">
            Atlantik tabanlı kırılma (~8,3 büyüklük), 45 dk sonra dev tsunami ve 6 günlük yangın felaketi.
          </div>
        </div>

        {/* Right Region Card: İstanbul */}
        <div className="bg-orange-50/95 border-2 border-orange-300 p-3 sm:p-3.5 rounded-2xl shadow-xs">
          <div className="flex items-center gap-2 text-orange-900 font-bold text-xs uppercase tracking-wide font-cinzel">
            <Building2 className="w-4 h-4 text-orange-600 shrink-0" />
            <span>1766 İstanbul Deprem Odağı</span>
          </div>
          <div className="text-[11px] sm:text-xs text-slate-700 mt-1 font-medium leading-relaxed">
            Marmara fayı kırılması (~7,5 büyüklük, Kurban Bayramı 3. günü), Fatih Camii yıkımı ve kriz yönetimi.
          </div>
        </div>
      </div>

      {/* Interactive Map Visual Stage Card (Strict Aspect Ratio 1293/672 matching original image) */}
      <div className="relative w-full aspect-[1293/672] bg-slate-950 border-2 border-amber-400/80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl select-none">
        
        {/* High Resolution Dual Event Map Background Image */}
        <img
          src={`${import.meta.env.BASE_URL}olay_harita.png`}
          alt="1755 Lizbon Tsunami ve 1766 İstanbul Depremi Olay Haritası"
          className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none"
        />
        
        {/* Subtle dark gradient overlay to make pins popping readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/20 pointer-events-none" />

        {/* Hotspot Pins on Map - Exact 1:1 mathematical coordinate layer */}
        <div className="absolute inset-0 z-20">
          {filteredHotspots.map((hotspot) => {
            const isVisited = visitedHotspotIds.includes(hotspot.id);
            const isSelected = selectedHotspot?.id === hotspot.id;
            const isLisbon = hotspot.city === 'lisbon';

            // Short compact title label for map pins to save space
            const shortLabelMap: Record<string, string> = {
              'lisbon-epicenter': 'Atlantik',
              'lisbon-cathedral': 'Katedral',
              'lisbon-palace': 'Saray',
              'lisbon-baixa': 'Baixa Planı',
              'istanbul-marmara': 'Marmara Fayı',
              'istanbul-fatih': 'Fatih Camii',
              'istanbul-housing': 'Ahşap Evler',
              'istanbul-topkapi': 'Topkapı',
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
                  className={`absolute -inset-1 sm:-inset-2 rounded-full animate-ping opacity-30 pointer-events-none ${
                    isLisbon ? 'bg-sky-400' : 'bg-orange-400'
                  }`}
                />

                {/* Scaled Responsive Pin Button */}
                <button
                  onClick={() => handleSelectHotspot(hotspot)}
                  className={`relative flex items-center gap-1 sm:gap-1.5 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full border sm:border-2 shadow-md sm:shadow-xl transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'scale-110 sm:scale-115 ring-2 sm:ring-4 ring-amber-400 bg-amber-500 text-slate-950 font-extrabold border-amber-200 z-40'
                      : isVisited
                      ? 'bg-emerald-700 text-white border-emerald-300 hover:bg-emerald-600 shadow-emerald-950/40'
                      : isLisbon
                      ? 'bg-[#0284c7] text-white border-sky-200 hover:bg-sky-500 shadow-sky-950/50'
                      : 'bg-[#ea580c] text-white border-orange-200 hover:bg-orange-500 shadow-orange-950/50'
                  }`}
                >
                  <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white shrink-0" />
                  
                  {/* Proportional Scaled Label */}
                  <span className="text-[8px] sm:text-[10px] md:text-xs font-bold font-cinzel whitespace-nowrap tracking-tight">
                    {pinLabel}
                  </span>

                  {isVisited && (
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-300 shrink-0" title="İncelendi" />
                  )}
                </button>

                {/* Hover Tooltip Card */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 sm:mb-2 hidden group-hover:block z-50 bg-white border-2 border-amber-500 text-slate-800 text-xs p-2.5 sm:p-3 rounded-2xl whitespace-nowrap shadow-2xl pointer-events-none min-w-[180px] sm:min-w-[200px]">
                  <div className="flex items-center gap-1.5 mb-1 text-amber-900 font-bold text-[11px] sm:text-xs uppercase tracking-wider font-cinzel">
                    <MapPin className="w-3 h-3 text-amber-600" /> {hotspot.title}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-700 max-w-[200px] sm:max-w-[220px] whitespace-normal leading-relaxed font-medium">
                    {hotspot.shortDesc}
                  </div>
                  <div className="mt-1.5 text-[9px] sm:text-[10px] text-emerald-700 font-bold font-mono">
                    {isVisited ? '✓ İncelendi' : 'İncelemek için tıklayınız'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* 1. Bölüm Tamamlama & 2. Bölüm Kilidi Açılma Bildirimi */}
      {isAllVisited && (
        <div className="bg-emerald-50 border-2 border-emerald-500 p-5 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-fadeIn">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-sm shrink-0">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-emerald-950 font-cinzel">
                Tebrikler! 1. Bölüm Başarıyla Tamamlandı!
              </h4>
              <p className="text-xs text-emerald-800 font-medium mt-0.5">
                Haritadaki 9 sıcak noktanın tamamını incelediniz. <strong>2. Bölüm (Görsel Analiz)</strong> kilidi açıldı!
              </p>
            </div>
          </div>

          {onNavigateNext && (
            <button
              onClick={onNavigateNext}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-6 py-3 rounded-2xl transition-all text-xs cursor-pointer shadow-md shrink-0 flex items-center gap-2 font-cinzel tracking-wide active:scale-95"
            >
              <span>2. Bölüm'e Geç (Görsel Analiz)</span>
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
      )}

      {/* Selected Hotspot Detail Modal */}
      {selectedHotspot && (
        <div className="fixed inset-0 z-[100] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border-2 border-slate-400 rounded-2xl sm:rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl space-y-4 sm:space-y-5 relative max-h-[90vh] overflow-y-auto text-slate-800 my-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b-2 border-slate-300 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border-2 ${
                    selectedHotspot.city === 'lisbon'
                      ? 'bg-sky-50 text-sky-900 border-sky-400'
                      : 'bg-orange-50 text-orange-900 border-orange-400'
                  }`}>
                    {selectedHotspot.city === 'lisbon' ? '1755 Lizbon Tsunami Felaketi' : '1766 İstanbul Depremi'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-cinzel">{selectedHotspot.title}</h3>
              </div>

              <button
                onClick={() => setSelectedHotspot(null)}
                className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer border-2 border-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description List with Separated Category Headers */}
            <div className="space-y-3">
              {selectedHotspot.fullDesc.split('\n').filter(Boolean).map((line, idx) => {
                const colonIndex = line.indexOf(':');
                if (colonIndex !== -1) {
                  const header = line.slice(0, colonIndex + 1);
                  const body = line.slice(colonIndex + 1);
                  const isLisbon = selectedHotspot.city === 'lisbon';
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3.5 shadow-xs border-2 transition-all ${
                        isLisbon
                          ? 'bg-sky-50/50 border-sky-300 hover:border-sky-400'
                          : 'bg-orange-50/50 border-orange-300 hover:border-orange-400'
                      }`}
                    >
                      <span className={`font-bold text-xs font-cinzel uppercase tracking-wider shrink-0 pt-0.5 ${
                        isLisbon ? 'text-sky-900' : 'text-orange-900'
                      }`}>
                        {header}
                      </span>
                      <span className="text-sm text-slate-800 leading-relaxed font-medium">
                        {body}
                      </span>
                    </div>
                  );
                }
                return (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border-2 border-slate-300 text-sm text-slate-800 leading-relaxed font-medium">
                    {line}
                  </div>
                );
              })}
            </div>

            {/* Primary Quote if available */}
            {selectedHotspot.primaryQuote && (
              <div className="bg-amber-50/90 border-2 border-amber-400 border-l-[6px] border-l-amber-500 p-4.5 rounded-2xl space-y-2 text-amber-950 shadow-xs">
                <blockquote className="text-sm italic text-amber-950 font-serif leading-relaxed">
                  "{selectedHotspot.primaryQuote.text}"
                </blockquote>
                <div className="text-xs text-amber-900 text-right font-semibold font-cinzel">
                  — {selectedHotspot.primaryQuote.author} ({selectedHotspot.primaryQuote.source})
                </div>
              </div>
            )}

            {/* Action Footer */}
            <div className="pt-4 border-t-2 border-slate-300 flex justify-end">
              <button
                onClick={() => setSelectedHotspot(null)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition-all text-sm cursor-pointer shadow-md border-2 border-amber-600 font-cinzel active:scale-95"
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
