import QuizCard from "@/components/QuizCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-sky-50 text-slate-800 p-6">
      {/* Progress Bar bohongan untuk estetika awal */}
      <div className="w-full max-w-lg bg-slate-200 rounded-full h-4 mb-10 overflow-hidden">
        <div className="bg-[#58CC02] h-full w-1/2 rounded-full relative">
          <div className="absolute top-1 left-2 right-2 h-1 bg-white/30 rounded-full"></div>
        </div>
      </div>

      <QuizCard />
    </main>
  );
}
