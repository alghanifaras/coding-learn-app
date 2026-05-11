"use client";

import { useState } from "react";
import axios from "axios";
import Button3D from "@/components/Button3D";
import Input3D from "@/components/Input3D";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", response.data.access_token);
      alert("Pendaftaran berhasil! Ayo mulai belajar.");
      router.push("/"); // Pindah ke halaman login atau dashboard
    } catch (error: any) {
      alert(error.response?.data?.message || "Duh, gagal daftar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-slate-800">
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        <div className="text-6xl mb-2">✨</div>
        <h1 className="text-3xl font-extrabold text-center">
          Buat Profil Kamu
        </h1>

        <div className="w-full flex flex-col gap-3">
          <Input3D
            type="text"
            placeholder="Nama lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input3D
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input3D
            type="password"
            placeholder="Kata sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="w-full mt-2">
          <Button3D
            text={loading ? "Mendaftar..." : "Buat Akun"}
            color="green"
            onClick={handleRegister}
          />
        </div>

        <p className="text-slate-400 font-bold text-sm text-center">
          Sudah punya akun?{" "}
          <Link href="/" className="text-sky-500 hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </main>
  );
}
