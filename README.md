# Kişisel Portföy — Yunus Emre Atmaz

Bilgisayar mühendisliği + gezginlik kimliğini birleştiren tek sayfalık portföy sitesi.
Terminal yazımı ve uçuş rotası animasyonlu bir girişle açılır; gezilen 41 ili
gerçek il sınırlarıyla gösteren Türkiye haritası ve Avrupa bayrak kartları içerir.

## Teknolojiler

| Katman | Araç |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS 4 |
| Animasyon | Framer Motion |
| Tema | next-themes (açık varsayılan + karanlık mod) |
| Harita / Bayraklar | turkey-map-react, flag-icons |

## Geliştirme

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

## İçerik güncelleme

Sitedeki tüm metin ve veriler tek dosyada: [`src/data/content.ts`](src/data/content.ts).
Yeni proje, il, ülke veya sertifika eklemek için genelde sadece bu dosyayı
düzenlemek yeterli — bileşenler veriyi oradan okur.

Profil fotoğrafı: `public/profil.jpg` (şu an yer tutucu).

### Site tasarımları

"Site Tasarımları" bölümündeki her tasarım tek dosyalık, bağımsız bir HTML
sayfası. Yeni tasarım eklemek için:

1. HTML dosyasını `public/demo/<slug>.html` olarak koy.
2. 1440×900 kapak görselini `public/images/tasarimlar/<slug>.jpg` olarak koy.
3. `src/data/content.ts` içindeki `designs` listesine bir kayıt ekle.

`/tasarimlar/<slug>` tanıtım sayfası build sırasında kendiliğinden üretilir;
canlı önizleme ziyaretçi "başlat"a basana kadar yüklenmez.

## Mimari notlar

- `src/app/page.tsx` sunucu bileşeni; giriş animasyonu (`IntroGate`) siteyi
  `children` olarak alır, böylece içerik client bundle'a taşınmaz.
- Türkiye haritası `next/dynamic` ile ayrı pakete bölünür; sayfa ilk açılışta
  onu indirmez.
- Renkler CSS değişkeni (`globals.css`): `:root` açık tema, `.dark` karanlık.
- Giriş animasyonu oturum başına bir kez oynar (`sessionStorage`),
  Esc / Enter / "geç" ile atlanabilir ve `prefers-reduced-motion`'da devre dışıdır.
