"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function HomePage() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach((section) => {
      if (section) {
        section.classList.add(
          "transition-all",
          "duration-1000",
          "opacity-0",
          "translate-y-10"
        );
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#faf5ee] font-body text-[#3a302a] min-h-screen">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 flex justify-between items-center w-full px-6 py-4 bg-[#faf5ee] border-b border-outline-variant/60">
        <div className="flex items-center gap-8">
          <span className="font-display text-2xl font-bold text-primary">Vidya Setu</span>
          <div className="hidden md:flex gap-6">
            <Link className="text-primary font-bold border-b-2 border-primary pb-1 font-label text-sm" href="/student/qa">Hub</Link>
            <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 font-label text-sm" href="/student/dashboard">Dashboard</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="font-label font-bold text-sm hover:text-primary transition-colors">Login</Link>
          <Link href="/register" className="bg-primary text-white px-4 py-2 rounded-md font-label font-bold text-sm hover:bg-primary/90 transition-all">Register</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-[870px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            alt="Scholarly Setting" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEAiJFX3j3ei3zBJC2KqcLRTOc9GF1pnYFnRzv5HDibqkZENBMM9_E7Me8yzE7MuSuQjWfS2yww-4cCVYfTWbn45ksO-qrS-vZV3cOKjf9BNFOShnLHK0CdJZh-pvz7WFYrFLg8k6sPDcdp7RAa8dpZwnwNbHlsMh4tJxofOEOKhug9efvLSnb6QH2OYQqSpqsGG-g6pJS_mAjQFIlbJD0taBJMu9dHnLTWqxYR0J46O0JGqeaupmlJt8WPvqzFeWjc4sxS0Oz7w" 
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a120c]/90 to-[#1a120c]/40"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-24">
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="font-headline text-6xl md:text-8xl text-white leading-[1.1] mb-6">
              Vidya Setu: The Bridge to Academic Excellence.
            </h1>
            <p className="text-white/80 text-xl md:text-2xl mb-10 font-body leading-relaxed max-w-xl">
              Empowering Indian government schools with a modern academic portal designed for seamless collaboration, inquiry, and growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/register" className="bg-primary text-white px-8 py-4 rounded-lg font-label font-bold hover:bg-primary/90 transition-all shadow-lg active:scale-95 inline-block">
                Initialize Portal
              </Link>
              <button className="border border-white/30 text-white px-8 py-4 rounded-lg font-label font-bold hover:bg-white/10 transition-all backdrop-blur-sm inline-block">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Bento Grid Features Section */}
      <section 
        className="py-24 px-6 max-w-7xl mx-auto"
        ref={(el) => { sectionsRef.current[0] = el; }}
      >
        <div className="mb-16 text-center">
          <span className="text-primary font-label font-bold uppercase tracking-widest text-sm">Platform Utility</span>
          <h2 className="font-headline text-4xl md:text-5xl mt-4 text-[#3a302a]">Modernizing the Indian Classroom</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[240px]">
          {/* Main Inquiry Module */}
          <div className="md:col-span-8 md:row-span-2 bg-[#f6f0e8] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 rounded-3xl p-10 flex flex-col justify-between border border-outline-variant/30">
            <div>
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined">forum</span>
              </div>
              <h3 className="font-headline text-3xl mb-4 text-[#3a302a]">Centralized Inquiry Hub</h3>
              <p className="text-on-surface-variant text-lg leading-relaxed max-w-lg">
                A unified space where students and faculty bridge the gap through direct questioning. From classroom queries to administrative guidance, every voice finds its answer.
              </p>
            </div>
            <div className="relative h-48 mt-8 overflow-hidden rounded-xl">
              <Image alt="Discussion" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwR80RZANVsLKlhwUZUZzNA27yMXDYIWSgEiAMIRygarmkCteoN8BgaGDGFQPHOCJrlczU3GNzq3io0iS9rVuG8n84IadhW4SeCebN2LprBqKE7W8uc-XyKXGOAz9EOt6Z5UiY3bNMHEzvi9GVZvX9rb0n14dQIaf8D_aDwQhiJZBUrDQhhoBj_Fak-6kUZFdhf-R7usVUzDsV-tGDdKuvFbEGwxHJcFLBqv-VEn4wzxcJFRphVXxinjglho0goUWHvfcZClnfxA" fill />
            </div>
          </div>
          {/* Schedule & Logs */}
          <div className="md:col-span-4 md:row-span-1 bg-primary hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 text-white rounded-3xl p-8 flex flex-col justify-between">
            <span className="material-symbols-outlined text-4xl">calendar_today</span>
            <div>
              <h4 className="font-headline text-2xl mb-2">Dynamic Scheduling</h4>
              <p className="text-white/80 text-sm">Real-time office hours and academic calendar synchronization.</p>
            </div>
          </div>
          <div className="md:col-span-4 md:row-span-1 bg-[#e6e0d6] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 rounded-3xl p-8 flex flex-col justify-between border border-outline-variant/30">
            <span className="material-symbols-outlined text-primary text-4xl">analytics</span>
            <div>
              <h4 className="font-headline text-2xl mb-2 text-[#3a302a]">System Analytics</h4>
              <p className="text-on-surface-variant text-sm">Actionable insights into school performance and engagement metrics.</p>
            </div>
          </div>
          {/* Governance & Moderation */}
          <div className="md:col-span-4 md:row-span-1 bg-[#3a302a] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 text-[#faf5ee] rounded-3xl p-8 flex flex-col justify-between">
            <span className="material-symbols-outlined text-[#f0a878] text-4xl">gavel</span>
            <div>
              <h4 className="font-headline text-2xl mb-2">Fair Moderation</h4>
            <p className="text-[#f6f0e8] text-sm">Ensuring a safe, scholarly environment for all participants.</p>
            </div>
          </div>
          <div className="md:col-span-8 md:row-span-1 bg-[#f2ece4] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 rounded-3xl p-8 flex items-center gap-10 border border-outline-variant/30">
            <div className="flex-1">
              <h4 className="font-headline text-2xl mb-2 text-[#3a302a]">Digital Transformation</h4>
              <p className="text-on-surface-variant text-sm">Moving traditional government school infrastructure into the cloud, ensuring data integrity and accessibility for rural and urban sectors alike.</p>
            </div>
            <div className="hidden sm:block w-40 h-full bg-white/50 rounded-2xl overflow-hidden">
              <Image alt="Academic growth" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATgDGRFs69F2YtyRM5LdI46BxhTT3vLmV2_A0gA3dQEt2iWAT3ZOcJQwA9xHy9wgYy7mQGo69fzFZTyrju7POn8U_AAvdDiTGY-iMZ_4H1xvwSNvZ6n3eZA-3f8fBJA4b6F5uSBFMC26pjLfoGicogtOt88lLlWfTXo_Le5qxGi_HgjCy3tZnvTnkAchGu6uI0le6D3m4p5ahwnVdZbMwOFEz7pwoWO2jvETUxJuv-TsdROjfSAvdR3ZUAFl20KMAEpe1HSgeyNQ" fill />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section 
        className="bg-[#f6f0e8] py-20 border-y border-outline-variant/30"
        ref={(el) => { sectionsRef.current[1] = el; }}
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <p className="font-headline text-5xl text-primary mb-2">1,200+</p>
            <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Schools Onboarded</p>
          </div>
          <div>
            <p className="font-headline text-5xl text-primary mb-2">850k</p>
            <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Active Students</p>
          </div>
          <div>
            <p className="font-headline text-5xl text-primary mb-2">94%</p>
            <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Inquiry Resolution</p>
          </div>
          <div>
            <p className="font-headline text-5xl text-primary mb-2">24/7</p>
            <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Portal Access</p>
          </div>
        </div>
      </section>

      {/* Faculty Perspective */}
      <section 
        className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center"
        ref={(el) => { sectionsRef.current[2] = el; }}
      >
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full z-0"></div>
          <Image alt="Educator" className="rounded-3xl shadow-xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACZQX3LGND5rbfdRA9r8JhxTuB6ntXFjbT933mWpYuE-TcRs6N0s8orUrjnejBki8a-ylLwvyAEQzrjWqtFy76tqT5Bv3TBCRpAY716z-mKhZho87qi7tJPtyc6EYTUnFcAGrHovSPhvtWDz-QicXmEIS1OZJnoA3U_qEg6NtN9mbKHAz5ACkPyagM7AsqQDiKJyNf0U27b1kQE0pGgMUz_EUAQXAGCmd5aARmCvScMGjC8_hhFm5wJGnTCaCgEtMKxT_hWJJQMQ" width={600} height={400} />
        </div>
        <div>
          <span className="text-[#8c3c3c] font-label font-bold uppercase tracking-widest text-sm">Faculty Feedback</span>
          <h2 className="font-headline text-4xl md:text-5xl mt-4 mb-8 text-[#3a302a]">Empowering Educators to Lead.</h2>
          <blockquote className="text-2xl font-headline italic text-on-surface-variant mb-8 leading-relaxed">
            "Vidya Setu has fundamentally changed how I interact with my students. It has removed the administrative barriers, allowing me to focus on what matters most: mentoring the next generation of leaders."
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">DR</div>
            <div>
              <p className="font-bold text-[#3a302a]">Dr. Rajeshwari Iyer</p>
              <p className="text-on-surface-variant text-sm">Principal, Govt. Model School, Bengaluru</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="mb-24 px-6"
        ref={(el) => { sectionsRef.current[3] = el; }}
      >
        <div className="max-w-7xl mx-auto bg-[#3a302a] rounded-[2rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-headline text-5xl md:text-7xl text-white mb-8">Begin the Transition Today.</h2>
          <p className="text-[#f6f0e8] text-xl max-w-2xl mx-auto mb-12">
            Join hundreds of institutions already bridging the digital divide with Vidya Setu's academic infrastructure.
          </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="bg-primary text-white px-10 py-5 rounded-xl font-label font-bold text-lg hover:bg-primary/90 shadow-2xl transition-all">
                Register Your School
              </Link>
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-xl font-label font-bold text-lg hover:bg-white/20 transition-all">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-8 bg-[#f2ece4] border-t border-outline-variant/40">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-display text-2xl text-primary">Vidya Setu</span>
          <p className="text-on-surface-variant font-label text-xs uppercase tracking-wider">© 2024 CampusAsk Academic Systems</p>
        </div>
        <div className="flex gap-8">
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-label text-xs uppercase tracking-wider" href="#">Privacy Policy</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-label text-xs uppercase tracking-wider" href="#">Terms of Service</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-label text-xs uppercase tracking-wider" href="#">Faculty Handbook</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-label text-xs uppercase tracking-wider" href="#">Support</Link>
        </div>
      </footer>
    </div>
  );
}
