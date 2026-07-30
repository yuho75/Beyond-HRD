import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { videoUrl, transcript, title } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key is not configured." }, { status: 500 });
    }

    const systemPrompt = `
You are AIditor's chief AI Editor. Your job is to transform YouTube video scripts/transcripts into a high-value, easy-to-read Korean article for 100% non-developer office workers.

Strictly return a valid JSON object matching this schema:
{
  "title": "Clean, punchy Korean title",
  "tier1_category": "C1. AI/업무생산성",
  "tier2_tools": ["ChatGPT", "Claude"],
  "tier3_tags": ["#복붙용_프롬프트", "#보고서_작성법", "#시간단축/칼퇴"],
  "demand_job": ["직무 공통", "마케터", "기획·PM"],
  "demand_level": "스타터 (0~3년 차)",
  "display_primary_badge": "C1. AI/업무생산성",
  "display_primary_chip": "#복붙용_프롬프트",
  "copy_paste_asset": "Act as a senior marketer. Write a [제품명] report...",
  "summary_points": ["Key point 1", "Key point 2", "Key point 3"],
  "editor_rating": {
    "ease_of_use": 5,
    "time_saving": 5,
    "cost_effort": 4,
    "practicality": 5
  },
  "editor_comment": "One-line editor review",
  "action_guides": [
    "Step 1: Do this first",
    "Step 2: Apply to your work",
    "Step 3: Save 2 hours daily"
  ]
}

Return ONLY the raw JSON string without markdown code blocks.
`;

    const userPrompt = `
Video Title: ${title || "AI Work Productivity Guide"}
Video URL: ${videoUrl || ""}
Transcript/Content:
${transcript || "ChatGPT and Claude productivity prompt hacks for office workers."}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: `Gemini API error: ${errText}` }, { status: response.status });
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    // Clean potential markdown formatting
    const cleanedText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    const articleData = JSON.parse(cleanedText);

    return NextResponse.json({ success: true, data: articleData });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to generate article" }, { status: 500 });
  }
}
