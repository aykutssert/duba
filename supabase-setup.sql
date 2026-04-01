-- =============================================
-- EngelSiz Park - Supabase Kurulum SQL'i
-- Bu SQL'i Supabase Dashboard > SQL Editor'de çalıştır
-- =============================================

-- 1. reports tablosunu oluştur
CREATE TABLE IF NOT EXISTS reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  image_url TEXT NOT NULL,
  comment TEXT CHECK (char_length(comment) <= 280),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved'))
);

-- 2. RLS (Row Level Security) aktif et
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- 3. Herkese okuma izni (Public Select)
CREATE POLICY "Herkes raporları görebilir"
  ON reports
  FOR SELECT
  USING (true);

-- 4. Herkese ekleme izni (Public Insert)
CREATE POLICY "Herkes rapor oluşturabilir"
  ON reports
  FOR INSERT
  WITH CHECK (true);

-- 5. Storage bucket oluştur (violation-images)
-- Not: Bu komutu Supabase Dashboard > Storage bölümünden de yapabilirsin
-- "New Bucket" > isim: violation-images > Public: ON
INSERT INTO storage.buckets (id, name, public)
VALUES ('violation-images', 'violation-images', true)
ON CONFLICT (id) DO NOTHING;

-- 6. Storage için public upload policy
CREATE POLICY "Herkes fotoğraf yükleyebilir"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'violation-images');

-- 7. Storage için public read policy
CREATE POLICY "Herkes fotoğrafları görebilir"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'violation-images');
