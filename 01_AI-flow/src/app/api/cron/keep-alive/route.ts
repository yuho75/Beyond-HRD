import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 초기화 (서비스 롤 키 사용하여 RLS 우회 및 실제 DB 접근 보장)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export async function GET(request: Request) {
  // Vercel Cron Secret 검증 (설정되어 있을 경우 안전망으로 작동)
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Supabase 환경 변수가 설정되지 않았습니다.');
    return NextResponse.json(
      { success: false, error: 'Environment variables are missing' },
      { status: 500 }
    );
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 1. contents 테이블에 간단한 SELECT 쿼리를 날려 실제 데이터베이스 활동(Activity)을 생성합니다.
    const { data: contentsData, error: contentsError } = await supabase
      .from('contents')
      .select('id')
      .limit(1);

    if (contentsError) {
      throw contentsError;
    }

    // 2. 추가적으로 profiles 테이블도 조회해 봅니다 (다중 테이블 조회로 확실한 데이터베이스 활성화 유도)
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);

    if (profilesError) {
      console.warn('Profiles Query Warning (Non-critical):', profilesError.message);
    }

    console.log('✅ Supabase Keep-Alive Cron executed successfully and generated DB traffic.');

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      contentsCount: contentsData?.length || 0,
      profilesCount: profilesData?.length || 0,
      message: 'Supabase database activity generated successfully!'
    });
  } catch (error: any) {
    console.error('❌ Supabase Keep-Alive Cron failed:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
