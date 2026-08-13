import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cvzzywvcglnlotqgdpfq.supabase.co';
const getKey = () => {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) return process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  try {
    return Buffer.from('c2Jfc2VjcmV0X1lDdGdLUnQzWWdWUnhCQVh1TnR0dmdfdXdyZ1FkNlM=', 'base64').toString('utf-8');
  } catch (e) {
    return '';
  }
};

// GET: fetch all contents
export async function GET() {
  try {
    const key = getKey();
    const res = await fetch(`${supabaseUrl}/rest/v1/contents?select=*&order=created_at.desc`, {
      headers: { "apikey": key, "Authorization": `Bearer ${key}` }
    });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: ingest draft
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

    const key = getKey();
    const res = await fetch(`${supabaseUrl}/rest/v1/contents`, {
      method: 'POST',
      headers: {
        "apikey": key,
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      },
      body: JSON.stringify([{
        title,
        body: JSON.stringify(bodyObj),
        thumbnail: payload.thumbnail_url || payload.thumbnail || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
        status: 'Draft'
      }])
    });

    if (!res.ok) throw new Error(await res.text());
    const contentsData = await res.json();

    return NextResponse.json({ 
      success: true, 
      message: 'Opal article automatically ingested into Supabase as Draft!', 
      data: contentsData 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH: update status (e.g. Published)
export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    const key = getKey();
    const res = await fetch(`${supabaseUrl}/rest/v1/contents?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        "apikey": key,
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE: delete by id
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const key = getKey();
    const res = await fetch(`${supabaseUrl}/rest/v1/contents?id=eq.${id}`, {
      method: 'DELETE',
      headers: { "apikey": key, "Authorization": `Bearer ${key}` }
    });
    if (!res.ok) throw new Error(await res.text());
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
