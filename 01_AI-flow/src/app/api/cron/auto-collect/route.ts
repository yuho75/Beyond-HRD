import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://cvzzywvcglnlotqgdpfq.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

const TARGET_CHANNELS = [
  { name: "CONNECT AI LAB", topic: "AI 1인 기업 수익화 & 수동화 시스템" },
  { name: "조코딩 JoCoding", topic: "최신 AI 툴 실무 활용법 & 노코드 개발" },
  { name: "노코드 파파", topic: "Make.com & 챗GPT 자동화 워크플로우" },
  { name: "테크몽", topic: "직장인 생산성 극대화 AI 꿀팁" },
  { name: "AI 웨이브", topic: "AI 트렌드 & 업무 자동화 실전 가이드" },
  { name: "슈퍼노트", topic: "노션 & AI 생산성 시스템 구축법" },
];

export async function GET(req: Request) {
  return handleAutoCollect();
}

export async function POST(req: Request) {
  return handleAutoCollect();
}

async function callGeminiWithTimeout(apiKey: string, prompt: string): Promise<string | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8초 타임아웃

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }]
        }),
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      console.error(`Gemini API HTTP error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return rawText.replace(/```json/g, "").replace(/```/g, "").trim();
  } catch (e: any) {
    console.error("Gemini fetch error:", e.message);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function handleAutoCollect() {
  const selectedChannel = TARGET_CHANNELS[Math.floor(Math.random() * TARGET_CHANNELS.length)];
  const timeStampStr = new Date().toISOString().slice(0, 10);

  // 기본 폴백 아티클 (Gemini 없어도 동작)
  let articleData: any = {
    title: `[AI 따라하기] ${selectedChannel.name} – ${selectedChannel.topic} 실전 가이드`,
    tier1_category: "AI/업무생산성",
    tier2_tools: ["ChatGPT", "Claude", "Make"],
    tier3_tags: ["#수익자동화", "#복붙용_프롬프트", "#칼퇴보장"],
    demand_job: ["직무 공통", "마케터", "기획·PM"],
    demand_level: "스타터 (0~3년 차)",
    badge: "AI 따라하기",
    chip: "#수익자동화",
    copy_paste_asset: `Act as an expert AI productivity consultant. Based on ${selectedChannel.name}'s content about ${selectedChannel.topic}, create a 3-step action checklist for non-developer office workers to immediately apply AI tools in their daily work.`,
    summary_points: [
      `에디터 픽 1: ${selectedChannel.name}이 알려주는 핵심 AI 생산성 프롬프트`,
      "에디터 픽 2: 반복 업무를 90% 줄여주는 노코드 자동화 세팅법",
      "에디터 픽 3: 3분 만에 완성하는 실무 복붙 템플릿"
    ],
    editor_rating: { ease_of_use: 5, time_saving: 5, cost_effort: 5, practicality: 5 },
    editor_comment: `별점 5.0 / ${selectedChannel.name}의 ${selectedChannel.topic} 핵심 노하우를 정리한 실무 가이드입니다.`
  };

  // Gemini API로 고품질 아티클 생성 시도
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    const systemPrompt = `You are AIditor's chief AI Editor. Generate a high-quality Korean article for non-developer office workers.

Return ONLY a valid JSON object with this exact schema:
{
  "title": "[AI 따라하기]로 시작하는 명확한 한국어 제목",
  "tier1_category": "AI/업무생산성",
  "tier2_tools": ["도구1", "도구2"],
  "tier3_tags": ["#태그1", "#태그2"],
  "demand_job": ["직무 공통"],
  "demand_level": "스타터 (0~3년 차)",
  "badge": "AI 따라하기",
  "chip": "#수익자동화",
  "copy_paste_asset": "복붙 프롬프트 내용",
  "summary_points": ["핵심1", "핵심2", "핵심3"],
  "editor_rating": {"ease_of_use": 5, "time_saving": 5, "cost_effort": 5, "practicality": 5},
  "editor_comment": "한 줄 에디터 코멘트"
}`;

    const userPrompt = `Channel: ${selectedChannel.name}\nTopic: ${selectedChannel.topic}\nDate: ${timeStampStr}\n\nCreate a fresh, actionable AI productivity guide article.`;

    const rawText = await callGeminiWithTimeout(apiKey, `${systemPrompt}\n\n${userPrompt}`);
    if (rawText) {
      try {
        const parsed = JSON.parse(rawText);
        if (parsed.title) {
          articleData = parsed;
          console.log("✅ Gemini generated article:", parsed.title);
        }
      } catch (e) {
        console.error("JSON parse error, using fallback:", e);
      }
    }
  }

  // Supabase에 Draft로 저장
  try {
    const bodyObj = {
      title: articleData.title,
      tier1_category: articleData.tier1_category || "AI/업무생산성",
      tier2_tools: articleData.tier2_tools || ["ChatGPT", "Make"],
      tier3_tags: articleData.tier3_tags || ["#수익자동화"],
      demand_job: articleData.demand_job || ["직무 공통"],
      demand_level: articleData.demand_level || "스타터 (0~3년 차)",
      badge: articleData.badge || "AI 따라하기",
      chip: articleData.chip || "#수익자동화",
      copy_paste_asset: articleData.copy_paste_asset || "",
      editor_rating: articleData.editor_rating || { ease_of_use: 5, time_saving: 5, cost_effort: 5, practicality: 5 },
      editor_comment: articleData.editor_comment || "24시간 자동 수집 아티클",
      summary_points: articleData.summary_points || ["요약 1", "요약 2", "요약 3"],
      source_channel_name: selectedChannel.name,
      source_video_url: "https://youtube.com/",
    };

    const { data: dbData, error: dbError } = await supabase
      .from("contents")
      .insert([{
        title: articleData.title,
        body: JSON.stringify(bodyObj),
        thumbnail: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=600",
        status: "Draft"
      }])
      .select();

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json({ error: `Supabase 저장 실패: ${dbError.message}` }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `🎉 자동 수집 완료! [${selectedChannel.name}] 신규 아티클이 Draft로 등록되었습니다.`,
      channel: selectedChannel.name,
      title: articleData.title,
      record: dbData
    });

  } catch (dbErr: any) {
    console.error("Supabase unexpected error:", dbErr);
    return NextResponse.json({ error: `저장 중 오류: ${dbErr.message}` }, { status: 500 });
  }
}
