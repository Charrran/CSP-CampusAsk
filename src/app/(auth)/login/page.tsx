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
              <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
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
          <p className="text-outline-variant font-inter text-sm leading-relaxed tracking-wide">
            Knowledge gives humility, from humility comes worthiness, from worthiness one attains wealth, from wealth one does good deeds, and from that comes joy.
          </p>
        </div>
        <div className="z-10 flex gap-8 text-outline-variant font-inter text-[10px] uppercase tracking-widest opacity-60">
          <span>Academic Excellence</span>
          <span>Institutional Security</span>
          <span>Est. 2024</span>
        </div>
      </section>

      {/* Right Side: Clean Sand Login Form */}
      <main className="w-full lg:w-1/2 bg-[#F4F1ED] flex items-center justify-center p-8 md:p-12 lg:p-24 relative">
        {/* Mobile Logo (Visible only on small screens) */}
        <div className="lg:hidden absolute top-12 left-12 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl">account_balance</span>
          <span className="font-display text-2xl font-bold text-[#291B15]">Vidya Setu</span>
        </div>
        <div className="w-full max-w-md space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <header className="space-y-2">
            <h2 className="text-4xl font-headline text-[#291B15] font-semibold">Access Portal</h2>
            <p className="text-on-surface-variant font-inter text-sm">Please authenticate with your institutional credentials.</p>
          </header>
          
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              {/* Email Input */}
              <div className="group">
                <label className="block text-[11px] font-inter font-bold uppercase tracking-wider text-secondary mb-2 transition-colors group-focus-within:text-primary" htmlFor="email">
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
                  <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-outline/40 text-lg group-focus-within:text-primary pointer-events-none">
                    alternate_email
                  </span>
                </div>
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              {/* Password Input */}
              <div className="group">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[11px] font-inter font-bold uppercase tracking-wider text-secondary transition-colors group-focus-within:text-primary" htmlFor="password">
                    Secure Key
                  </label>
                  <Link href="#" className="text-[10px] font-inter font-semibold uppercase text-primary hover:text-tertiary transition-colors tracking-tighter">
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
                    className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-outline/40 text-lg hover:text-primary transition-colors"
                  >
                    {showPassword ? "visibility_off" : "visibility"}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
              </div>
            </div>

            {/* Remember Me & MFA */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input className="peer h-4 w-4 rounded-sm border-outline-variant text-primary focus:ring-primary/20 transition-all" type="checkbox" />
                </div>
                <span className="text-xs font-inter text-secondary group-hover:text-[#291B15] transition-colors">Trust this terminal for 30 days</span>
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

          {/* SSO / Alternative Options */}
          <div className="pt-8 space-y-6">
            <div className="relative">
              <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/40"></div>
              </div>
              <div className="relative flex justify-center text-xs font-inter uppercase tracking-[0.1em]">
                <span className="px-4 bg-[#F4F1ED] text-outline font-medium">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-3 border border-outline-variant/60 rounded-md bg-white hover:bg-surface-container-low transition-colors group">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"></path>
                </svg>
                <span className="text-[10px] font-inter font-bold uppercase tracking-wider text-[#291B15] group-hover:text-primary transition-colors">Google Edu</span>
              </button>
              <button className="flex items-center justify-center gap-3 py-3 border border-outline-variant/60 rounded-md bg-white hover:bg-surface-container-low transition-colors group">
                <span className="material-symbols-outlined text-base text-[#291B15] group-hover:text-primary transition-colors">vpn_key</span>
                <span className="text-[10px] font-inter font-bold uppercase tracking-wider text-[#291B15] group-hover:text-primary transition-colors">SAML SSO</span>
              </button>
            </div>
          </div>

          <footer className="pt-8 flex flex-col items-center gap-6">
            <div className="flex gap-6 text-[10px] font-inter uppercase tracking-widest text-secondary font-semibold">
              <Link className="hover:text-primary transition-colors" href="#">Help Desk</Link>
              <span className="text-outline-variant opacity-30">|</span>
              <Link className="hover:text-primary transition-colors" href="#">Privacy Policy</Link>
              <span className="text-outline-variant opacity-30">|</span>
              <Link className="hover:text-primary transition-colors" href="/register">Register</Link>
            </div>
          </footer>
        </div>

        {/* Atmospheric Elements */}
        <div className="absolute bottom-8 right-8 pointer-events-none opacity-20">
          <span className="font-display italic text-8xl text-outline-variant select-none">Setu</span>
        </div>
      </main>
    </div>
  );
}
