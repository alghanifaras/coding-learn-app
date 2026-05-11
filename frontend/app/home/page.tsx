"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Komponen Header Unit
const UnitHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="w-full bg-[#58CC02] text-white p-6 rounded-2xl mb-12 shadow-[0_6px_0_0_#46A302] flex flex-col gap-1">
    <h2 className="text-xl font-black uppercase tracking-wide">{title}</h2>
    <p className="text-md font-bold opacity-90 leading-tight">{description}</p>
  </div>
);

// Komponen Lingkaran Lesson
const LessonNode = ({
  index,
  title,
  active = false,
}: {
  index: number;
  title: string;
  active?: boolean;
}) => {
  const xOffsets = [0, 45, 80, 45, 0, -45, -80, -45];
  const offset = xOffsets[index % xOffsets.length];

  return (
    <div
      className="flex flex-col items-center mb-14"
      style={{ transform: `translateX(${offset}px)` }}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`
          w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-b-[8px] transition-all
          ${
            active
              ? "bg-[#58CC02] border-[#46A302] text-white"
              : "bg-slate-200 border-slate-300 text-slate-400"
          }
        `}
      >
        <span className="text-3xl">⭐</span>
      </motion.button>
      <span className="mt-3 font-black text-slate-500 text-[11px] sm:text-xs uppercase tracking-widest text-center max-w-[100px]">
        {title}
      </span>
    </div>
  );
};

export default function HomePage() {
  const [lessons] = useState([
    { title: "Dasar HTML" },
    { title: "Tag Paragraf" },
    { title: "Heading" },
    { title: "List & Link" },
    { title: "Latihan" },
    { title: "Ujian Akhir" },
  ]);

  return (
    <div className="min-h-screen bg-white font-nunito">
      {/* 1. TOP STATS (Pindah ke Tengah) */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b-2 border-slate-200 z-40 flex justify-center">
        <div className="flex items-center gap-8 px-6 h-full max-w-2xl font-black text-lg">
          <span className="text-orange-500 flex items-center gap-2 drop-shadow-sm">
            🔥 <span className="text-slate-700">3</span>
          </span>
          <span className="text-red-500 flex items-center gap-2 drop-shadow-sm">
            ❤️ <span className="text-slate-700">5</span>
          </span>
          <span className="text-blue-400 flex items-center gap-2 drop-shadow-sm">
            💎 <span className="text-slate-700">120</span>
          </span>
        </div>
      </nav>

      {/* 2. SIDEBAR DESKTOP (Lebih Kecil) */}
      <aside className="hidden md:flex flex-col w-20 lg:w-64 fixed left-0 top-0 bottom-0 border-r-2 border-slate-200 p-4 lg:p-6 z-50">
        <div className="text-2xl lg:text-3xl font-black text-[#58CC02] mb-10 text-center lg:text-left">
          <span className="lg:hidden">D</span>
          <span className="hidden lg:inline">DuoCoding</span>
        </div>

        <div className="flex flex-col gap-4">
          <button className="flex items-center justify-center lg:justify-start gap-4 p-3 bg-sky-100 text-sky-600 rounded-xl font-black border-2 border-sky-200">
            <span className="text-xl">🏠</span>
            <span className="hidden lg:inline uppercase text-sm">Belajar</span>
          </button>
          <button className="flex items-center justify-center lg:justify-start gap-4 p-3 text-slate-400 font-black hover:bg-slate-100 rounded-xl transition-all">
            <span className="text-xl">🏆</span>
            <span className="hidden lg:inline uppercase text-sm tracking-tighter">
              Peringkat
            </span>
          </button>
          <button className="flex items-center justify-center lg:justify-start gap-4 p-3 text-slate-400 font-black hover:bg-slate-100 rounded-xl transition-all">
            <span className="text-xl">👤</span>
            <span className="hidden lg:inline uppercase text-sm">Profil</span>
          </button>
        </div>
      </aside>

      {/* 3. MAIN AREA */}
      <div className="md:pl-20 lg:pl-64 pt-20 pb-32">
        <main className="max-w-2xl mx-auto px-6 flex flex-col items-center">
          <div className="w-full">
            <UnitHeader
              title="Unit 1: Perkenalan Web"
              description="Pelajari struktur dasar HTML dan cara kerja website modern."
            />

            <div className="flex flex-col items-center">
              {lessons.map((lesson, idx) => (
                <LessonNode
                  key={idx}
                  index={idx}
                  title={lesson.title}
                  active={idx === 0}
                />
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* 4. MOBILE BOTTOM NAV */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-200 h-20 px-8 flex items-center justify-between z-50">
        <button className="text-sky-500 flex flex-col items-center gap-1 font-black text-[10px]">
          <span className="text-2xl">🏠</span>
        </button>
        <button className="text-slate-400 flex flex-col items-center gap-1 font-black text-[10px]">
          <span className="text-2xl">🏆</span>
        </button>
        <button className="text-slate-400 flex flex-col items-center gap-1 font-black text-[10px]">
          <span className="text-2xl">👤</span>
        </button>
      </nav>
    </div>
  );
}
