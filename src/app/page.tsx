"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Activity } from "lucide-react";

export default function LoginSIRS() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [unit, setUnit] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulasi proses login admin poli
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      localStorage.setItem("unit", unit);
      
      // Redirect ke dashboard monitoring poli
      router.push("/beranda");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-sm border border-gray-100">
        
        {/* Header / Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-emerald-600 p-2.5 rounded-xl flex items-center justify-center">
            <Activity className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              SIRS UGM {/* [cite: 368] */}
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              Sistem Informasi Rumah Sakit {/* [cite: 369] */}
            </p>
          </div>
        </div>

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* ID Petugas / Username */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-600">
              ID Petugas / Username {/* [cite: 370] */}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100/80 border-transparent rounded-xl text-gray-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none text-sm"
              placeholder="admin.poli" /* [cite: 371] */
              required
            />
          </div>

          {/* Kata sandi */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-600">
              Kata sandi {/* [cite: 372] */}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100/80 border-transparent rounded-xl text-gray-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none text-sm tracking-widest"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Unit / Poliklinik */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-600">
              Unit / Poliklinik {/*  */}
            </label>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100/80 border-transparent rounded-xl text-gray-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none text-sm"
              placeholder=""
              required
            />
          </div>

          {/* Button Login */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-3.5 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2 font-semibold text-sm"
          >
            <LogIn className="w-4 h-4" />
            {loading ? "Memproses..." : "Masuk ke Sistem"} {/* [cite: 374] */}
          </button>
        </form>

        {/* Footer Text */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Gunakan akun yang diberikan oleh Admin Sistem RS {/* [cite: 375] */}
          </p>
        </div>
        
      </div>
    </div>
  );
}