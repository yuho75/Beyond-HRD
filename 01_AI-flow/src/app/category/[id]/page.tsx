"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";

const categoryMap: Record<string, string> = {
  c1: "AI 기본 활용",
  c2: "AI 업무 자동화",
  c3: "AI 크리에이티브",
  c4: "AI 에이전트",
  c5: "AI 리더십·트렌드",
  c6: "AI 수익화",
  basic: "AI 기본 활용",
  automation: "AI 업무 자동화",
  creative: "AI 크리에이티브",
  agent: "AI 에이전트",
  trend: "AI 리더십·트렌드",
  monetize: "AI 수익화",
  collection: "컬렉션",
  best: "BEST"
};

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const catName = categoryMap[resolvedParams.id] || "AI 기본 활용";

  useEffect(() => {
    router.replace(`/?cat=${encodeURIComponent(catName)}`);
  }, [catName, router]);

  return (
    <div className="w-full max-w-[1200px] px-6 py-20 text-center text-gray-400">
      카테고리 피드로 이동 중입니다...
    </div>
  );
}
