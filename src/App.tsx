import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { InstructionsBanner } from './components/InstructionsBanner';
import { InteractiveMap } from './components/InteractiveMap';
import { VisualAnalysisLab } from './components/VisualAnalysisLab';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { BadgeModal } from './components/BadgeModal';
import { WelcomeModal } from './components/WelcomeModal';
import { CompletionModal } from './components/CompletionModal';
import { ActiveTab, Badge } from './types';
import { BADGES } from './data/earthquakeData';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('map');
  const [badges, setBadges] = useState<Badge[]>(BADGES);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState<boolean>(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(true);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (window.SCORM) {
      window.SCORM.initialize();
    }
    const handleBeforeUnload = () => {
      if (window.SCORM) {
        window.SCORM.terminate();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (window.SCORM) {
        window.SCORM.terminate();
      }
    };
  }, []);

  const handleUnlockBadge = (badgeId: string) => {
    setBadges(prev =>
      prev.map(b => (b.id === badgeId ? { ...b, unlocked: true, unlockedAt: new Date().toLocaleTimeString() } : b))
    );
  };

  const handleRestartAll = () => {
    setBadges(BADGES.map(b => ({ ...b, unlocked: false })));
    setActiveTab('map');
    setIsCompletionModalOpen(false);
    setIsWelcomeModalOpen(true);
  };

  const handleReset = () => {
    if (window.confirm('Tüm ilerleme ve rozetleriniz sıfırlanacaktır. Emin misiniz?')) {
      handleRestartAll();
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fa] text-slate-800 selection:bg-amber-500 selection:text-slate-950 flex flex-col justify-between relative overflow-hidden">

      {/* Top Bar Header with Embedded Tabs */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        badges={badges}
        onOpenBadges={() => setIsBadgeModalOpen(true)}
        onOpenWelcome={() => setIsWelcomeModalOpen(true)}
        onReset={handleReset}
      />

      {/* Main Learning Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">

        {/* Dynamic Instructional Banner */}
        <InstructionsBanner activeTab={activeTab} />

        {/* Active Module Stage */}
        <div className="transition-all duration-300">
          {activeTab === 'map' && (
            <InteractiveMap
              onUnlockBadge={handleUnlockBadge}
              onNavigateNext={() => setActiveTab('visual')}
            />
          )}

          {activeTab === 'visual' && (
            <VisualAnalysisLab
              onUnlockBadge={handleUnlockBadge}
              onNavigateNext={() => setActiveTab('matrix')}
            />
          )}

          {activeTab === 'matrix' && (
            <ComparisonMatrix
              onUnlockBadge={handleUnlockBadge}
              onFinishActivity={() => setIsCompletionModalOpen(true)}
            />
          )}
        </div>

      </main>

      {/* Badges Celebration Modal */}
      <BadgeModal
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
        badges={badges}
      />

      {/* Entrance / Learning Outcome Welcome Modal */}
      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onClose={() => setIsWelcomeModalOpen(false)}
      />

      {/* Completion Modal */}
      <CompletionModal
        isOpen={isCompletionModalOpen}
        onClose={() => setIsCompletionModalOpen(false)}
        onRestart={handleRestartAll}
      />

    </div>
  );
}
