export default function Loading() {
  return (
    <div className="flex h-64 flex-col items-center justify-center gap-3 text-gray-700">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-400 border-t-transparent" />
      <p className="text-sm font-medium">日報データを整理しています…</p>
    </div>
  );
}
