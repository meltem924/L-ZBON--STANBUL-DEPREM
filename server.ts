import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy Google GenAI Client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// AI Historical Tutor Endpoint
app.post('/api/tutor', async (req, res) => {
  try {
    const { message, context, mode, studentResponse } = req.body;
    const ai = getAIClient();

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not set
      return res.json({
        reply: "Tarihçi Asistan: Harika bir soru! 1755 Lizbon depremi (8,3 büyüklük, Azizler Günü) Voltaire'in Candide'i ve J.J. Rousseau'nun doğaya dönüş tezi ile felsefi tartışmaları tetiklerken; Bakan Pombal'ın 13 soruluk bilimsel anketini ve Gaiola Pombalina kafes yapısını doğurmuştur. 1766 İstanbul depremi (7,5 büyüklük, Kurban Bayramı 3. günü) ise Mimarbaşı Halit Efendi'nin teknik hasar tespiti, Mimar Tahir Ağa'nın Fatih Camii ihyası, kâgir fermanına karşılık halkın ahşap ev ve kâgir yangın duvarı ısrarı, Samatya değirmenleri/fırın önceliği, 22 akçe ek hane vergisi ve Sultan III. Mustafa'nın çadır kriz yönetimiyle şekillenmiştir.",
        feedback: "Analiziniz 11. Sınıf Tarih ders kitabı ölçütleri açısından gayet başarılıdır. Depremlerin idari, sosyal, mimari ve ekonomik boyutlarını doğru bağdaştırdınız.",
        scoreCategory: "Vak'anüvis Onayı Kazanıldı",
        tips: ["Ders kitabındaki birincil arşiv belgelerini ve gravür analizlerini incelemeye devam ediniz!"]
      });
    }

    const systemInstruction = `
Sen 11. Sınıf Tarih Dersi (11. Sınıf Tarih Ders Kitabı "depremkitapbilgi.pdf") için tasarlanmış uzman, nazik ve teşvik edici bir Yapay Zeka Tarih Eğitmenisin.
ÖĞRENCİYE HİTAP EDERKEN HER ZAMAN KİBAR, RESMİ VE ÖĞRETEN 'SİZ' DİLİNİ KULLAN (Örn: "incelediniz", "belirlediniz", "tebrik ederiz", "yazınız").
Konu: 1755 Lizbon (~8,3 büyüklük) ve 1766 İstanbul (~7,5 büyüklük) Depremlerinin Karşılaştırılması.
Öğrenme Çıktısı Ölçütleri:
a) Lizbon ve İstanbul depremlerinin etkilerini belirler.
b) Etkilerin benzerliklerini listeler:
  - Tsunami etkisi (Lizbon'da 45 dk sonra Tagus kıyıları & Fas'ta 8m / İstanbul'da Marmara kıyıları).
  - Yangınlar ve asayiş tedbirleri (Asker/mülki idare görevlendirmesi).
  - Hükümdar ve devlet adamlarının çadırlarda yaşaması (Kral I. José & Bakan Pombal Bélem'de 9 ay / Sultan III. Mustafa çadırlarda ikamet).
  - Sismik mimari esneklik (Gaiola Pombalina 3D ahşap kafes & Osmanlı Ahşap Çatma ve kâgir yangın duvarı).
  - Afet harcamalarının devlet/vakıf bütçesinden karşılanması ve piyasa düzenlemeleri.
c) Etkilerin farklılıklarını listeler:
  - Lizbon: 1 Kasım 1755 Azizler Günü, Voltaire (Candide & Şiir) ve Jean-Jacques Rousseau (şehirleşme eleştirisi & doğaya dönüş), Bakan Pombal'ın 13 soruluk sismoloji anketi, Eugénio dos Santos & Carlos Mardel 60 feet caddeli grid planı ve Ticaret Meydanı, %4 ithalat bağış kesintisi, soylulara vergi, 1761 Kraliyet Hazinesi (Tesouraria Real), gazetelerin Halley kuyruklu yıldızı sansasyonu, salgın hastalığa karşı cesetlerin Tagus'a batırılması, Cizvit eğitimi yerine halka açık yeni müfredat.
  - İstanbul: 22 Mayıs 1766 Kurban Bayramı 3. günü sabah namazı sonrası, Mimarbaşı Halit Efendi teknik tespiti, Fatih Camii Osmanlı-Barok ihyası (Mimar Tahir Ağa), kâgir yapma fermanına karşılık halkın ahşap ev ısrarı ve kâgir yangın duvarı, Samatya surlarındaki 4 değirmenin yıkılması ve fırın tamir önceliği, karaborsaya karşı narh (tavan fiyat) uygulaması, her evden 22 akçe ek vergi, II. Bayezid Vakfı 4 yıllık geliri, Şeyhülislam dilenci fetvası, Rum/Ermeni kiliselerine Müslüman usta gönderilmesi, Minas Ceranyan şiiri, yapı hasar oranları (%30 cami, %20 eğitim binası, %15 mirî hizmet binası, %10 sur, %10 saray, %5 ticari yapı), 22.000 kese (~11.000.000 kuruş) toplam zarar.

ÖĞRENCİYE ASLA SAYISAL PUAN VEYA NOT VERME. Sadece yapıcı, motive edici, tarihsel mantığı güçlendiren geri dönütler ver.
Yanıtını JSON formatında döndür:
{
  "reply": "Öğrenciye doğrudan tarihsel açıklama ve yanıt",
  "feedback": "Öğrencinin cevabı/sorusu hakkında yapıcı değerlendirme",
  "scoreCategory": "Örn: Vak'anüvis Onayı Kazanıldı / Harika Analiz / Düşündürücü Soru",
  "tips": ["1-2 kısa ipucu veya soru"]
}
`;

    let prompt = "";
    if (mode === "evaluate_synthesis") {
      prompt = `Öğrenci 1755 Lizbon ve 1766 İstanbul depremlerini karşılaştıran şu paragrafı yazdı:\n\n"${studentResponse}"\n\nLütfen bu cevabı ders kitabı öğrenme çıktısı ölçütlerine göre değerlendir. Benzerlikler ve farklılıklar doğru kurulmuş mu? Öğrenciyi tebrik et ve eksik veya eklenebilecek tarihsel nüanslar varsa nazikçe hatırlat.`;
    } else {
      prompt = `Öğrencinin sorusu/mesajı: "${message}"\nKonu Bağlamı: ${context || "Genel Karşılaştırma"}\nLütfen pedagojik, 11. sınıf seviyesine uygun ve ilgi çekici şekilde yanıtla.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json'
      }
    });

    const responseText = response.text || "{}";
    try {
      const parsed = JSON.parse(responseText);
      return res.json(parsed);
    } catch {
      return res.json({
        reply: responseText,
        feedback: "Analiziniz değerlendirildi.",
        scoreCategory: "Başarılı İnceleme",
        tips: ["Tarihsel bağlantıları kurmaya devam edin."]
      });
    }
  } catch (err: any) {
    console.error("Gemini API error:", err);
    return res.status(500).json({
      error: "Sunucu hatası oluştu.",
      reply: "Tarihçi Asistan şu an çevrimdışı ancak harita ve kart bilgilerini incelemeye devam edebilirsiniz!"
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
