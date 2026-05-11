"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Button3D from "@/components/Button3D";
import Input3D from "@/components/Input3D";
import Link from "next/link"; // Import Link untuk pindah halaman

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // Cek apakah ada email yang tersimpan saat halaman dimuat
  useEffect(() => {
    const savedEmail = localStorage.getItem("remembered_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      const token = response.data.access_token;
      localStorage.setItem("token", token);

      // Logika Remember Me
      if (rememberMe) {
        localStorage.setItem("remembered_email", email);
      } else {
        localStorage.removeItem("remembered_email");
      }

      alert("Hore! Berhasil masuk.");
    } catch (error: any) {
      alert(error.response?.data?.message || "Gagal masuk nih.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-slate-800">
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        <div className="text-6xl mb-2 animate-bounce">🦉</div>
        <h1 className="text-3xl font-extrabold text-center">
          Masuk ke DuoCoding
        </h1>

        <div className="w-full flex flex-col gap-3">
          <Input3D
            type="email"
            placeholder="Email kamu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input3D
            type="password"
            placeholder="Kata sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Checkbox Remember Me */}
          <div className="flex items-center gap-2 px-2 mt-1">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="w-5 h-5 rounded-lg border-2 border-slate-200 accent-sky-500"
            />
            <label
              htmlFor="remember"
              className="text-sm font-bold text-slate-500 cursor-pointer select-none"
            >
              Ingat saya
            </label>
          </div>
        </div>

        <div className="w-full mt-2">
          <Button3D
            text={loading ? "Tunggu ya..." : "Masuk"}
            color="blue"
            onClick={handleLogin}
          />
        </div>

        <p className="text-slate-400 font-bold text-sm">
          Belum punya akun?{" "}
          <Link href="/register" className="text-sky-500 hover:underline">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </main>
  );
}
