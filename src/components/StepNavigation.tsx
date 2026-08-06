import React from 'react';
import { Map, Layers, LayoutGrid, PenTool, CheckCircle } from 'lucide-react';
import { ActiveTab, Badge } from '../types';

interface StepNavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  badges: Badge[];
}

export const StepNavigation: React.FC<StepNavigationProps> = ({ activeTab, setActiveTab, badges }) => {
  const isBadgeUnlocked = (id: string) => badges.find(b => b.id === id)?.unlocked;

  const steps = [
    {
      id: 'map' as ActiveTab,
      label: 'Etkileşimli Harita',
      icon: Map,
      badgeId: 'badge-map'
    },
    {
      id: 'visual' as ActiveTab,
      label: 'Görsel Analiz',
      icon: Layers,
      badgeId: 'badge-visual'
    },
    {
      id: 'matrix' as ActiveTab,
      label: 'Karşılaştırma',
      icon: LayoutGrid,
      badgeId: 'badge-matrix'
    }
  ];

  return (
    <div className="bg-[#242b35] p-1.5 rounded-2xl border border-[#384656] mb-6 shadow-md flex flex-wrap items-center justify-between gap-1.5">
      {steps.map(step => {
        const Icon = step.icon;
        const isActive = activeTab === step.id;
        const isCompleted = isBadgeUnlocked(step.badgeId);

        return (
          <button
            key={step.id}
            onClick={() => setActiveTab(step.id)}
            className={`flex-1 min-w-[170px] sm:min-w-0 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-cinzel transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 ring-1 ring-amber-300'
                : 'text-slate-300 hover:text-white hover:bg-[#1d232b]'
            }`}
          >
            <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
            <span className="truncate">{step.label}</span>
            {isCompleted && (
              <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-950 font-extrabold' : 'text-emerald-400'}`} title="Mühürlendi" />
            )}
          </button>
        );
      })}
    </div>
  );
};
