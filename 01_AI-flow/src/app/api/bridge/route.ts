import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Bridge API: 사이트 A(AI-flow)의 콘텐츠를 불러와 사이트 B(AI-root) 아티클로 변환
export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { sourceContentId, additionalCredits, customTitle, customBody } = await request.json();

    if (!sourceContentId) {
      return NextResponse.json({ error: 'sourceContentId is required' }, { status: 400 });
    }

    // 1. A 사이트 콘텐츠 조회
    const { data: sourceData, error: sourceError } = await supabase
      .from('contents')
      .select('*')
      .eq('id', sourceContentId)
      .eq('type', 'A')
      .single();

    if (sourceError || !sourceData) {
      return NextResponse.json({ error: 'Source content not found' }, { status: 404 });
    }

    // 2. B 사이트용 새로운 콘텐츠(아티클) 생성 (초기 상태 Draft)
    const { data: bridgeData, error: bridgeError } = await supabase
      .from('contents')
      .insert([
        {
          type: 'B',
          status: 'Draft',
          title: customTitle || `[AI-root 변환] ${sourceData.title}`,
          body: customBody || sourceData.body,
          thumbnail: sourceData.thumbnail,
          assigned_credits: additionalCredits || 10
        }
      ])
      .select();

    if (bridgeError) {
      console.error('Bridge Insert Error:', bridgeError);
      return NextResponse.json({ error: 'Failed to create bridge content' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: bridgeData });
  } catch (error) {
    console.error('Bridge API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
