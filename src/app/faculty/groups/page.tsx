"use client";

import React from "react";

export default function StudyGroupsPage() {
  return (
    <div className="flex flex-col min-h-full overflow-x-hidden">
      {/* Page Header */}
      <header className="mb-12">
        <h1 className="font-headline text-5xl lg:text-6xl text-[#3a302a] mb-2 tracking-tight">Scholarly Commons</h1>
        <p className="font-body text-secondary max-w-2xl leading-relaxed">
          Curating collaboration and curriculum. Manage your active study cohorts and access the institutional knowledge base.
        </p>
      </header>

      {/* Bento Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Section Title: Study Groups (Left Column - 5 Cols) */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="font-headline text-3xl text-[#3a302a]">Active Cohorts</h2>
            <span className="text-xs font-label uppercase tracking-widest text-primary font-bold">8 Active Groups</span>
          </div>

          {/* Study Group Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/30 hover:border-primary/40 transition-all hover:-translate-y-1 group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-[#fbe8d8] text-primary p-2 rounded-lg">
                <span className="material-symbols-outlined">architecture</span>
              </div>
              <span className="text-xs font-label bg-[#ece6dc] px-2 py-1 rounded font-medium">Advanced Theory</span>
            </div>
            <h3 className="font-headline text-2xl text-[#3a302a] mb-1 group-hover:text-primary transition-colors">Modernism &amp; Post-Structuralism</h3>
            <p className="text-sm text-secondary mb-6 line-clamp-2">Weekly discussion focusing on the architectural shift post-1945 and its social implications.</p>
            <div className="flex items-center justify-between border-t border-outline-variant/40 pt-4">
              <div className="flex -space-x-2">
                <img alt="Student" className="w-8 h-8 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWdfJx-hv5UVgeGXb4jK6h9Q90bgEMav3SpOR69A8WtIZBi51dxeynX1avsN9Ix7MZ4oRhi45oKHbCJUloYoYfjdFQdRq46Bm8M71CEx4LEtw0Z4NqbXOSw4AQiEFf0elQpouYtZgii_iB2vieIyR0Om9wiiAPRlu0zY6-Rod-Q_TrrfMXnzfBAQB_8iiVTaZmagewfHSMe3r0fL6lPIcagLMXEc0piPHzpwWL-HSVMZVTuCK9kpdx6N6OFzqzgDB9K0JJdWuLag" />
                <img alt="Student" className="w-8 h-8 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXSZxWYhA-AjqTHRDlpV4bTAbUtNK_E1kgTkqC3hKR9fOPZbrgYp_aD5bUnTKK13vRpCmfFjrIJlja6GzsAMq_cV1n1-ciD_RwSs8yYXVRj0rmSHXXQnMoZTASVReXXuKSZaooZqg_hjnldxUhLbo1NX6wjACCecmRtBRRE32PS7H7v_aDagBp7QoYAobJpQdQCFbT0IeQKs1G0L8rL4T0Eg4caQ5KynPTNWNAgkwHyOMTkzQvFfaB8rOEGXGodLJOjUFa0lZHcw" />
                <img alt="Student" className="w-8 h-8 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuUrKSghFKrOt1JLGBeWDL0xE_dQxxO0WeNBPSq6fQ4pzkAkz_-Q794jlHOw35O9lrTSU0Cg4bsHiYrLrMv8PwIda7hWJzRvxmKhyDt-xLzwpSTCnjWDDSs6jjL1M07OYjRP9TdudN39FXYOvT1YXoGOVnQAzfE9ZEbM2Qvl5TQtWf7Cqw6kAm8A1iqtQsFoR7nhkWK8ErlLZaanXRPBb3xtYoM5fUhVyQLZnQjmoiOFh4MrIEQOND6_L49AewMV65pWFQZN3KGw" />
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#ece6dc] flex items-center justify-center text-[10px] font-bold text-secondary">+12</div>
              </div>
              <div className="flex items-center gap-1 text-primary">
                <span className="text-xs font-bold">Open Session</span>
                <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
              </div>
            </div>
          </div>

          {/* Study Group Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/30 hover:border-primary/40 transition-all hover:-translate-y-1 group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-[#fce0e0] text-[#8c3c3c] p-2 rounded-lg">
                <span className="material-symbols-outlined">menu_book</span>
              </div>
              <span className="text-xs font-label bg-[#ece6dc] px-2 py-1 rounded font-medium">Seminar B</span>
            </div>
            <h3 className="font-headline text-2xl text-[#3a302a] mb-1 group-hover:text-primary transition-colors">Comparative Literature IV</h3>
            <p className="text-sm text-secondary mb-6 line-clamp-2">Exploring the narrative structures of South Asian magical realism in the 20th century.</p>
            <div className="flex items-center justify-between border-t border-outline-variant/40 pt-4">
              <div className="flex -space-x-2">
                <img alt="Student" className="w-8 h-8 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC8dwxEthz0DfX6uukHUPIM1PK91P3PTCZ8i8RFFznqU_ED6LWjfo8a-yLxYa1zNwOfDsBnk699ej3U6UlPK0CSv38KmQKBgatONo88ooXUZRYkRQFen9x6kE4D1aP0AnT-InCg0riGKQObGKNAW5wQkBno3lK4VFREc1PUDKEyP1cUDla8iMkmxQqqpXBdL7uoId91gjVhBRQK9k9vuLmvBdBZiz0YA78cgUo_KENF3ZdvFcwiVLvS4v59ALS2jHvoKfFHlDtvw" />
                <img alt="Student" className="w-8 h-8 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvhz8pu44ICC-vF98NtPRy-VgmHMX2Sv5VjMLSMgfYch8PQXGoBIntbb3cJXge4joR4P7pVOkkFu_FNAod7lGWZqFGcvUqzcUmuDzJA8Ja233igPS20YiPVa0MJSfjdH8gcgJ_7o9lVN7BsafstvhWqZDnFUvftmf9qyrkxUxvteuBR_kzvi6grsgsu8SaiSuyRKzdZ_u-SZIYyh7JdFBLqZrP3SO9nXZiF41htw8vIp9p_FLqVMaXlr1Dkv0-HVTDMeB5Aphpog" />
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#ece6dc] flex items-center justify-center text-[10px] font-bold text-secondary">+24</div>
              </div>
              <div className="flex items-center gap-1 text-primary">
                <span className="text-xs font-bold">2 Slots Left</span>
                <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
              </div>
            </div>
          </div>

          {/* Small Bento Items for Groups */}
          <div className="grid grid-cols-2 gap-4 mt-2">
            <button className="bg-white/60 hover:bg-white p-4 rounded-xl border border-outline-variant/40 flex flex-col items-center justify-center text-center transition-all shadow-sm">
              <span className="material-symbols-outlined text-primary mb-2 text-3xl">add_circle</span>
              <span className="font-label text-sm font-semibold text-[#3a302a]">Start New Cohort</span>
            </button>
            <button className="bg-white/60 hover:bg-white p-4 rounded-xl border border-outline-variant/40 flex flex-col items-center justify-center text-center transition-all shadow-sm">
              <span className="material-symbols-outlined text-secondary mb-2 text-3xl">history</span>
              <span className="font-label text-sm font-semibold text-[#3a302a]">Past Groups</span>
            </button>
          </div>
        </div>

        {/* Section Title: Resource Library (Right Column - 7 Cols) */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="font-headline text-3xl text-[#3a302a]">Resource Library</h2>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-[#ece6dc] rounded-full transition-colors text-secondary"><span className="material-symbols-outlined">grid_view</span></button>
              <button className="p-2 hover:bg-[#ece6dc] rounded-full transition-colors text-secondary"><span className="material-symbols-outlined">list</span></button>
            </div>
          </div>

          {/* Main Library Card (Bento Focus) */}
          <div className="bg-white p-8 rounded-2xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/40 min-h-[400px] flex flex-col">
            <div className="flex flex-wrap gap-3 mb-8">
              <button className="px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold flex items-center gap-2 shadow-sm transition-transform hover:scale-105 active:scale-95">
                <span className="material-symbols-outlined text-lg">folder_open</span>
                All Materials
              </button>
              <button className="px-4 py-2 border border-outline-variant hover:bg-[#f6f0e8] text-[#3a302a] rounded-full text-sm font-semibold flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
                <span className="material-symbols-outlined text-lg">video_library</span>
                Lectures
              </button>
              <button className="px-4 py-2 border border-outline-variant hover:bg-[#f6f0e8] text-[#3a302a] rounded-full text-sm font-semibold flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
                <span className="material-symbols-outlined text-lg">description</span>
                Papers
              </button>
            </div>

            {/* Folder Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              <div className="group p-4 rounded-xl border border-outline-variant/30 bg-[#f6f0e8] hover:bg-[#fbe8d8]/50 transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>folder</span>
                  <span className="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-opacity">more_vert</span>
                </div>
                <h4 className="font-bold text-[#3a302a] mb-1 group-hover:text-primary transition-colors">Fall 2023 Curriculum</h4>
                <p className="text-xs text-secondary font-medium">24 Files • Last update 2d ago</p>
              </div>

              <div className="group p-4 rounded-xl border border-outline-variant/30 bg-[#f6f0e8] hover:bg-[#fbe8d8]/50 transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>folder</span>
                  <span className="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-opacity">more_vert</span>
                </div>
                <h4 className="font-bold text-[#3a302a] mb-1 group-hover:text-primary transition-colors">Faculty Handbooks</h4>
                <p className="text-xs text-secondary font-medium">12 Files • Last update 1w ago</p>
              </div>

              <div className="group p-4 rounded-xl border border-outline-variant/30 bg-[#f6f0e8] hover:bg-[#fbe8d8]/50 transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span className="material-symbols-outlined text-4xl text-[#8c3c3c]" style={{ fontVariationSettings: "'FILL' 1" }}>folder</span>
                  <span className="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-opacity">more_vert</span>
                </div>
                <h4 className="font-bold text-[#3a302a] mb-1 group-hover:text-[#8c3c3c] transition-colors">Archived Research</h4>
                <p className="text-xs text-secondary font-medium">156 Files • Last update 2022</p>
              </div>

              <div className="group p-4 rounded-xl border border-outline-variant/30 bg-[#f6f0e8] hover:bg-[#fbe8d8]/50 transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>folder</span>
                  <span className="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-opacity">more_vert</span>
                </div>
                <h4 className="font-bold text-[#3a302a] mb-1 group-hover:text-primary transition-colors">Assessment Models</h4>
                <p className="text-xs text-secondary font-medium">8 Files • Last update 4d ago</p>
              </div>
            </div>

            {/* Recent Files List */}
            <div className="mt-8">
              <h5 className="text-xs font-inter uppercase tracking-widest text-secondary font-bold mb-4">Recent Documents</h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-[#f6f0e8] transition-colors group cursor-pointer border border-transparent hover:border-outline-variant/30">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#fce4e0] rounded-md flex items-center justify-center text-error shadow-sm">
                      <span className="material-symbols-outlined">picture_as_pdf</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#3a302a] group-hover:text-primary transition-colors">Structuralism_Intro_v2.pdf</div>
                      <div className="text-[10px] text-secondary font-medium mt-0.5">Added by Dr. Aris • 1.2 MB</div>
                    </div>
                  </div>
                  <button className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors hover:scale-110">download</button>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-[#f6f0e8] transition-colors group cursor-pointer border border-transparent hover:border-outline-variant/30">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#fbe8d8]/60 rounded-md flex items-center justify-center text-primary shadow-sm">
                      <span className="material-symbols-outlined">article</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#3a302a] group-hover:text-primary transition-colors">Semester_Plan_Economics.docx</div>
                      <div className="text-[10px] text-secondary font-medium mt-0.5">Added by Admin • 450 KB</div>
                    </div>
                  </div>
                  <button className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors hover:scale-110">download</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Insight Banner (Asymmetric Component) */}
      <section className="mt-12 mb-8 overflow-hidden rounded-3xl relative h-64 shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/30 flex items-center bg-[#faf5ee]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#faf5ee] via-[#faf5ee]/90 to-transparent"></div>
        </div>
        <div className="relative z-10 px-8 lg:px-12 max-w-xl">
          <h2 className="font-headline text-4xl mb-3 text-[#3a302a]">Institutional Wisdom</h2>
          <p className="font-body text-secondary mb-6 italic text-lg leading-relaxed">
            "Education is not the filling of a pail, but the lighting of a fire."
          </p>
          <button className="text-primary font-bold flex items-center gap-2 group hover:text-[#B85D38] transition-colors">
            Browse the Global Knowledge Base
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_forward</span>
          </button>
        </div>
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/3">
          <img 
            alt="Library Stacks" 
            className="w-full h-full object-cover grayscale-[50%] opacity-40 mix-blend-multiply" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYfVEQl1d8TWYUpgK1XpS8B9niKwlWFIyU4iKOLGwfi0Uto6kw6GYDvf-2iASXaXcpo76M4aEJ4KS9HXMuvsC5mKs9OVbb8mzpdOoRDHy65M88D73EKF7Y2w5TVhJ174Nc15zZyyJkT4IfJuX-eSgS6rwSumeZUuUxRcIk3WIbm6J89nHda2S42GYRF5P3J-J1LHTPLKr5xsfKfFo5mWrHWbob1k_Vaee62RFNIJS-SIrS1agCGDQcGZ5Zwc5DGIhYtmva_Ho5Hw"
          />
        </div>
      </section>
    </div>
  );
}
