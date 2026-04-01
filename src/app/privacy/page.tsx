import Link from "next/link";

export const metadata = {
  title: "Gizlilik Politikası — Davar",
  description: "Davar uygulaması gizlilik politikası ve veri işleme koşulları.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Ana Sayfa
        </Link>

        <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Gizlilik Politikası
        </h1>
        <p className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
          Son güncelleme: Nisan 2026
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">
              1. Toplanan Veriler
            </h2>
            <p>
              Davar, kaldırım ve engelli yolu ihlallerini fotoğrafla belgelemeye yarayan anonim bir
              platformdur. Aşağıdaki veriler toplanır:
            </p>
            <ul className="mt-3 list-inside list-disc space-y-1.5 text-zinc-600 dark:text-zinc-400">
              <li>
                <strong>Fotoğraf:</strong> Yüklediğiniz ihlal fotoğrafı. Plaka ve yüz bilgileri
                moderatör tarafından yayın öncesinde gizlenir (pixelate).
              </li>
              <li>
                <strong>Konum (isteğe bağlı):</strong> Tarayıcınız izin verirse GPS koordinatları
                ve bunlardan türetilen yaklaşık adres bilgisi.
              </li>
              <li>
                <strong>Açıklama (isteğe bağlı):</strong> Kullanıcının girdiği kısa metin.
              </li>
              <li>
                <strong>Kategori:</strong> Seçilen ihlal türü.
              </li>
              <li>
                <strong>IP adresi:</strong> Yalnızca kötüye kullanımı önlemek amacıyla anlık
                hız sınırlama (rate limiting) için kullanılır; kalıcı olarak saklanmaz.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">
              2. Anonim Kullanım
            </h2>
            <p>
              Davar herhangi bir kayıt, giriş veya kişisel bilgi talep etmez. Kullanıcı hesabı
              oluşturulmaz. Yüklenen içerik tamamen anonimdir; gönderenin kimliği platformda
              saklanmaz.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">
              3. Verilerin Saklanması
            </h2>
            <p>
              Fotoğraflar ve rapor bilgileri Supabase altyapısında güvenli bir şekilde
              barındırılır. Orijinal (blursuz) fotoğraflar özel (private) bir alanda saklanır ve
              kamuya açık değildir. Yalnızca moderatör tarafından gizlenmiş (blurlanmış) versiyonlar
              herkese açık feed&apos;de gösterilir.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">
              4. Plaka ve Yüz Gizleme
            </h2>
            <p>
              KVKK (6698 sayılı Kişisel Verilerin Korunması Kanunu) kapsamında, yüklenen
              fotoğraflardaki araç plakaları ve kişilerin yüzleri moderatör tarafından
              yayınlanmadan önce gizlenir. Gizlenmemiş hiçbir fotoğraf kamuya açık feed&apos;de
              gösterilmez.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">
              5. Çerezler ve İzleme
            </h2>
            <p>
              Davar üçüncü taraf çerez veya izleme aracı kullanmaz. Herhangi bir reklam ağı
              veya analitik hizmeti entegre değildir.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">
              6. Verilerin Silinmesi
            </h2>
            <p>
              Yüklediğiniz bir bildirimin kaldırılmasını talep etmek için{" "}
              <a
                href="mailto:destek@davar.app"
                className="font-medium text-red-600 underline underline-offset-2 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                destek@davar.app
              </a>{" "}
              adresine e-posta gönderebilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">
              7. İletişim
            </h2>
            <p>
              Gizlilik politikasıyla ilgili sorularınız için{" "}
              <a
                href="mailto:destek@davar.app"
                className="font-medium text-red-600 underline underline-offset-2 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                destek@davar.app
              </a>{" "}
              adresiyle iletişime geçebilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
