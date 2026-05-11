"use client";
import { motion } from "framer-motion";

interface ButtonProps {
  text: string;
  color?: "green" | "blue" | "red" | "gray";
  onClick?: () => void;
}

export default function Button3D({
  text,
  color = "green",
  onClick,
}: ButtonProps) {
  const colorStyles = {
    green: "bg-[#58CC02] border-[#58A700] text-white hover:bg-[#46A302]",
    blue: "bg-[#1CB0F6] border-[#1899D6] text-white hover:bg-[#1483C2]",
    red: "bg-[#FF4B4B] border-[#EA2B2B] text-white hover:bg-[#E53838]",
    gray: "bg-[#E5E5E5] border-[#CECECE] text-[#AFAFAF]",
  };

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ y: 4 }}
      className={`
        relative w-full rounded-2xl py-3 px-6 font-bold text-lg uppercase tracking-wide
        border-b-4 active:border-b-0 active:mt-1 transition-colors duration-150
        ${colorStyles[color]}
      `}
    >
      {text}
    </motion.button>
  );
}
