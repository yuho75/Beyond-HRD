# Project Rules & Planning Reference Protocol

## Mandatory Planning Verification Step (기획 문서 우선 확인 수칙)
Whenever initiating any new task, feature request, architectural modification, or design work in this project workspace (`c:\NB\01_AIditor`), you MUST execute the following verification step **BEFORE** taking action or making code changes:

1. **Google Drive Planning Folder Inspection**:
   - Access and inspect the Google Drive synced folder path:
     `G:\다른 컴퓨터\내 노트북\(AIditor) 에이디터 기획`
   - List and review all updated planning files in this directory (including but not limited to `01_현행버전/AIditor_통합사업기획안_최종.md`, `01_현행버전/AIDITOR_사업전략_현행.md`, `01_현행버전/AIDITOR_포털구조_논의.md`, `01_현행버전/A_roadmap_checklist.md`, `01_현행버전/B_sourcing_channels.md`, `01_현행버전/C_makecom_scenario.md`, `01_현행버전/D_final_strategy.md`, `01_현행버전/뉴닉_벤치마킹_분석_최종.md`).

2. **Synchronize & Apply Latest Requirements**:
   - Target Next.js application path: `c:\NB\01_AIditor\01_AI-flow`
   - Deployment URL: `https://ai-flow-khaki.vercel.app/`
   - Core Tech Stack: Next.js + Vercel + Supabase + Cloudinary
   - Ensure the latest design specs, requirements, and business logic from the Google Drive planning folder are reflected in the codebase.

3. **Strict Enforcement of Latest Versions Only (최신 확정 스펙만 엄격 적용)**:
   - Always inspect `01_현행버전/` for the newest version timestamp (e.g., `D_final_strategy.md` v8, `AIDITOR_포털구조_논의.md` v3).
   - Enforce Confirmed 5 B-Plan Categories strictly: **`AI 도구 활용`**, **`업무 자동화`**, **`콘텐츠·문서 제작`**, **`AI 에이전트`**, **`AI 트렌드`**.
   - NEVER generate or use deprecated/legacy A-Plan category names (`AI 따라하기`, `AI로 벌기`, `AI로 준비하기`, `AI 흐름 읽기`).
