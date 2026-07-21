// Sitedeki tüm içerik burada. Siteyi güncellemek için genelde
// sadece bu dosyayı düzenlemen yeterli.

// Sitenin canlı adresi. Deploy sonrası gerçek domain ile güncelle —
// sitemap, robots.txt ve sosyal medya kartları bu adresi kullanıyor.
export const siteUrl = "https://yunusemreatmaz.vercel.app";

export const profile = {
  name: "Yunus Emre Atmaz",
  title: "Bilgisayar Mühendisliği Öğrencisi",
  tagline: "Kod yazan gezgin",
  location: "Konya, Türkiye",
  email: "yunusemreatmaz@gmail.com",
  summary:
    "KTO Karatay Üniversitesi'nde 3. sınıf bilgisayar mühendisliği öğrencisiyim (GPA 3.42, tam burslu) ve şu an Lublin Teknoloji Üniversitesi'nde Erasmus+ ile yapay zekâ ve makine öğrenmesi üzerine çalışıyorum. Yapay zekâ destekli sistemler, IoT otomasyonu ve full-stack geliştirme üzerine projeler üretiyorum; backend ve veritabanı tarafı en sevdiğim alan.",
  travelBlurb:
    "Kod yazmadığım zamanlarda sırt çantamla yollardayım. 13 ülke gezdim ve gezdiğim her yeri kameraya alıp 2.000+ kişilik bir izleyici kitlesiyle paylaşıyorum.",
};

export const links = {
  github: "https://github.com/yunopo42",
  linkedin: "https://www.linkedin.com/in/yunus-emre-atmaz/",
  youtube: "https://www.youtube.com/@yunusemreatmaz8519",
  instagram: "https://instagram.com/bir_deligezgin",
  email: "mailto:yunusemreatmaz@gmail.com",
};

export const education = [
  {
    school: "KTO Karatay Üniversitesi",
    degree: "Bilgisayar Mühendisliği (Lisans)",
    period: "2022 — Devam ediyor",
    detail: "GPA 3.42 / 4.00 · Tam Burslu",
  },
  {
    school: "Lublin Teknoloji Üniversitesi",
    degree: "Erasmus+ Değişim Programı, Bilgisayar Bilimleri",
    period: "2025 — 2026",
    detail: "GPA 3.85 / 4.00 · Yapay Zekâ, Makine Öğrenmesi, İleri Python",
  },
];

export const experience = [
  {
    role: "Yazılım Mühendisliği Stajyeri",
    company: "Atiker Yazılım A.Ş.",
    period: "2025",
    bullets: [
      "Atiker'in kendi geliştirme dili TrObject ile «StoLog» adlı stok ve lojistik yönetim uygulamasını geliştirdim.",
      "Mobil ve masaüstü uyumlu, dinamik sayfa yapısına sahip arayüzler tasarladım.",
      "Giriş, kayıt, dashboard, analitik, stok takibi ve filo takibi modüllerini hayata geçirdim.",
      "Yerel depolama için SQLite entegre edip gerçek zamanlı işlemler için dinamik SQL sorguları yazdım.",
    ],
  },
];

export type Project = {
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  href?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "FlowDesk",
    tagline: "Ekipler için görev yönetimi uygulaması",
    description:
      "Ekiplerin işlerini tek yerden yönetmesi için geliştirdiğim görev yönetimi uygulaması. Kullanıcılar ekip oluşturabiliyor, ekibe üye ekleyebiliyor ve üyelere görev atayarak ilerlemeyi takip edebiliyor.",
    tags: ["Python", "Flask", "SQLAlchemy", "SQLite"],
    featured: true,
  },
  {
    name: "Otonom Sera 365",
    tagline: "Yapay zekâ destekli akıllı sera sistemi",
    description:
      "Donanım, backend, yapay zekâ ve web arayüzünü birleştiren uçtan uca IoT sera sistemi. Node.js + Express backend'i Render üzerinde çalışıyor, ESP32 cihazlarıyla HiveMQ Cloud üzerinden MQTT ile gerçek zamanlı haberleşiyor. Sensör verileri ve AI analiz sonuçları Supabase PostgreSQL'de tutuluyor; fan, pompa ve LED kontrolü Python ile eğitilmiş Random Forest modeliyle otonom olarak yapılıyor. TensorFlow.js ve ESP32-CAM ile CNN tabanlı bitki hastalığı tespiti de mevcut.",
    tags: [
      "Node.js",
      "Express",
      "MQTT",
      "Supabase",
      "PostgreSQL",
      "TensorFlow.js",
      "ESP32",
      "Random Forest",
    ],
    href: links.github,
    featured: true,
  },
  {
    name: "ErasmusHub",
    tagline: "Full-stack Erasmus yönetim platformu",
    description:
      "Next.js 16 App Router ve TypeScript ile yazılmış full-stack Erasmus yönetim uygulaması. Backend mantığı Next.js API Routes üzerinde, veritabanı better-sqlite3 ile SQLite. React 19 bileşenleri, CSS Modules ve next-themes ile koyu/açık tema desteği içeriyor. Akıllı dashboard, vize kontrol listesi, bütçe takibi, onboarding akışı ve dijital seyahat pasaportu özellikleri var.",
    tags: ["Next.js 16", "TypeScript", "React 19", "SQLite", "API Routes"],
    href: links.github,
    featured: true,
  },
  {
    name: "Ultimate Finance Terminal",
    tagline: "Masaüstü finans takip uygulaması",
    description:
      "Python ve PyQt5 ile geliştirilmiş masaüstü finansal takip uygulaması. requests ve BeautifulSoup ile canlı finansal veriyi web'den çekiyor, HTML yapılarını ayrıştırıp ham piyasa verisini sayısal formata çeviriyor ve Matplotlib ile görselleştiriyor.",
    tags: ["Python", "PyQt5", "BeautifulSoup", "Matplotlib", "Web Scraping"],
    href: links.github,
  },
  {
    name: "Teknofest Robotaxi",
    tagline: "Gerçek zamanlı şerit tespit sistemi",
    description:
      "Otonom sürüş senaryoları için OpenCV ile gerçek zamanlı şerit tespit hattı. Canny kenar tespiti, Hough dönüşümü, eşikleme ve kontur tespiti tekniklerini kullanarak sürekli video karelerinden şerit sınırlarını çıkarıyor.",
    tags: ["Python", "OpenCV", "NumPy", "Computer Vision"],
    href: links.github,
  },
];

export const skills = [
  {
    group: "Diller",
    items: ["Python", "Java", "TypeScript", "JavaScript", "SQL", "C", "Dart"],
  },
  {
    group: "Backend & Veritabanı",
    items: [
      "Node.js",
      "Express",
      "Next.js API Routes",
      "PostgreSQL",
      "Supabase",
      "SQLite",
      "better-sqlite3",
    ],
  },
  {
    group: "Yapay Zekâ & ML",
    items: [
      "TensorFlow",
      "TensorFlow.js",
      "Scikit-learn",
      "OpenCV",
      "Random Forest",
      "CNN",
      "Prompt Engineering",
    ],
  },
  {
    group: "Frontend",
    items: [
      "Next.js",
      "React",
      "Vanilla JavaScript",
      "CSS3",
      "CSS Modules",
      "Chart.js",
      "PyQt5",
    ],
  },
  {
    group: "IoT & Donanım",
    items: [
      "ESP32",
      "ESP32-CAM",
      "MQTT",
      "HiveMQ Cloud",
      "DHT22",
      "OLED Display",
    ],
  },
  {
    group: "Araçlar",
    items: ["Git", "Docker", "Linux", "Render", "Cursor", "Claude"],
  },
];

export const certificates = [
  "İHA-1 Drone Pilotu Sertifikası",
  "Python & TensorFlow — BTK Akademi",
  "Java Programlama — BTK Akademi",
  "Malware Analizi — Kapsül",
  "Ethical Hacking — Udemy",
  "CubeSat Tasarımı — Kapsül",
];

export const languages = [
  { name: "Türkçe", level: "Ana dil" },
  { name: "İngilizce", level: "B2 / C1 — Profesyonel çalışma yeterliliği" },
];

// Gezilen yerler. Giriş animasyonundaki harita ve "Gezi" bölümü
// bu listeden besleniyor. Sıra = rota çizim sırası.
export type Place = {
  city: string;
  country: string;
  lat: number;
  lon: number;
  home?: boolean;
};

/** Giriş animasyonundaki uçuş rotası: ev + gezilen ülkelerin başkentleri. */
export const introRoute: Place[] = [
  { city: "Konya", country: "Türkiye", lat: 37.87, lon: 32.48, home: true },
  { city: "İstanbul", country: "Türkiye", lat: 41.01, lon: 28.98 },
  { city: "Sofya", country: "Bulgaristan", lat: 42.7, lon: 23.32 },
  { city: "Bükreş", country: "Romanya", lat: 44.43, lon: 26.1 },
  { city: "Üsküp", country: "Makedonya", lat: 41.99, lon: 21.43 },
  { city: "Priştine", country: "Kosova", lat: 42.66, lon: 21.16 },
  { city: "Belgrad", country: "Sırbistan", lat: 44.79, lon: 20.45 },
  { city: "Budapeşte", country: "Macaristan", lat: 47.5, lon: 19.04 },
  { city: "Viyana", country: "Avusturya", lat: 48.21, lon: 16.37 },
  { city: "Bratislava", country: "Slovakya", lat: 48.15, lon: 17.11 },
  { city: "Prag", country: "Çekya", lat: 50.08, lon: 14.44 },
  { city: "Varşova", country: "Polonya", lat: 52.23, lon: 21.01 },
  { city: "Berlin", country: "Almanya", lat: 52.52, lon: 13.4 },
  { city: "Amsterdam", country: "Hollanda", lat: 52.37, lon: 4.9 },
  { city: "Brüksel", country: "Belçika", lat: 50.85, lon: 4.35 },
  { city: "Paris", country: "Fransa", lat: 48.86, lon: 2.35 },
  { city: "Roma", country: "İtalya", lat: 41.9, lon: 12.5 },
  { city: "Vatikan", country: "Vatikan", lat: 41.9, lon: 12.45 },
];

/**
 * Gezilen iller. İsimler turkey-map-react paketindeki resmî il
 * adlarıyla birebir aynı olmalı (örn. "Afyon" değil "Afyonkarahisar"),
 * yoksa harita o ili boyayamaz.
 */
export const visitedProvinces = [
  "Afyonkarahisar",
  "Aksaray",
  "Ankara",
  "Antalya",
  "Ardahan",
  "Aydın",
  "Bartın",
  "Bolu",
  "Burdur",
  "Bursa",
  "Çanakkale",
  "Çankırı",
  "Çorum",
  "Denizli",
  "Diyarbakır",
  "Erzurum",
  "Eskişehir",
  "Gaziantep",
  "Giresun",
  "Hatay",
  "Isparta",
  "İstanbul",
  "İzmir",
  "Kahramanmaraş",
  "Karabük",
  "Karaman",
  "Kars",
  "Kastamonu",
  "Kırıkkale",
  "Kırşehir",
  "Kocaeli",
  "Konya",
  "Muğla",
  "Nevşehir",
  "Niğde",
  "Ordu",
  "Rize",
  "Sakarya",
  "Samsun",
  "Şanlıurfa",
  "Trabzon",
];

/** Gezilen Avrupa ülkeleri. code = ISO 3166-1 alpha-2, bayrak için kullanılıyor. */
export type EuroCountry = { country: string; capital: string; code: string };

export const europeCountries: EuroCountry[] = [
  { country: "Makedonya", capital: "Üsküp", code: "mk" },
  { country: "Sırbistan", capital: "Belgrad", code: "rs" },
  { country: "Kosova", capital: "Priştine", code: "xk" },
  { country: "Macaristan", capital: "Budapeşte", code: "hu" },
  { country: "Slovakya", capital: "Bratislava", code: "sk" },
  { country: "Çekya", capital: "Prag", code: "cz" },
  { country: "Polonya", capital: "Varşova", code: "pl" },
  { country: "Almanya", capital: "Berlin", code: "de" },
  { country: "Hollanda", capital: "Amsterdam", code: "nl" },
  { country: "Belçika", capital: "Brüksel", code: "be" },
  { country: "Fransa", capital: "Paris", code: "fr" },
  { country: "İtalya", capital: "Roma", code: "it" },
  { country: "Avusturya", capital: "Viyana", code: "at" },
  { country: "Romanya", capital: "Bükreş", code: "ro" },
  { country: "Bulgaristan", capital: "Sofya", code: "bg" },
  { country: "Vatikan", capital: "Vatikan", code: "va" },
];

export const travelStats = {
  provinces: visitedProvinces.length, // 41
  europeCountries: europeCountries.length, // 16
  europeCities: 23,
  /** Avrupa ülkeleri + Türkiye */
  countries: europeCountries.length + 1, // 17
};
