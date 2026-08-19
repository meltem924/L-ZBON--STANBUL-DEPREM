import React, { useState } from 'react';
import { RotateCcw, Map, Layers, LayoutGrid, CheckCircle2, Lock, Maximize2, Minimize2 } from 'lucide-react';
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
      label: 'Görsel Analiz ve Eşleştirme',
      icon: Layers,
      badgeId: 'badge-visual',
      prereqBadgeId: null,
      lockAlert: ''
    },
    {
      id: 'matrix' as ActiveTab,
      label: 'Karşılaştırma',
      icon: LayoutGrid,
      badgeId: 'badge-matrix',
      prereqBadgeId: null,
      lockAlert: ''
    }
  ];

  return (
    <header className="bg-white border-b border-[#dfdfdf] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        
        {/* Esri Calcite Tab Navigation Strip */}
        <div className="flex items-center overflow-x-auto no-scrollbar -mb-[1px]">
          
          {/* Calcite Navigation Tabs */}
          <nav className="flex items-center flex-1">
            {steps.map(step => {
              const Icon = step.icon;
              const isActive = activeTab === step.id;
              const isCompleted = isBadgeUnlocked(step.badgeId);
              const isLocked = false;

              const handleTabClick = () => {
                setActiveTab(step.id);
              };

              return (
                <button
                  key={step.id}
                  onClick={handleTabClick}
                  className={`group relative flex items-center justify-center gap-2 px-3.5 sm:px-5 py-3 text-xs sm:text-sm font-medium border-b-2 transition-all duration-150 whitespace-nowrap cursor-pointer select-none shrink-0 ${
                    isLocked
                      ? 'border-transparent text-[#9e9e9e] cursor-not-allowed opacity-60'
                      : isActive
                      ? 'border-[#007ac2] text-[#151515] font-semibold bg-[#f8f9fa]/60'
                      : 'border-transparent text-[#555555] hover:text-[#151515] hover:border-[#cccccc] hover:bg-[#f8f9fa]/40'
                  }`}
                >
                  {/* Calcite Icon */}
                  {isLocked ? (
                    <Lock className="w-3.5 h-3.5 text-[#9e9e9e]" />
                  ) : (
                    <Icon className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-[#007ac2]' : 'text-[#6a6a6a] group-hover:text-[#151515]'
                    }`} />
                  )}

                  {/* Calcite Tab Label */}
                  <span className="tracking-normal font-sans">
                    {step.label}
                  </span>

                  {/* Completed Checkmark */}
                  {isCompleted && !isLocked && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#107c41]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Calcite Divider */}
          <div className="h-5 w-[1px] bg-[#e0e0e0] shrink-0 mx-2" />

          {/* Calcite Action Buttons */}
          <div className="flex items-center gap-0.5 shrink-0 py-1">
            {/* Tam Ekran Butonu */}
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran"}
              aria-label={isFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran"}
              className="w-9 h-9 flex items-center justify-center text-[#555555] hover:text-[#151515] hover:bg-[#f3f3f3] rounded transition-colors cursor-pointer active:bg-[#e0e0e0]"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            {/* Yeniden Başlat Butonu */}
            <button
              onClick={onReset}
              title="Etkinliği Yeniden Başlat"
              aria-label="Etkinliği Yeniden Başlat"
              className="w-9 h-9 flex items-center justify-center text-[#555555] hover:text-[#d83b01] hover:bg-[#fdf3f2] rounded transition-colors cursor-pointer active:bg-[#f8d7d4]"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </header>
  );
};
