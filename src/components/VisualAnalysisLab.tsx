import React, { useState, useRef, useEffect } from 'react';
import { Layers, Building2, Shield, Eye, Info, Sparkles, Check, ChevronLeft, ChevronRight, SlidersHorizontal, Scale, AlertCircle, HelpCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface VisualAnalysisLabProps {
  onUnlockBadge: (badgeId: string) => void;
}

interface MatchingTask {
  id: string;
  title: string;
  lisbonContent: string;
  istanbulContent: string;
  correctDimension: 'architecture' | 'social' | 'economic' | 'administration';
  correctType: 'benzerlik' | 'farklilik';
  dimensionTitle: string;
  feedbackMessage: string;
  hintMessage: string;
}

const MATCHING_TASKS: MatchingTask[] = [
  {
    id: 'task-2',
    title: 'Olay 1',
    lisbonContent: 'Voltaire (Candide, Şiir) ile Leibnizci dinsel optimizm eleştirildi; J.J. Rousseau aşırı şehirleşmeyi eleştirip doğaya dönüş tezi sundu. Cizvit eğitimi yerine tüm halka açık yeni eğitim müfredatı kuruldu.',
    istanbulContent: 'Kaza-kader anlayışı ile devlet tedbiri sentezlendi. Şeyhülislam dilenci fetvası yayımladı, Minas Ceranyan felaket şiiri yazdı, Rum ve Ermeni kiliselerinin onarımına Müslüman ustalar gönderildi.',
    correctDimension: 'social',
    correctType: 'farklilik',
    dimensionTitle: 'Sosyal & Düşünsel Boyut',
    feedbackMessage: 'Tebrikler! Harika Buluş! Lizbon felaketi Batı Aydınlanması’nda Kilise ve dinsel optimizmin sorgulanmasına yol açarken; İstanbul felaketi kriz yönetiminde toplumsal birlik, vakıf ihya ve cemaatler arası dayanışmayı pekiştirdiği için bu olay Sosyal bir FARKLILIK’tır.',
    hintMessage: 'İpucu: Bu içerikte Voltaire ve Rousseau’nun felsefi yazıları, Şeyhülislam fetvası, şiirler ve toplumsal cemaatler arası yardımlaşma var. Metni dikkatle inceleyiniz.'
  },
  {
    id: 'task-4',
    title: 'Olay 2',
    lisbonContent: 'Kral I. José ve Bakan Pombal 9 ay Bélem’de çadır ve kulübede ikamet etti. 12 bölge lideri atandı, yağmacılara idam cezası getirildi, 13 soruluk hasar anketi yollandı.',
    istanbulContent: 'Sultan III. Mustafa çadırlarda halka yardım etti ve çadırda yaşadı. Arama-kurtarma ve imar için birer kaymakam, kadı ve subaşı görevlendirildi; yardımda kadın ve çocuklara öncelik tanındı.',
    correctDimension: 'administration',
    correctType: 'benzerlik',
    dimensionTitle: 'İdari & Kriz Yönetimi',
    feedbackMessage: 'Tebrikler! Doğru Tespit! Her iki imparatorluk başkentinde de kriz idaresi hükümdar ve bakan düzeyinde bizzat çadırlarda ikamet edilerek yürütüldüğü için bu olay İdari bir BENZERLİK’tir.',
    hintMessage: 'İpucu: Bu içerikte hükümdarların çadırlarda yaşaması, acil mülki idareciler atanması (kaymakam, kadı, subaşı, 12 bölge lideri) ve asayiş önlemleri yer alıyor. Hangi boyuta ait olabilir?'
  },
  {
    id: 'task-1',
    title: 'Olay 3',
    lisbonContent: 'Eugénio dos Santos ve Carlos Mardel projesi ile 60 feet caddeler ve gemi yapım tekniğinden esinlenen 3D esnek ahşap kafes (Gaiola Pombalina) zorunluluğu.',
    istanbulContent: 'Kâgir yapma zorunluluğu fermanına karşılık halkın ahşap evlerde ısrarı, mahalle yangınlarını önleyen kâgir yangın duvarları (kulaklı duvar) ve Fatih Camii’nin Barok-Osmanlı ihyası.',
    correctDimension: 'architecture',
    correctType: 'benzerlik',
    dimensionTitle: 'Mimari & İmar Boyutu',
    feedbackMessage: 'Tebrikler! Doğru Analiz! Her iki imparatorluk başkenti de sarsıntılara karşı esnek ahşap karkas strüktürler (Gaiola & Ahşap Çatma) geliştirdiği için bu olay Mimari bir BENZERLİK’tir.',
    hintMessage: 'İpucu: Bu olayda ahşap kafes (Gaiola), ahşap çatma evler ve kâgir yangın duvarları gibi fiziki/yapısal yöntemler ele alınıyor. İnceleyerek tekrar eşleştirin.'
  },
  {
    id: 'task-3',
    title: 'Olay 4',
    lisbonContent: 'İthalat gelirlerinden %4 oranında bağış kesintisi yapıldı, soylu sınıfa yeni vergiler getirildi ve 1761’de Kraliyet Hazinesi (Tesouraria Real) kuruldu.',
    istanbulContent: 'Divan-ı Hümayun kararıyla her evden 22 akçe ek vergi toplandı, II. Bayezid Vakfı’nın 4 yıllık geliri tahsis edildi, Kapalıçarşı tonozları tamir edilip narh (tavan fiyat) koyuldu.',
    correctDimension: 'economic',
    correctType: 'farklilik',
    dimensionTitle: 'Ekonomik & Mali Boyut',
    feedbackMessage: 'Tebrikler! Doğru Eşleştirme! Lizbon mali krizi deniz ticareti kesintileri ve Kraliyet Hazinesi kurarak çözerken; İstanbul ek 22 akçe hane vergisi, vakıf gelirleri ve narh (tavan fiyat) sistemiyle yönettiği için bu olay Ekonomik bir FARKLILIK’tır.',
    hintMessage: 'İpucu: Bu içerikte vergiler, ithalat kesintileri, hazine kuruluşu, 22 akçe hane vergisi ve vakıf gelirleri bulunuyor. Hangi boyuta ait olabilir?'
  }
];

export const VisualAnalysisLab: React.FC<VisualAnalysisLabProps> = ({ onUnlockBadge }) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(0);
  
  // User interactive matching selections
  const [selectedDimensions, setSelectedDimensions] = useState<Record<string, 'architecture' | 'social' | 'economic' | 'administration' | null>>({
    'task-1': null,
    'task-2': null,
    'task-3': null,
    'task-4': null
  });

  const [selectedTypes, setSelectedTypes] = useState<Record<string, 'benzerlik' | 'farklilik' | null>>({
    'task-1': null,
    'task-2': null,
    'task-3': null,
    'task-4': null
  });

  const [matchedTasks, setMatchedTasks] = useState<Record<string, boolean>>({
    'task-1': false,
    'task-2': false,
    'task-3': false,
    'task-4': false
  });

  const [feedbackStates, setFeedbackStates] = useState<Record<string, 'none' | 'success' | 'error'>>({
    'task-1': 'none',
    'task-2': 'none',
    'task-3': 'none',
    'task-4': 'none'
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const completedCount = Object.values(matchedTasks).filter(Boolean).length;

  const handleCheckMatching = (taskId: string) => {
    const task = MATCHING_TASKS.find(t => t.id === taskId);
    if (!task) return;

    const chosenDim = selectedDimensions[taskId];
    const chosenType = selectedTypes[taskId];

    if (!chosenDim || !chosenType) {
      alert('Lütfen hem bir Boyut (Mimari/Sosyal/Ekonomik/İdari) hem de bir Tür (Benzerlik/Farklılık) seçiniz!');
      return;
    }

    const isCorrect = chosenDim === task.correctDimension && chosenType === task.correctType;

    if (isCorrect) {
      const updatedMatched = { ...matchedTasks, [taskId]: true };
      setMatchedTasks(updatedMatched);
      setFeedbackStates({ ...feedbackStates, [taskId]: 'success' });

      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 }
      });

      // Check if all 4 matched!
      if (Object.values(updatedMatched).filter(Boolean).length >= MATCHING_TASKS.length) {
        onUnlockBadge('badge-visual');
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      }
    } else {
      setFeedbackStates({ ...feedbackStates, [taskId]: 'error' });
    }
  };

  return (
    <div className="space-y-8">
      
      {/* 1. SECTION: COMPARATIVE VISUAL SLIDER */}
      <div className="bg-[#28303a] border border-[#3d4959] rounded-3xl p-6 shadow-md space-y-4">

        {/* Visual Split Canvas Stage Card */}
        <div
          ref={containerRef}
          className="relative h-[540px] sm:h-[620px] rounded-3xl overflow-hidden border border-[#3d4959] select-none shadow-2xl bg-[#12171e]"
        >
          {/* Base Layer: Right Image (1766 Istanbul Earthquake) */}
          <div className="absolute inset-0 bg-[#12171e] p-3 sm:p-4 flex flex-col justify-between">
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[#3d4959] bg-[#0c1015] flex items-center justify-center">
              <img
                src="/İSTANBULDEPREM4.jpeg"
                alt="Görsel 2: 1766 İstanbul Depremi"
                className="w-full h-full object-contain p-2"
              />
              <div className="absolute top-4 right-4 z-10 pointer-events-none">
                <span className="bg-orange-600/90 backdrop-blur-md text-white border border-orange-400/60 px-3.5 py-1.5 rounded-full text-xs font-bold font-cinzel shadow-xl">
                  Görsel 2: 1766 İstanbul Depremi
                </span>
              </div>
            </div>
          </div>

          {/* Overlapping Left Layer: Left Image (1755 Lisbon Earthquake Tsunami) */}
          <div
            className="absolute inset-y-0 left-0 bg-[#12171e] overflow-hidden border-r-4 border-amber-400 shadow-2xl z-10 p-3 sm:p-4"
            style={{ width: `${sliderPosition}%` }}
          >
            <div
              className="relative h-full flex items-center justify-center rounded-2xl overflow-hidden border border-[#3d4959] bg-[#0c1015]"
              style={{ width: containerWidth ? `${containerWidth - (window.innerWidth >= 640 ? 32 : 24)}px` : '100%' }}
            >
              <img
                src="/LİZBON.jpeg"
                alt="Görsel 1: 1755 Lizbon Depremi"
                className="w-full h-full object-contain p-2"
              />
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <span className="bg-sky-600/90 backdrop-blur-md text-white border border-sky-400/60 px-3.5 py-1.5 rounded-full text-xs font-bold font-cinzel shadow-xl">
                  Görsel 1: 1755 Lizbon Depremi
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Range Slider Input */}
          <input
            type="range"
            min="10"
            max="90"
            value={sliderPosition}
            onChange={e => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          />

          {/* Drag Handle Bar */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-amber-400 z-20 pointer-events-none flex items-center justify-center"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="w-11 h-11 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-2xl border-2 border-slate-900 cursor-ew-resize">
              <ChevronLeft className="w-5 h-5 inline shrink-0" />
              <ChevronRight className="w-5 h-5 inline shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. SECTION: INTERACTIVE MATCHING LAB (Eşleştirme & Anlık Dönüt Laboratuvarı) */}
      <div className="bg-[#28303a] border border-[#3d4959] rounded-3xl p-6 shadow-md space-y-6">
        
        {/* Header with Progress Bar */}
        <div className="border-b border-[#3d4959] pb-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1 font-cinzel">
                Eşleştirme & Vaka Analizi
              </div>
              <h3 className="text-xl font-bold text-slate-100 font-cinzel">
                Tarihsel Durumları Analiz Edin ve Eşleştirin
              </h3>
            </div>
            
            <div className="bg-[#1e242b] px-3.5 py-1.5 rounded-xl border border-[#3d4959] text-xs font-bold font-mono text-amber-400 self-start sm:self-auto">
              {completedCount} / 4
            </div>
          </div>

          {/* Prominent & Explanatory Instruction Box */}
          <div className="bg-[#1a2330] border-l-4 border-amber-400 p-4 rounded-2xl text-xs sm:text-sm text-slate-200 leading-relaxed font-medium shadow-md">
            <span className="font-bold text-amber-400 block mb-1 font-cinzel text-xs uppercase tracking-wider">
              📌 Eşleştirme Yönergesi:
            </span>
            Aşağıda verilen 1755 Lizbon ve 1766 İstanbul depremlerine ait vaka metinlerini okuyunuz. Metindeki konunun hangi <strong>boyuta</strong> (Sosyal, İdari, Mimari veya Ekonomik) ait olduğunu ve durumun iki imparatorluk arasında bir <strong>Benzerlik</strong> mi yoksa <strong>Farklılık</strong> mı gösterdiğini seçerek eşleştirmeyi kontrol ediniz.
          </div>
        </div>

        {/* SINGLE MATCHING TASK CARD (Sequential display) */}
        {(() => {
          const task = MATCHING_TASKS[currentTaskIndex] || MATCHING_TASKS[0];
          return (
            <div key={task.id} className="bg-[#181f28] border-2 border-[#3d4959] rounded-3xl p-5 sm:p-7 space-y-6 shadow-2xl">
              {/* 1. TOP SECTION: HISTORICAL EVENT READOUT CARDS */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold tracking-wider text-slate-300 font-cinzel">
                    Vaka Metinleri
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-md border border-slate-700">
                    Durum #{currentTaskIndex + 1} / 4
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Lisbon Event Card */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-sky-950/80 via-[#111f33] to-[#0d131c] border-2 border-sky-500/50 rounded-2xl p-5 space-y-3 shadow-lg shadow-sky-950/40">
                    <div className="border-b border-sky-500/30 pb-2">
                      <span className="text-xs font-bold text-sky-300 font-cinzel tracking-wide block">
                        1755 Lizbon Etkisi
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                      {task.lisbonContent}
                    </p>
                  </div>

                  {/* Istanbul Event Card */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-amber-950/80 via-[#271d17] to-[#0d131c] border-2 border-amber-500/50 rounded-2xl p-5 space-y-3 shadow-lg shadow-amber-950/40">
                    <div className="border-b border-amber-500/30 pb-2">
                      <span className="text-xs font-bold text-amber-300 font-cinzel tracking-wide block">
                        1766 İstanbul Etkisi
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                      {task.istanbulContent}
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. BOTTOM SECTION: INTERACTIVE MATCHING QUESTIONS PANEL */}
              <div className="bg-[#111720] border-2 border-slate-700/90 p-5 sm:p-6 rounded-2xl space-y-6 shadow-inner">

                {/* Step 1: Dimension Selection */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs font-mono shadow-md">
                      1
                    </span>
                    <label className="text-xs sm:text-sm font-bold text-slate-100 block">
                      Yukarıdaki tarihsel olaylar ve durumlar hangi boyuta aittir?
                    </label>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'social', label: 'Sosyal & Düşünsel' },
                      { id: 'administration', label: 'İdari & Kriz' },
                      { id: 'architecture', label: 'Mimari & İmar' },
                      { id: 'economic', label: 'Ekonomik & Mali' }
                    ].map(dim => {
                      const isSelected = selectedDimensions[task.id] === dim.id;
                      return (
                        <button
                          key={dim.id}
                          onClick={() => setSelectedDimensions({ ...selectedDimensions, [task.id]: dim.id as any })}
                          className={`p-3.5 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-1.5 shadow-md ${
                            isSelected
                              ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 border-amber-300 ring-2 ring-amber-400/50 scale-[1.02]'
                              : 'bg-[#1a222d] border-slate-700 text-slate-200 hover:bg-[#222c3b] hover:border-amber-400/60'
                          }`}
                        >
                          <span>{dim.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Similarity or Difference Tag Selection */}
                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center font-bold text-xs font-mono shadow-md">
                      2
                    </span>
                    <label className="text-xs sm:text-sm font-bold text-slate-100 block">
                      Bu durum bir farklılık mıdır yoksa benzerlik mi?
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    {[
                      { id: 'farklilik', label: 'FARKLILIK', activeClass: 'bg-gradient-to-r from-sky-500 to-sky-400 text-slate-950 border-sky-300 ring-2 ring-sky-400/50 scale-[1.02]' },
                      { id: 'benzerlik', label: 'BENZERLİK', activeClass: 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 border-amber-300 ring-2 ring-amber-400/50 scale-[1.02]' }
                    ].map(type => {
                      const isSelected = selectedTypes[task.id] === type.id;
                      return (
                        <button
                          key={type.id}
                          onClick={() => setSelectedTypes({ ...selectedTypes, [task.id]: type.id as any })}
                          className={`p-3.5 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer text-center shadow-md ${
                            isSelected
                              ? type.activeClass
                              : 'bg-[#1a222d] border-slate-700 text-slate-200 hover:bg-[#222c3b] hover:border-slate-500'
                          }`}
                        >
                          {type.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-3 flex justify-end border-t border-slate-800">
                  <button
                    onClick={() => handleCheckMatching(task.id)}
                    className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold px-7 py-3 rounded-xl transition-all shadow-xl font-cinzel text-xs flex items-center justify-center gap-2 cursor-pointer scale-[1.01] active:scale-[0.99]"
                  >
                    EŞLEŞTİRMEYİ KONTROL ET & DÖNÜTÜ GÖR
                  </button>
                </div>
              </div>

              {/* IMMEDIATE EDUCATIONAL FEEDBACK DISPLAY */}
              {feedbackStates[task.id] === 'success' && (
                <div className="bg-emerald-950/80 border-2 border-emerald-500 p-4 rounded-2xl space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider font-cinzel">
                    Anlık Öğretici Geri Dönüt (Başarılı Eşleştirme):
                  </div>
                  <p className="text-xs text-emerald-200 leading-relaxed font-medium">
                    {task.feedbackMessage}
                  </p>
                </div>
              )}

              {feedbackStates[task.id] === 'error' && (
                <div className="bg-rose-950/80 border-2 border-rose-500/80 p-4 rounded-2xl space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider font-cinzel">
                    Öğretici İpucu & Geri Dönüt:
                  </div>
                  <p className="text-xs text-rose-200 leading-relaxed font-medium">
                    {task.hintMessage}
                  </p>
                </div>
              )}

              {/* Sequential Bottom Navigation */}
              <div className="flex items-center justify-between pt-3 border-t border-[#3d4959]">
                <button
                  onClick={() => setCurrentTaskIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentTaskIndex === 0}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#161c23] border border-[#3d4959] text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Önceki
                </button>

                <button
                  onClick={() => setCurrentTaskIndex(prev => Math.min(MATCHING_TASKS.length - 1, prev + 1))}
                  disabled={currentTaskIndex === MATCHING_TASKS.length - 1}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 cursor-pointer font-cinzel shadow-md"
                >
                  Sonraki <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })()}

      </div>
    </div>
  );
};
