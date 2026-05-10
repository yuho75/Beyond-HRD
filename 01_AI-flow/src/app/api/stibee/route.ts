import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const STIBEE_API_KEY = process.env.STIBEE_API_KEY;
const STIBEE_LIST_ID = process.env.STIBEE_LIST_ID;

// A: 회원가입 시 닉네임 수집 및 스티비 주소록 자동 추가 API
export async function POST(request: Request) {
  try {
    const { email, nickname } = await request.json();

    if (!email || !nickname) {
      return NextResponse.json({ error: 'Email and nickname are required' }, { status: 400 });
    }

    // 스티비(Stibee) 주소록 구독자 추가 API 호출
    const stibeeResponse = await fetch(`https://api.stibee.com/v1/lists/${STIBEE_LIST_ID}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'AccessToken': STIBEE_API_KEY as string,
      },
      body: JSON.stringify({
        eventOccurredBy: 'SUBSCRIBER',
        confirmEmailYN: 'N',
        subscribers: [
          {
            email: email,
            name: nickname,
          }
        ]
      })
    });

    if (!stibeeResponse.ok) {
      const errorData = await stibeeResponse.json();
      console.error('Stibee API Error:', errorData);
      return NextResponse.json({ error: 'Failed to add subscriber to Stibee' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Successfully subscribed to Stibee' });
  } catch (error) {
    console.error('Ingest API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
