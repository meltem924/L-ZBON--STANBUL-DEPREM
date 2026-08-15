import React from 'react';
import { Info } from 'lucide-react';
import { ActiveTab } from '../types';
import { STEP_INSTRUCTIONS } from '../data/earthquakeData';

interface InstructionsBannerProps {
  activeTab: ActiveTab;
}

export const InstructionsBanner: React.FC<InstructionsBannerProps> = ({ activeTab }) => {
  const currentInfo = STEP_INSTRUCTIONS[activeTab];

  if (!currentInfo) return null;

  return (
    <div className="bg-white border-2 border-slate-300 rounded-2xl p-4 sm:p-5 mb-6 text-slate-800 shadow-xs border-l-[6px] border-l-amber-500">
      <div className="space-y-1.5">
        {currentInfo.curriculumGoal && (
          <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 text-[11px] font-bold px-3 py-0.5 rounded-full border-2 border-amber-300 font-mono mb-1">
            🎯 {currentInfo.curriculumGoal}
          </div>
        )}
        <h2 className="text-lg font-bold text-slate-900 font-cinzel flex items-center gap-2 tracking-wide">
          <span>{currentInfo.title}</span>
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed font-medium">
          {currentInfo.instructionText}
        </p>
      </div>
    </div>
  );
};
