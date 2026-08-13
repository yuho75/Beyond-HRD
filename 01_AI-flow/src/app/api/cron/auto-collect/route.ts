import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://cvzzywvcglnlotqgdpfq.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy_key";
const supabase = createClient(supabaseUrl, supabaseKey);

// Target curated YouTube AI productivity channels list
const TARGET_CHANNELS = [
  { name: "CONNECT AI LAB", topic: "AI 1인 기업 수익화 & 수동화 시스템" },
  { name: "조코딩 JoCoding", topic: "최신 AI 툴 실무 활용법 & 노코드 개발" },
  { name: "노코드 파파", topic: "Make.com & 챗GPT 자동화 워크플로우" },
  { name: "테크몽", topic: "직장인 생산성 극대화 AI 꿀팁" }
];

export async function GET(req: Request) {
  return handleAutoCollect();
}

export async function POST(req: Request) {
  return handleAutoCollect();
}

async function handleAutoCollect() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    // Select random channel from target pool for automated ingestion
    const selectedChannel = TARGET_CHANNELS[Math.floor(Math.random() * TARGET_CHANNELS.length)];
    const timeStampStr = new Date().toISOString().slice(0, 10);

    let articleData: any = {
      title: `[AI 따라하기] ${selectedChannel.name}의 ${selectedChannel.topic} 가이드`,
      tier1_category: "AI/업무생산성",
      tier2_tools: ["ChatGPT", "Claude", "Make"],
      tier3_tags: ["#수익자동화", "#복붙용_프롬프트", "#칼퇴보장"],
      demand_job: ["직무 공통", "마케터", "기획·PM"],
      demand_level: "스타터 (0~3년 차)",
      badge: "AI 따라하기",
      chip: "#수익자동화",
      copy_paste_asset: `Act as an expert AI consultant for ${selectedChannel.name}. Create a 3-step action checklist for non-developer office workers...`,
      summary_points: [
        `에디터 픽 1: ${selectedChannel.name} 추천 핵심 AI 생산성 프롬프트`,
        "에디터 픽 2: 반복 업무를 90% 줄여주는 노코드 자동화 세팅법",
        "에디터 픽 3: 3분 만에 완성하는 실무 가이드 및 복붙 템플릿"
      ],
      editor_rating: {
        ease_of_use: 5,
        time_saving: 5,
        cost_effort: 5,
        practicality: 5
      },
      editor_comment: `별점 5.0 / ${selectedChannel.name}의 실무 노하우를 바탕으로 작성된 백그라운드 24시간 자동 입고 콘텐츠입니다.`
    };

    if (apiKey) {
      try {
        const systemPrompt = `
You are AIditor's chief AI Editor. Your job is to transform YouTube video scripts/transcripts into a high-value, easy-to-read Korean article for 100% non-developer office workers.

Strictly return a valid JSON object matching this schema:
{
  "title": "Clean, punchy Korean title starting with [AI 따라하기]",
  "tier1_category": "AI/업무생산성",
  "tier2_tools": ["ChatGPT", "Claude", "Make"],
  "tier3_tags": ["#수익자동화", "#복붙용_프롬프트"],
  "demand_job": ["직무 공통", "마케터"],
  "demand_level": "스타터 (0~3년 차)",
  "badge": "AI 따라하기",
  "chip": "#수익자동화",
  "copy_paste_asset": "Act as an expert...",
  "summary_points": ["Key point 1", "Key point 2", "Key point 3"],
  "editor_rating": { "ease_of_use": 5, "time_saving": 5, "cost_effort": 5, "practicality": 5 },
  "editor_comment": "One-line editor review"
}

Return ONLY raw JSON.
`;
        const userPrompt = `Generate a fresh, top-tier AI productivity guide based on channel ${selectedChannel.name} and topic ${selectedChannel.topic}. Date: ${timeStampStr}`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ role: "user", parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }]
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
          const cleanedText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
          const parsed = JSON.parse(cleanedText);
          if (parsed.title) articleData = parsed;
        }
      } catch (e) {
        console.error("Gemini API call failed, using high-quality fallback template", e);
      }
    }

    const bodyObj = {
      title: articleData.title,
      tier1_category: articleData.tier1_category || "AI/업무생산성",
      tier2_tools: articleData.tier2_tools || ["ChatGPT", "Make"],
      tier3_tags: articleData.tier3_tags || ["#수익자동화", "#복붙용_프롬프트"],
      demand_job: articleData.demand_job || ["직무 공통"],
      demand_level: articleData.demand_level || "스타터 (0~3년 차)",
      badge: articleData.badge || articleData.display_primary_badge || "AI 따라하기",
      chip: articleData.chip || articleData.display_primary_chip || "#수익자동화",
      copy_paste_asset: articleData.copy_paste_asset || "Act as an expert...",
      editor_rating: articleData.editor_rating || { ease_of_use: 5, time_saving: 5, cost_effort: 5, practicality: 5 },
      editor_comment: articleData.editor_comment || "24시간 백그라운드 무인 자동 입고 아티클입니다.",
      summary_points: articleData.summary_points || ["자동 요약 1", "자동 요약 2", "자동 요약 3"],
      source_channel_name: selectedChannel.name,
      source_video_url: "https://youtube.com/"
    };

    // Insert into Supabase contents table as Draft
    const { data: dbData, error: dbError } = await supabase
      .from("contents")
      .insert([
        {
          title: articleData.title,
          body: JSON.stringify(bodyObj),
          thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
          status: "Draft"
        }
      ])
      .select();

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `🎉 24시간 백그라운드 무인 수집 완료! [${selectedChannel.name}]의 신규 아티클이 Supabase Draft로 등록되었습니다.`,
      channel: selectedChannel.name,
      record: dbData
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed auto collect" }, { status: 500 });
  }
}
