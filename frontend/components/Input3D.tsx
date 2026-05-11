"use client";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input3D({
  type,
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-slate-100 border-2 border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-sky-400 focus:bg-white transition-all duration-200 text-slate-700 font-medium"
    />
  );
}
