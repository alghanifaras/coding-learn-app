import { Play } from "lucide-react";

export default function FloatingContinueButton() {
  return (
    <button className="fixed bottom-8 right-8 z-50 hidden items-center gap-3 rounded-full bg-blue-600 px-6 py-4 font-bold text-white shadow-[0_6px_0_0_#1D4ED8] lg:flex">
      <Play className="h-5 w-5 fill-white" />
      <span className="uppercase tracking-wide">Continue Learning</span>
    </button>
  );
}
