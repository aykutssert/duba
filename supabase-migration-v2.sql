-- =============================================
-- Davar — V2 Migration (idempotent — tekrar çalıştırılabilir)
-- Bu SQL'i Supabase Dashboard > SQL Editor'de çalıştır
-- =============================================

-- 1. Eksik kolonları ekle (zaten varsa atlar)
ALTER TABLE reports ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION;
ALTER TABLE reports ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION;
ALTER TABLE reports ADD COLUMN IF NOT EXISTS original_image_url TEXT;
ALTER TABLE reports ADD COLUMN IF NOT EXISTS address TEXT;
-- category kolonu ilk migration'da eklendi, tekrar eklemeye gerek yok

-- 2. Status constraint'ini güncelle (rejected ekle)
ALTER TABLE reports DROP CONSTRAINT IF EXISTS reports_status_check;
ALTER TABLE reports ADD CONSTRAINT reports_status_check
  CHECK (status IN ('pending', 'approved', 'rejected'));

-- 3. Category constraint: önce varsa sil, sonra tekrar oluştur
ALTER TABLE reports DROP CONSTRAINT IF EXISTS reports_category_check;
ALTER TABLE reports ADD CONSTRAINT reports_category_check
  CHECK (category IS NULL OR category IN ('engelli_yolu', 'kaldirim', 'bisiklet_yolu', 'okul_onu', 'diger'));

-- 4. Admin için DELETE policy (varsa hata vermez)
DO $$ BEGIN
  CREATE POLICY "Herkes rapor silebilir" ON reports FOR DELETE USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 5. Admin için UPDATE policy (varsa hata vermez)
DO $$ BEGIN
  CREATE POLICY "Herkes rapor güncelleyebilir" ON reports FOR UPDATE USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 6. Private bucket: orijinal (blursuz) fotoğraflar
INSERT INTO storage.buckets (id, name, public)
VALUES ('violation-originals', 'violation-originals', false)
ON CONFLICT (id) DO NOTHING;

-- 7. Originals bucket'a sadece INSERT izni (varsa hata vermez)
DO $$ BEGIN
  CREATE POLICY "Anonim orijinal yükleyebilir" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'violation-originals');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 8. Originals bucket'a SELECT izni YOK (sadece service_role erişir)
-- Bu policy OLUŞTURMA — böylece anonim kullanıcılar okuyamaz

-- 9. Public bucket'taki dosyaları silme izni (admin blurlu versiyonu yüklerken eski dosyayı siler)
DO $$ BEGIN
  CREATE POLICY "Anonim dosya silebilir" ON storage.objects FOR DELETE USING (bucket_id = 'violation-images');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 10. Public bucket'a UPDATE (upsert) izni
DO $$ BEGIN
  CREATE POLICY "Anonim dosya güncelleyebilir" ON storage.objects FOR UPDATE USING (bucket_id = 'violation-images') WITH CHECK (bucket_id = 'violation-images');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
