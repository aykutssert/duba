-- ============================================
-- Davar Migration v3 — Stats + Cleanup
-- Supabase SQL Editor'de çalıştır
-- ============================================

-- 1. İstatistik tablosu (fotoğraflar silinse bile sayaç kalır)
CREATE TABLE IF NOT EXISTS report_stats (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  total_reports INTEGER NOT NULL DEFAULT 0
);

-- Tek satır oluştur (yoksa)
INSERT INTO report_stats (id, total_reports)
VALUES (1, 0)
ON CONFLICT (id) DO NOTHING;

-- 2. Sayaç artırma fonksiyonu (RPC)
CREATE OR REPLACE FUNCTION increment_total_reports()
RETURNS void AS $$
BEGIN
  UPDATE report_stats SET total_reports = total_reports + 1 WHERE id = 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. report_stats için RLS
ALTER TABLE report_stats ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Herkes istatistik okuyabilir" ON report_stats FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 4. original_image_url kolonunu kaldır (artık orijinal saklamıyoruz)
ALTER TABLE reports DROP COLUMN IF EXISTS original_image_url;

-- 5. violation-originals bucket'ını sil (Supabase Dashboard > Storage'dan da silebilirsin)
-- NOT: Bu SQL ile bucket silinemez, Dashboard'dan manuel sil:
--   Storage > violation-originals > Delete bucket

-- 6. Eski RLS policy'lerini temizle (originals bucket için)
-- Bu policy'ler artık gereksiz, hata vermeden atla
DO $$ BEGIN
  DROP POLICY IF EXISTS "Anonim orijinal yükleyebilir" ON storage.objects;
EXCEPTION WHEN undefined_table THEN NULL;
END $$;
