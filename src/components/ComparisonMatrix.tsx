import React, { useState } from 'react';
import { LayoutGrid, CheckCircle2, HelpCircle, ArrowRight, Sparkles, RefreshCw, Layers, Info, Check, AlertCircle, RotateCcw, Eye, ShieldCheck, Undo2 } from 'lucide-react';
import { ComparisonCard } from '../types';
import { COMPARISON_CARDS } from '../data/earthquakeData';
import confetti from 'canvas-confetti';

interface ComparisonMatrixProps {
  onUnlockBadge: (badgeId: string) => void;
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

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({ onUnlockBadge }) => {
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
      onUnlockBadge('badge-matrix');
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

    onUnlockBadge('badge-matrix');
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

    let cardStyle = 'bg-[#1e2733] border-sky-500/40 text-slate-100';
    if (zone === 'both') cardStyle = 'bg-[#2b2219] border-amber-500/40 text-slate-100';
    if (zone === 'istanbul') cardStyle = 'bg-[#2e1d1b] border-orange-500/40 text-slate-100';

    if (showStatus) {
      if (isAutoFixed) {
        cardStyle = 'bg-purple-950/90 border-2 border-purple-400 text-purple-100 shadow-lg shadow-purple-950/60 ring-2 ring-purple-400/40 animate-fadeIn';
      } else if (isUserCorrect) {
        cardStyle = 'bg-[#15342a] border-emerald-500/60 text-emerald-100';
      } else {
        cardStyle = 'bg-[#3e1d24] border-rose-500/60 text-rose-100';
      }
    }

    return (
      <div
        key={card.id}
        className={`p-3.5 rounded-2xl border text-xs space-y-2 transition-all shadow-sm ${cardStyle}`}
      >
        <div className="flex items-start justify-between gap-2">
          <span className="font-bold text-slate-100">{card.text}</span>
          
          {/* Geri Al / Geri Gitsin Button (Only if not in showAnswers auto-fixed state) */}
          {!showAnswers && (
            <button
              onClick={() => handleUndoCard(card.id)}
              title="Kartı sütundan çıkar ve yeniden seç"
              className="shrink-0 flex items-center gap-1 text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-lg border border-slate-600 transition-colors cursor-pointer font-mono"
            >
              <Undo2 className="w-3 h-3 text-amber-400" /> Geri Al
            </button>
          )}
        </div>

        {/* Feedback Explanation if Checked or Show Answers */}
        {showStatus && (
          <div className="text-[11px] font-medium leading-normal border-t border-slate-700/50 pt-2 space-y-1">
            <div className="flex items-center gap-1">
              {isAutoFixed ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-purple-300 shrink-0" />
                  <span className="text-purple-300 font-bold uppercase tracking-wider text-[10px]">
                    🔮 Cevap Gösterildi (Doğru Konumu)
                  </span>
                </>
              ) : isUserCorrect ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
                    ✓ Sizin Doğru Yerleşiminiz
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span className="text-rose-400 font-bold uppercase tracking-wider text-[10px]">
                    Hatalı Yerleşim
                  </span>
                </>
              )}
            </div>
            <p className="text-slate-200">
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
        <div className="bg-[#1c232c] border-2 border-amber-500/60 rounded-3xl p-5 shadow-xl animate-fadeIn">
          <div className="text-base font-bold text-slate-100 bg-[#28303a] p-4 rounded-2xl border border-[#3d4959] leading-relaxed shadow-sm font-serif">
            "{activeCard.text}"
          </div>
        </div>
      ) : (
        <div className="bg-[#1c232c] border border-emerald-500/50 rounded-3xl p-4 flex items-center justify-between gap-4">
          <div className="text-xs font-bold text-emerald-400 font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Tüm 9 etki kartı sütunlara yerleştirildi. Aşağıdaki "Kontrol Et" butonuna basarak değerlendiriniz.
          </div>
          <button
            onClick={handleResetAll}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer font-cinzel"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Tümünü Sıfırla
          </button>
        </div>
      )}

      {/* 3 COLUMNS CLASSIFICATION MATRIX STAGE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* COLUMN 1: LISBON ONLY */}
        <div className="bg-[#1b2938] border border-[#2b425b] rounded-3xl p-5 flex flex-col space-y-4 shadow-md">
          <button
            disabled={!activeCard}
            onClick={() => activeCard && handleAssignCard(activeCard.id, 'lisbon')}
            className={`w-full p-4 rounded-2xl border text-center transition-all shadow-md font-cinzel ${
              activeCard
                ? 'bg-[#0284c7] hover:bg-sky-500 text-white border-sky-400 cursor-pointer ring-2 ring-sky-400/50 scale-[1.02]'
                : 'bg-sky-950/40 border-sky-500/30 text-sky-300/70 cursor-default'
            }`}
          >
            <h4 className="font-bold text-sm flex items-center justify-center gap-1.5">
              <span>🌊 Sadece Lizbon'a Özgü Etkiler</span>
            </h4>
          </button>

          <div className="flex-1 space-y-3 min-h-[220px]">
            {COMPARISON_CARDS.filter(c => placements[c.id] === 'lisbon').map(card => renderCardItem(card, 'lisbon'))}
          </div>
        </div>

        {/* COLUMN 2: BOTH (SIMILARITIES) */}
        <div className="bg-[#32271c] border border-[#543f29] rounded-3xl p-5 flex flex-col space-y-4 shadow-md">
          <button
            disabled={!activeCard}
            onClick={() => activeCard && handleAssignCard(activeCard.id, 'both')}
            className={`w-full p-4 rounded-2xl border text-center transition-all shadow-md font-cinzel ${
              activeCard
                ? 'bg-amber-600 hover:bg-amber-500 text-white border-amber-400 cursor-pointer ring-2 ring-amber-400/50 scale-[1.02]'
                : 'bg-amber-950/40 border-amber-500/30 text-amber-300/70 cursor-default'
            }`}
          >
            <h4 className="font-bold text-sm flex items-center justify-center gap-1.5">
              <span>⚖️ Her İki Depremde Ortak Etkiler</span>
            </h4>
          </button>

          <div className="flex-1 space-y-3 min-h-[220px]">
            {COMPARISON_CARDS.filter(c => placements[c.id] === 'both').map(card => renderCardItem(card, 'both'))}
          </div>
        </div>

        {/* COLUMN 3: ISTANBUL ONLY */}
        <div className="bg-[#341f1c] border border-[#56312a] rounded-3xl p-5 flex flex-col space-y-4 shadow-md">
          <button
            disabled={!activeCard}
            onClick={() => activeCard && handleAssignCard(activeCard.id, 'istanbul')}
            className={`w-full p-4 rounded-2xl border text-center transition-all shadow-md font-cinzel ${
              activeCard
                ? 'bg-orange-600 hover:bg-orange-500 text-white border-orange-400 cursor-pointer ring-2 ring-orange-400/50 scale-[1.02]'
                : 'bg-orange-950/40 border-orange-500/30 text-orange-300/70 cursor-default'
            }`}
          >
            <h4 className="font-bold text-sm flex items-center justify-center gap-1.5">
              <span>🕌 Sadece İstanbul'a Özgü Etkiler</span>
            </h4>
          </button>

          <div className="flex-1 space-y-3 min-h-[220px]">
            {COMPARISON_CARDS.filter(c => placements[c.id] === 'istanbul').map(card => renderCardItem(card, 'istanbul'))}
          </div>
        </div>

      </div>

      {/* BOTTOM CONTROL & EVALUATION AREA */}
      <div className="bg-[#28303a] border border-[#3d4959] rounded-3xl p-6 shadow-xl space-y-4">
        
        {/* Kontrol Et / Yeniden Dene / Cevapları Göster Action Buttons */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {!isChecked || isAllCorrect ? (
            <button
              disabled={!isAllPlaced}
              onClick={handleCheck}
              className={`px-8 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg font-cinzel flex items-center gap-2 ${
                isAllPlaced
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer ring-4 ring-amber-500/30 scale-[1.03]'
                  : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-60'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Kontrol Et
            </button>
          ) : (
            <>
              {/* Transforms Kontrol Et button into Yeniden Dene */}
              <button
                onClick={handleRetry}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 py-3 rounded-2xl transition-all shadow-lg font-cinzel text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer ring-4 ring-amber-500/30 scale-[1.03]"
              >
                <RotateCcw className="w-4 h-4" /> Yeniden Dene
              </button>

              {/* Cevapları Göster button triggers handleShowAnswers */}
              <button
                onClick={handleShowAnswers}
                className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-8 py-3 rounded-2xl transition-all shadow-lg font-cinzel text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4" /> Cevapları Göster
              </button>
            </>
          )}
        </div>

        {/* FEEDBACK AFTER CHECK IS CLICKED */}
        {isChecked && isAllCorrect && (
          <div className="bg-emerald-950/90 border-2 border-emerald-500 p-5 rounded-2xl space-y-2 animate-fadeIn shadow-2xl">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm font-cinzel">
              <Sparkles className="w-5 h-5 text-emerald-400" /> Tebrikler! Tüm Etkileri Doğru Sınıflandırdınız!
            </div>
            <p className="text-xs text-emerald-200 leading-relaxed font-medium">
              1755 Lizbon ve 1766 İstanbul depremlerinin toplumsal, idari, düşünsel ve mimari etkilerini kusursuz bir şekilde analiz ederek doğru sütunlara yerleştirdiniz.
            </p>
          </div>
        )}

        {isChecked && !isAllCorrect && (
          <div className="bg-rose-950/90 border-2 border-rose-500/80 p-5 rounded-2xl space-y-2 animate-fadeIn shadow-2xl">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm font-cinzel">
              <AlertCircle className="w-5 h-5 text-rose-400" /> Bazı Kartlar Hatalı Sütunlara Yerleştirildi
            </div>
            <p className="text-xs text-rose-200 leading-relaxed font-medium">
              Toplam {totalCount} karttan {correctCount} tanesi doğru yerleştirildi. Yanlış yerleştirilen kartları düzeltmek için yukarıdaki "Yeniden Dene" veya tüm otomatik doğru konumları mor renkli olarak görmek için "Cevapları Göster" butonunu kullanabilirsiniz.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
