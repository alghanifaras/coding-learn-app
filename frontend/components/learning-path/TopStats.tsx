import { Flame, Gem, Medal } from "lucide-react";

function StatPill({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 font-bold text-slate-700">
      {icon}
      <span>{value}</span>
    </div>
  );
}

export default function TopStats() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-6 lg:px-10">
        <h1 className="hidden lg:block text-3xl font-black tracking-tight text-blue-600">
          Coding Learn
        </h1>

        <div className="ml-auto flex items-center gap-3">
          <StatPill
            icon={<Flame className="h-5 w-5 text-orange-500 fill-orange-500" />}
            value="5"
          />
          <StatPill
            icon={<Gem className="h-5 w-5 text-yellow-500 fill-yellow-500" />}
            value="1200"
          />
          <StatPill
            icon={<Medal className="h-5 w-5 text-blue-600" />}
            value="Level 12"
          />
        </div>
      </div>
    </header>
  );
}
