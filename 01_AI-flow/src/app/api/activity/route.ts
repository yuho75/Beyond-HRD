import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// B: '학습 완료' 및 '북마크' 클릭 시 user_activity 기록 및 학점 합산
export async function POST(request: Request) {
  try {
    const { userId, contentId, activityType } = await request.json();

    if (!userId || !contentId || !['History', 'Bookmark'].includes(activityType)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // 1. 이미 기록이 있는지 확인 (북마크 토글 또는 중복 학습 방지)
    const { data: existing, error: checkError } = await supabase
      .from('user_activity')
      .select('*')
      .eq('user_id', userId)
      .eq('content_id', contentId)
      .eq('type', activityType)
      .single();

    if (activityType === 'Bookmark' && existing) {
      // 북마크 취소
      await supabase.from('user_activity').delete().eq('id', existing.id);
      return NextResponse.json({ success: true, message: 'Bookmark removed' });
    } else if (activityType === 'History' && existing) {
      return NextResponse.json({ success: true, message: 'Already completed this learning' });
    }

    // 2. 활동 기록 추가
    const { error: insertError } = await supabase
      .from('user_activity')
      .insert([{ user_id: userId, content_id: contentId, type: activityType }]);

    if (insertError) {
      throw insertError;
    }

    // 3. '학습 완료'(History)일 경우 학점 업데이트
    if (activityType === 'History') {
      const { data: contentData } = await supabase
        .from('contents')
        .select('assigned_credits')
        .eq('id', contentId)
        .single();
      
      const creditsToAdd = contentData?.assigned_credits || 0;

      if (creditsToAdd > 0) {
        // user profiles credits 업데이트 (RPC 함수 권장하지만 편의상 직접 업데이트)
        const { data: userData } = await supabase
          .from('profiles')
          .select('credits')
          .eq('id', userId)
          .single();
        
        const currentCredits = userData?.credits || 0;

        await supabase
          .from('profiles')
          .update({ credits: currentCredits + creditsToAdd })
          .eq('id', userId);
      }
    }

    return NextResponse.json({ success: true, message: `${activityType} recorded` });
  } catch (error) {
    console.error('Activity API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
