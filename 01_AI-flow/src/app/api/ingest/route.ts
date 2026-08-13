import { NextResponse } from 'next/server';
import https from 'node:https';

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

function nodeHttpsRequest(urlStr: string, method: string, key: string, payload?: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(urlStr);
    const data = payload ? JSON.stringify(payload) : null;
    const headers: Record<string, string> = {
      "apikey": key,
      "Authorization": `Bearer ${key}`,
      "Accept": "application/json"
    };
    if (data) {
      headers["Content-Type"] = "application/json";
      headers["Content-Length"] = String(Buffer.byteLength(data));
      headers["Prefer"] = "return=representation";
    }

    const req = https.request({
      hostname: parsed.hostname,
      port: 443,
      path: parsed.pathname + parsed.search,
      method: method,
      headers: headers,
      family: 4 // IPv4 only
    }, (res) => {
      let body = "";
      res.on("data", chunk => body += chunk);
      res.on("end", () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve(body ? JSON.parse(body) : null); } catch (e) { resolve(body); }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on("error", (e) => reject(e));
    if (data) req.write(data);
    req.end();
  });
}

// GET: fetch all contents
export async function GET() {
  try {
    const key = getKey();
    const data = await nodeHttpsRequest(`${supabaseUrl}/rest/v1/contents?select=*&order=created_at.desc`, 'GET', key);
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
    const contentsData = await nodeHttpsRequest(
      `${supabaseUrl}/rest/v1/contents`,
      'POST',
      key,
      [{
        title,
        body: JSON.stringify(bodyObj),
        thumbnail: payload.thumbnail_url || payload.thumbnail || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
        status: 'Draft'
      }]
    );

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
    const data = await nodeHttpsRequest(`${supabaseUrl}/rest/v1/contents?id=eq.${id}`, 'PATCH', key, { status });
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
    await nodeHttpsRequest(`${supabaseUrl}/rest/v1/contents?id=eq.${id}`, 'DELETE', key);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
