export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-700">
      <div className="animate-spin h-10 w-10 border-4 border-blue-400 border-t-transparent rounded-full" />
      <p className="text-sm font-medium">日報データを整理しています…</p>
    </div>
  );
}