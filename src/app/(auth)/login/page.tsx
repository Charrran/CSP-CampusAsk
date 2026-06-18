"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";
import { loginSchema, type LoginInput } from "@/lib/validations";
import { ROLE_DASHBOARDS } from "@/types";

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginInput) {
    setIsSubmitting(true);
    try {
      const result = await login(data.email, data.password);

      if (result.success && result.role) {
        toast.success("Welcome back!", {
          description: "Redirecting to your dashboard...",
        });
        router.push(ROLE_DASHBOARDS[result.role]);
      } else {
        toast.error("Login failed", {
          description: result.error || "Invalid credentials",
        });
      }
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Left Side: Full-bleed Espresso */}
      <section className="hidden lg:flex w-1/2 bg-[#291B15] flex-col justify-between p-16 relative overflow-hidden">
        {/* Background decorative element */}
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none"></div>
        <div className="z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-sm">
              <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                account_balance
              </span>
            </div>
            <h1 className="text-[#F4F1ED] font-display text-3xl tracking-tight">Vidya Setu</h1>
          </div>
        </div>
        <div className="z-10 max-w-lg mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="text-primary font-inter uppercase tracking-[0.3em] text-xs font-semibold mb-6 block">
            The Bridge to Knowledge
          </span>
          <blockquote className="text-[#F4F1ED] font-cormorant italic text-5xl leading-tight mb-8">
            "Vidya dadati vinayam, vinaya dadyati patratam."
          </blockquote>
          <p className="text-[#e8dccc] font-inter text-sm leading-relaxed tracking-wide">
            Knowledge gives humility, from humility comes worthiness, from worthiness one attains wealth, from wealth one does good deeds, and from that comes joy.
          </p>
        </div>
        <div className="z-10 flex gap-8 text-[#e8dccc] font-inter text-[10px] uppercase tracking-widest opacity-80">
          <span>Academic Excellence</span>
          <span>Institutional Security</span>
          <span>Est. 2024</span>
        </div>
      </section>

      {/* Right Side: Clean Sand Login Form */}
      <main className="w-full lg:w-1/2 bg-[#F4F1ED] flex items-center justify-center p-8 md:p-12 lg:p-24 relative">
        {/* Mobile Logo (Visible only on small screens) */}
        <div className="lg:hidden absolute top-12 left-12 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-3xl">account_balance</span>
            <span className="font-display text-2xl font-bold text-[#291B15]">Vidya Setu</span>
          </div>
        <div className="w-full max-w-md space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <header className="space-y-2">
            <h2 className="text-4xl font-headline text-[#291B15] font-semibold">Access Portal</h2>
            <p className="text-[#605850] font-inter text-sm">Please authenticate with your institutional credentials.</p>
          </header>
          
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              {/* Email Input */}
              <div className="group">
                  <label className="block text-[11px] font-inter font-bold uppercase tracking-wider text-[#605850] mb-2 transition-colors group-focus-within:text-[#3a302a]" htmlFor="email">
                  Institutional Email
                </label>
                <div className="relative">
                  <input
                    {...register("email")}
                    className={`w-full bg-white border-0 border-b ${errors.email ? 'border-red-500' : 'border-outline-variant/60'} py-4 px-0 focus:ring-0 focus:border-primary text-[#291B15] font-inter placeholder:text-outline/40 transition-all text-sm bg-transparent`}
                    id="email"
                    placeholder="name@university.edu"
                    type="email"
                  />
                  <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-[#9a9088] text-lg group-focus-within:text-[#3a302a] pointer-events-none">
                    alternate_email
                  </span>
                </div>
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              {/* Password Input */}
              <div className="group">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[11px] font-inter font-bold uppercase tracking-wider text-[#605850] transition-colors group-focus-within:text-[#3a302a]" htmlFor="password">
                    Secure Key
                  </label>
                  <Link href="#" className="text-[10px] font-inter font-semibold uppercase text-[#8a4518] hover:text-[#c2652a] transition-colors tracking-tighter">
                    Lost Access?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    {...register("password")}
                    className={`w-full bg-white border-0 border-b ${errors.password ? 'border-red-500' : 'border-outline-variant/60'} py-4 px-0 focus:ring-0 focus:border-primary text-[#291B15] font-inter placeholder:text-outline/40 transition-all text-sm bg-transparent`}
                    id="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-[#9a9088] text-lg hover:text-[#3a302a] transition-colors"
                  >
                    {showPassword ? "visibility_off" : "visibility"}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input className="peer h-4 w-4 rounded-sm border-outline-variant text-primary focus:ring-primary/20 transition-all" type="checkbox" />
                </div>
                <span className="text-xs font-inter text-[#605850] group-hover:text-[#3a302a] transition-colors">Trust this terminal for 30 days</span>
              </label>
            </div>

            {/* Primary Action */}
            <div className="pt-4">
              <button
                disabled={isSubmitting}
                className="w-full bg-[#291B15] text-[#F4F1ED] font-inter font-bold uppercase tracking-[0.2em] text-xs py-5 rounded-md hover:bg-primary transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-[#291B15]/10 disabled:opacity-70 flex justify-center items-center gap-2"
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                    Authenticating...
                  </>
                ) : (
                  "Access Portal"
                )}
              </button>
            </div>
          </form>

          <footer className="pt-8 flex flex-col items-center gap-6">
            <Link
              className="w-full text-center bg-primary text-white font-inter font-bold uppercase tracking-[0.2em] text-xs py-4 rounded-md hover:opacity-90 transition-all"
              href="/register"
            >
              New user? Register here
            </Link>
            <div className="flex gap-6 text-[10px] font-inter uppercase tracking-widest text-[#605850] font-semibold">
              <Link className="hover:text-[#8a4518] transition-colors" href="#">Help Desk</Link>
              <span className="text-[#9a9088] opacity-40">|</span>
              <Link className="hover:text-[#8a4518] transition-colors" href="#">Privacy Policy</Link>
              <span className="text-[#9a9088] opacity-40">|</span>
              <Link className="hover:text-[#8a4518] transition-colors" href="/register">Register</Link>
            </div>
          </footer>
        </div>

        {/* Atmospheric Elements */}
        <div className="absolute bottom-8 right-8 pointer-events-none opacity-20">
          <span className="font-display italic text-8xl text-[#9a9088] select-none">Setu</span>
        </div>
      </main>
    </div>
  );
}
