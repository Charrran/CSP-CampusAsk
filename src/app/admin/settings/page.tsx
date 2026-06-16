"use client";

import React, { useState } from "react";

export default function AdminSettingsPage() {
  const [emailSummary, setEmailSummary] = useState(true);
  const [directMentions, setDirectMentions] = useState(true);

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-headline text-5xl text-[#3a302a] tracking-tight font-bold">Account Settings</h2>
          <p className="font-label text-secondary mt-2">Manage your academic profile and personal preferences.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2 rounded-lg border border-outline-variant/60 text-[#3a302a] hover:bg-[#f6f0e8] transition-colors font-label text-sm font-bold shadow-sm">Discard</button>
          <button className="px-6 py-2 rounded-lg bg-primary text-white shadow-sm hover:bg-[#B85D38] transition-colors font-label text-sm font-bold">Save Changes</button>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">
        
        {/* Profile Details (Primary Block) */}
        <section className="md:col-span-8 md:row-span-2 bg-white rounded-2xl p-8 flex flex-col justify-between overflow-hidden relative shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/40 hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none translate-x-12 -translate-y-12">
            <span className="material-symbols-outlined text-[200px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start gap-8 z-10">
            <div className="relative group shrink-0">
              <img 
                alt="User Avatar" 
                className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-sm" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSX57LiltAaW5sJvQz-nNERrlWb5ZKmd1WAwXnz_Zp_Q9OPyDfKWEyjMZVWJ4buFK4-8QOUbcYozlPpvv_aHcqXtR5nTGRp7GJtWvJvMx7HQ3yzq0xNRI57PEoJatPlCfJTfe0UJ-jvFb3QzMOaY73lrPNd-mJyRz0QR7Gg7iV5tt9SAJ5cx1WekD48kkfsq5jF2NeX0ri5bh2m79L_nOwbZaNNzo_8f4B9CLTMcrmK_zBNbZaPj7m5Ee_sBKl1IrEshdhNRQaWw"
              />
              <button className="absolute -bottom-2 -right-2 p-2 bg-primary text-white rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95">
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            </div>
            
            <div className="flex-1 w-full">
              <h3 className="font-headline text-3xl font-bold text-[#3a302a] mb-1">Dr. Julian Vance</h3>
              <p className="font-label text-primary font-bold tracking-wide uppercase text-xs mb-6">Senior Faculty • Philosophy Department</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold">Email Address</label>
                  <input 
                    className="w-full bg-[#f6f0e8] border border-transparent rounded-lg px-4 py-2.5 font-body text-sm text-[#3a302a] focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white transition-all shadow-sm" 
                    type="email" 
                    defaultValue="julian.vance@university.edu"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold">Location</label>
                  <input 
                    className="w-full bg-[#f6f0e8] border border-transparent rounded-lg px-4 py-2.5 font-body text-sm text-[#3a302a] focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white transition-all shadow-sm" 
                    type="text" 
                    defaultValue="Cambridge, UK"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 z-10">
            <label className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold block mb-2">Short Biography</label>
            <textarea 
              className="w-full bg-[#f6f0e8] border border-transparent rounded-xl px-4 py-3 font-body text-sm text-[#3a302a] focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white resize-none transition-all shadow-sm" 
              rows={3}
              defaultValue="Specializing in Existentialism and Ethics with over 15 years of academic research. Lead contributor to the Modern Ethics Journal."
            />
          </div>
        </section>
        
        {/* Account Security */}
        <section className="md:col-span-4 md:row-span-2 bg-[#3a302a] rounded-2xl p-8 text-white shadow-[0_2px_16px_rgba(58,48,42,0.04)] hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline text-2xl font-bold">Security</h3>
            <span className="material-symbols-outlined text-[#fbe8d8]">verified_user</span>
          </div>
          
          <div className="space-y-6">
            <div className="p-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#9a9088]">lock</span>
                  <div>
                    <p className="font-label text-sm font-bold">Change Password</p>
                    <p className="font-label text-[10px] text-[#9a9088] mt-0.5">Last changed 3 months ago</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#9a9088] group-hover:translate-x-1 transition-transform">chevron_right</span>
              </div>
            </div>
            
            <div className="p-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#9a9088]">phonelink_setup</span>
                  <div>
                    <p className="font-label text-sm font-bold">Two-Factor Auth</p>
                    <p className="font-label text-[10px] text-[#e8a0a0] mt-0.5">Not enabled</p>
                  </div>
                </div>
                <div className="w-10 h-5 bg-white/20 rounded-full relative">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t border-white/10">
              <p className="font-label text-[10px] uppercase tracking-widest text-[#9a9088] font-bold mb-4">Logged In Devices</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-label font-medium">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span> MacBook Pro M2</span>
                  <span className="text-[#9a9088]">Active</span>
                </div>
                <div className="flex items-center justify-between text-xs font-label font-medium">
                  <span className="flex items-center gap-2 opacity-50"><span className="w-2 h-2 rounded-full bg-[#9a9088]"></span> iPad Pro</span>
                  <span className="text-[#9a9088] opacity-50">Paris, FR</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Notification Preferences */}
        <section className="md:col-span-6 bg-white rounded-2xl p-8 shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/40 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline text-2xl font-bold text-[#3a302a]">Notifications</h3>
            <span className="material-symbols-outlined text-secondary">notifications</span>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-label text-sm font-bold text-[#3a302a]">Email Summary</p>
                <p className="font-label text-xs text-secondary mt-0.5">Weekly digest of campus inquiries</p>
              </div>
              <button 
                onClick={() => setEmailSummary(!emailSummary)}
                className={`w-12 h-6 rounded-full relative transition-colors ${emailSummary ? 'bg-primary' : 'bg-[#dcd6cc]'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${emailSummary ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-label text-sm font-bold text-[#3a302a]">Direct Mentions</p>
                <p className="font-label text-xs text-secondary mt-0.5">Instant alerts for tagged comments</p>
              </div>
              <button 
                onClick={() => setDirectMentions(!directMentions)}
                className={`w-12 h-6 rounded-full relative transition-colors ${directMentions ? 'bg-primary' : 'bg-[#dcd6cc]'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${directMentions ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </section>
        
        {/* Storage & Usage */}
        <section className="md:col-span-3 bg-[#fbe8d8] rounded-2xl p-8 shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-[#fbe8d8] hover:shadow-md transition-shadow">
          <h3 className="font-headline text-xl font-bold text-[#401a08] mb-4">Storage Usage</h3>
          <div className="flex items-end justify-between mb-3">
            <span className="font-label text-2xl font-bold text-[#401a08]">4.2<span className="text-sm font-medium"> GB</span></span>
            <span className="font-label text-xs text-[#8a4518] font-bold">of 10 GB</span>
          </div>
          <div className="w-full bg-[#401a08]/10 h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[42%] rounded-full"></div>
          </div>
          <p className="font-label text-[10px] text-[#8a4518] font-bold mt-4 leading-relaxed">Upgrade to Faculty Platinum for increased repository limits.</p>
        </section>
        
        {/* Quick Action: Help */}
        <section className="md:col-span-3 bg-[#f2ece4] rounded-2xl p-8 hover:bg-[#ece6dc] cursor-pointer transition-all flex flex-col items-center justify-center text-center shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/30">
          <span className="material-symbols-outlined text-4xl text-[#8c3c3c] mb-3">help_center</span>
          <h4 className="font-headline text-xl font-bold text-[#3a302a]">Need Help?</h4>
          <p className="font-label text-xs text-secondary mt-1 font-medium">View Faculty Handbook or Contact IT Support</p>
        </section>
      </div>
    </div>
  );
}
