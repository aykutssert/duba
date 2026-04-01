# Davar

Kaldırım, engelli yolu ve bisiklet yollarındaki usulsüz park ihlallerini fotoğrafla belgeleyen anonim bildirim platformu.

## Özellikler

- **Anonim bildirim** — Kayıt gerektirmez, fotoğraf çek ve gönder
- **GPS konum** — Otomatik konum tespiti ve adres çözümleme (Nominatim)
- **Moderasyon paneli** — Admin onayı, plaka/yüz gizleme (canvas blur)
- **Kategori sistemi** — Engelli yolu, kaldırım, bisiklet yolu, okul önü
- **Rate limiting** — IP tabanlı hız sınırlama (Upstash Redis, 3/saat)
- **Dual storage** — Orijinaller özel bucket'ta, blurlanmış versiyonlar public
- **Dark mode** — Sistem tercihi + manuel geçiş
- **Responsive** — Mobil öncelikli tasarım

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Actions)
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL + Storage)
- **Rate Limiting:** Upstash Redis
- **Language:** TypeScript

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Environment variables
cp .env.example .env.local
# .env.local dosyasını düzenle (aşağıya bak)

# Supabase migration
# supabase-setup.sql ve supabase-migration-v2.sql dosyalarını
# Supabase Dashboard > SQL Editor'de sırayla çalıştır

# Dev server
npm run dev
```

## Environment Variables

`.env.local` dosyasında şunlar gerekli:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx
ADMIN_PASSWORD=guclu-bir-sifre
```

## Proje Yapısı

```
src/
├── app/
│   ├── admin/          # Moderasyon paneli
│   ├── api/admin/      # Admin API (reports, blur)
│   ├── privacy/        # Gizlilik politikası
│   ├── actions.ts      # Server Actions (upload)
│   ├── error.tsx       # Error boundary
│   ├── not-found.tsx   # 404 sayfası
│   └── page.tsx        # Ana sayfa
├── components/
│   ├── Feed.tsx        # Rapor listesi (server)
│   ├── FeedClient.tsx  # İnteraktif feed wrapper
│   ├── Header.tsx      # Navbar
│   ├── HeroSection.tsx # Landing hero
│   ├── ReportCard.tsx  # Rapor kartı
│   ├── ReportDetailModal.tsx  # Detay modal
│   ├── ThemeToggle.tsx # Dark mode toggle
│   └── UploadModal.tsx # Bildirim formu
├── lib/
│   └── supabase.ts     # Supabase client
└── proxy.ts            # Rate limiting middleware
```

## Deploy

Vercel'e deploy etmek için:

1. GitHub repo'yu Vercel'e bağla
2. Environment variables'ı Vercel dashboard'dan ekle
3. Deploy — otomatik build ve yayın

Admin paneli: `https://domain.com/admin`

## Lisans

MIT
