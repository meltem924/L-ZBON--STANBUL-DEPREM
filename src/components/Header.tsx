import React, { useState } from 'react';
import { RotateCcw, Map, Layers, LayoutGrid, CheckCircle, Lock, Maximize2, Minimize2 } from 'lucide-react';
import { ActiveTab, Badge } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  badges: Badge[];
  onOpenBadges?: () => void;
  onOpenWelcome?: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, badges, onReset }) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Fullscreen error: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const isBadgeUnlocked = (id: string) => badges.find(b => b.id === id)?.unlocked;

  const steps = [
    {
      id: 'map' as ActiveTab,
      label: 'Etkileşimli Harita',
      icon: Map,
      badgeId: 'badge-map',
      prereqBadgeId: null,
      lockAlert: ''
    },
    {
      id: 'visual' as ActiveTab,
      label: 'Görsel Analiz',
      icon: Layers,
      badgeId: 'badge-visual',
      prereqBadgeId: 'badge-map',
      lockAlert: '🔒 2. Bölüm (Görsel Analiz) kilitlidir!\n\nAçılması için önce 1. Bölümdeki (Etkileşimli Harita) 9 noktayı incelemelisiniz.'
    },
    {
      id: 'matrix' as ActiveTab,
      label: 'Karşılaştırma',
      icon: LayoutGrid,
      badgeId: 'badge-matrix',
      prereqBadgeId: 'badge-visual',
      lockAlert: '🔒 3. Bölüm (Karşılaştırma) kilitlidir!\n\nAçılması için önce 2. Bölümdeki (Görsel Analiz) 4 vakayı başarıyla tamamlamalısınız.'
    }
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md text-slate-800 border-b-2 border-slate-300 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2">

        {/* Unified Scrollable Tabs & Actions Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full no-scrollbar bg-slate-100 p-1.5 rounded-2xl border-2 border-slate-300 shadow-xs">
          {steps.map(step => {
            const Icon = step.icon;
            const isActive = activeTab === step.id;
            const isCompleted = isBadgeUnlocked(step.badgeId);
            const isLocked = step.prereqBadgeId ? !isBadgeUnlocked(step.prereqBadgeId) : false;

            const handleTabClick = () => {
              if (isLocked) {
                alert(step.lockAlert);
                return;
              }
              setActiveTab(step.id);
            };

            return (
              <button
                key={step.id}
                onClick={handleTabClick}
                className={`flex-1 min-w-[130px] sm:min-w-0 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold font-cinzel transition-all duration-200 whitespace-nowrap border-2 shrink-0 sm:shrink ${isLocked
                    ? 'bg-slate-200/80 text-slate-400 border-slate-300 cursor-not-allowed'
                    : isActive
                      ? 'bg-amber-500 text-slate-950 shadow-sm border-amber-600 ring-2 ring-amber-400/50 cursor-pointer'
                      : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-50 border-slate-300 hover:border-slate-400 cursor-pointer shadow-2xs'
                  }`}
              >
                {isLocked ? (
                  <Lock className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                ) : (
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-slate-950' : 'text-amber-600'}`} />
                )}

                <span className="truncate">{step.label}</span>

                {isCompleted && (
                  <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-950 font-extrabold' : 'text-emerald-600'}`} title="Tamamlandı" />
                )}
              </button>
            );
          })}

          {/* Divider */}
          <div className="h-6 w-px bg-slate-300 shrink-0 mx-0.5" />

          {/* Tam Ekran Butonu */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran Yap"}
            aria-label={isFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran Yap"}
            className="p-2 text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border-2 border-slate-300 hover:border-slate-400 flex items-center justify-center active:scale-95 shadow-2xs shrink-0"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 text-slate-700" />
            ) : (
              <Maximize2 className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Reset / Yeniden Başlat Butonu */}
          <button
            onClick={onReset}
            title="Etkinliği Yeniden Başlat"
            aria-label="Etkinliği Yeniden Başlat"
            className="p-2 text-slate-600 hover:text-rose-600 bg-white hover:bg-rose-50 rounded-xl transition-colors cursor-pointer border-2 border-slate-300 hover:border-rose-400 flex items-center justify-center active:scale-95 shadow-2xs shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
