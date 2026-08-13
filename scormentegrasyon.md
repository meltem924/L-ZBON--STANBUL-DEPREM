# SCORM 1.2 Entegrasyonu Walkthrough

Bu belgede, akıllı değerlendirme portalına kütüphanesiz SCORM 1.2 entegrasyonunun nasıl gerçekleştirildiği, çevrimdışı test modunun nasıl kullanılacağı ve MEBİS için SCORM paketinin nasıl hazırlanacağı açıklanmıştır.

> [!IMPORTANT]
> **Önemli Geliştirici Notu:**
> SCORM entegrasyonuyla ilgili tüm dosyalar (kod güncellemeleri, sarmalayıcı JavaScript modülü ve manifest şablonu) yapay zeka (AI) tarafından otomatik olarak oluşturulacaktır. Kullanıcının el ile (manuel) herhangi bir kodlama veya dosya düzenleme işlemi yapmasına gerek yoktur. Kullanıcının tek sorumluluğu, yapay zekanın hazırladığı dosyaları paketleme adımlarında belirtildiği gibi sıkıştırıp `.zip` haline getirmektir.

---

## 🛠️ Yapılan Değişiklikler ve Eklenen Dosyalar

### 1. [scorm-api-wrapper.js] (Yeni Modül)
Saf JavaScript ile yazılmış, **MEBİS (e-Yaygın) özel `onCompleted` API** arayüzünü yöneten hafif sarmalayıcı dosya:
* MEBİS'in iframe penceresine (`frmApp-0`) enjekte ettiği `onCompleted` metodunu tarar ve puanı oraya gönderir.
* **Dinamik Ölçekleme (Auto-Scaling):** URL parametrelerini tarayarak (`max_score`, `maxScore`, `max`, `points` veya `limit`) hedef maksimum puanı otomatik olarak tespit eder. Parametre bulunamazsa varsayılan **20** puanı temel alır ve sınav ham puanını bu hedef ölçeğe göre dinamik oranlar.
* **Dinamik Başarı Raporlama:** Öğrencinin geçti/kaldı (`passed: true/false`) durumunu `success` parametresiyle dinamik olarak LMS'e iletir.
* **Sessiz Çalışma Modu (Silent Production):** MEBİS/LMS ortamı tespit edildiğinde ve entegrasyon başarıyla çalıştığında konsol kirliliğini önlemek adına hata (`error`) dışındaki tüm bilgilendirme loglarını otomatik olarak gizler (sessiz mod). Konsol logları sadece yerel testlerde (Sandbox Modu) görüntülenir.
* LMS bulunmadığında otomatik olarak çevrimdışı **Sandbox Modu**'na geçerek tarayıcı konsoluna log yazar.

### 2. [index.html]
* **API Bağlantısı:** Sayfa yüklendiğinde ve kapatılırken sarmalayıcı servislerini tetikler (`window.SCORM.initialize()` ve `window.SCORM.terminate()`).
* **Akış Entegrasyonu:** Değerlendirme bittiğinde `window.SCORM.sendScore(rawScore, maxScore, passed)` fonksiyonunu tetikleyerek ham puanı (örn. 15 üzerinden), sınavın maksimum puanını ve başarı durumunu iletir. Ölçekleme işlemi sarmalayıcı tarafından otomatik gerçekleştirilir.

---

## 🖥️ Sandbox Modu ve Tarayıcı Konsolu Testi

Sayfayı doğrudan bir LMS (Öğrenme Yönetim Sistemi) olmadan yerel tarayıcıda açtığınızda **Sandbox Modu** otomatik olarak devreye girer. 

Bu modda tarayıcının geliştirici araçlarını (F12 -> Console sekmesi) açarak test edebilirsiniz:
1. Sayfa yüklendiğinde SCORM bağlantı simülasyonu başlatılır ve konsola bilgi logları düşer.
2. "Gönder ve Değerlendir" butonuna bastığınızda LMS'ye iletilen puanlar (hedef ölçeğe göre dinamik oranlanmış), `passed`/`failed` durumları renkli konsol logları olarak anında listelenir. Örneğin `?max_score=30` parametresi ile açılırsa puanlar 30 üzerinden hesaplanıp loglanır.

---

> [!TIP]
> **Entegrasyon Akışı Hakkında Önemli Not:**
> Her uygulamanın akışı farklıdır; bazılarında herhangi bir gönderim butonu bulunmayabilir (örneğin süre bittiğinde otomatik gönderim yapılabilir, son slayta ulaşıldığında tetiklenebilir veya oyun bittiğinde otomatik gönderilebilir). Bu nedenle, gelecekte bir yapay zekaya veya geliştiriciye SCORM entegrasyonu görevi verildiğinde, varsayımlarda bulunmak yerine şu soruyu sorarak netleştirmesi önerilir:
> *"Puan ve durum gönderimini hangi eylem (örneğin hangi butona basıldığında veya hangi olay/event gerçekleştiğinde) tetiklemeli?"*

---

## 📦 MEBİS (SCORM 1.2) Paketi Hazırlama Kılavuzu

### 📄 imsmanifest.xml Şablonu
Projenizin kök dizininde **`imsmanifest.xml`** dosyası oluşturulmalıdır. Dosya içeriği şu şekildedir:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest identifier="com.lumitoyz.degerlendirme.v2" version="1.2"
          xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
          xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                              http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="lumitoyz_org">
    <organization identifier="lumitoyz_org">
      <title>Öğrenci Akıllı Sınav ve Değerlendirme Portalı</title>
      <item identifier="item_degerlendirme" identifierref="resource_degerlendirme">
        <title>Değerlendirme Etkinliği</title>
        <adlcp:masteryscore>53</adlcp:masteryscore> <!-- 15 üzerinden 8 baraj puanı (~%53.3) -->
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="resource_degerlendirme" type="webcontent" adlcp:scormtype="sco" href="index.html">
      <file href="index.html"/>
      <file href="scorm-api-wrapper.js"/>
    </resource>
  </resources>
</manifest>
```

### 🗜️ Paketleme Adımları:
1. `index.html`, `scorm-api-wrapper.js` ve oluşturduğunuz `imsmanifest.xml` dosyalarını seçin.
2. Sağ tıklayıp sıkıştırarak bir **`.zip`** arşivi oluşturun (Klasörü değil, **dosyaları seçip direkt sıkıştırın**, `imsmanifest.xml` zipin en üstünde olmalıdır).
3. Bu `.zip` dosyasını MEBİS / e-Yaygın sistemine yükleyin. Entegrasyon tamamen hazırdır!
