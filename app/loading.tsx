export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-gray-300"></div>
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
      </div>

      <p className="text-gray-600 text-sm tracking-widest animate-pulse">
        LOADING
      </p>
    </div>
  );
}
