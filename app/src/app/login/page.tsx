"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, ArrowRight, Shield } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError("Invalid access code. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-navy via-[#1a3355] to-navy-light">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo + Branding */}
        <div className="mb-8 text-center">
          <div className="mb-6 flex justify-center">
            <Image
              src="/logo.png"
              alt="Real Property Management of the Rockies"
              width={220}
              height={73}
              className="brightness-0 invert"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-white">Command Center</h1>
          <p className="mt-2 text-sm text-white/50">
            Unified Operations Platform Preview
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-8 shadow-2xl">
          <div className="mb-6 flex items-center justify-center gap-2 text-white/70">
            <Shield size={16} />
            <span className="text-xs font-medium uppercase tracking-wider">
              Authorized Access Only
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-white/80">
                Access Code
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your access code"
                  className="w-full rounded-lg bg-white/10 border border-white/10 py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50 transition-colors"
                  autoFocus
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-400">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold py-3 text-sm font-semibold text-navy transition-all hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                "Verifying..."
              ) : (
                <>
                  Enter Dashboard <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-white/30">
            Prepared exclusively for Real Property Management of the Rockies
          </p>
          <p className="mt-1 text-xs text-white/20">
            Built by FoxTrove
          </p>
        </div>
      </div>
    </div>
  );
}
