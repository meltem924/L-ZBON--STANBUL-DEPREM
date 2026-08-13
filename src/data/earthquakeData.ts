import { Hotspot, ComparisonCard, Badge, ArchitecturalFeature, StepInstruction } from '../types';

export const STEP_INSTRUCTIONS: Record<string, StepInstruction> = {
  map: {
    stepId: 'map',
    title: 'Keşif Haritası',
    curriculumGoal: '',
    instructionText: 'Haritadaki odak noktalarına ve şehir sıcak noktalarına tıklayarak depremlerin doğurduğu afet, kriz yönetimi, felsefi ve mimari etkileri yerinde keşfedin.',
    actionPrompt: 'Harita katmanlarını değiştirin ve tüm sıcak noktalardaki birincil tarihsel kaynakları okuyun.'
  },
  visual: {
    stepId: 'visual',
    title: 'Görsel Analiz',
    curriculumGoal: '',
    instructionText: 'Tarihi afet ve imar gravürlerini inceleyin; mimari, sosyal, idari ve ekonomik tarihsel durumları eşleştirerek analizlerinizi yapın.',
    actionPrompt: 'Tarihi gravürleri kıyaslayın ve tematik durumları boyutlarına göre eşleştirin.'
  },
  matrix: {
    stepId: 'matrix',
    title: 'Karşılaştırma',
    curriculumGoal: '',
    instructionText: 'Aktif etki kartını okuyarak ilgili sütun butonuna (Sadece Lizbon, Ortak Etkiler, Sadece İstanbul) tıklayıp sınıflandırınız.',
    actionPrompt: '9 etki kartını ilgili sütun butonlarına tıklayarak yerleştirin ve en alttaki Kontrol Et butonuna basın.'
  }
};

export const HOTSPOTS: Hotspot[] = [
  // LISBON HOTSPOTS (Positioned accurately on left half of 1.OLAY_HARİTA.png)
  {
    id: 'lisbon-epicenter',
    title: 'Atlantik Okyanusu Merkez Üssü & Tsunami',
    city: 'lisbon',
    x: 14,
    y: 74,
    category: 'destruction',
    shortDesc: '1 Kasım 1755 sabahı ~8,3 büyüklüğünde deprem ve 45 dk sonra gelen tsunami.',
    fullDesc: 'Tarih & Şiddet: 1 Kasım 1755 Azizler Günü sabahı 8,3 büyüklüğünde deprem meydana geldi.\nTsunami Etkisi: Sarsıntıdan 45 dakika sonra Atlas Okyanusu’nda oluşan tsunami, Tagus Nehri kıyılarını ve Fas sahillerini (8 metre) vurdu. Mermer Cais de Pedra Rıhtımı sular altında kaldı.\nCan Kaybı: Kıyılara kaçan yaklaşık 20 bin kişi tsunami nedeniyle hayatını kaybetti. Toplam kayıp 10-100 bin kişi arası olup Avrupa’nın en büyük doğal afetidir.',
    primaryQuote: {
      author: 'Rahip Charles Davy (1755)',
      text: 'Deniz geliyor, hepimiz yok olacağız! Tagus’taki sular çekilmişti... Saat 10.10 sularında tsunami vurdu, limanı yerle bir etti. Zenginler ve yoksullar şu anda aynı durumda.',
      source: 'Lizbon Depremi Anlatıları'
    },
    impactTags: ['8.3 Büyüklük', '45 Dk Sonra Tsunami', '20 Bin Tsunami Kaybı', 'Cais de Pedra Rıhtımı']
  },
  {
    id: 'lisbon-cathedral',
    title: 'Carmo Manastırı & Düşünsel Sarsıntı',
    city: 'lisbon',
    x: 22,
    y: 22,
    category: 'philosophy',
    shortDesc: 'Devrilen mumların başlattığı yangın, Carmo Manastırı yıkımı, Voltaire ve J.J. Rousseau.',
    fullDesc: 'Yangın ve Yıkım: Halk kiliselerdeyken devrilen mumlar büyük yangın çıkardı. Kiliseler ve Carmo Manastırı dâhil şehrin %85’i yıkıldı.\nFelsefi Tartışma: Voltaire, Candide ve Lizbon Felaketi Şiiri ile kilisenin dinsel optimizmini eleştirdi. Rousseau ise felaketin aşırı şehirleşmeden kaynaklandığını belirtip doğaya dönülmesi gerektiğini savundu.\nEğitim Reformu: Cizvit eğitimi yerine tüm halka hitap eden yeni bir eğitim modeli ve müfredat oluşturuldu.',
    primaryQuote: {
      author: 'Voltaire & J.J. Rousseau (1756)',
      text: 'Voltaire dinsel iyimserliği sorgularken; Rousseau, felaketin sorumlusunun doğa değil binaları üst üste yığan insan yaşamı olduğunu savundu.',
      source: 'Felsefi Tartışma Metinleri'
    },
    impactTags: ['Carmo Manastırı', 'Voltaire (Candide)', 'J.J. Rousseau (Doğal Yaşam)', 'Eğitim Reformu']
  },
  {
    id: 'lisbon-palace',
    title: 'Kral I. José, Bakan Pombal & 13 Anket Sorusu',
    city: 'lisbon',
    x: 28,
    y: 29,
    category: 'administration',
    shortDesc: 'Kral I. José ve Pombal’ın 9 ay çadırda yaşaması, 12 bölge lideri ve 13 anket sorusu.',
    fullDesc: 'Çadır Kriz Yönetimi: Kral I. José ve Bakan Pombal 9 ay boyunca Belem mevkisinde çadır ve kulübede ikamet ederek kriz sürecini yönetti.\nAsayiş ve Sağlık: Pombal 12 bölge lideri atadı; yağma ve hırsızlığa idam cezası getirdi. Salgın tehlikesine karşı bedenler Kilise izniyle dini törensiz Tagus Nehri’ne batırıldı.\nSismoloji Anketi: Ülkenin dört bir yanına 13 soruluk anket yollanarak sismoloji biliminin temelleri atıldı. 1761’de Kraliyet Hazinesi kuruldu.',
    primaryQuote: {
      author: 'Marqués de Pombal (1755)',
      text: 'Ölülerimizi gömmeli, canlılarımızın hayatını kurtarmalıyız! Yağma yapanlar idam edilecek, veriler anketle toplanacaktır.',
      source: 'Portekiz İdari Arşiv Belgeleri'
    },
    impactTags: ['Belem 9 Ay Çadır', '12 Bölge Lideri', '13 Soruluk Sismoloji Anketi', '1761 Kraliyet Hazinesi']
  },
  {
    id: 'lisbon-baixa',
    title: 'Baixa Pombalina & Ahşap Kafes (Gaiola)',
    city: 'lisbon',
    x: 17,
    y: 29,
    category: 'architecture',
    shortDesc: 'Gemi yapımından esinlenen Gaiola Pombalina kafes sistemi, 60 feet caddeler ve Ticaret Meydanı.',
    fullDesc: 'Izgara Plan: Eugénio dos Santos ve Carlos Mardel; caddeleri 60 feet (15m karayolu, 3m kaldırım) genişliğinde dik açılı ızgara planla çizdi.\nGaiola Pombalina: Duvar örgüsüne gemi yapım tekniğinden esinlenen 3D esnek ahşap kafes ("Gaiola") koyulması zorunlu kılındı.\nMeydan ve Vergi: Eski Kraliyet Meydanı yerine su kıyısına Ticaret Meydanı yapıldı. İthalattan %4 bağış kesintisi alındı ve soylulara yeni vergi getirildi.',
    primaryQuote: {
      author: 'Portekiz Mühendislik ve İmar Heyeti',
      text: 'Gaiola Pombalina, ahşabın esnekliği ile taş duvarları birleştirerek deprem basıcına karşı koyan ilk sismik korumalı yapı sistemidir.',
      source: 'Lizbon İmar Belgeleri'
    },
    impactTags: ['Gaiola Pombalina', '60 Feet Caddeler', 'Ticaret Meydanı', '%4 İthalat Kesintisi']
  },

  // ISTANBUL HOTSPOTS (Positioned accurately on right half of 1.OLAY_HARİTA.png)
  {
    id: 'istanbul-marmara',
    title: 'Marmara Denizi Merkez Üssü & Şiirsel Ağıt',
    city: 'istanbul',
    x: 58,
    y: 67,
    category: 'destruction',
    shortDesc: '22 Mayıs 1766 Kurban Bayramı 3. günü ~7,5 büyüklüğünde deprem, 2 dk sarsıntı, 8 ay artçı.',
    fullDesc: 'Depremin Şiddeti: 22 Mayıs 1766 Kurban Bayramı 3. günü sabah namazı sonrası Marmara doğusunda ~7,5 büyüklüğünde gerçekleşti. 2 dakika sürdü, 8 ay artçılar (5 Ağustos artçısı) devam etti.\nEtki Alanı ve Hasar: İzmit, Edirne, Bursa ve Selanik’te hissedildi. Yaklaşık 4-5 bin kişi hayatını kaybetti. Fatih, Bayezid, Şehzadebaşı Camileri ile Kapalıçarşı ağır hasar aldı.\nTarihsel Şiir: Ermeni halk şairi Minas Ceranyan felaketi destansı şiiriyle ölümsüzleştirdi.',
    primaryQuote: {
      author: 'Minas Ceranyan (1766)',
      text: 'Hey ağalar size tarif edeyim, bir zalim titreme çekti İstanbul... Ortalığı yıkıp berbâd eyledi, çalkalanıp durdu bir an İstanbul...',
      source: '1766 İstanbul Depremi Destansı Şiiri'
    },
    impactTags: ['Kurban Bayramı 3. Günü', '7.5 Büyüklük (2 Dk)', '8 Ay Artçı (5 Ağustos)', '4-5 Bin Can Kaybı']
  },
  {
    id: 'istanbul-fatih',
    title: 'Fatih Camii Re-inşası & Mimarbaşı Halit Efendi',
    city: 'istanbul',
    x: 67,
    y: 35,
    category: 'architecture',
    shortDesc: 'Mimarbaşı Halit Efendi teknik tespiti, Mimar Tahir Ağa ile Fatih Camii’nin Barok-Osmanlı ihyası.',
    fullDesc: 'Teknik Heyet: Mimarbaşı Halit Efendi başkanlığındaki teknik heyet deprem bölgesinde hasar tespiti yürüttü.\nFatih Camii: Sultan III. Mustafa emriyle Mimar Tahir Ağa çöken Fatih Camii’ni Osmanlı-Barok tarzında yeniden inşa etti.\nVakıf Desteği: Sultan II. Bayezid Vakfı’nın 4 yıllık geliri cami ve imaret onarımlarına ayrıldı. Çevre illerdeki kadılardan usta ve malzeme yardımı istendi.',
    primaryQuote: {
      author: 'Sultan III. Mustafa Fermanı (1766)',
      text: 'Mabetlerin ve fukara meskenlerinin derhal ihyası, hazine ve vakıf gelirlerinden karşılanıp vatandaş mağdur edilmeyecektir.',
      source: 'Sultan III. Mustafa Fermanı'
    },
    impactTags: ['Mimarbaşı Halit Efendi', 'Mimar Tahir Ağa', 'Fatih Camii Rekonstrüksiyonu', 'II. Bayezid Vakfı Geliri']
  },
  {
    id: 'istanbul-bazaar',
    title: 'Kapalıçarşı & Yapı Hasar Dağılım Oranları',
    city: 'istanbul',
    x: 73,
    y: 42,
    category: 'economy',
    shortDesc: 'Kapalıçarşı ihyası, narh (tavan fiyat) uygulaması ve %30 cami, %20 medrese, %15 mirî bina hasar oranları.',
    fullDesc: 'Narh Uygulaması: Kapalıçarşı tonozları çökünce inşaat malzemesi ve işçilik fiyat artışını önlemek için narh (tavan fiyat) getirildi.\nHasar Dağılımı: Hasarlı yapıların %30’u Cami, %20’si Eğitim Binası (Medrese), %15’i Mirî Hizmet Binası (Devlet malı), %10’u Sur, %10’u Saray, %5’i Ticari Yapı’dır.\nMaddi Zarar: Toplam zararın 22.000 kese (yaklaşık 11 milyon kuruş) olduğu hesaplandı.',
    primaryQuote: {
      author: 'Divan-ı Hümayun Hasar Kaydı (1766)',
      text: 'Maddi zarar 22.000 keseyi bulmuş, tüm başkent onarımlar nedeniyle adeta bir şantiye görünümüne bürünmüştür.',
      source: 'Osmanlı Tarihsel Arşiv Kayıtları'
    },
    impactTags: ['%30 Cami %20 Medrese', '%15 Mirî Hizmet Binası', '22 Bin Kese Zarar', 'Narh Uygulaması']
  },
  {
    id: 'istanbul-topkapi',
    title: 'Sultan III. Mustafa & İdari Görevlendirmeler',
    city: 'istanbul',
    x: 75,
    y: 50,
    category: 'administration',
    shortDesc: 'Sultan III. Mustafa’nın çadır kriz yönetimi, kaymakam/kadı/subaşı ataması, 22 akçe ek vergi.',
    fullDesc: 'Çadır Kriz Yönetimi: Sultan III. Mustafa çadırlarda yaşayan halkı gezip gözyaşı dökerek yardımlarda bulundu.\nMülki İdare: Arama-kurtarma ve imar için birer kaymakam, kadı ve subaşı görevlendirildi. Her evden 22 akçe ek vergi toplandı.\nSosyal Dayanışma: Şeyhülislam dilencileri koruyan fetva çıkardı. Yardım dağıtımında kadın ve çocuklara öncelik verildi; Rum/Ermeni kiliselerine Müslüman ustalar gönderildi.',
    primaryQuote: {
      author: 'Divan-ı Hümayun Kararı (1766)',
      text: 'Arama-kurtarma ve imar işleri için kaymakam, kadı ve subaşı atanacak; halkın ihtiyacı için her evden 22 akçe ek vergi toplanacaktır.',
      source: 'Divan-ı Hümayun Kararları'
    },
    impactTags: ['Sultan III. Mustafa', '22 Akçe Ek Vergi', 'Kaymakam/Kadı/Subaşı', 'Şeyhülislam Fetvası']
  },
  {
    id: 'istanbul-housing',
    title: 'Kâgir Fermanı, Ahşap Israrı & Samatya Değirmenleri',
    city: 'istanbul',
    x: 84,
    y: 32,
    category: 'architecture',
    shortDesc: 'Kâgir fermanına karşılık halkın ahşap ev ısrarı, kâgir yangın duvarı ve Samatya fırın önceliği.',
    fullDesc: 'Kâgir Fermanı ve Ahşap Israrı: Devlet binaların kâgir (taş/tuğla) yapılmasını emretti; ancak halk hızlı ve ucuz barınmak için ahşap evde ısrar etti.\nYangın Duvarı: Ahşap evlerin arasına yangın sıçramasını önlemek için kâgir yangın duvarı (kulaklı duvar) şart koşuldu.\nDeğirmen Krizi: Samatya’da surlara bitişik 4 değirmenin yıkılması üzerine buğday çürüme tehlikesi doğdu; fırınların tamirine ilk öncelik verildi.',
    primaryQuote: {
      author: 'İmar Nizamı (1766)',
      text: 'Ahşap evlerin arasına yangın sirayetini önlemek üzere kâgir duvarlar çekilecek; fırınların tamirine diğer binalardan öncelik tanınacaktır.',
      source: 'Osmanlı İmar Belgeleri'
    },
    impactTags: ['Kâgir Yapı Fermanı', 'Halkın Ahşap Israrı', 'Kâgir Yangın Duvarı', 'Samatya Değirmenleri']
  }
];

export const COMPARISON_CARDS: ComparisonCard[] = [
  // 3 LISBON CARDS
  {
    id: 'card-1',
    text: 'Afetin ardından Leibnizci dinsel optimizm (iyimserlik) felsefesinin sertçe sorgulanması, Kilise anlayışına karşı eleştirel şiirler ve romanlar kaleme alınması.',
    correctZone: 'lisbon',
    category: 'Aydınlanma / Felsefe',
    explanation: 'Voltaire "Candide" ve felaket şiiriyle Leibnizci dinsel optimizmi eleştirmiş, Kilise anlayışıyla Batı Aydınlanması arasında inanç tartışması başlamıştır.',
    hint: 'Dinsel optimizmin ve kilisenin sorgulanması Voltaire ile Lizbon depremi sürecinde yaşanmıştır.'
  },
  {
    id: 'card-2',
    text: 'Afet sonrası kriz analizini bilimsel temellere oturtmak amacıyla ülkenin dört bir yanına 13 soruluk resmi anket formu gönderilerek veri toplanması.',
    correctZone: 'lisbon',
    category: 'Kriz Yönetimi',
    explanation: 'Bakan Pombal, sarsıntı saati, tsunami, yarıklar ve hasarlar hakkında 13 anket sorusu yayımlayarak sismoloji biliminin temellerini atmıştır.',
    hint: '13 soruluk bilimsel deprem anketi Portekiz idaresinin veri toplama çalışmasıdır.'
  },
  {
    id: 'card-3',
    text: 'Karayolları 50 feet, kaldırımları 10 feet (toplam 60 feet) olacak şekilde dik açılı ızgara (grid) kent planı çizilerek su kıyısına büyük bir meydan inşa edilmesi.',
    correctZone: 'lisbon',
    category: 'Mimari / İmar',
    explanation: 'Eugénio dos Santos ve Carlos Mardel; Lizbon Baixa bölgesini 60 feet cadde nizamıyla ızgara plan üzerine kurup Ticaret Meydanı’nı inşa etmiştir.',
    hint: '60 feet caddeler ve ızgara plan Lizbon imar projesine aittir.'
  },

  // 3 ISTANBUL CARDS
  {
    id: 'card-4',
    text: 'Çöken büyük ibadethanenin temellerinden itibaren Osmanlı-Barok üslubunda baştan inşa edilmesi ve çevre illerden başkente ustalar çağrılması.',
    correctZone: 'istanbul',
    category: 'Mimari / İmar',
    explanation: 'Mimarbaşı Halit Efendi teknik tespiti yürütmüş, Mimar Tahir Ağa çöken Fatih Camii’ni Osmanlı-Barok üslubunda yeniden inşa etmiştir.',
    hint: 'Mimarbaşı Halit Efendi ve Mimar Tahir Ağa önderliğinde Fatih Camii ihyası İstanbul’a özgüdür.'
  },
  {
    id: 'card-5',
    text: 'Yıkılan kamusal yapıları ve mabetleri ihya etmek amacıyla kurucu vakıf gelirlerinin 4 yıllık bölümünün tahsis edilmesi ve hane başına 22 akçe ek vergi konulması.',
    correctZone: 'istanbul',
    category: 'Kriz Yönetimi',
    explanation: 'Osmanlı Devleti maddi hasarı gidermek için Divan-ı Hümayun kararıyla her evden 22 akçe ek vergi toplamış, II. Bayezid Vakfı’nın 4 yıllık gelirini tahsis etmiştir.',
    hint: '22 akçe hane vergisi ve II. Bayezid Vakfı’nın 4 yıllık geliri İstanbul kriz idaresine aittir.'
  },
  {
    id: 'card-6',
    text: 'Arama-kurtarma ve imar işlerini yürütmek üzere kaymakam, kadı ve subaşı atanması; inşaat malzemeleri ve işçilikte fiyat spekülasyonunu önlemek için narh (tavan fiyat) getirilmesi.',
    correctZone: 'istanbul',
    category: 'Kriz Yönetimi',
    explanation: 'Osmanlı idaresi mülki amirler (kaymakam, kadı, subaşı) atayarak arama-kurtarmayı organize etmiş, karaborsaya karşı narh (tavan fiyat) kuralı getirmiştir.',
    hint: 'Kaymakam, kadı, subaşı atamaları ve narh (tavan fiyat) uygulaması Osmanlı idaresine aittir.'
  },

  // 3 BOTH CARDS (BENZERLİKLER)
  {
    id: 'card-7',
    text: 'Ana sarsıntının ardından deniz seviyesinde ani çekilmeler ve kıyı kesimleri ile rıhtımları sular altında bırakan tsunami dalgalarının oluşması.',
    correctZone: 'both',
    category: 'Doğal Afet Tipi',
    explanation: 'Lizbon’da Tagus kıyılarında dev tsunami (Fas’ta 8m), İstanbul’da ise Marmara kıyılarında tsunami dalgaları yaşanmıştır.',
    hint: 'Deniz tabanlı kırılmalar her iki başkentte de kıyı tsunamisine yol açmıştır.'
  },
  {
    id: 'card-8',
    text: 'Rigit taş ve tuğla yapılar yerine sarsıntı anında esneklik sağlayan ahşap karkas strüktürlerin ve sismik kafes sistemlerinin öne çıkması.',
    correctZone: 'both',
    category: 'Mimari / İmar',
    explanation: 'Lizbon’da 3D ahşap kafes "Gaiola", İstanbul’da ise halkın ahşap ev ısrarı ve kâgir yangın duvarları esnek strüktürleri ön plana çıkarmıştır.',
    hint: 'Her iki kentte de sarsıntıya dayanıklı esnek ahşap yapılar tercih edilmiştir.'
  },
  {
    id: 'card-9',
    text: 'Devlet başkanlarının ve üst düzey yöneticilerin aylarca çadırlarda ikamet ederek barınma, beslenme ve güvenlik tedbirlerini bizzat denetlemesi.',
    correctZone: 'both',
    category: 'Kriz Yönetimi',
    explanation: 'Pombal ve Kral I. José 9 ay Belem’de çadırda; III. Mustafa da çadırlarda yaşayarak kriz idaresini bizzat yürütmüştür.',
    hint: 'Hükümdar ve yöneticiler her iki devlette de çadırlarda kriz idaresi üstlenmiştir.'
  }
];

export const ARCHITECTURAL_FEATURES: ArchitecturalFeature[] = [
  {
    id: 'gaiola-1',
    title: 'Gaiola Pombalina (Gemi Tekniğinden Esinlenen Kafes)',
    system: 'gaiola',
    description: 'Baixa Pombalina bölgesinde kullanılan sarsıntı önleyici sistem. Duvar örgüsüne 3 boyutlu ahşap kafes yerleştirilir. Gemi yapım yöntemlerinden esinlenilerek tasarlanmıştır.',
    advantage: 'Ahşabın esnekliği taş duvarların gücüyle birleşir; sürekli hareket halinde basınca ve yer çekimine karşı koyar.'
  },
  {
    id: 'gaiola-2',
    title: '60 Feet Izgara (Grid) Şehir Planı',
    system: 'gaiola',
    description: 'Eugénio dos Santos ve Carlos Mardel projesi. Karayolları 50 feet (15m), kaldırımlar 10 feet (3m) olmak üzere 60 feet caddeler ve dik açılı sokaklar.',
    advantage: 'Yangınların karşı sokağa sıçramasını önler, acil müdahaleyi ve ulaşımı kolaylaştırır.'
  },
  {
    id: 'osmanli-1',
    title: 'Osmanlı Kâgir Fermanı & Halkın Ahşap Israrı',
    system: 'osmanli',
    description: 'Devlet binaların kâgir (taş/tuğla) olması zorunluluğunu getirdi; ancak halk barınma ihtiyacını hızlı karşılamak için ahşap çatma evlerde ısrar etti.',
    advantage: 'Ahşap çatma evler esnek yapısıyla sarsıntıda sallanır, ansızın çöküp insanları ezmez.'
  },
  {
    id: 'osmanli-2',
    title: 'Kâgir Yangın Duvarı (Kulaklı Duvar)',
    system: 'osmanli',
    description: 'Ahşap ev ısrarı üzerine devlet, komşu binalar arasına tuğla veya taştan yangın duvarı örülmesini şart koştu.',
    advantage: 'Ahşap konutların en büyük riski olan mahalle yangınlarının evden eve sıçramasını durdurur.'
  }
];

export const BADGES: Badge[] = [
  {
    id: 'badge-map',
    title: 'Keşif',
    description: '1755 Lizbon ve 1766 İstanbul haritalarındaki tüm odak ve sıcak noktaları incelediniz.',
    iconName: 'MapPin',
    unlocked: false
  },
  {
    id: 'badge-visual',
    title: 'Görsel Analiz',
    description: 'Tarihi gravürleri incelediniz ve eşleştirme analizlerini tamamladınız.',
    iconName: 'Compass',
    unlocked: false
  },
  {
    id: 'badge-matrix',
    title: 'Karşılaştırma',
    description: '9 etki kartını Lizbon, İstanbul ve Ortak alanlara eksiksiz doğru yerleştirdiniz.',
    iconName: 'Layers',
    unlocked: false
  }
];

