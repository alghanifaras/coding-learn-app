import { Home, Map, BookOpen, Trophy, User, Settings } from "lucide-react";

const sidebarItems = [
  { label: "Home", icon: Home },
  { label: "Learning Path", icon: Map, active: true },
  { label: "Catalog", icon: BookOpen },
  { label: "Leaderboard", icon: Trophy },
  { label: "Profile", icon: User },
  { label: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 flex-col border-r border-slate-200 bg-white px-6 pt-24 lg:flex">
      <div className="flex flex-1 flex-col gap-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={`flex items-center gap-4 rounded-2xl px-4 py-4 text-left font-bold transition-all ${
                item.active
                  ? "bg-yellow-300 text-yellow-900 shadow-[0_4px_0_0_#D4A900]"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <Icon className="h-6 w-6" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <button className="mb-6 rounded-2xl bg-blue-600 px-4 py-4 font-bold text-white shadow-[0_4px_0_0_#1D4ED8]">
        Upgrade to Pro
      </button>
    </aside>
  );
}
