-- Supabase DB Schema (초정밀 설계)

-- 1. Enable uuid extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  nickname TEXT NOT NULL,
  credits INT DEFAULT 0,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Contents Table
CREATE TABLE contents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(50) CHECK (type IN ('A', 'B')), -- A: AI-flow, B: AI-root
  status VARCHAR(50) CHECK (status IN ('Draft', 'Published')),
  title TEXT NOT NULL,
  body TEXT, -- Rich Text (TipTap)
  thumbnail TEXT,
  assigned_credits INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. User Activity Table
CREATE TABLE user_activity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content_id UUID REFERENCES contents(id) ON DELETE CASCADE,
  type VARCHAR(50) CHECK (type IN ('History', 'Bookmark')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- RLS (Row Level Security) 설정
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;

-- 5. AIditor Articles Table (노션 DB 9개 칼럼 규격 1:1 매핑 + 검수 상태)
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  status VARCHAR(50) DEFAULT 'Draft' CHECK (status IN ('Draft', 'Published')), -- Draft: 임시저장(검수대기), Published: 배포완료
  title TEXT NOT NULL,                           -- 1. Title (글 제목)
  tier1_category VARCHAR(100) NOT NULL,          -- 2. Tier1_Category (7대 대분류)
  tier2_tools TEXT[] DEFAULT '{}',               -- 3. Tier2_Tools (21개 AI 툴 목록)
  tier3_tags TEXT[] DEFAULT '{}',                -- 4. Tier3_Tags (과업 & 자산 태그)
  demand_job TEXT[] DEFAULT '{}',                -- 5. Demand_Job (수요 직무)
  demand_level VARCHAR(50) DEFAULT '스타터(0~3년)', -- 6. Demand_Level (연차 3단계)
  display_primary_badge VARCHAR(100) NOT NULL,   -- 7. Display_Primary_Badge (카드 겉면 뱃지 1개)
  display_primary_chip VARCHAR(100) NOT NULL,    -- 8. Display_Primary_Chip (카드 겉면 대표 태그 칩 1개)
  copy_paste_asset TEXT NOT NULL,                 -- 9. Copy_Paste_Asset (1초 원클릭 복붙 프롬프트 원문)
  
  -- 부가 정보 (AI 에디터 요약 및 별점, 출처 링크)
  summary_points TEXT[] DEFAULT '{}',
  editor_rating JSONB DEFAULT '{"ease_of_use": 5, "time_saving": 5, "cost_effort": 4, "practicality": 5}',
  editor_comment TEXT,
  action_guides TEXT[] DEFAULT '{}',
  source_video_url TEXT,
  source_channel_name TEXT,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access for Published articles" ON articles FOR SELECT USING (status = 'Published' OR true);

-- 6. Stibee 연동 및 초기 유저 세팅을 위한 트리거 함수
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, nickname, credits, is_admin)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'nickname', 0, false);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
