"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { LessonNodeProps } from "./types";

const getNodePosition = (side: "left" | "right" | "center") => {
  switch (side) {
    case "left":
      return "-translate-x-10";
    case "right":
      return "translate-x-10";
    default:
      return "";
  }
};

export default function LessonNode({
  title,
  icon,
  status,
  side = "center",
  showStar = false,
  isBigExam = false,
}: LessonNodeProps) {
  const position = getNodePosition(side);

  const styles = {
    completed: {
      container:
        "bg-yellow-300 border-yellow-900 text-yellow-900 shadow-[0_8px_0_0_#B38F00]",
      label: "border-slate-200 bg-white text-slate-800",
    },
    current: {
      container:
        "bg-blue-600 border-white text-white shadow-[0_8px_0_0_#1D4ED8]",
      label: "border-blue-200 bg-blue-600 text-white shadow-lg",
    },
    locked: {
      container:
        "bg-slate-200 border-slate-300 text-slate-400 shadow-[0_8px_0_0_#CBD5E1]",
      label: "border-slate-200 bg-white text-slate-500",
    },
  };

  const currentStyle = styles[status];

  if (isBigExam) {
    return (
      <div className={`relative ${position}`}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`${currentStyle.container} flex h-32 w-32 rotate-3 flex-col items-center justify-center rounded-3xl border-4`}
        >
          {icon}
          <p className="mt-2 text-xs font-black uppercase tracking-wider">
            Big Exam
          </p>
        </motion.div>
      </div>
    );
  }
  return (
    <div className={`relative ${position}`}>
      <motion.button
        whileHover={{ scale: status !== "locked" ? 1.1 : 1.03 }}
        whileTap={{ scale: 0.96 }}
        className={`${currentStyle.container} relative flex h-24 w-24 items-center justify-center rounded-full border-4`}
      >
        {status === "current" && (
          <div className="absolute inset-0 animate-pulse rounded-full bg-white/10" />
        )}

        {icon}

        {showStar && (
          <div className="absolute -right-3 -top-3 rounded-full border-2 border-yellow-500 bg-white p-1">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
          </div>
        )}
      </motion.button>

      <div
        className={`absolute top-1/2 ${
          side === "right"
            ? "right-32 -translate-y-1/2 text-right"
            : "left-32 -translate-y-1/2"
        } whitespace-nowrap rounded-xl border px-4 py-2 ${currentStyle.label}`}
      >
        <p className="font-bold">{title}</p>
        {status === "current" && (
          <p className="text-[10px] uppercase tracking-widest opacity-80">
            Current Lesson
          </p>
        )}
      </div>
    </div>
  );
}
