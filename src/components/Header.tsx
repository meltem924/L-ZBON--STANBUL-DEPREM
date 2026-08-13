import React, { useState } from 'react';
import { Award, RotateCcw, Sparkles, Map, Layers, LayoutGrid, CheckCircle, Lock, Maximize2, Minimize2 } from 'lucide-react';
import { ActiveTab, Badge } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  badges: Badge[];
  onOpenBadges: () => void;
  onOpenWelcome?: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, badges, onOpenBadges, onReset }) => {
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

  const unlockedCount = badges.filter(b => b.unlocked).length;
  const progressPercent = Math.round((unlockedCount / badges.length) * 100);
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
      lockAlert: '🔒 2. Bölüm (Görsel Analiz) kilitlidir!\n\nAçılması için önce 1. Bölümdeki (Etkileşimli Harita) 9 sıcak noktayı inceleyip Harita Mührünü kazanmalısınız.'
    },
    {
      id: 'matrix' as ActiveTab,
      label: 'Karşılaştırma',
      icon: LayoutGrid,
      badgeId: 'badge-matrix',
      prereqBadgeId: 'badge-visual',
      lockAlert: '🔒 3. Bölüm (Karşılaştırma) kilitlidir!\n\nAçılması için önce 2. Bölümdeki (Görsel Analiz) 4 vakayı başarıyla tamamlayıp Analiz Mührünü kazanmalısınız.'
    }
  ];

  return (
    <header className="bg-[#28303a] text-slate-100 border-b border-[#3c4756] sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col lg:flex-row items-center justify-between gap-3">
        
        {/* Navigation Tabs Bar in Main Header Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto no-scrollbar bg-[#1c232b] p-1 rounded-2xl border border-[#374352]">
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
                className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold font-cinzel transition-all duration-200 whitespace-nowrap ${
                  isLocked
                    ? 'bg-[#161b21] text-slate-400 border border-slate-700/50 cursor-not-allowed hover:bg-[#1e252e]'
                    : isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 ring-1 ring-amber-300 cursor-pointer'
                    : 'text-slate-300 hover:text-white hover:bg-[#252d37] cursor-pointer'
                }`}
              >
                {isLocked ? (
                  <Lock className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                ) : (
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                )}

                <span className="truncate">{step.label}</span>

                {isCompleted && (
                  <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-950 font-extrabold' : 'text-emerald-400'}`} title="Mühürlendi" />
                )}
              </button>
            );
          })}
        </div>

        {/* Gamification Bar & Actions */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end shrink-0">
          
          {/* Progress Indicator */}
          <div className="flex items-center gap-2.5 bg-[#1e242b] px-3 py-1.5 rounded-xl border border-[#374354] shadow-inner">
            <div className="text-right">
              <div className="text-xs font-bold text-amber-400 flex items-center justify-end gap-1">
                <span>%{progressPercent}</span>
                <Sparkles className="w-3 h-3 text-amber-400" />
              </div>
            </div>
            <div className="w-14 h-2 bg-[#14181d] rounded-full overflow-hidden border border-[#2d3745]">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 via-sky-400 to-emerald-400 transition-all duration-500 shadow-sm" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Badges Button */}
          <button
            onClick={onOpenBadges}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3.5 py-2 rounded-xl transition-all shadow-md text-xs cursor-pointer border border-amber-300/40 active:scale-95"
          >
            <Award className="w-4 h-4 text-slate-950" />
            <span>Mühürler ({unlockedCount}/{badges.length})</span>
            {unlockedCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-950 animate-ping" />
            )}
          </button>

          {/* Tam Ekran Butonu */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran Yap"}
            className="p-2 text-amber-400 hover:text-amber-300 bg-[#1e242b] hover:bg-[#28323e] rounded-xl transition-colors cursor-pointer border border-[#374354] flex items-center gap-1.5 text-xs font-bold font-cinzel active:scale-95"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Küçült</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Tam Ekran</span>
              </>
            )}
          </button>

          {/* Reset Button */}
          <button
            onClick={onReset}
            title="Etkinliği Sıfırla"
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-[#1e242b] rounded-xl transition-colors cursor-pointer border border-transparent hover:border-[#3c4756]"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
