/**
 * MEBİS (mebi.eba.gov.tr) Entegrasyon Servisi
 * MEBİS platformunun özel 'onCompleted' iframe API kanalını yönetir.
 * Klasik SCORM API yükü veya arka plan tarayıcı zamanlayıcıları barındırmaz.
 */

(function (window) {
    'use strict';

    // MEBİS/LMS ortamı varlık kontrolü
    function isMebiPresent() {
        try {
            let targetWindow = null;
            try {
                targetWindow = window.parent.document.getElementById('frmApp-0')?.contentWindow;
            } catch (e) {
                // CORS engeli durumunda sessizce geç
            }
            return !!((targetWindow && typeof targetWindow.onCompleted === 'function') || 
                      (typeof window.onCompleted === 'function'));
        } catch (e) {
            return false;
        }
    }

    // Konsol loglama aracı
    function logScorm(message, type = 'info') {
        // MEBİS ortamı aktifse ve durum hata değilse konsol logu yazdırılmaz (Sessiz Çalışma)
        if (isMebiPresent() && type !== 'error') {
            return;
        }
        console.log(`%c[MEBİS] %c${message}`, 
            `color: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#6366f1'}; font-weight: bold;`, 
            'color: inherit;'
        );
    }

    const SCORM = {
        /**
         * Başlatma fonksiyonu (Arayüz uyumluluğu için tutulmuştur).
         */
        initialize: function () {
            logScorm("MEBİS Entegrasyon Servisi Aktif.", "success");
            return true;
        },

        /**
         * Kapatma fonksiyonu (Arayüz uyumluluğu için tutulmuştur).
         */
        terminate: function () {
            logScorm("MEBİS Entegrasyon Servisi Sonlandırıldı.", "info");
            return true;
        },

        /**
         * MEBİS platformuna puanı ve tamamlanma durumunu iletir.
         * @param {number} rawScore - Sınavda alınan ham puan (örn. 15 üzerinden)
         * @param {number} examMaxScore - Sınavın maksimum ham puanı (15)
         * @param {boolean} passed - Başarı durumu (geçti/kaldı)
         */
        sendScore: function (rawScore, examMaxScore, passed = true) {
            // URL parametrelerinden hedef maksimum puanı çekmeye çalış (Varsayılan: 20)
            let targetMax = 20;
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const keys = ['max_score', 'maxScore', 'max', 'points', 'limit'];
                for (const key of keys) {
                    if (urlParams.has(key)) {
                        const val = parseInt(urlParams.get(key), 10);
                        if (!isNaN(val) && val > 0) {
                            targetMax = val;
                            break;
                        }
                    }
                }
            } catch (e) {
                // CORS veya URL ayrıştırma hatası durumunda sessizce geç
            }

            // Puanı hedef ölçeğe göre oranla
            const score = Math.round((rawScore / examMaxScore) * targetMax);

            logScorm(`sendScore çağrıldı. Ham Puan: ${rawScore}/${examMaxScore}, Hedef Maks: ${targetMax}, Ölçeklenmiş Puan: ${score}, Başarı: ${passed}`, "info");

            const dataToSend = {
                'score': {
                    'max': targetMax,
                    'min': 0,
                    'raw': score,
                    'scaled': score / targetMax
                },
                'completion': true,
                'success': passed,
                'duration': 'PT0M30S'
            };

            try {
                // MEBİS'in standart iframe ID'si olan frmApp-0 kontrol edilir
                let targetWindow = null;
                try {
                    targetWindow = window.parent.document.getElementById('frmApp-0')?.contentWindow;
                } catch (e) {
                    // CORS engeli durumunda sessizce geç (onCompleted doğrudan window altında aranacak)
                }

                // targetWindow veya kendi window nesnemizdeki enjekte edilmiş onCompleted'ı bul
                const mebiAPI = (targetWindow && typeof targetWindow.onCompleted === 'function') ? targetWindow :
                                 (typeof window.onCompleted === 'function') ? window : null;

                if (mebiAPI) {
                    logScorm("MEBİS 'onCompleted' kanalı bulundu. Puan iletiliyor...", "success");
                    mebiAPI.onCompleted(dataToSend);
                    logScorm("Puan MEBİS'e başarıyla gönderildi: " + JSON.stringify(dataToSend), "success");
                    return true;
                }
            } catch (err) {
                logScorm("MEBİS onCompleted gönderim hatası: " + err.message, "error");
            }

            // LMS dışındayken konsol simülasyonu
            logScorm(`[Sandbox/Çevrimdışı] Skor simüle edildi: ${score}/${targetMax}`, "warning");
            return false;
        }
    };

    // Global nesne olarak dışarı aktar
    window.SCORM = SCORM;

})(window);
