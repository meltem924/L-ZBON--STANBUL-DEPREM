import React, { useState } from 'react';
import { Header } from './components/Header';
import { InstructionsBanner } from './components/InstructionsBanner';
import { InteractiveMap } from './components/InteractiveMap';
import { VisualAnalysisLab } from './components/VisualAnalysisLab';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { BadgeModal } from './components/BadgeModal';
import { ActiveTab, Badge } from './types';
import { BADGES } from './data/earthquakeData';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('map');
  const [badges, setBadges] = useState<Badge[]>(BADGES);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState<boolean>(false);

  const handleUnlockBadge = (badgeId: string) => {
    setBadges(prev =>
      prev.map(b => (b.id === badgeId ? { ...b, unlocked: true, unlockedAt: new Date().toLocaleTimeString() } : b))
    );
  };

  const handleReset = () => {
    if (window.confirm('Tüm ilerleme ve rozetleriniz sıfırlanacaktır. Emin misiniz?')) {
      setBadges(BADGES.map(b => ({ ...b, unlocked: false })));
      setActiveTab('map');
    }
  };

  return (
    <div className="min-h-screen bg-[#1e242b] text-slate-100 selection:bg-sky-600 selection:text-white flex flex-col justify-between relative overflow-hidden">

      {/* Top Bar Header with Embedded Tabs */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        badges={badges}
        onOpenBadges={() => setIsBadgeModalOpen(true)}
        onReset={handleReset}
      />

      {/* Main Learning Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 relative z-10">

        {/* Dynamic Instructional Banner */}
        <InstructionsBanner activeTab={activeTab} />

        {/* Active Module Stage */}
        <div className="transition-all duration-300">
          {activeTab === 'map' && (
            <InteractiveMap onUnlockBadge={handleUnlockBadge} />
          )}

          {activeTab === 'visual' && (
            <VisualAnalysisLab onUnlockBadge={handleUnlockBadge} />
          )}

          {activeTab === 'matrix' && (
            <ComparisonMatrix onUnlockBadge={handleUnlockBadge} />
          )}
        </div>

      </main>

      {/* Badges Celebration Modal */}
      <BadgeModal
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
        badges={badges}
      />

    </div>
  );
}
