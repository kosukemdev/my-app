export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 rounded-full border-4 border-gray-300"></div>
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>

      <p className="animate-pulse text-sm tracking-widest text-gray-600">
        LOADING
      </p>
    </div>
  );
}
