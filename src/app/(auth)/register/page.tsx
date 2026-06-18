"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";
import { registerSchema, type RegisterInput } from "@/lib/validations";

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { register: registerUser } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<RegisterInput & { confirmPassword?: string, institution?: string, terms?: boolean }>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "STUDENT",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedRole = watch("role");

  async function handleNextStep(targetStep: 1 | 2 | 3) {
    if (targetStep === 2 && step === 1) {
      const valid = await trigger(["role"]);
      if (valid) setStep(2);
    } else if (targetStep === 3 && step === 2) {
      const valid = await trigger(["name", "email"]);
      if (valid) setStep(3);
    } else {
      setStep(targetStep);
    }
  }

  async function onSubmit(data: RegisterInput & { confirmPassword?: string; institution?: string; terms?: boolean }) {
    const formValues = getValues();
    if (data.password !== formValues.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!formValues.terms) {
      toast.error("Please agree to the Terms of Service");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await registerUser(
        data.name,
        data.email,
        data.password,
        data.role
      );

      if (result.success) {
        toast.success("Account created!", {
          description: "Please sign in with your credentials.",
        });
        router.push("/login");
      } else {
        toast.error("Registration failed", {
          description: result.error || "Please try again",
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
    <main className="flex min-h-screen flex-col md:flex-row overflow-x-hidden">
      {/* Left Side: Espresso Branding & Hero */}
      <section className="relative hidden md:flex md:w-2/5 lg:w-1/2 bg-[#2a2420] flex-col justify-between p-12 lg:p-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a2420] via-[#2a2420]/40 to-transparent"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-on-primary-container text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_stories
            </span>
            <h1 className="font-display text-3xl font-bold text-[#fbe8d8] tracking-tight">Vidya Setu</h1>
          </div>
        </div>
        <div className="relative z-10 space-y-8 max-w-lg">
          <div className="space-y-4">
            <h2 className="font-headline text-5xl lg:text-7xl text-[#fbe8d8] leading-none italic">
              An investment in knowledge pays the best interest.
            </h2>
            <p className="text-[#fbe8d8]/70 text-lg font-light tracking-wide">— Benjamin Franklin</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-xl space-y-6">
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-[#f0a878] shrink-0">school</span>
              <div>
                <p className="text-[#fbe8d8] font-medium mb-1">Empowering Learners</p>
                <p className="text-[#fbe8d8]/50 text-sm">Join a community of 50,000+ students and scholars across the nation.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-[#f0a878] shrink-0">verified_user</span>
              <div>
                <p className="text-[#fbe8d8] font-medium mb-1">Academic Integrity</p>
                <p className="text-[#fbe8d8]/50 text-sm">Verified credentials for both Shikshaks and students ensuring a safe learning space.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 pt-12">
          <p className="text-[#fbe8d8]/40 text-sm uppercase tracking-widest font-label">© 2024 CampusAsk Academic Systems</p>
        </div>
      </section>

      {/* Right Side: Registration Form */}
      <section className="flex-1 bg-[#faf5ee] flex flex-col items-center justify-center p-6 md:p-12 lg:p-24 relative overflow-hidden">
        {/* Mobile Header Only */}
        <div className="md:hidden w-full mb-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_stories
            </span>
            <h1 className="font-display text-xl font-bold text-on-surface">Vidya Setu</h1>
          </div>
          <Link className="text-sm font-semibold text-primary underline underline-offset-4" href="/login">
            Log in
          </Link>
        </div>

        <div className="w-full max-w-md space-y-10 z-10">
          <header className="space-y-2">
            <h2 className="font-headline text-4xl lg:text-5xl text-on-surface leading-tight">Create your account</h2>
            <p className="text-on-surface-variant font-medium">Join Vidya Setu and start your academic journey today.</p>
          </header>

          {/* Multi-step Progress */}
          <div className="flex gap-2 w-full">
            <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-primary' : 'bg-outline-variant/40'}`}></div>
            <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-primary' : 'bg-outline-variant/40'}`}></div>
            <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= 3 ? 'bg-primary' : 'bg-outline-variant/40'}`}></div>
          </div>

          <form className="relative" onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1: Role Selection */}
            <div className={`transition-all duration-400 space-y-8 ${step === 1 ? 'opacity-100 relative translate-x-0' : 'opacity-0 absolute translate-x-5 pointer-events-none'}`}>
              <div className="space-y-4">
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold">Select your role</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="relative group cursor-pointer">
                    <input className="peer sr-only" type="radio" value="STUDENT" checked={selectedRole === "STUDENT"} onChange={() => setValue("role", "STUDENT")} />
                    <div className="p-6 border-2 border-outline-variant/40 rounded-xl bg-surface-container-low peer-checked:border-primary peer-checked:bg-primary-fixed/30 transition-all hover:border-primary/40">
                      <div className="flex flex-col items-center text-center space-y-3">
                        <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:scale-110 transition-transform peer-checked:text-primary">school</span>
                        <div>
                          <p className="font-bold text-on-surface">Student</p>
                          <p className="text-xs text-on-surface-variant">I want to learn and explore</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 hidden peer-checked:block">
                      <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    </div>
                  </label>

                  <label className="relative group cursor-pointer">
                    <input className="peer sr-only" type="radio" value="FACULTY" checked={selectedRole === "FACULTY"} onChange={() => setValue("role", "FACULTY")} />
                    <div className="p-6 border-2 border-outline-variant/40 rounded-xl bg-surface-container-low peer-checked:border-primary peer-checked:bg-primary-fixed/30 transition-all hover:border-primary/40">
                      <div className="flex flex-col items-center text-center space-y-3">
                        <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:scale-110 transition-transform peer-checked:text-primary">person_search</span>
                        <div>
                          <p className="font-bold text-on-surface">Shikshak</p>
                          <p className="text-xs text-on-surface-variant">I want to teach and mentor</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 hidden peer-checked:block">
                      <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    </div>
                  </label>
                </div>
              </div>
              <button
                className="w-full bg-primary text-white py-4 rounded-lg font-bold tracking-wide hover:shadow-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                onClick={() => handleNextStep(2)}
                type="button"
              >
                Continue <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>

            {/* Step 2: Personal Info */}
            <div className={`transition-all duration-400 space-y-6 ${step === 2 ? 'opacity-100 relative translate-x-0' : 'opacity-0 absolute translate-x-5 pointer-events-none'}`}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface-variant" htmlFor="fullName">Full Name</label>
                  <input
                    {...register("name")}
                    className={`w-full bg-white border ${errors.name ? 'border-red-500' : 'border-outline-variant/60'} rounded-lg p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline/60`}
                    id="fullName"
                    placeholder="Arjun Sharma"
                    type="text"
                  />
                  {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface-variant" htmlFor="email">Institutional Email</label>
                  <input
                    {...register("email")}
                    className={`w-full bg-white border ${errors.email ? 'border-red-500' : 'border-outline-variant/60'} rounded-lg p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline/60`}
                    id="email"
                    placeholder="arjun@university.edu"
                    type="email"
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface-variant" htmlFor="institution">School</label>
                  <input
                    {...register("institution")}
                    className="w-full bg-white border border-outline-variant/60 rounded-lg p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline/60"
                    id="institution"
                    placeholder="Delhi Public School"
                    type="text"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  className="flex-1 border-2 border-outline-variant text-on-surface-variant py-4 rounded-lg font-bold hover:bg-surface-container-highest transition-all"
                  onClick={() => handleNextStep(1)}
                  type="button"
                >
                  Back
                </button>
                <button
                  className="flex-[2] bg-primary text-white py-4 rounded-lg font-bold tracking-wide hover:shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  onClick={() => handleNextStep(3)}
                  type="button"
                >
                  Next Details <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Step 3: Security */}
            <div className={`transition-all duration-400 space-y-6 ${step === 3 ? 'opacity-100 relative translate-x-0' : 'opacity-0 absolute translate-x-5 pointer-events-none'}`}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface-variant" htmlFor="password">Create Password</label>
                  <div className="relative">
                    <input
                      {...register("password")}
                      className={`w-full bg-white border ${errors.password ? 'border-red-500' : 'border-outline-variant/60'} rounded-lg p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline/60`}
                      id="password"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant cursor-pointer hover:text-primary"
                    >
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </div>
                  {errors.password ? (
                    <p className="text-xs text-red-500">{errors.password.message}</p>
                  ) : (
                    <p className="text-[10px] text-on-surface-variant/60 mt-1">Minimum 6 characters.</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface-variant" htmlFor="confirm_password">Confirm Password</label>
                  <div className="relative">
                    <input
                      {...register("confirmPassword")}
                      className="w-full bg-white border border-outline-variant/60 rounded-lg p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline/60"
                      id="confirm_password"
                      placeholder="••••••••"
                      type={showConfirmPassword ? "text" : "password"}
                    />
                    <span
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant cursor-pointer hover:text-primary"
                    >
                      {showConfirmPassword ? "visibility_off" : "visibility"}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3 pt-4">
                  <input
                    {...register("terms")}
                    className="mt-1 w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                    id="terms"
                    type="checkbox"
                  />
                  <label className="text-xs text-on-surface-variant leading-relaxed" htmlFor="terms">
                    I agree to the <Link className="text-primary underline" href="#">Terms of Service</Link> and <Link className="text-primary underline" href="#">Privacy Policy</Link>. I understand that my profile will be subjected to institutional verification.
                  </label>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  className="flex-1 border-2 border-outline-variant text-on-surface-variant py-4 rounded-lg font-bold hover:bg-surface-container-highest transition-all"
                  onClick={() => handleNextStep(2)}
                  type="button"
                >
                  Back
                </button>
                <button
                  disabled={isSubmitting}
                  className="flex-[2] bg-primary text-white py-4 rounded-lg font-bold tracking-wide hover:shadow-lg hover:shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  type="submit"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin" style={{ fontVariationSettings: "'FILL' 1" }}>progress_activity</span>
                      Processing...
                    </>
                  ) : (
                    <>
                      Complete Registration <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>how_to_reg</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          <footer className="text-center pt-8 border-t border-outline-variant/40">
            <p className="text-on-surface-variant text-sm">
              Already have an account? <Link className="text-primary font-bold hover:underline underline-offset-4" href="/login">Sign in here</Link>
            </p>
          </footer>
        </div>

        {/* Subtle background elements for texture */}
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#8c3c3c]/5 rounded-full blur-3xl pointer-events-none"></div>
      </section>
    </main>
  );
}
