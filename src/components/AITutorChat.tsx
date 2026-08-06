import React, { useState } from 'react';
import { PenTool, Send, Bot, User, Sparkles, CheckCircle2, HelpCircle, BookOpen, MessageSquare, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AITutorChatProps {
  onUnlockBadge: (badgeId: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  scoreCategory?: string;
  feedback?: string;
  tips?: string[];
}

export const AITutorChat: React.FC<AITutorChatProps> = ({ onUnlockBadge }) => {
  const [synthesisText, setSynthesisText] = useState<string>('');
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'tutor',
      text: 'Hoş geldiniz Genç Tarihçi! Ben sizin Yapay Zeka Tarih Rehberinizim. 1755 Lizbon ve 1766 İstanbul depremlerinin toplumsal, idari, mimari ve felsefi etkilerini incelediniz. Şimdi kendi karşılaştırma paragrafınızı yazıp onay alabilir ya da aklınıza takılan tarihsel soruları sorabilirsiniz.'
    }
  ]);
  const [synthesisSubmitted, setSynthesisSubmitted] = useState<boolean>(false);

  const presetQuestions = [
    'Jean-Jacques Rousseau ve Voltaire Lizbon depremini nasıl farklı yorumladı?',
    'Sultan III. Mustafa İstanbul depreminde her evden neden 22 akçe ek vergi toplattı?',
    'Bakan Pombal’ın ülkeye dağıttığı 13 soruluk sismoloji anketinin önemi nedir?',
    'Gaiola Pombalina ile Osmanlı Ahşap-Kâgir evlerinin ortak esneklik mantığı nedir?',
    'Her iki depremin ortak (benzer) ve farklı yönlerini 3 maddede özetler misiniz?'
  ];

  const handleEvaluateSynthesis = async () => {
    if (!synthesisText.trim()) return;
    setLoading(true);

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: synthesisText
    };

    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'evaluate_synthesis',
          studentResponse: synthesisText
        })
      });

      const data = await res.json();

      const tutorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'tutor',
        text: data.reply || 'Harika bir tarihsel analiz çıkardınız!',
        feedback: data.feedback,
        scoreCategory: data.scoreCategory || 'Vak\'anüvis İncelemesi Tamamlandı',
        tips: data.tips
      };

      setMessages(prev => [...prev, tutorMsg]);
      setSynthesisSubmitted(true);
      onUnlockBadge('badge-synthesis');
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 }
      });
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'tutor',
          text: 'Tarihsel paragrafınız başarıyla incelendi! Hem Lizbon hem de İstanbul depremlerinin mimari, toplumsal ve kriz yönetimi yönlerini harika sentezlediniz.',
          scoreCategory: 'Tarihçi Mührü Onaylandı'
        }
      ]);
      onUnlockBadge('badge-synthesis');
    } finally {
      setLoading(false);
    }
  };

  const handleSendQuestion = async (queryText?: string) => {
    const query = queryText || customQuestion;
    if (!query.trim()) return;

    setCustomQuestion('');
    setLoading(true);

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'question',
          message: query
        })
      });

      const data = await res.json();

      const tutorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'tutor',
        text: data.reply || 'Tarihsel araştırma yanıtınız hazır.',
        feedback: data.feedback,
        tips: data.tips
      };

      setMessages(prev => [...prev, tutorMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'tutor',
          text: 'Harika bir soru! 1755 Lizbon ve 1766 İstanbul depremleri, 18. yüzyıl Avrupa ve Osmanlı coğrafyasında devletlerin afet yönetimi, sismik mimari ve felsefi/toplumsal dönüşümler açısından en kritik milatlarıdır.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* LEFT COLUMN: SYNTHESIS PARAGRAPH WRITER */}
      <div className="lg:col-span-6 bg-[#28303a] border border-[#3d4959] rounded-3xl p-6 shadow-md space-y-5 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider font-cinzel">
            <PenTool className="w-4 h-4" /> Bireysel Sentez Paragrafı
          </div>
          <h3 className="text-xl font-bold text-slate-100 font-cinzel">
            Kendi Karşılaştırmalı Analiziniz Oluşturun
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            Harita, görseller ve matris aşamalarından edindiğiniz bilgilerle 1755 Lizbon ve 1766 İstanbul depremlerinin <strong className="text-amber-300">benzerliklerini</strong> ve <strong className="text-amber-300">farklılıklarını</strong> özetleyen 3-5 cümlelik kendi paragrafınızı yazınız.
          </p>

          <textarea
            value={synthesisText}
            onChange={e => setSynthesisText(e.target.value)}
            placeholder="Örnek: 1755 Lizbon ve 1766 İstanbul depremleri her ikisinde de tsunami ve yangınlarla büyük afetlere yol açmıştır. Kriz yönetiminde Lizbon'da Pombal, İstanbul'da Sultan III. Mustafa aktif rol oynamıştır. Fark olarak Lizbon felaketi Avrupa Aydınlanması'nda felsefi tartışmaları tetiklerken..."
            rows={8}
            className="w-full bg-[#1c232c] border border-[#3d4959] rounded-2xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 leading-relaxed resize-none font-serif shadow-inner"
          />
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={handleEvaluateSynthesis}
            disabled={loading || !synthesisText.trim()}
            className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer font-cinzel border border-amber-300/40"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? 'Tarihçi Asistan İncelemekte...' : 'Tarihçi Değerlendirmesi Al & Mühür Kazan'}</span>
          </button>

          {synthesisSubmitted && (
            <div className="bg-emerald-950/80 border border-emerald-500/50 p-3 rounded-2xl text-xs text-emerald-300 flex items-center gap-2 font-cinzel font-bold">
              <Award className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Tebrikler! Özel Vak'anüvis Mührü başarıyla rozetlerinize eklendi.</span>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: INTERACTIVE AI HISTORICAL TUTOR CHAT */}
      <div className="lg:col-span-6 bg-[#28303a] border border-[#3d4959] rounded-3xl p-6 shadow-md flex flex-col justify-between space-y-4 min-h-[500px]">
        
        <div className="flex items-center justify-between border-b border-[#3d4959] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30 shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm font-cinzel">Vak'anüvis (Yapay Zeka Tarih Rehberi)</h4>
              <span className="text-[11px] text-emerald-400 font-semibold font-mono">● Dönem Analizi & Etkileşimli Destek</span>
            </div>
          </div>
        </div>

        {/* Messages Stream Area */}
        <div className="flex-1 overflow-y-auto space-y-4 max-h-[340px] pr-2">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`p-2 rounded-xl text-xs font-bold shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-slate-950 font-cinzel shadow-sm'
                    : 'bg-[#1c232c] text-amber-400 border border-[#3d4959] font-cinzel'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-4 space-y-2 text-xs leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-[#0284c7] text-white rounded-tr-none font-medium'
                    : 'bg-[#1c232c] border border-[#3d4959] text-slate-100 rounded-tl-none'
                }`}
              >
                <div className="font-medium whitespace-pre-wrap">{msg.text}</div>

                {msg.scoreCategory && (
                  <div className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-cinzel">
                    <Award className="w-3 h-3 text-amber-400" />
                    <span>{msg.scoreCategory}</span>
                  </div>
                )}

                {msg.feedback && (
                  <div className="bg-[#161c24] border border-[#374556] text-slate-200 p-2.5 rounded-xl text-[11px] font-medium leading-normal">
                    <span className="font-bold text-amber-400 block mb-0.5 font-cinzel">Geri Dönüt:</span>
                    {msg.feedback}
                  </div>
                )}

                {msg.tips && msg.tips.length > 0 && (
                  <div className="bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 p-2.5 rounded-xl text-[11px] space-y-1 font-medium">
                    <span className="font-bold text-emerald-400 block font-cinzel">İpuçları:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-emerald-200">
                      {msg.tips.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold italic bg-[#1c232c] border border-[#3d4959] p-3 rounded-2xl w-fit font-cinzel">
              <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
              <span>Vak'anüvis yanıt yazıyor...</span>
            </div>
          )}
        </div>

        {/* Preset Prompt Buttons */}
        <div className="pt-2 border-t border-[#3d4959] space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider font-cinzel block">
            Örnek Soru Önerileri:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {presetQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendQuestion(q)}
                disabled={loading}
                className="bg-[#1e242b] hover:bg-[#313c49] border border-[#3d4959] hover:border-amber-400/50 text-slate-300 text-[11px] font-semibold px-2.5 py-1 rounded-xl transition-all text-left cursor-pointer truncate max-w-xs"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input Bar */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="text"
            value={customQuestion}
            onChange={e => setCustomQuestion(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendQuestion()}
            placeholder="Tarihçi asistana özgürce sorun..."
            className="flex-1 bg-[#1c232c] border border-[#3d4959] rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 font-medium"
          />
          <button
            onClick={() => handleSendQuestion()}
            disabled={loading || !customQuestion.trim()}
            className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 p-2 rounded-xl transition-all cursor-pointer shadow-sm border border-amber-300/40"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
