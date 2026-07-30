import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// 외부 크롤링/자동화 데이터(Google Opal 등)를 AIditor 9개 칼럼 규격의 임시 저장(Draft) 상태로 인제스트하는 API
export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const expectedSecret = process.env.ADMIN_SECRET || process.env.INGEST_SECRET || 'beyond_hrd_secret_2026';
    if (authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await request.json();

    const {
      title,
      tier1_category = 'AI/업무생산성',
      tier2_tools = [],
      tier3_tags = [],
      demand_job = ['직무 공통'],
      demand_level = '스타터(0~3년)',
      display_primary_badge = 'AI/업무생산성',
      display_primary_chip = '#복붙용_프롬프트',
      copy_paste_asset = '',
      summary_points = [],
      editor_rating = { ease_of_use: 5, time_saving: 5, cost_effort: 4, practicality: 5 },
      editor_comment = '',
      action_guides = [],
      source_video_url = '',
      source_channel_name = '',
      thumbnail_url = ''
    } = payload;

    if (!title || !copy_paste_asset) {
      return NextResponse.json({ error: 'Title and copy_paste_asset are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('articles')
      .insert([
        {
          status: 'Draft', // 검수 대기 (임시저장)
          title,
          tier1_category,
          tier2_tools,
          tier3_tags,
          demand_job,
          demand_level,
          display_primary_badge,
          display_primary_chip,
          copy_paste_asset,
          summary_points,
          editor_rating,
          editor_comment,
          action_guides,
          source_video_url,
          source_channel_name,
          thumbnail_url
        }
      ])
      .select();

    if (error) {
      console.error('Supabase Articles Insert Error:', error);
      return NextResponse.json({ error: 'Failed to ingest article to Supabase', details: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Article ingested to Supabase as Draft', data });
  } catch (error: any) {
    console.error('Ingest API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
