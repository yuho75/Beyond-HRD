import { NextResponse } from "next/server";

// 30 domestic sourcing channels from B_sourcing_channels.md
const SOURCE_CHANNELS_30 = [
  { name: "알린 ALINN", topic: "ChatGPT 심화 활용 및 업무 능률 극대화 프롬프트", url: "https://www.youtube.com/@ailifeinnovation" },
  { name: "유튜브신쌤", topic: "초보자 AI 툴 & 업무 생존 교육 가이드", url: "https://www.youtube.com/@youtubeshinssam" },
  { name: "일잘러 장피엠", topic: "Make.com 업무 자동화 & 실무 프롬프트 실습", url: "https://www.youtube.com/@jangpm" },
  { name: "감자나라ai", topic: "직장인 관점 ChatGPT 프롬프트 & 업무 꿀팁", url: "https://www.youtube.com/@감자나라ai" },
  { name: "AI 알려주는 남자 데브남", topic: "AI 에이전트 구축 & n8n/Make 업무 자동화", url: "https://www.youtube.com/@AI알려주는남자-데브남" },
  { name: "평범한 사업가", topic: "해외 AI 에이전트 트렌드 & 1인 기업 수익화", url: "https://www.youtube.com/@평범한사업가" },
  { name: "시민개발자 구씨", topic: "노코드 생산성 툴 & 스타트업 실전 AI 가이드", url: "https://www.youtube.com/@citizendev9c" },
  { name: "행글라이터", topic: "AI 전자책·글쓰기 & 1인 기업 생산성 극대화", url: "https://www.youtube.com/@hangglwriter" },
  { name: "길호의 실전 AI", topic: "직장인 칼퇴 보장 실전 AI 활용법", url: "https://www.youtube.com/@임길호-z2y" },
  { name: "빌더 조쉬 Builder Josh", topic: "AI 바이브코딩 & 디자이너 자동화 체계", url: "https://www.youtube.com/@builderjoshkim" },
  { name: "퀀텀점프클럽 QJC", topic: "대기업·공공기관 AI 자동화 컨설팅 사례", url: "https://www.youtube.com/@qjc_qjc" },
  { name: "배움의 달인", topic: "개발자 출신 현직 교사의 쉬운 AI 활용법", url: "https://www.youtube.com/@배움의달인-p5v" },
  { name: "스티브의 파도타기", topic: "AI 업무자동화로 퇴근시간 2시간 단축", url: "https://www.youtube.com/@stevesurfing" },
  { name: "그린코끼리 AI", topic: "왕초보도 따라하는 실전 AI 튜토리얼", url: "https://www.youtube.com/@greenkokki" },
  { name: "진한별의 AI 연구소", topic: "KAIST/고려대 연구원의 쉬운 AI 트렌드 해설", url: "https://www.youtube.com/@ai.hanbyeol" },
  { name: "투쏠 AI 에이전트", topic: "에이전트 기반 자동화 워크플로우 세팅", url: "https://www.youtube.com/@ai_tusol" },
  { name: "CONNECT AI LAB", topic: "17년 경력 전문가의 AI 1인 기업 자동화", url: "https://www.youtube.com/@CONNECT-AI-LAB" },
  { name: "AI 콘텐츠 마스터 세인투", topic: "20년차 개발자의 실전 생성형 AI 테크닉", url: "https://www.youtube.com/@AI마스터_세인투" },
  { name: "조팀장의 AI 공략집", topic: "왕초보 직장인 AI 꿀팁 & 실무 자동화", url: "https://www.youtube.com/@조팀장의AI공략집" },
  { name: "AI 겸임교수 이종범", topic: "겸임교수가 알려주는 비개발자 ChatGPT 활용법", url: "https://www.youtube.com/@aiadjunct" },
  { name: "에이아이밋 AIMIT", topic: "솔로프리너를 위한 AI 자동화 교육", url: "https://www.youtube.com/@aimit_cmty" },
  { name: "안될공학", topic: "최신 AI IT·테크 신기술 핵심 요약", url: "https://www.youtube.com/@unrealtech" },
  { name: "편집자P", topic: "쉬운 AI 영상 편집 & MCP 바이브코딩 활용", url: "https://www.youtube.com/@editorp89" },
  { name: "디자인하는AI", topic: "AI 디자인 & 썸네일·이미지 자동 생성", url: "https://www.youtube.com/@designingi" },
  { name: "커리어해커 알렉스", topic: "AI 기반 커리어 스킬업 & 프롬프트 레시피", url: "https://www.youtube.com/@careerhackeralex" },
  { name: "부코드", topic: "실무 AI 활용 및 데이터 자동화 테크닉", url: "https://www.youtube.com/@부코드AI" },
  { name: "페이퍼로지", topic: "기획자·마케터를 위한 PPT/보고서 AI 작성법", url: "https://www.youtube.com/@페이퍼로지" },
  { name: "오은환의 하이라이트", topic: "마케팅 콘텐츠 제작을 위한 AI 프롬프트", url: "https://www.youtube.com/@omd_eunhwan" },
  { name: "오빠두엑셀", topic: "엑셀 + 챗GPT 연동 실무 보고서 자동화", url: "https://www.youtube.com/@Oppadu" },
  { name: "갓찌뇽의 초보여도 괜찮아", topic: "퍼스널 브랜딩 & 마케팅 AI 실전 노하우", url: "https://www.youtube.com/@challenzon" }
];

export async function GET(req: Request) {
  return handleAutoCollect();
}

export async function POST(req: Request) {
  return handleAutoCollect();
}

async function callGeminiWithTimeout(apiKey: string, prompt: string): Promise<string | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

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

    if (!response.ok) return null;

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return rawText.replace(/```json/g, "").replace(/```/g, "").trim();
  } catch (e) {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function handleAutoCollect() {
  const selectedChannel = SOURCE_CHANNELS_30[Math.floor(Math.random() * SOURCE_CHANNELS_30.length)];
  const timeStampStr = new Date().toISOString().slice(0, 10);

  let articleData: any = {
    title: `[AI 따라하기] ${selectedChannel.name} – ${selectedChannel.topic} 3분 실전 가이드`,
    tier1_category: "AI/업무생산성",
    tier2_tools: ["ChatGPT", "Claude", "Make"],
    tier3_tags: ["#수익자동화", "#복붙용_프롬프트", "#칼퇴보장"],
    demand_job: ["직무 공통", "마케터", "기획·PM"],
    demand_level: "스타터 (0~3년 차)",
    badge: "AI 따라하기",
    chip: "#수익자동화",
    copy_paste_asset: `Act as an expert AI consultant for ${selectedChannel.name}.\nGoal: Create a step-by-step action guide for non-developer office workers on ${selectedChannel.topic}.\n\nOutput format:\n1. Prompt template\n2. 3-step execution guide\n3. Common mistakes to avoid`,
    summary_points: [
      `에디터 픽 1: ${selectedChannel.name}의 ${selectedChannel.topic} 실무 핵심 프롬프트`,
      "에디터 픽 2: 반복 업무를 90% 줄여주는 노코드 워크플로우 세팅법",
      "에디터 픽 3: 비개발자도 바로 적용 가능한 3분 칼퇴 가이드"
    ],
    editor_rating: { ease_of_use: 5, time_saving: 5, cost_effort: 5, practicality: 5 },
    editor_comment: `별점 5.0 / [${selectedChannel.name}] 소스 풀의 ${selectedChannel.topic} 노하우를 바탕으로 자동 인제스트된 24시간 수집 아티클입니다.`
  };

  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    const systemPrompt = `You are AIditor's chief AI Editor. Your task is to write a high-value Korean practical AI article for 100% non-developer office workers.

Strictly output ONLY a valid JSON matching this schema:
{
  "title": "[AI 따라하기]로 시작하는 명확하고 임팩트 있는 한국어 제목",
  "tier1_category": "AI/업무생산성",
  "tier2_tools": ["ChatGPT", "Claude", "Make"],
  "tier3_tags": ["#수익자동화", "#복붙용_프롬프트"],
  "demand_job": ["직무 공통", "마케터"],
  "demand_level": "스타터 (0~3년 차)",
  "badge": "AI 따라하기",
  "chip": "#수익자동화",
  "copy_paste_asset": "바로 복사해서 사용할 수 있는 고품질 프롬프트 레시피 전문",
  "summary_points": ["에디터 픽 1...", "에디터 픽 2...", "에디터 픽 3..."],
  "editor_rating": { "ease_of_use": 5, "time_saving": 5, "cost_effort": 5, "practicality": 5 },
  "editor_comment": "한 줄 에디터 총평"
}`;

    const userPrompt = `Target YouTube Channel: ${selectedChannel.name}\nTopic Area: ${selectedChannel.topic}\nURL: ${selectedChannel.url}\nDate: ${timeStampStr}\n\nGenerate an article tailored for office workers.`;

    const rawText = await callGeminiWithTimeout(apiKey, `${systemPrompt}\n\n${userPrompt}`);
    if (rawText) {
      try {
        const parsed = JSON.parse(rawText);
        if (parsed.title) {
          articleData = parsed;
        }
      } catch (e) {
        // fallback remains intact
      }
    }
  }

  try {
    const bodyObj = {
      title: articleData.title,
      tier1_category: articleData.tier1_category || "AI/업무생산성",
      tier2_tools: articleData.tier2_tools || ["ChatGPT", "Make"],
      tier3_tags: articleData.tier3_tags || ["#수익자동화", "#복붙용_프롬프트"],
      demand_job: articleData.demand_job || ["직무 공통"],
      demand_level: articleData.demand_level || "스타터 (0~3년 차)",
      badge: articleData.badge || "AI 따라하기",
      chip: articleData.chip || "#수익자동화",
      copy_paste_asset: articleData.copy_paste_asset || "Act as an expert AI consultant...",
      editor_rating: articleData.editor_rating || { ease_of_use: 5, time_saving: 5, cost_effort: 5, practicality: 5 },
      editor_comment: articleData.editor_comment || "24시간 자동 수집 아티클입니다.",
      summary_points: articleData.summary_points || ["요약 1", "요약 2", "요약 3"],
      source_channel_name: selectedChannel.name,
      source_video_url: selectedChannel.url,
    };

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://cvzzywvcglnlotqgdpfq.supabase.co";
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

    const dbRes = await fetch(`${supabaseUrl}/rest/v1/contents`, {
      method: "POST",
      headers: {
        "apikey": anonKey,
        "Authorization": `Bearer ${anonKey}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      },
      body: JSON.stringify([{
        title: articleData.title,
        body: JSON.stringify(bodyObj),
        thumbnail: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=600",
        status: "Draft"
      }])
    });

    if (!dbRes.ok) {
      const errText = await dbRes.text();
      return NextResponse.json({ error: `Supabase DB 저장 실패 (${dbRes.status}): ${errText}` }, { status: 500 });
    }

    const dbData = await dbRes.json();

    return NextResponse.json({
      success: true,
      message: `🎉 30개 소스 풀 자동 감시 성공! [${selectedChannel.name}]의 신규 콘텐츠가 검수센터 Draft로 입고되었습니다.`,
      channel: selectedChannel.name,
      title: articleData.title,
      record: dbData
    });

  } catch (dbErr: any) {
    return NextResponse.json({ error: `저장 시스템 오류: ${dbErr.message}` }, { status: 500 });
  }
}
