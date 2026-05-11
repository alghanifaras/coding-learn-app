"use client";
import { motion } from "framer-motion";
import Button3D from "./Button3D";

export default function QuizCard() {
  return (
    <motion.div
      // Animasi saat kartu pertama kali dirender
      initial={{ scale: 0.8, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
      className="w-full max-w-lg bg-white rounded-3xl p-8 border-2 border-slate-200 border-b-[6px] shadow-sm flex flex-col gap-6"
    >
      {/* Header Soal */}
      <div className="flex items-center gap-4">
        {/* Maskot / Ikon Karakter (Bisa diganti gambar nanti) */}
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl shrink-0">
          🦉
        </div>

        {/* Balon Kata */}
        <div className="bg-slate-100 border-2 border-slate-200 rounded-2xl rounded-tl-none p-4 w-full">
          <h2 className="text-xl font-bold text-slate-700">
            Apa tag HTML untuk membuat sebuah paragraf?
          </h2>
        </div>
      </div>

      {/* Pilihan Jawaban */}
      <div className="grid grid-cols-1 gap-4 mt-4">
        <Button3D text="<h1>" color="gray" />
        <Button3D text="<p>" color="green" />
        <Button3D text="<br>" color="gray" />
        <Button3D text="<div>" color="gray" />
      </div>
    </motion.div>
  );
}
