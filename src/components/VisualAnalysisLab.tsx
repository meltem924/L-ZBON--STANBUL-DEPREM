import React, { useState, useRef, useEffect } from 'react';
import { Layers, Building2, Shield, Eye, Info, Sparkles, Check, ChevronLeft, ChevronRight, SlidersHorizontal, Scale, AlertCircle, HelpCircle, CheckCircle2, RefreshCw, Lock } from 'lucide-react';
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
  strongHintMessage: string;
}

const MATCHING_TASKS: MatchingTask[] = [
  {
    id: 'task-1',
    title: 'Vaka 1: Toplumsal Hayat & Basın-İaşet Basısı',
    lisbonContent: 'Basının ticari kaygılarla sansasyonel bir dil kullanıp gazetelerde 1757/1758 yıllarında geçmesi beklenen Halley kuyruklu yıldızının felakete yol açacağına dair dehşet haberleri yayımlaması; %85’i yıkılan kentte halkın inanç krizine düşmesi.',
    istanbulContent: 'Fırın ve değirmenlerin (Samatya’da surlara bitişik 4 değirmenin) yıkılmasıyla buğdayın çürüme tehlikesi geçirmesi, fırın tamirine öncelik verilmesi, yapılmazsa satılması emredilmesi ve yardım dağıtımında kadın ve çocuklara öncelik tanınması.',
    correctDimension: 'social',
    correctType: 'farklilik',
    dimensionTitle: 'Sosyal & Düşünsel Boyut',
    feedbackMessage: 'Tebrikler! Lizbon felaketi basının Halley kuyruklu yıldızı sansasyonu ve halkta inanç krizi yaratmasıyla öne çıkarken; İstanbul kriz yönetimi fırın/değirmen iaşe önlemleri ile kadın ve çocuklara sosyal yardım önceliği sunduğu için bu durum Sosyal bir FARKLILIK’tır.',
    hintMessage: 'İpucu: Bu içerikte gazetelerdeki Halley kuyruklu yıldızı haberleri, inanç tartışmaları, Samatya değirmenleri ve yardım dağıtımında kadın ve çocuk önceliği var. Metni dikkatle inceleyiniz.',
    strongHintMessage: '💡 Cevaba Yönelik Rehber İpucu: Gazetelerdeki kuyruklu yıldız haberleri, halkın yaşadığı inanç sarsıntısı, değirmenlerin bozulması ve kadın/çocuklara yardım önceliği toplumsal hayatı ve zihniyeti ilgilendirir. İki başkentte farklı durumlar yaşandığı için doğru seçenek: SOSYAL boyut ve FARKLILIK\'tır.'
  },
  {
    id: 'task-2',
    title: 'Vaka 2: Asayiş, Sağlık & Adli Kurumlar',
    lisbonContent: 'Salgın hastalık tehlikesine karşı vefat edenlerin Kilise izniyle dinî tören yapılmadan Tagus Nehri’ne batırılması, yağma ve hırsızlığın idamla cezalandırılması, geçici adli birimler kurulup arşiv kayıtlarının yenilenmesi.',
    istanbulContent: 'Zarar gören mahkeme binalarının boşaltılarak geçici adli birimler oluşturulmasıyla hukuk işlerinin devamlılığının sağlanması; yıkılan medreseler yerine müderrislerin geçici ders halkaları kurması.',
    correctDimension: 'administration',
    correctType: 'benzerlik',
    dimensionTitle: 'İdari & Kriz Yönetimi',
    feedbackMessage: 'Tebrikler! Her iki imparatorluk başkenti de adalet mekanizmasını aksatmamak için geçici adli birimler kurduğu ve krizde asayiş/kamu düzenini sağladığı için bu olay İdari bir BENZERLİK’tir.',
    hintMessage: 'İpucu: Bu içerikte geçici adli birimlerin kurulması, arşiv kayıtlarının yenilenmesi, mahkeme binalarının taşınması ve idari asayiş tedbirleri yer alıyor.',
    strongHintMessage: '💡 Cevaba Yönelik Rehber İpucu: Geçici adli birimlerin kurulması, arşiv kayıtlarının yenilenmesi ve mahkeme binalarının taşınması hukuk idaresi ve devlet yönetimiyle ilgilidir. Her iki devlet de adalet mekanizmasını kesintisiz işlettiği için doğru seçenek: İDARİ boyut ve BENZERLİK\'tir.'
  },
  {
    id: 'task-3',
    title: 'Vaka 3: İmar Planlaması & Yapı Hasar Sınıfları',
    lisbonContent: 'Rossio ile rıhtım arasının düzleştirilip dik batı yamaçlarının azaltılması; demir, ahşap bağlantı, kiremit ve seramik parçaların önceden standart üretilmesi ve su kıyısına büyük Ticaret Meydanı yapılması.',
    istanbulContent: 'Depremde hasar gören yapıların işlevlerine göre sınıflandırılmasında %30 Cami, %20 Eğitim Binası, %15 Mirî Hizmet Binası (Devlet binası) tespiti yapılması ve ahşap evlerin arasına kâgir yangın duvarları örülmesi.',
    correctDimension: 'architecture',
    correctType: 'farklilik',
    dimensionTitle: 'Mimari & İmar Boyutu',
    feedbackMessage: 'Tebrikler! Lizbon ızgara plan (grid) ve standart önceden üretilmiş yapı elemanlarıyla Ticaret Meydanı etrafında inşa edilirken; İstanbul %30 cami, %20 eğitim, %15 mirî bina tespiti ve kâgir yangın duvarlarıyla (kulaklı duvar) imar edildiği için bu durum Mimari bir FARKLILIK’tır.',
    hintMessage: 'İpucu: Bu vaka Lizbon’un arazi düzleştirme ve standart üretim teknikleri ile İstanbul’un işlevsel yapı hasar sınıflarını (cami, eğitim, mirî bina) karşılaştırıyor.',
    strongHintMessage: '💡 Cevaba Yönelik Rehber İpucu: Izgara şehir planı, standart üretim malzemeleri ile binaların işlevlerine göre hasar tespiti (%30 cami, %20 medrese vb.) ve kâgir yangın duvarları şehir mimarisiyle ilgilidir. İki kentin imar yaklaşımları farklı olduğu için doğru seçenek: MİMARİ boyut ve FARKLILIK\'tır.'
  },
  {
    id: 'task-4',
    title: 'Vaka 4: Piyasa Müdahalesi & Hazine Desteği',
    lisbonContent: 'Sömürge ticareti ağlarının sekteye uğraması sonrası Brezilya, Hindistan ve Afrika’ya savaş gemileri sevk edilerek ticaretin güvenli olduğu mesajının verilmesi, vergilerin askıya alınması ve kamu harcamalarının bütçeden karşılanması.',
    istanbulContent: 'İnşaat sektöründe ve gıdada fiyat artışlarını önlemek amacıyla narh (tavan fiyat) uygulaması getirilmesi, Sultan II. Bayezid Vakfı’nın 4 yıllık gelirinin ayrılması ve imar masraflarının kamusal kaynaklarla karşılanması.',
    correctDimension: 'economic',
    correctType: 'benzerlik',
    dimensionTitle: 'Ekonomik & Mali Boyut',
    feedbackMessage: 'Tebrikler! Her iki devlet de piyasa istikrarını ve kamu kaynaklarını seferber ederek afet harcamalarını bütçe, vakıf ve devlet imkânlarıyla karşıladığı için bu durum Ekonomik bir BENZERLİK’tir.',
    hintMessage: 'İpucu: Bu içerikte narh uygulaması, savaş gemileriyle ticari güven tazelenmesi, vakıf gelirlerinin ayrılması ve kamu harcamalarının bütçeden karşılanması ele alınıyor.',
    strongHintMessage: '💡 Cevaba Yönelik Rehber İpucu: Ticaret gemileriyle güven verilmesi, fiyat artışlarına karşı narh (tavan fiyat) konulması, vakıf ve devlet hazinesi desteği finans ve bütçe idaresiyle ilgilidir. Her iki devlet de piyasaya müdahale ettiği için doğru seçenek: EKONOMİK boyut ve BENZERLİK\'tir.'
  }
];

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const DIMENSION_OPTIONS = [
  { id: 'social', label: 'Sosyal & Düşünsel' },
  { id: 'administration', label: 'İdari & Kriz' },
  { id: 'architecture', label: 'Mimari & İmar' },
  { id: 'economic', label: 'Ekonomik & Mali' }
];

export const VisualAnalysisLab: React.FC<VisualAnalysisLabProps> = ({ onUnlockBadge, onNavigateNext }) => {
  // Shuffle tasks and dimensions per session so order is completely mixed
  const [matchingTasks] = useState<MatchingTask[]>(() => shuffleArray(MATCHING_TASKS));
  const [dimensionOptions] = useState(() => shuffleArray(DIMENSION_OPTIONS));

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

  const [attemptCounts, setAttemptCounts] = useState<Record<string, number>>({
    'task-1': 0,
    'task-2': 0,
    'task-3': 0,
    'task-4': 0
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
    const task = matchingTasks.find(t => t.id === taskId);
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
      if (Object.values(updatedMatched).filter(Boolean).length >= matchingTasks.length) {
        onUnlockBadge('badge-visual');
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      }
    } else {
      const nextCount = (attemptCounts[taskId] || 0) + 1;
      setAttemptCounts({ ...attemptCounts, [taskId]: nextCount });
      setFeedbackStates({ ...feedbackStates, [taskId]: 'error' });
    }
  };

  return (
    <div className="space-y-8">
      
      {/* 1. SECTION: COMPARATIVE VISUAL SLIDER */}
      <div className="bg-white border-2 border-slate-300 rounded-3xl p-6 shadow-sm space-y-4">

        {/* Visual Split Canvas Stage Card */}
        <div
          ref={containerRef}
          className="relative h-[540px] sm:h-[620px] rounded-3xl overflow-hidden border-2 border-slate-300 select-none shadow-md bg-slate-900"
        >
          {/* Base Layer: Right Image (1766 Istanbul Earthquake) */}
          <div className="absolute inset-0 bg-slate-900 p-3 sm:p-4 flex flex-col justify-between">
            <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-950 flex items-center justify-center">
              <img
                src={`${import.meta.env.BASE_URL}istanbul_deprem4.jpeg`}
                alt="Görsel 2: 1766 İstanbul Depremi"
                className="w-full h-full object-contain p-2"
              />
              <div className="absolute top-4 right-4 z-10 pointer-events-none">
                <span className="bg-orange-600/95 backdrop-blur-md text-white border border-orange-400/60 px-3.5 py-1.5 rounded-full text-xs font-bold font-cinzel shadow-lg">
                  Görsel 2: 1766 İstanbul Depremi
                </span>
              </div>
            </div>
          </div>

          {/* Overlapping Left Layer: Left Image (1755 Lisbon Earthquake Tsunami) */}
          <div
            className="absolute inset-y-0 left-0 bg-slate-900 overflow-hidden border-r-4 border-amber-400 shadow-2xl z-10 p-3 sm:p-4"
            style={{ width: `${sliderPosition}%` }}
          >
            <div
              className="relative h-full flex items-center justify-center rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-950"
              style={{ width: containerWidth ? `${containerWidth - (window.innerWidth >= 640 ? 32 : 24)}px` : '100%' }}
            >
              <img
                src={`${import.meta.env.BASE_URL}lizbon.jpeg`}
                alt="Görsel 1: 1755 Lizbon Depremi"
                className="w-full h-full object-contain p-2"
              />
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <span className="bg-sky-600/95 backdrop-blur-md text-white border border-sky-400/60 px-3.5 py-1.5 rounded-full text-xs font-bold font-cinzel shadow-lg">
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
            <div className="w-11 h-11 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-xl border-2 border-slate-900 cursor-ew-resize">
              <ChevronLeft className="w-5 h-5 inline shrink-0" />
              <ChevronRight className="w-5 h-5 inline shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. SECTION: INTERACTIVE MATCHING LAB (Eşleştirme & Anlık Dönüt Laboratuvarı) */}
      <div className="bg-white border-2 border-slate-300 rounded-3xl p-6 shadow-sm space-y-6">
        
        {/* Header with Progress Bar */}
        <div className="border-b border-slate-300 pb-5 space-y-3">
          <div className="flex items-center justify-end gap-3">
            <div className="bg-slate-100 px-3.5 py-1.5 rounded-xl border border-slate-300 text-xs font-bold font-mono text-amber-800">
              {completedCount} / 4
            </div>
          </div>

          {/* Prominent & Explanatory Instruction Box */}
          <div className="bg-amber-50/80 border-l-4 border-amber-500 p-4 rounded-2xl text-xs sm:text-sm text-slate-800 leading-relaxed font-medium shadow-none border-t border-b border-r border-amber-300">
            <span className="font-bold text-amber-900 block mb-1 font-cinzel text-xs uppercase tracking-wider">
              📌 Eşleştirme Yönergesi:
            </span>
            Aşağıda verilen 1755 Lizbon ve 1766 İstanbul depremlerine ait vaka metinlerini okuyunuz. Metindeki konunun hangi <strong>boyuta</strong> (Sosyal, İdari, Mimari veya Ekonomik) ait olduğunu ve durumun iki imparatorluk arasında bir <strong>Benzerlik</strong> mi yoksa <strong>Farklılık</strong> mı gösterdiğini seçerek eşleştirmeyi kontrol ediniz.
          </div>
        </div>

        {/* SINGLE MATCHING TASK CARD (Sequential display) */}
        {(() => {
          const task = matchingTasks[currentTaskIndex] || matchingTasks[0];
          return (
            <div key={task.id} className="bg-slate-50 border-2 border-slate-300 rounded-3xl p-5 sm:p-7 space-y-6 shadow-xs">
              {/* 1. TOP SECTION: HISTORICAL EVENT READOUT CARDS */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold tracking-wider text-amber-900 font-cinzel">
                    Vaka {currentTaskIndex + 1} / {matchingTasks.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Lisbon Event Card */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-sky-50/50 border-2 border-sky-400 rounded-2xl p-5 space-y-3 shadow-xs">
                    <div className="border-b border-sky-300 pb-2">
                      <span className="text-xs font-bold text-sky-900 font-cinzel tracking-wide block">
                        1755 Lizbon Etkisi
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                      {task.lisbonContent}
                    </p>
                  </div>

                  {/* Istanbul Event Card */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-amber-50/50 border-2 border-amber-400 rounded-2xl p-5 space-y-3 shadow-xs">
                    <div className="border-b border-amber-300 pb-2">
                      <span className="text-xs font-bold text-amber-900 font-cinzel tracking-wide block">
                        1766 İstanbul Etkisi
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                      {task.istanbulContent}
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. BOTTOM SECTION: INTERACTIVE MATCHING QUESTIONS PANEL */}
              <div className="bg-white border-2 border-slate-300 p-5 sm:p-6 rounded-2xl space-y-6 shadow-xs">

                {/* Step 1: Dimension Selection */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs font-mono shadow-sm">
                      1
                    </span>
                    <label className="text-xs sm:text-sm font-bold text-slate-900 block">
                      Yukarıdaki tarihsel olaylar ve durumlar hangi boyuta aittir?
                    </label>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {dimensionOptions.map(dim => {
                      const isSelected = selectedDimensions[task.id] === dim.id;
                      return (
                        <button
                          key={dim.id}
                          onClick={() => setSelectedDimensions({ ...selectedDimensions, [task.id]: dim.id as any })}
                          className={`p-3.5 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-1.5 shadow-xs ${
                            isSelected
                              ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 border-amber-500 ring-2 ring-amber-400/50 scale-[1.02] shadow-sm'
                              : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-amber-400'
                          }`}
                        >
                          <span>{dim.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Similarity or Difference Tag Selection */}
                <div className="space-y-3 pt-4 border-t border-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs font-mono shadow-sm">
                      2
                    </span>
                    <label className="text-xs sm:text-sm font-bold text-slate-900 block">
                      Bu durum bir farklılık mıdır yoksa benzerlik mi?
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    {[
                      { id: 'farklilik', label: 'FARKLILIK', activeClass: 'bg-gradient-to-r from-sky-500 to-sky-400 text-slate-950 border-sky-400 ring-2 ring-sky-400/50 scale-[1.02] shadow-sm' },
                      { id: 'benzerlik', label: 'BENZERLİK', activeClass: 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 border-amber-400 ring-2 ring-amber-400/50 scale-[1.02] shadow-sm' }
                    ].map(type => {
                      const isSelected = selectedTypes[task.id] === type.id;
                      return (
                        <button
                          key={type.id}
                          onClick={() => setSelectedTypes({ ...selectedTypes, [task.id]: type.id as any })}
                          className={`p-3.5 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer text-center shadow-xs ${
                            isSelected
                              ? type.activeClass
                              : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400'
                          }`}
                        >
                          {type.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-3 flex justify-center border-t border-slate-300">
                  <button
                    onClick={() => handleCheckMatching(task.id)}
                    className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold px-7 py-3 rounded-xl transition-all shadow-md border border-amber-500 font-cinzel text-xs flex items-center justify-center gap-2 cursor-pointer scale-[1.01] active:scale-[0.99]"
                  >
                    EŞLEŞTİRMEYİ KONTROL ET & DÖNÜTÜ GÖR
                  </button>
                </div>
              </div>

              {/* IMMEDIATE EDUCATIONAL FEEDBACK DISPLAY */}
              {feedbackStates[task.id] === 'success' && (
                <div className="bg-emerald-50 border-2 border-emerald-500 p-4 rounded-2xl animate-fadeIn">
                  <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                    {task.feedbackMessage}
                  </p>
                </div>
              )}

              {feedbackStates[task.id] === 'error' && (
                (attemptCounts[task.id] || 0) >= 2 ? (
                  <div className="bg-amber-50/95 border-2 border-amber-500 p-4.5 rounded-2xl space-y-2 animate-fadeIn shadow-sm">
                    <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider font-cinzel">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Rehber İpucu (2. Deneme):</span>
                    </div>
                    <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                      {task.strongHintMessage}
                    </p>
                  </div>
                ) : (
                  <div className="bg-rose-50 border-2 border-rose-500 p-4 rounded-2xl space-y-2 animate-fadeIn">
                    <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider font-cinzel">
                      Geri Dönüt:
                    </div>
                    <p className="text-xs text-rose-950 leading-relaxed font-medium">
                      {task.hintMessage}
                    </p>
                  </div>
                )
              )}

              {/* Sequential Bottom Navigation */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-300">
                <button
                  onClick={() => setCurrentTaskIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentTaskIndex === 0}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-white border-2 border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 cursor-pointer font-cinzel"
                >
                  <ChevronLeft className="w-4 h-4" /> Önceki
                </button>

                <button
                  onClick={() => {
                    const isTaskDone = matchedTasks[task.id] === true;
                    if (!isTaskDone) {
                      alert('Sonraki vakaya geçebilmek için lütfen mevcut vakanın eşleştirmesini doğru yaparak gönderiniz!');
                      return;
                    }
                    setCurrentTaskIndex(prev => Math.min(matchingTasks.length - 1, prev + 1));
                  }}
                  disabled={!matchedTasks[task.id] || currentTaskIndex === matchingTasks.length - 1}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 font-cinzel ${
                    matchedTasks[task.id] && currentTaskIndex < matchingTasks.length - 1
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer shadow-sm shadow-amber-500/20 active:scale-95 border border-amber-500'
                      : 'bg-slate-100 border border-slate-300 text-slate-400 opacity-60 cursor-not-allowed'
                  }`}
                  title={!matchedTasks[task.id] ? 'Mevcut soruyu doğru yanıtladıktan sonra açılır' : ''}
                >
                  <span>Sonraki</span>
                  {matchedTasks[task.id] ? (
                    <ChevronRight className="w-4 h-4 text-slate-950" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-amber-600/70" />
                  )}
                </button>
              </div>

            </div>
          );
        })()}

      </div>

      {/* 2. Bölüm Tamamlama & 3. Bölüm Kilidi Açılma Bildirimi */}
      {completedCount >= matchingTasks.length && (
        <div className="bg-emerald-50 border-2 border-emerald-400 p-5 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-fadeIn">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-sm shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-emerald-950 font-cinzel">
                Tebrikler! 2. Bölüm Analiz Mührü Kazanıldı!
              </h4>
              <p className="text-xs text-emerald-800 font-medium mt-0.5">
                4 vaka analizinin tamamını doğru eşleştirdiniz. <strong>3. Bölüm (Karşılaştırma)</strong> kilitleri açıldı!
              </p>
            </div>
          </div>

          {onNavigateNext && (
            <button
              onClick={onNavigateNext}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-6 py-3 rounded-2xl transition-all text-xs cursor-pointer shadow-md shrink-0 flex items-center gap-2 font-cinzel tracking-wide active:scale-95"
            >
              <span>3. Bölüm'e Geç (Karşılaştırma)</span>
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
