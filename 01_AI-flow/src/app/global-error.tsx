"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-[#f97316] text-white rounded font-bold text-sm"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
