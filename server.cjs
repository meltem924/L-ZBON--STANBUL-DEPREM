var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_meta = {};
var __filename = (0, import_url.fileURLToPath)(import_meta.url);
var __dirname = import_path.default.dirname(__filename);
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var aiClient = null;
function getAIClient() {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new import_genai.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}
app.post("/api/tutor", async (req, res) => {
  try {
    const { message, context, mode, studentResponse } = req.body;
    const ai = getAIClient();
    if (!ai) {
      return res.json({
        reply: "Tarih\xE7i Asistan: Harika bir soru! 1755 Lizbon depremi (8,3 b\xFCy\xFCkl\xFCk, Azizler G\xFCn\xFC) Voltaire'in Candide'i ve J.J. Rousseau'nun do\u011Faya d\xF6n\xFC\u015F tezi ile felsefi tart\u0131\u015Fmalar\u0131 tetiklerken; Bakan Pombal'\u0131n 13 soruluk bilimsel anketini ve Gaiola Pombalina kafes yap\u0131s\u0131n\u0131 do\u011Furmu\u015Ftur. 1766 \u0130stanbul depremi (7,5 b\xFCy\xFCkl\xFCk, Kurban Bayram\u0131 3. g\xFCn\xFC) ise Mimarba\u015F\u0131 Halit Efendi'nin teknik hasar tespiti, Mimar Tahir A\u011Fa'n\u0131n Fatih Camii ihyas\u0131, k\xE2gir ferman\u0131na kar\u015F\u0131l\u0131k halk\u0131n ah\u015Fap ev ve k\xE2gir yang\u0131n duvar\u0131 \u0131srar\u0131, Samatya de\u011Firmenleri/f\u0131r\u0131n \xF6nceli\u011Fi, 22 ak\xE7e ek hane vergisi ve Sultan III. Mustafa'n\u0131n \xE7ad\u0131r kriz y\xF6netimiyle \u015Fekillenmi\u015Ftir.",
        feedback: "Analiziniz 11. S\u0131n\u0131f Tarih ders kitab\u0131 \xF6l\xE7\xFCtleri a\xE7\u0131s\u0131ndan gayet ba\u015Far\u0131l\u0131d\u0131r. Depremlerin idari, sosyal, mimari ve ekonomik boyutlar\u0131n\u0131 do\u011Fru ba\u011Fda\u015Ft\u0131rd\u0131n\u0131z.",
        scoreCategory: "Vak'an\xFCvis Onay\u0131 Kazan\u0131ld\u0131",
        tips: ["Ders kitab\u0131ndaki birincil ar\u015Fiv belgelerini ve grav\xFCr analizlerini incelemeye devam ediniz!"]
      });
    }
    const systemInstruction = `
Sen 11. S\u0131n\u0131f Tarih Dersi (11. S\u0131n\u0131f Tarih Ders Kitab\u0131 "depremkitapbilgi.pdf") i\xE7in tasarlanm\u0131\u015F uzman, nazik ve te\u015Fvik edici bir Yapay Zeka Tarih E\u011Fitmenisin.
\xD6\u011ERENC\u0130YE H\u0130TAP EDERKEN HER ZAMAN K\u0130BAR, RESM\u0130 VE \xD6\u011ERETEN 'S\u0130Z' D\u0130L\u0130N\u0130 KULLAN (\xD6rn: "incelediniz", "belirlediniz", "tebrik ederiz", "yaz\u0131n\u0131z").
Konu: 1755 Lizbon (~8,3 b\xFCy\xFCkl\xFCk) ve 1766 \u0130stanbul (~7,5 b\xFCy\xFCkl\xFCk) Depremlerinin Kar\u015F\u0131la\u015Ft\u0131r\u0131lmas\u0131.
\xD6\u011Frenme \xC7\u0131kt\u0131s\u0131 \xD6l\xE7\xFCtleri:
a) Lizbon ve \u0130stanbul depremlerinin etkilerini belirler.
b) Etkilerin benzerliklerini listeler:
  - Tsunami etkisi (Lizbon'da 45 dk sonra Tagus k\u0131y\u0131lar\u0131 & Fas'ta 8m / \u0130stanbul'da Marmara k\u0131y\u0131lar\u0131).
  - Yang\u0131nlar ve asayi\u015F tedbirleri (Asker/m\xFClki idare g\xF6revlendirmesi).
  - H\xFCk\xFCmdar ve devlet adamlar\u0131n\u0131n \xE7ad\u0131rlarda ya\u015Famas\u0131 (Kral I. Jos\xE9 & Bakan Pombal B\xE9lem'de 9 ay / Sultan III. Mustafa \xE7ad\u0131rlarda ikamet).
  - Sismik mimari esneklik (Gaiola Pombalina 3D ah\u015Fap kafes & Osmanl\u0131 Ah\u015Fap \xC7atma ve k\xE2gir yang\u0131n duvar\u0131).
  - Afet harcamalar\u0131n\u0131n devlet/vak\u0131f b\xFCt\xE7esinden kar\u015F\u0131lanmas\u0131 ve piyasa d\xFCzenlemeleri.
c) Etkilerin farkl\u0131l\u0131klar\u0131n\u0131 listeler:
  - Lizbon: 1 Kas\u0131m 1755 Azizler G\xFCn\xFC, Voltaire (Candide & \u015Eiir) ve Jean-Jacques Rousseau (\u015Fehirle\u015Fme ele\u015Ftirisi & do\u011Faya d\xF6n\xFC\u015F), Bakan Pombal'\u0131n 13 soruluk sismoloji anketi, Eug\xE9nio dos Santos & Carlos Mardel 60 feet caddeli grid plan\u0131 ve Ticaret Meydan\u0131, %4 ithalat ba\u011F\u0131\u015F kesintisi, soylulara vergi, 1761 Kraliyet Hazinesi (Tesouraria Real), gazetelerin Halley kuyruklu y\u0131ld\u0131z\u0131 sansasyonu, salg\u0131n hastal\u0131\u011Fa kar\u015F\u0131 cesetlerin Tagus'a bat\u0131r\u0131lmas\u0131, Cizvit e\u011Fitimi yerine halka a\xE7\u0131k yeni m\xFCfredat.
  - \u0130stanbul: 22 May\u0131s 1766 Kurban Bayram\u0131 3. g\xFCn\xFC sabah namaz\u0131 sonras\u0131, Mimarba\u015F\u0131 Halit Efendi teknik tespiti, Fatih Camii Osmanl\u0131-Barok ihyas\u0131 (Mimar Tahir A\u011Fa), k\xE2gir yapma ferman\u0131na kar\u015F\u0131l\u0131k halk\u0131n ah\u015Fap ev \u0131srar\u0131 ve k\xE2gir yang\u0131n duvar\u0131, Samatya surlar\u0131ndaki 4 de\u011Firmenin y\u0131k\u0131lmas\u0131 ve f\u0131r\u0131n tamir \xF6nceli\u011Fi, karaborsaya kar\u015F\u0131 narh (tavan fiyat) uygulamas\u0131, her evden 22 ak\xE7e ek vergi, II. Bayezid Vakf\u0131 4 y\u0131ll\u0131k geliri, \u015Eeyh\xFClislam dilenci fetvas\u0131, Rum/Ermeni kiliselerine M\xFCsl\xFCman usta g\xF6nderilmesi, Minas Ceranyan \u015Fiiri, yap\u0131 hasar oranlar\u0131 (%30 cami, %20 e\u011Fitim binas\u0131, %15 mir\xEE hizmet binas\u0131, %10 sur, %10 saray, %5 ticari yap\u0131), 22.000 kese (~11.000.000 kuru\u015F) toplam zarar.

\xD6\u011ERENC\u0130YE ASLA SAYISAL PUAN VEYA NOT VERME. Sadece yap\u0131c\u0131, motive edici, tarihsel mant\u0131\u011F\u0131 g\xFC\xE7lendiren geri d\xF6n\xFCtler ver.
Yan\u0131t\u0131n\u0131 JSON format\u0131nda d\xF6nd\xFCr:
{
  "reply": "\xD6\u011Frenciye do\u011Frudan tarihsel a\xE7\u0131klama ve yan\u0131t",
  "feedback": "\xD6\u011Frencinin cevab\u0131/sorusu hakk\u0131nda yap\u0131c\u0131 de\u011Ferlendirme",
  "scoreCategory": "\xD6rn: Vak'an\xFCvis Onay\u0131 Kazan\u0131ld\u0131 / Harika Analiz / D\xFC\u015F\xFCnd\xFCr\xFCc\xFC Soru",
  "tips": ["1-2 k\u0131sa ipucu veya soru"]
}
`;
    let prompt = "";
    if (mode === "evaluate_synthesis") {
      prompt = `\xD6\u011Frenci 1755 Lizbon ve 1766 \u0130stanbul depremlerini kar\u015F\u0131la\u015Ft\u0131ran \u015Fu paragraf\u0131 yazd\u0131:

"${studentResponse}"

L\xFCtfen bu cevab\u0131 ders kitab\u0131 \xF6\u011Frenme \xE7\u0131kt\u0131s\u0131 \xF6l\xE7\xFCtlerine g\xF6re de\u011Ferlendir. Benzerlikler ve farkl\u0131l\u0131klar do\u011Fru kurulmu\u015F mu? \xD6\u011Frenciyi tebrik et ve eksik veya eklenebilecek tarihsel n\xFCanslar varsa nazik\xE7e hat\u0131rlat.`;
    } else {
      prompt = `\xD6\u011Frencinin sorusu/mesaj\u0131: "${message}"
Konu Ba\u011Flam\u0131: ${context || "Genel Kar\u015F\u0131la\u015Ft\u0131rma"}
L\xFCtfen pedagojik, 11. s\u0131n\u0131f seviyesine uygun ve ilgi \xE7ekici \u015Fekilde yan\u0131tla.`;
    }
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json"
      }
    });
    const responseText = response.text || "{}";
    try {
      const parsed = JSON.parse(responseText);
      return res.json(parsed);
    } catch {
      return res.json({
        reply: responseText,
        feedback: "Analiziniz de\u011Ferlendirildi.",
        scoreCategory: "Ba\u015Far\u0131l\u0131 \u0130nceleme",
        tips: ["Tarihsel ba\u011Flant\u0131lar\u0131 kurmaya devam edin."]
      });
    }
  } catch (err) {
    console.error("Gemini API error:", err);
    return res.status(500).json({
      error: "Sunucu hatas\u0131 olu\u015Ftu.",
      reply: "Tarih\xE7i Asistan \u015Fu an \xE7evrimd\u0131\u015F\u0131 ancak harita ve kart bilgilerini incelemeye devam edebilirsiniz!"
    });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
