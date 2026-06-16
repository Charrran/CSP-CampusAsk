"use client";

import React from "react";
import Link from "next/link";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* TopNavBar Component */}
      <header className="flex justify-between items-center w-full pb-8">
        <div className="flex items-center gap-8">
          <h2 className="font-display text-3xl font-bold text-primary">Analytics</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <input 
              className="bg-white border border-outline-variant/40 rounded-full py-2 pl-10 pr-4 text-sm font-inter focus:ring-1 focus:ring-primary focus:border-primary outline-none w-64 shadow-sm" 
              placeholder="Search data..." 
              type="text"
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
          </div>
          <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="w-10 h-10 rounded-full bg-[#fbe8d8] flex items-center justify-center border border-outline-variant/40 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
            <img 
              alt="User Avatar" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDf7cHIusbZaBGab3G_M2HZxUc8nLj7062eUnj_dQAf-Qk-ZNzo1Sa1B9hq14-tN9CbDZy_uUJW5OnrByTnGOlrZdvt1CvEQRrbCGQy-CJdpWDleAQsTZ03FqKiBZ0_xWUeEAg6ucBnk9sj9lo9tdoB4GmyWEHiBsEVrJTVb-kfo71ikvhYiRUVeGLvxEgBnLVs1ZmuP08ugiLgIh62s2KDsU_dijeJNnOGhJc88Db4-hYpcRqwYga7kpDMw1fTjn-hF9PWB1Y5iA"
            />
          </div>
        </div>
      </header>

      {/* Content Canvas */}
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="font-inter text-[#8c3c3c] font-bold tracking-widest uppercase text-xs mb-2">Faculty Performance</p>
          <h1 className="font-display text-5xl text-[#3a302a] font-semibold leading-tight">Shikshak Vidya Setu Dashboard</h1>
          <p className="font-body text-secondary mt-3 text-lg max-w-2xl">
            A curated overview of your academic impact, engagement metrics, and student sentiment analysis for the Fall 2024 semester.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Card: Response Rate (Large vertical) */}
          <div className="bg-white border border-outline-variant/60 shadow-[0_2px_16px_rgba(58,48,42,0.04)] rounded-xl col-span-1 lg:row-span-2 p-8 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="material-symbols-outlined text-[#8c3c3c] p-2 bg-[#fce0e0] rounded-lg">speed</span>
                <span className="font-inter text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+12%</span>
              </div>
              <h3 className="font-inter text-[#3a302a] font-semibold mb-2 text-sm uppercase tracking-wider">Response Rate</h3>
              <div className="font-headline text-7xl text-[#8c3c3c] font-bold leading-none tracking-tighter">
                94.2<span className="text-3xl">%</span>
              </div>
              <p className="font-inter text-sm text-secondary mt-4 leading-relaxed">
                Average time: 14 mins per query. You are in the top 5% of responsive faculty.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-outline-variant/40">
              <div className="flex justify-between items-end h-24 gap-2">
                <div className="w-full bg-[#fbe8d8] h-3/4 rounded-sm hover:bg-[#e08850] transition-colors"></div>
                <div className="w-full bg-[#fbe8d8] h-1/2 rounded-sm hover:bg-[#e08850] transition-colors"></div>
                <div className="w-full bg-[#fbe8d8] h-full rounded-sm hover:bg-[#e08850] transition-colors"></div>
                <div className="w-full bg-[#fbe8d8] h-2/3 rounded-sm hover:bg-[#e08850] transition-colors"></div>
                <div className="w-full bg-primary h-5/6 rounded-sm shadow-md"></div>
              </div>
              <p className="font-inter text-[10px] text-outline mt-2 text-center uppercase tracking-widest font-bold">Last 5 Days</p>
            </div>
          </div>

          {/* Card: Student Rating (Horizontal Medium) */}
          <div className="bg-white border border-outline-variant/60 shadow-[0_2px_16px_rgba(58,48,42,0.04)] rounded-xl col-span-1 md:col-span-2 p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="font-inter text-[#3a302a] font-semibold mb-1 text-sm uppercase tracking-wider">Student Rating</h3>
                <p className="font-inter text-xs text-secondary mb-4 uppercase tracking-wider font-semibold">Aggregate Satisfaction Score</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-headline text-6xl text-[#3a302a] font-bold">4.88</span>
                  <span className="font-inter text-lg text-outline font-medium">/ 5.0</span>
                </div>
              </div>
              <div className="flex-1 max-w-xs">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center text-xs font-inter mb-1">
                      <span className="text-[#3a302a] font-bold">Clarity</span>
                      <span className="text-secondary font-bold">4.9</span>
                    </div>
                    <div className="w-full bg-[#f2ece4] rounded-full h-2 overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-xs font-inter mb-1">
                      <span className="text-[#3a302a] font-bold">Empathy</span>
                      <span className="text-secondary font-bold">4.7</span>
                    </div>
                    <div className="w-full bg-[#f2ece4] rounded-full h-2 overflow-hidden">
                      <div className="bg-[#8c3c3c] h-full rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Quick Stats (Small) */}
          <div className="bg-[#3a302a] rounded-xl col-span-1 p-6 text-white shadow-lg hover:-translate-y-1 transition-transform duration-300">
            <h3 className="font-inter font-bold text-[#fbe8d8] mb-4 text-xs uppercase tracking-wider">Total Inquiries</h3>
            <div className="font-headline text-5xl font-bold mb-2">1,248</div>
            <p className="text-[#ece6dc] text-xs font-inter leading-relaxed">Across 4 different course modules this semester.</p>
            <div className="mt-6 flex -space-x-2">
              <img alt="Student" className="w-8 h-8 rounded-full border-2 border-[#3a302a]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvAubeMheS2Eg0HPZVRQqJPv45QAjta3nQoHM2codOcr5XlljyaGdw4WY4UOAZuYqSsNypmeLtMsLBAB6uUtJ-5rZ7aSc8s_tkbE_6iIStBm32CjMUggATlZdFknqh00PNX3emwYqgbmk3a9DMYMFcMBGwZIBtb_tGrT6z5dpF0ks_xNxLXfbC1hMv33kjLYsWOClpkoklbvibU7-7UT0rAeJGFQ89ySXL6Qyt6iXDuWz1vQT1cyYvp1SIeRhWBB-ESAo595rgmg" />
              <img alt="Student" className="w-8 h-8 rounded-full border-2 border-[#3a302a]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQTpPkAFe0RmQi8UCehgFNHJfpd4mf4sfdGDG3EPJvCwWHdIYA7fCxdsm5aTqm0zEWX87fWx5WJWnonb8qbizK_ee9UG8kvK6WNgyhyj8Q0cQM_gJGVuFfNVl4WUtG5xiS8Q3FfQ8hdn5AGFmKJpUONNOFNlzNH19GVpw696R5v7p--mYn8KuVqQtiicc6HEF7rxIVAsJYUPk6sEdqA2rPiYwuJv5dxYt82of3lvOxS_wkSPykJ5U_yw5boomOettYD6sFmWcITg" />
              <img alt="Student" className="w-8 h-8 rounded-full border-2 border-[#3a302a]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLztTOOvlqmswDQ0hLS2AO8yjPCuBT0w7XyFZBl_X368frSNJ7vNcyl3Wb1I8S7mNgdWPDLi9hnT0DLPmrlPXsahgQdpaw9iK4G0WCmTVm_l0Jv9AcXsb3G6XKlywVCZq67BxiYLsXKcHWlQtuZNwt0uLLUFdoM63_RjWMvXj9F-FXWG2SWWdD7EUuw_grxQ-_f1m79CivVVL9DQjHWjLXSk0kRVA3LrBbUS8TbErAQAZtg8rUEJX-O6AKa3JElhPAcoZ_iCa38w" />
              <div className="w-8 h-8 rounded-full border-2 border-[#3a302a] bg-[#8c3c3c] flex items-center justify-center text-[10px] font-bold">+42</div>
            </div>
          </div>

          {/* Card: Engagement Trends (Large Center) */}
          <div className="bg-white border border-outline-variant/60 shadow-[0_2px_16px_rgba(58,48,42,0.04)] rounded-xl col-span-1 md:col-span-2 lg:col-span-3 p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-inter text-[#3a302a] font-semibold text-sm uppercase tracking-wider">Engagement Trends</h3>
                <p className="font-inter text-sm text-secondary mt-1">Hourly interaction density across Vidya Setu modules.</p>
              </div>
              <div className="flex bg-[#f6f0e8] p-1 rounded-lg">
                <button className="px-4 py-1 text-xs font-inter bg-white shadow-sm rounded-md text-[#3a302a] font-bold">Weekly</button>
                <button className="px-4 py-1 text-xs font-inter text-secondary hover:text-[#3a302a] font-semibold">Monthly</button>
              </div>
            </div>
            <div className="relative h-64 w-full">
              {/* Simulated Chart Grid */}
              <div className="absolute inset-0 grid grid-rows-4 w-full h-full pointer-events-none">
                <div className="border-t border-outline-variant/30 w-full h-full"></div>
                <div className="border-t border-outline-variant/30 w-full h-full"></div>
                <div className="border-t border-outline-variant/30 w-full h-full"></div>
                <div className="border-t border-outline-variant/30 w-full h-full"></div>
              </div>
              {/* Visual representation of an area chart using path */}
              <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 250" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#c2652a" stopOpacity="0.2"></stop>
                    <stop offset="100%" stopColor="#c2652a" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                {/* Path for the area */}
                <path d="M0,250 L0,180 C100,160 200,220 300,150 C400,80 500,190 600,120 C700,50 800,100 900,40 L1000,20 L1000,250 Z" fill="url(#chartGradient)"></path>
                {/* Path for the line */}
                <path d="M0,180 C100,160 200,220 300,150 C400,80 500,190 600,120 C700,50 800,100 900,40 L1000,20" fill="none" stroke="#c2652a" strokeLinecap="round" strokeWidth="3"></path>
                {/* Dots */}
                <circle cx="300" cy="150" fill="#c2652a" r="6" stroke="#fff" strokeWidth="2" className="hover:r-8 transition-all cursor-pointer"></circle>
                <circle cx="600" cy="120" fill="#c2652a" r="6" stroke="#fff" strokeWidth="2" className="hover:r-8 transition-all cursor-pointer"></circle>
                <circle cx="900" cy="40" fill="#c2652a" r="6" stroke="#fff" strokeWidth="2" className="hover:r-8 transition-all cursor-pointer"></circle>
              </svg>
              {/* Labels for the chart */}
              <div className="flex justify-between mt-4 font-inter text-[10px] text-outline uppercase tracking-widest font-bold">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>

          {/* Card: Top Tags (Small) */}
          <div className="bg-white border border-outline-variant/60 shadow-[0_2px_16px_rgba(58,48,42,0.04)] rounded-xl col-span-1 p-8 hover:shadow-lg transition-shadow duration-300">
            <h3 className="font-inter text-[#3a302a] font-semibold mb-6 text-sm uppercase tracking-wider">Subject Themes</h3>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#8c3c3c]"></div>
                <span className="font-inter text-sm text-[#3a302a] font-medium">Data Structures</span>
                <span className="ml-auto font-headline text-xl font-bold italic text-[#3a302a]">42%</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="font-inter text-sm text-[#3a302a] font-medium">Algorithm Logic</span>
                <span className="ml-auto font-headline text-xl font-bold italic text-[#3a302a]">28%</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-secondary"></div>
                <span className="font-inter text-sm text-[#3a302a] font-medium">Ethics in AI</span>
                <span className="ml-auto font-headline text-xl font-bold italic text-[#3a302a]">15%</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#f0a878]"></div>
                <span className="font-inter text-sm text-[#3a302a] font-medium">Others</span>
                <span className="ml-auto font-headline text-xl font-bold italic text-[#3a302a]">15%</span>
              </div>
            </div>
            <button className="w-full mt-10 py-3 border border-outline-variant/60 rounded-lg font-inter text-xs font-bold text-[#3a302a] hover:bg-[#f6f0e8] transition-colors">
              View Detailed Report
            </button>
          </div>
        </div>

        {/* Detailed Analysis Section */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl group">
            <img 
              alt="Faculty Working" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCm6jKoYxF8gHwU1KfDcQCywQVYmOiwPFd3e0_EpMlW7c1JGAMVThoWyrqWc5HXXN8orJ3n7zFroMscArDhM_yV76HNP_dL3dltFiM_Oa0TYCvZrcoR30bRG1d-eI887f-Yo0cIKxhZnXEZkDysRNnCVsTnpkY6J19aXOMXw8ClUWPgwbr1vDsFHljTuO1HuNhyxXbjDBsJPIHxBAvOQIpdJWhSajgMHHoZ-_dy5B90JQl8Ad5fOsPbnC9HSJMVU20RHxiihuj6iA"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3a302a]/80 via-[#3a302a]/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined">auto_awesome</span>
                </div>
                <div>
                  <p className="font-inter font-bold text-sm">AI Insights Generated</p>
                  <p className="font-body text-xs opacity-90 mt-1">Students find your "Real-world examples" most helpful.</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-display text-4xl text-[#3a302a] font-semibold mb-6">Qualitative Impact</h2>
            <div className="space-y-8">
              <blockquote className="border-l-4 border-[#8c3c3c] pl-6">
                <p className="font-headline text-2xl italic text-[#3a302a] leading-relaxed">
                  "The clarity in the Advanced Algorithms module significantly helped me bridge the gap between theory and actual implementation. Truly grateful for the prompt feedback."
                </p>
                <footer className="mt-4 font-inter text-sm text-secondary font-medium">— Third Year Student, CS Department</footer>
              </blockquote>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 bg-white p-6 rounded-xl border border-outline-variant/60 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-inter font-bold text-[#3a302a] text-xs uppercase tracking-wider mb-3">Sentiment</h4>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-600 text-3xl">sentiment_very_satisfied</span>
                    <span className="font-headline text-3xl font-bold text-[#3a302a]">Positive</span>
                  </div>
                </div>
                <div className="flex-1 bg-white p-6 rounded-xl border border-outline-variant/60 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-inter font-bold text-[#3a302a] text-xs uppercase tracking-wider mb-3">Peer Rank</h4>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#8c3c3c] text-3xl">workspace_premium</span>
                    <span className="font-headline text-3xl font-bold text-[#3a302a]">Top 2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
