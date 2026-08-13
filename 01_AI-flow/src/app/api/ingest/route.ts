import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cvzzywvcglnlotqgdpfq.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2enp5d3ZjZ2xubG90cWdkcGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNDcyODAsImV4cCI6MjA1NzYyMzI4MH0.fake_anon_key';

const supabase = createClient(supabaseUrl, supabaseKey);

// 외부 자동화(Google Opal 등)에서 호출 시 Supabase contents 테이블에 Draft(검수대기)로 자동 입고되는 API
export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const title = payload.title || payload.name || "AI 자동 생성 아티클";
    const badge = payload.display_primary_badge || payload.badge || "AI 따라하기";
    const chip = payload.display_primary_chip || payload.chip || "#복붙용_프롬프트";
    const copyPrompt = payload.copy_paste_asset || payload.prompt || "";
    
    const bodyObj = {
      title,
      tier1_category: payload.tier1_category || "AI/업무생산성",
      tier2_tools: payload.tier2_tools || ["Opal", "Gemini"],
      tier3_tags: payload.tier3_tags || [chip],
      demand_job: payload.demand_job || ["직무 공통"],
      demand_level: payload.demand_level || "스타터(0~3년)",
      badge,
      chip,
      copy_paste_asset: copyPrompt,
      editor_rating: payload.editor_rating || { ease_of_use: 5, time_saving: 5, cost_effort: 4, practicality: 5 },
      editor_comment: payload.editor_comment || "Opal 자동 생성 아티클입니다.",
      summary_points: payload.summary_points || ["Opal 자동 추출 포인트 1", "Opal 자동 추출 포인트 2"],
      source_channel_name: payload.source_channel_name || "Opal"
    };

    // 1. Insert into contents table (used by main site & admin)
    const { data: contentsData, error: contentsError } = await supabase
      .from('contents')
      .insert([
        {
          title,
          body: JSON.stringify(bodyObj),
          thumbnail: payload.thumbnail_url || payload.thumbnail || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
          status: 'Draft' // 검수 대기 (임시저장)
        }
      ])
      .select();

    if (contentsError) {
      console.error('Supabase Contents Insert Error:', contentsError);
      return NextResponse.json({ error: 'Failed to ingest draft to contents table', details: contentsError.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Opal article automatically ingested into Supabase as Draft!', 
      data: contentsData 
    });
  } catch (error: any) {
    console.error('Ingest API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
