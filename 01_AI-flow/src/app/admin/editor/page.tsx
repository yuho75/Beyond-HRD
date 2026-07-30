import dynamicImport from "next/dynamic";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const EditorClient = dynamicImport(() => import("./EditorClient"));

export default function AdminEditorPage() {
  return (
    <Suspense fallback={<div className="p-10 text-gray-500 font-bold">에디터 로딩 중...</div>}>
      <EditorClient />
    </Suspense>
  );
}
