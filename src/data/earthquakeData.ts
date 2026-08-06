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
    instructionText: 'Depremlerin etkilerini ilgili kutulara (Sadece Lizbon, Ortak Etkiler, Sadece İstanbul) sürükleyerek eşleştirin.',
    actionPrompt: '9 etki kartını doğru sütunlara yerleştirin ve en alttaki Kontrol Et butonuna basın.'
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
    shortDesc: '1 Kasım 1755 sabahı ~8,3 büyüklüğündeki sarsıntı ve 45 dk sonra gelen tsunami.',
    fullDesc: '1 Kasım 1755 Azizler Günü sabahı Portekiz’in Lizbon kenti yaklaşık 8,3 büyüklüğünde bir depremle sarsıldı. Depremden sağ kurtulanlar panikle Tagus (Tejo) Nehri kıyılarına ve limana koştu. Ancak sarsıntıdan yaklaşık 45 dakika sonra dev tsunami dalgaları Tagus kıyılarına ulaştı. Tsunami Fas kıyılarına ulaştığında yaklaşık 8 metreyi buldu, yeni inşa edilen mermer Cais de Pedra (Kays de Pedra) Rıhtımı dâhil şehrin alt kısmını sular altında bıraktı. Kıyılara ve açık alanlara akın eden yaklaşık 20 bin kişi tsunami nedeniyle hayatını kaybetti. Olay, Avrupa’da yaşanan en büyük doğal afet olarak kayıtlara geçti.',
    primaryQuote: {
      author: 'Rahip Charles Davy (1755)',
      text: 'Deniz geliyor, hepimiz yok olacağız! Sular çekilmiş ve nehir yatağı ortaya çıkmıştı. Tsunami karaya ulaşmak üzereydi. Saat 10.10 sularında tsunami vurdu, limanı yerle bir etti ve binlerce kişiyi sürükleyip götürdü.',
      source: 'Lizbon Depremi Anlatıları (Joel, 2015)'
    },
    impactTags: ['8.3 Büyüklük', '45 Dk Sonra Tsunami', '20 Bin Tsunami Kaybı', 'Cais de Pedra Rıhtımı']
  },
  {
    id: 'lisbon-cathedral',
    title: 'Lizbon Katedralleri & Düşünsel Sarsıntı',
    city: 'lisbon',
    x: 22,
    y: 22,
    category: 'philosophy',
    shortDesc: 'Azizler Günü devrilen mumlar/sobalar ile 6 günlük yangın, Voltaire ve J.J. Rousseau tartışması.',
    fullDesc: 'Katolik halkın büyük bölümü Azizler Günü nedeniyle kiliselerdeydi. Sarsıntıyla devrilen mumlar, sobalar ve yağ lambaları şehirde büyük yangın başlattı; binaların %85’i ve büyük kiliselerin tamamı yıkıldı. Bu felaket Avrupa Aydınlanma düşünürlerini derinden sarstı. Voltaire "Candide" ve "Lizbon Felaketi Üzerine Şiir" eserleriyle dinsel optizmi eleştirdi. Jean-Jacques Rousseau ise felaketin şehirlerin kalabalıklaşmasından kaynaklandığını belirterek doğal yaşam tarzına dönülmesi gerektiğini savundu. Cizvit eğitimi gözden geçirilerek sadece soylulara değil tüm halka hitap eden yeni bir eğitim modeli ve müfredat oluşturuldu.',
    primaryQuote: {
      author: 'Voltaire & J.J. Rousseau (1756)',
      text: 'Voltaire: "Yıkılmış Lizbon’un külleri üzerinde bana hâlâ her şey iyilik içindir diyebilir misiniz?" / Rousseau: "Bu felaket şehirlerin kalabalıklaşmasından kaynaklandığını, doğal yaşam tarzına dönülmelidir."',
      source: 'Tarihsel Felsefi Belgeler'
    },
    impactTags: ['Voltaire & J.J. Rousseau', 'Azizler Günü Yangını', 'Halka Açık Eğitim Reformu']
  },
  {
    id: 'lisbon-palace',
    title: 'Kral I. José, Bakan Pombal & 13 Anket Sorusu',
    city: 'lisbon',
    x: 28,
    y: 29,
    category: 'administration',
    shortDesc: 'Kral I. José’nin Pombal’ı tam yetkilendirmesi, 12 bölge lideri, 9 ay çadırda yaşam ve 13 anket sorusu.',
    fullDesc: 'Kral I. José, Bakan Marqués de Pombal’ı acil durum ve yeniden yapılanma için geniş yetkilerle donattı. Kral ve ailesi yeni saray yapılana dek 9 ay boyunca Bélem mevkisinde çadırda yaşadı; Pombal evi sağlam olmasına rağmen aynı mevkide bir kulübeye yerleşti. Pombal başyargıç izniyle acil müdahale yetkisine sahip 12 bölge lideri atadı, yağma ve hırsızlığa idam cezası getirdi, salgın hastalığa karşı cenazeleri Kilise izniyle dinî tören yapılmadan Tagus Nehri’ne batırttı. Ayrıca ülkenin farklı bölgelerine 13 soruluk bilimsel anket göndererek sismoloji biliminin temellerini attı ve 1761’de Kraliyet Hazinesi’ni (Tesouraria Real) kurdu.',
    primaryQuote: {
      author: 'Marqués de Pombal (1755)',
      text: 'Ölülerimizi gömmeli ve canlılarımızın hayatını kurtarmalıyız! Şehre giriş-çıkışlar kontrollü yapılacak, yağma yapanlar idam edilecektir.',
      source: 'Portekiz İdari Arşiv Belgeleri'
    },
    impactTags: ['Kral I. José & Pombal', '12 Bölge Lideri', '13 Soruluk Sismoloji Anketi', '1761 Kraliyet Hazinesi']
  },
  {
    id: 'lisbon-baixa',
    title: 'Baixa Pombalina & Ahşap Kafes (Gaiola)',
    city: 'lisbon',
    x: 17,
    y: 29,
    category: 'architecture',
    shortDesc: 'Gemi yapımından esinlenen Gaiola Pombalina kafes sistemi, Eugénio dos Santos ve Carlos Mardel planı.',
    fullDesc: 'Eugénio dos Santos Carvalho ve Carlos Mardel tarafından çizilen projeyle Rossio Meydanı ile rıhtım arası düzleştirildi. Caddelerin genişliği 60 feet [1 feet: 30,48 cm] (karayolu 50 feet/~15m, kaldırımlar 10 feet/~3m) ve sokak geçişleri dik açılarla belirlendi. Binalarda gemi yapım yöntemlerinden esinlenilerek tasarlanan 3 boyutlu ahşap kafes "Gaiola Pombalina" zorunlu kılındı. Eski Kraliyet Meydanı yerine Ticaret Meydanı inşa edildi. İthalat gelirlerinden %4 oranında bağış kesintisi yapıldı ve soylu sınıfa yeni vergiler getirildi.',
    primaryQuote: {
      author: 'Pombal İmar Fermanı (1756)',
      text: 'Gaiola adı verilen ahşap çerçeve tüm inşaatlar için zorunlu hale getirilecek ve standart cephe tasarımı uygulanacaktır.',
      source: 'Lizbon İmar Fermanı'
    },
    impactTags: ['Gaiola Pombalina (Gemi Tekniği)', '60 Feet Caddeler', 'Ticaret Meydanı', '%4 İthalat Kesintisi']
  },

  // ISTANBUL HOTSPOTS (Positioned accurately on right half of 1.OLAY_HARİTA.png)
  {
    id: 'istanbul-marmara',
    title: 'Marmara Denizi Merkez Üssü',
    city: 'istanbul',
    x: 58,
    y: 67,
    category: 'destruction',
    shortDesc: '22 Mayıs 1766 Kurban Bayramı 3. günü ~7,5 büyüklüğünde deprem, 2 dk sarsıntı, 8 ay artçı.',
    fullDesc: '22 Mayıs 1766 Kurban Bayramı’nın 3. günü sabah namazından sonra Marmara Denizi doğusunda tahminî 7,5 büyüklüğünde yıkıcı bir deprem gerçekleşti. Sarsıntı yaklaşık 2 dakika sürdü ve İstanbul toz bulutu içinde kaldı. 8 ay boyunca artçı sarsıntılar devam etti; 5 Ağustos’taki artçı sarsıntının şiddeti neredeyse ilk depremle aynıydı. Merkez üssü Marmara Denizi doğusu olan deprem İzmit, Tekirdağ, Edirne, Bursa ve İzmir’den Selânik’e kadar hissedildi. Yaklaşık 4-5 bin kişi hayatını kaybetti. Fatih, Bayezid ve Şehzadebaşı Camileri ile Kapalıçarşı ağır hasar gördü.',
    primaryQuote: {
      author: 'Minas Ceranyan (1766)',
      text: 'Hey ağalar size tarif edeyim, bir zalim titreme çekti İstanbul... Ortalığı yıkıp berbâd eyledi, çalkalanıp durdu bir an İstanbul... Çarşılar kapandı evler boşandı, meydanlar hep çadır ile döşendi...',
      source: '1766 İstanbul Depremi Şiiri (Pamukciyan, 2002)'
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
    shortDesc: 'Mimarbaşı Halit Efendi teknik hasar tespiti, Mimar Tahir Ağa ile Fatih Camii’nin Barok-Osmanlı rekonstrüksiyonu.',
    fullDesc: 'Depremin hemen ardından Mimarbaşı Halit Efendi başkanlığındaki teknik heyet deprem bölgesinde hasar tespit çalışmaları yaptı. Fatih Camii’nin büyük kubbesi ve imaretleri çöktü. Sultan III. Mustafa emriyle Mimar Tahir Ağa camiyi temelden itibaren Osmanlı-Barok üslubunda yeniden inşa etti. Sultan II. Bayezid vakfının 4 yıllık geliri depremde hasar gören cami ve imaretlerin onarımına ayrıldı. Taş, kereste ve demir temini için çevre illerdeki kadılara resmî yazılar gönderildi ve ustalar başkente çağrıldı.',
    primaryQuote: {
      author: 'Sultan III. Mustafa Fermanı (1766)',
      text: 'Mabetlerin ve fukara meskenlerinin derhal ihyası, hazine-i hümayun ve vakıf gelirlerinden karşılanıp hiç kimseden mağduriyet tesis edilmeye.',
      source: 'Sultan III. Mustafa Fermanı'
    },
    impactTags: ['Mimarbaşı Halit Efendi', 'Mimar Tahir Ağa', 'II. Bayezid Vakfı 4 Yıllık Geliri']
  },
  {
    id: 'istanbul-bazaar',
    title: 'Kapalıçarşı & Yapı Hasar Dağılım Oranları',
    city: 'istanbul',
    x: 73,
    y: 42,
    category: 'economy',
    shortDesc: 'Kapalıçarşı ihyası, narh uygulaması ve %30 cami, %20 eğitim binası, %15 mirî bina hasar oranları.',
    fullDesc: 'Kapalıçarşı tonozları çökünce esnafa narh (tavan fiyat) getirilip fiyat spekülasyonu önlendi. Depremde yıkılan ve hasar gören binaların işlevlerine göre dağılımı belirlendi: %30 Cami, %20 Eğitim Binası, %15 Mirî Hizmet Binası (Devlet malı), %10 Sur, %10 Saray, %5 Ticari Yapı, %10 Diğer (türbe, imaret, darüşşifa). Toplam zararın 22.000 kese (yaklaşık 11.000.000 kuruş) olduğu hesaplandı.',
    primaryQuote: {
      author: 'Tarihsel Arşiv Kaydı (Mazlum, 2011)',
      text: '1766 İstanbul depreminin meydana getirdiği maddi zarar 22.000 keseyi (yaklaşık 11.000.000 kuruş) bulmuş, tüm başkent şantiye görünümüne bürünmüştür.',
      source: 'Osmanlı Tarihsel Arşiv Kayıtları'
    },
    impactTags: ['%30 Cami %20 Eğitim Binası', '%15 Mirî Hizmet Binası', '22 Bin Kese Zarar', 'Narh Uygulaması']
  },
  {
    id: 'istanbul-topkapi',
    title: 'Sultan III. Mustafa & İdari Görevlendirmeler',
    city: 'istanbul',
    x: 75,
    y: 50,
    category: 'administration',
    shortDesc: 'Sultan III. Mustafa’nın çadırda kriz yönetimi, kaymakam/kadı/subaşı ataması, 22 akçe ek vergi.',
    fullDesc: 'Sultan III. Mustafa çadır kurulan alanları gezerek gözyaşlarıyla halka yardım etti. Depremin ardından arama kurtarma, barınma ve imar faaliyetlerini organize etmek için birer kaymakam, kadı ve subaşı görevlendirildi. Maddi hasarı gidermek için Divan-ı Hümayun tarafından her evden 22 akçe ek vergi toplanması kararlaştırıldı. Şeyhülislam dilencilerin korunmasına yönelik fetva yayımladı. Yardım dağıtımında kadın ve çocuklara öncelik verildi, Rum ve Ermeni kiliselerine Müslüman ustalar gönderildi.',
    primaryQuote: {
      author: 'Sultan III. Mustafa Fermanı (1766)',
      text: 'Dersaadet’te (İstanbul) bir tek fukara dahi ekmeksiz ve açıkta kalmayacaktır. Divan-ı Hümayun kararıyla her evden 22 akçe ek vergi toplanacaktır.',
      source: 'Divan-ı Hümayun Kararları'
    },
    impactTags: ['Sultan III. Mustafa', '22 Akçe Ek Vergi', 'Kaymakam/Kadı/Subaşı', 'Şeyhülislam Fetvası']
  },
  {
    id: 'istanbul-housing',
    title: 'Kâgir Zorunluluğu Fermanı & Ahşap Israrı',
    city: 'istanbul',
    x: 84,
    y: 32,
    category: 'architecture',
    shortDesc: 'Devletin binaları kâgir yapma zorunluluğuna karşılık halkın ahşapta ısrarı ve kâgir yangın duvarı.',
    fullDesc: 'Osmanlı Devleti depremden sonra inşa edilecek binaların kâgir (taş/tuğla) olması zorunluluğunu fermanla getirdi. Ancak halkın büyük bölümü barınma ihtiyaçlarını daha hızlı ve ekonomik karşılamak için yeni evlerini ahşap malzemelerden inşa etmekte ısrar etti! Ahşap evlerin arasına mahalle yangınlarını önlemek amacıyla kâgir yangın duvarı (kulaklı duvar) örülmesi şart koşuldu. Fırınlar ve değirmenlerin (Samatya vb.) tamirine diğer yapılardan öncelik verildi.',
    primaryQuote: {
      author: 'İmar Nizamı Belgesi (1766)',
      text: 'İnşa edilecek binaların kâgir olması emrolunmuşsa da ahşap yapılan konutların arasına yangın sirayetini önlemek üzere kâgir duvarlar çekilecektir.',
      source: 'Osmanlı İmar Nizamı Belgeleri'
    },
    impactTags: ['Kâgir Yapı Fermanı', 'Halkın Ahşap Israrı', 'Kâgir Yangın Duvarı', 'Fırın & Değirmen Önceliği']
  }
];

export const COMPARISON_CARDS: ComparisonCard[] = [
  // 3 LISBON CARDS
  {
    id: 'card-1',
    text: 'Voltaire\'in "Candide" ve "Lizbon Felaketi Üzerine Şiir" eserleriyle ilahi takdir felsefesini ve Kilise anlayışını eleştirmesi.',
    correctZone: 'lisbon',
    category: 'Aydınlanma / Felsefe',
    explanation: 'Voltaire bu eserlerinde Leibnizci optimizmi eleştirmiş, ancak şiiri Kilise tarafından Hristiyanlığın temel ilkelerine saldırı sayılmıştır.',
    hint: 'Bu dinsel felsefi tartışma doğrudan Voltaire ve Lizbon felaketi ile özdeşleşmiştir.'
  },
  {
    id: 'card-2',
    text: 'Bakan Marqués de Pombal\'ın emriyle ülkenin farklı bölgelerine 13 soruluk bilimsel anket gönderilerek sismoloji verisi toplanması.',
    correctZone: 'lisbon',
    category: 'Kriz Yönetimi',
    explanation: 'Pombal, depremin saati, deniz seviyesindeki değişim, yarıklar ve artçılar hakkında 13 anket sorusu yayımlayarak sismoloji biliminin temellerini atmıştır.',
    hint: '13 anket sorusu Portekiz Başbakanı Pombal’ın veri toplama çalışmasıdır.'
  },
  {
    id: 'card-3',
    text: 'Eugénio dos Santos ve Carlos Mardel tarafından 60 feet genişlikte caddelere sahip ızgara (grid) kent planı çizilmesi.',
    correctZone: 'lisbon',
    category: 'Mimari / İmar',
    explanation: 'Lizbon Baixa bölgesi karayolları 50 feet, kaldırımları 10 feet (toplam 60 feet) genişlikte ızgara plan ve dik açılı sokaklarla sıfırdan inşa edilmiştir.',
    hint: 'Mühendisler dos Santos Carvalho ve Carlos Mardel Lizbon planını çizmiştir.'
  },

  // 3 ISTANBUL CARDS
  {
    id: 'card-4',
    text: 'Mimarbaşı Halit Efendi teknik heyetinin hasar tespiti yapması ve Mimar Tahir Ağa\'nın Fatih Camii\'ni Osmanlı-Barok tarzında yeniden inşa etmesi.',
    correctZone: 'istanbul',
    category: 'Mimari / İmar',
    explanation: 'İstanbul’da Mimarbaşı Halit Efendi teknik tespiti yürütmüş, Sultan III. Mustafa emriyle Mimar Tahir Ağa çöken Fatih Camii’ni baştan inşa etmiştir.',
    hint: 'Mimarbaşı Halit Efendi ve Mimar Tahir Ağa İstanbul imarında görev yapmıştır.'
  },
  {
    id: 'card-5',
    text: 'Divan-ı Hümayun kararıyla her evden 22 akçe ek vergi toplanması ve Sultan II. Bayezid Vakfı\'nın 4 yıllık gelirinin tahsis edilmesi.',
    correctZone: 'istanbul',
    category: 'Kriz Yönetimi',
    explanation: 'Osmanlı Devleti maddi hasarı gidermek için her evden 22 akçe ek vergi toplamış, II. Bayezid vakfının 4 yıllık gelirini cami ve imaretlere ayırmıştır.',
    hint: '22 akçe ek vergi ve II. Bayezid Vakfı 4 yıllık geliri İstanbul depremi içindir.'
  },
  {
    id: 'card-6',
    text: 'Sultan III. Mustafa\'nın kriz idaresi için birer kaymakam, kadı ve subaşı görevlendirip karaborsaya karşı narh uygulaması getirmesi.',
    correctZone: 'istanbul',
    category: 'Kriz Yönetimi',
    explanation: 'Osmanlı Devleti arama-kurtarma ve imar için mülki amirler atamış, fiyat artışını önlemek için inşaat ve gıdaya narh (tavan fiyat) koymuştur.',
    hint: 'Kaymakam, kadı, subaşı görevlendirmesi ve narh koyulması İstanbul kriz idaresidir.'
  },

  // 3 BOTH CARDS (BENZERLİKLER)
  {
    id: 'card-7',
    text: 'Sarsıntıların ardından deniz dalgalanmalarının (tsunami) kıyı kesimlerini ve rıhtımları sular altında bırakması.',
    correctZone: 'both',
    category: 'Doğal Afet Tipi',
    explanation: 'Lizbon’da Tagus kıyılarında dev tsunami (Fas’ta 8m), İstanbul’da ise Marmara kıyılarında ve Yedikule/Galata’da kıyı tsunamisi yaşanmıştır.',
    hint: 'Deniz tabanlı kırılmalar her iki kentte de kıyı dalgalanmalarına yol açmıştır.'
  },
  {
    id: 'card-8',
    text: 'Binalarda ahşap karkas esnek strüktürlerin (Gaiola Pombalina & Ahşap Çatma) tercih edilmesi.',
    correctZone: 'both',
    category: 'Mimari / İmar',
    explanation: 'Lizbon’da 3D ahşap kafes "Gaiola", İstanbul’da ise ferman kâgir olsa da halkın ahşap ev ısrarı ve kâgir yangın duvarları yaygınlaşmıştır.',
    hint: 'Her iki kentte de sarsıntıya dayanıklı esnek ahşap strüktürler öne çıkmıştır.'
  },
  {
    id: 'card-9',
    text: 'Devlet idaresinin çadırlar kurarak barınma, iaşe ve güvenlik tedbirlerini bizzat üstlenmesi.',
    correctZone: 'both',
    category: 'Kriz Yönetimi',
    explanation: 'Pombal 9 ay Bélem mevkisinde kulübede; III. Mustafa da çadırda ikamet ederek halkın beslenme, barınma ve asayişini bizzat denetlemiştir.',
    hint: 'Afet yönetimi her iki devlette de hükümdar ve bakan düzeyinde doğrudan yürütülmüştür.'
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

