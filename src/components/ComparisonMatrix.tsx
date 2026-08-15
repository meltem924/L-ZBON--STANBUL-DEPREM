import React, { useState } from 'react';
import { LayoutGrid, CheckCircle2, HelpCircle, ArrowRight, Sparkles, RefreshCw, Layers, Info, Check, AlertCircle, RotateCcw, Eye, ShieldCheck, Undo2 } from 'lucide-react';
import { ComparisonCard } from '../types';
import { COMPARISON_CARDS } from '../data/earthquakeData';
import confetti from 'canvas-confetti';

interface ComparisonMatrixProps {
  onUnlockBadge: (badgeId: string) => void;
  onFinishActivity?: () => void;
}

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({ onUnlockBadge, onFinishActivity }) => {
  // Shuffled Cards State so order is completely mixed up
  const [shuffledCards, setShuffledCards] = useState<ComparisonCard[]>(() => shuffleArray(COMPARISON_CARDS));
  
  // Placement State: cardId -> zone ('lisbon' | 'both' | 'istanbul')
  const [placements, setPlacements] = useState<Record<string, 'lisbon' | 'both' | 'istanbul'>>({});
  const [activeCardId, setActiveCardId] = useState<string | null>(() => {
    const initialShuffled = shuffleArray(COMPARISON_CARDS);
    return initialShuffled[0].id;
  });

  // State for Check Control & Evaluation
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [autoCorrectedIds, setAutoCorrectedIds] = useState<string[]>([]);

  const placedCount = Object.keys(placements).length;
  const totalCount = COMPARISON_CARDS.length;
  const isAllPlaced = placedCount >= totalCount;

  // Check how many are correct
  const correctCount = COMPARISON_CARDS.filter(c => placements[c.id] === c.correctZone).length;
  const isAllCorrect = isAllPlaced && correctCount === totalCount;

  const handleAssignCard = (cardId: string, zone: 'lisbon' | 'both' | 'istanbul') => {
    setPlacements(prev => ({ ...prev, [cardId]: zone }));
    setIsChecked(false);
    setShowAnswers(false);
    setAutoCorrectedIds([]);

    // Auto switch active card to next unassigned in shuffled order
    const nextUnassigned = shuffledCards.find(c => c.id !== cardId && !placements[c.id]);
    if (nextUnassigned) {
      setActiveCardId(nextUnassigned.id);
    } else {
      setActiveCardId(null);
    }
  };

  const handleUndoCard = (cardId: string) => {
    setPlacements(prev => {
      const copy = { ...prev };
      delete copy[cardId];
      return copy;
    });
    setActiveCardId(cardId);
    setIsChecked(false);
    setShowAnswers(false);
    setAutoCorrectedIds([]);
  };

  const handleCheck = () => {
    if (!isAllPlaced) return;
    setIsChecked(true);

    if (isAllCorrect) {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 }
      });
    }
  };

  const handleShowAnswers = () => {
    const correctedPlacements: Record<string, 'lisbon' | 'both' | 'istanbul'> = {};
    const autoFixedList: string[] = [];

    COMPARISON_CARDS.forEach(card => {
      if (placements[card.id] !== card.correctZone) {
        autoFixedList.push(card.id);
      }
      correctedPlacements[card.id] = card.correctZone;
    });

    setPlacements(correctedPlacements);
    setAutoCorrectedIds(autoFixedList);
    setShowAnswers(true);
    setIsChecked(true);
    setActiveCardId(null);
  };

  const handleFinish = () => {
    onUnlockBadge('badge-matrix');

    // SCORM / MEBİS değerlendirmesini ve tamamlandı/tamamlanmadı bilgisini gönder
    if (window.SCORM && typeof window.SCORM.sendScore === 'function') {
      const passed = correctCount >= 5 || isAllCorrect;
      window.SCORM.sendScore(correctCount, totalCount, passed);
    }

    onFinishActivity?.();
  };

  const handleRetry = () => {
    const newShuffled = shuffleArray(COMPARISON_CARDS);
    setShuffledCards(newShuffled);
    setPlacements({});
    setIsChecked(false);
    setShowAnswers(false);
    setAutoCorrectedIds([]);
    setActiveCardId(newShuffled[0].id);
  };

  const handleResetAll = () => {
    const newShuffled = shuffleArray(COMPARISON_CARDS);
    setShuffledCards(newShuffled);
    setPlacements({});
    setIsChecked(false);
    setShowAnswers(false);
    setAutoCorrectedIds([]);
    setActiveCardId(newShuffled[0].id);
  };

  const activeCard = COMPARISON_CARDS.find(c => c.id === activeCardId);

  const renderCardItem = (card: ComparisonCard, zone: 'lisbon' | 'both' | 'istanbul') => {
    const isUserCorrect = isChecked && placements[card.id] === card.correctZone && !autoCorrectedIds.includes(card.id);
    const isAutoFixed = showAnswers && autoCorrectedIds.includes(card.id);
    const showStatus = isChecked || showAnswers;

    let cardStyle = 'bg-white border-2 border-sky-400 text-slate-800 shadow-xs';
    if (zone === 'both') cardStyle = 'bg-white border-2 border-amber-400 text-slate-800 shadow-xs';
    if (zone === 'istanbul') cardStyle = 'bg-white border-2 border-orange-400 text-slate-800 shadow-xs';

    if (showStatus) {
      if (isAutoFixed) {
        cardStyle = 'bg-purple-50 border-2 border-purple-500 text-purple-950 shadow-sm ring-2 ring-purple-400/40 animate-fadeIn';
      } else if (isUserCorrect) {
        cardStyle = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-950 shadow-xs';
      } else {
        cardStyle = 'bg-rose-50 border-2 border-rose-500 text-rose-950 shadow-xs';
      }
    }

    return (
      <div
        key={card.id}
        className={`p-3.5 rounded-2xl text-xs space-y-2 transition-all ${cardStyle}`}
      >
        <div className="flex items-start justify-between gap-2">
          <span className="font-bold text-slate-900">{card.text}</span>
          
          {/* Geri Al / Geri Gitsin Button (Only if not in showAnswers auto-fixed state) */}
          {!showAnswers && (
            <button
              onClick={() => handleUndoCard(card.id)}
              title="Kartı sütundan çıkar ve yeniden seç"
              className="shrink-0 text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1 rounded-lg border border-slate-300 transition-colors cursor-pointer font-mono font-bold"
            >
              Geri Al
            </button>
          )}
        </div>

        {/* Feedback Explanation if Checked or Show Answers */}
        {showStatus && (
          <div className="text-[11px] font-medium leading-normal border-t border-slate-300 pt-2 space-y-1">
            <div className="flex items-center gap-1">
              {isAutoFixed ? (
                <span className="text-purple-700 font-bold uppercase tracking-wider text-[10px]">
                  Cevap Gösterildi (Doğru Konumu)
                </span>
              ) : isUserCorrect ? (
                <span className="text-emerald-700 font-bold uppercase tracking-wider text-[10px]">
                  Sizin Doğru Yerleşiminiz
                </span>
              ) : (
                <span className="text-rose-700 font-bold uppercase tracking-wider text-[10px]">
                  Hatalı Yerleşim
                </span>
              )}
            </div>
            <p className="text-slate-800">
              {showAnswers ? card.explanation : isUserCorrect ? card.explanation : `İpucu: ${card.hint}`}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Active Card Box (Ultra Minimal) */}
      {activeCard ? (
        <div className="bg-amber-50/90 border-2 border-amber-500 rounded-3xl p-5 shadow-xs animate-fadeIn">
          <div className="text-base font-bold text-slate-900 bg-white p-4 rounded-2xl border-2 border-amber-300 leading-relaxed shadow-xs font-serif">
            "{activeCard.text}"
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 border-2 border-emerald-400 rounded-3xl p-4 flex items-center justify-between gap-4">
          <div className="text-xs font-bold text-emerald-950 font-mono">
            Tüm 9 etki kartı sütunlara yerleştirildi. Aşağıdaki "Kontrol Et" butonuna basarak değerlendiriniz.
          </div>
          <button
            onClick={handleResetAll}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer font-cinzel shadow-xs border border-amber-600"
          >
            Tümünü Sıfırla
          </button>
        </div>
      )}

      {/* 3 COLUMNS CLASSIFICATION MATRIX STAGE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* COLUMN 1: LISBON ONLY */}
        <div className="bg-sky-50/60 border-2 border-sky-400 rounded-3xl p-5 flex flex-col space-y-4 shadow-xs">
          <button
            disabled={!activeCard}
            onClick={() => activeCard && handleAssignCard(activeCard.id, 'lisbon')}
            className={`w-full p-4 rounded-2xl border-2 text-center transition-all shadow-xs font-cinzel ${
              activeCard
                ? 'bg-sky-600 hover:bg-sky-500 text-white border-sky-600 cursor-pointer ring-2 ring-sky-400/50 scale-[1.02]'
                : 'bg-sky-100/80 border-sky-300 text-sky-900 cursor-default'
            }`}
          >
            <h4 className="font-bold text-sm">
              <span>Sadece Lizbon'a Özgü Etkiler</span>
            </h4>
          </button>

          <div className="flex-1 space-y-3 min-h-[220px]">
            {COMPARISON_CARDS.filter(c => placements[c.id] === 'lisbon').map(card => renderCardItem(card, 'lisbon'))}
          </div>
        </div>

        {/* COLUMN 2: BOTH (SIMILARITIES) */}
        <div className="bg-amber-50/60 border-2 border-amber-400 rounded-3xl p-5 flex flex-col space-y-4 shadow-xs">
          <button
            disabled={!activeCard}
            onClick={() => activeCard && handleAssignCard(activeCard.id, 'both')}
            className={`w-full p-4 rounded-2xl border-2 text-center transition-all shadow-xs font-cinzel ${
              activeCard
                ? 'bg-amber-600 hover:bg-amber-500 text-white border-amber-600 cursor-pointer ring-2 ring-amber-400/50 scale-[1.02]'
                : 'bg-amber-100/80 border-amber-300 text-amber-900 cursor-default'
            }`}
          >
            <h4 className="font-bold text-sm">
              <span>Her İki Depremde Ortak Etkiler</span>
            </h4>
          </button>

          <div className="flex-1 space-y-3 min-h-[220px]">
            {COMPARISON_CARDS.filter(c => placements[c.id] === 'both').map(card => renderCardItem(card, 'both'))}
          </div>
        </div>

        {/* COLUMN 3: ISTANBUL ONLY */}
        <div className="bg-orange-50/60 border-2 border-orange-400 rounded-3xl p-5 flex flex-col space-y-4 shadow-xs">
          <button
            disabled={!activeCard}
            onClick={() => activeCard && handleAssignCard(activeCard.id, 'istanbul')}
            className={`w-full p-4 rounded-2xl border-2 text-center transition-all shadow-xs font-cinzel ${
              activeCard
                ? 'bg-orange-600 hover:bg-orange-500 text-white border-orange-600 cursor-pointer ring-2 ring-orange-400/50 scale-[1.02]'
                : 'bg-orange-100/80 border-orange-300 text-orange-900 cursor-default'
            }`}
          >
            <h4 className="font-bold text-sm">
              <span>Sadece İstanbul'a Özgü Etkiler</span>
            </h4>
          </button>

          <div className="flex-1 space-y-3 min-h-[220px]">
            {COMPARISON_CARDS.filter(c => placements[c.id] === 'istanbul').map(card => renderCardItem(card, 'istanbul'))}
          </div>
        </div>

      </div>

      {/* BOTTOM CONTROL & EVALUATION AREA */}
      <div className="bg-white border-2 border-slate-300 rounded-3xl p-6 shadow-xs space-y-4">
        
        {/* Kontrol Et / Yeniden Dene / Cevapları Göster Action Buttons */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {!isChecked || isAllCorrect ? (
            <button
              disabled={!isAllPlaced}
              onClick={handleCheck}
              className={`px-8 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all shadow-md font-cinzel ${
                isAllPlaced
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer border border-amber-600 ring-4 ring-amber-500/30 scale-[1.03]'
                  : 'bg-slate-100 text-slate-400 border-2 border-slate-300 cursor-not-allowed opacity-60'
              }`}
            >
              Kontrol Et
            </button>
          ) : (
            <>
              {/* Transforms Kontrol Et button into Yeniden Dene */}
              <button
                onClick={handleRetry}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 py-3 rounded-2xl transition-all shadow-md font-cinzel text-xs uppercase tracking-wider cursor-pointer border border-amber-600 ring-4 ring-amber-500/30 scale-[1.03]"
              >
                Yeniden Dene
              </button>

              {/* Cevapları Göster button triggers handleShowAnswers */}
              <button
                onClick={handleShowAnswers}
                className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-8 py-3 rounded-2xl transition-all shadow-md font-cinzel text-xs uppercase tracking-wider cursor-pointer border border-sky-500"
              >
                Cevapları Göster
              </button>
            </>
          )}
        </div>

        {/* FEEDBACK AFTER CHECK IS CLICKED */}
        {isChecked && isAllCorrect && (
          <div className="bg-emerald-50 border-2 border-emerald-500 p-5 rounded-2xl space-y-2 animate-fadeIn shadow-sm">
            <div className="text-emerald-950 font-bold text-sm font-cinzel">
              Tebrikler! Tüm Etkileri Doğru Sınıflandırdınız!
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed font-medium">
              1755 Lizbon ve 1766 İstanbul depremlerinin etkilerini analiz ederek hangi başkente ait olduğunu kusursuz bir şekilde belirleyip doğru sütunlara yerleştirdiniz.
            </p>
          </div>
        )}

        {isChecked && !isAllCorrect && (
          <div className="bg-rose-50 border-2 border-rose-500 p-5 rounded-2xl space-y-2 animate-fadeIn shadow-sm">
            <div className="text-rose-950 font-bold text-sm font-cinzel">
              Bazı Kartlar Hatalı Sütunlara Yerleştirildi
            </div>
            <p className="text-xs text-rose-800 leading-relaxed font-medium">
              Toplam {totalCount} karttan {correctCount} tanesi doğru yerleştirildi. Yanlış yerleştirilen kartları düzeltmek için yukarıdaki "Yeniden Dene" veya tüm otomatik doğru konumları mor renkli olarak görmek için "Cevapları Göster" butonunu kullanabilirsiniz.
            </p>
          </div>
        )}

        {/* Dedicated "Etkinliği Bitir" Button when evaluated */}
        {(isChecked || showAnswers) && (
          <div className="pt-4 border-t border-slate-300 flex justify-center animate-fadeIn">
            <button
              onClick={handleFinish}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-8 py-3.5 rounded-2xl transition-all text-sm cursor-pointer shadow-lg flex items-center gap-2.5 font-cinzel tracking-wide active:scale-95 border-2 border-emerald-400"
            >
              <CheckCircle2 className="w-5 h-5 text-white" />
              <span>Etkinliği Bitir</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
