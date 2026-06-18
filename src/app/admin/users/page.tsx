"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { toast } from "sonner";
import { fetchJson } from "@/lib/api";
import type { AdminUserItem, AdminUserListResponse, ApiResponse, UserRole } from "@/types";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUserItem[]>([]);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<UserRole | "ALL">("ALL");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const queryString = useMemo(() => {
    const params = new URLSearchParams({ page: String(page), limit: "10" });
    if (query) params.set("search", query);
    if (role !== "ALL") params.set("role", role);
    return params.toString();
  }, [page, query, role]);

  const loadUsers = useCallback(() => {
    fetchJson<ApiResponse<AdminUserListResponse>>(`/api/admin/users?${queryString}`)
      .then((response) => {
        setUsers(response.data?.users ?? []);
        setTotalPages(response.data?.totalPages ?? 1);
      })
      .catch(() => toast.error("Failed to load users"));
  }, [queryString]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const updateUser = async (id: string, next: Partial<Pick<AdminUserItem, "isActive" | "role">>) => {
    try {
      await fetchJson<ApiResponse<AdminUserItem>>(`/api/admin/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(next),
      });
      toast.success("User updated");
      loadUsers();
    } catch {
      toast.error("Failed to update user");
    }
  };

  const counts = {
    total: users.length,
    students: users.filter((user) => user.role === "STUDENT").length,
    faculty: users.filter((user) => user.role === "FACULTY").length,
  };

  return (
    <div className="flex flex-col min-h-full">
      <header className="sticky top-0 z-50 flex flex-col md:flex-row md:justify-between items-start md:items-center w-full pb-8 bg-[#faf5ee]">
        <div className="mb-4 md:mb-0">
          <h2 className="font-headline text-4xl font-bold text-primary tracking-tight">Admin User Management</h2>
          <p className="text-secondary font-body mt-1">Managing CampusAsk scholars and faculty</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
            <input
              value={query}
              onChange={(event) => {
                setPage(1);
                setQuery(event.target.value);
              }}
              className="pl-10 pr-4 py-2 bg-white border border-outline-variant/60 rounded-full text-sm focus:ring-1 focus:ring-primary focus:border-primary w-64 transition-all shadow-sm"
              placeholder="Global search..."
            />
          </div>
        </div>
      </header>

      <section className="grid grid-cols-12 gap-6 mb-10">
        {[
          ["Total Members", counts.total, "school"],
          ["Students", counts.students, "groups"],
          ["Faculty", counts.faculty, "verified"],
        ].map(([label, value, icon], index) => (
          <div key={label} className={`${index === 2 ? "bg-primary text-[#fbe8d8]" : "bg-[#f6f0e8]"} col-span-12 md:col-span-4 p-8 rounded-xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow`}>
            <div>
              <div className={`${index === 2 ? "bg-white/20 text-white" : "bg-primary/10 text-primary"} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <span className="material-symbols-outlined">{icon}</span>
              </div>
              <p className={`${index === 2 ? "text-white/90" : "text-secondary"} font-label text-sm uppercase tracking-widest font-semibold`}>{label}</p>
              <h3 className={`${index === 2 ? "text-white" : "text-[#3a302a]"} font-headline text-5xl font-bold mt-2`}>{value}</h3>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/40 overflow-hidden">
        <div className="p-6 border-b border-outline-variant/40 flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-[#f6f0e8]/50">
          <h3 className="font-headline text-2xl font-bold text-[#3a302a]">Manage Members</h3>
          <div className="flex bg-white border border-outline-variant/60 rounded-lg p-1 shadow-sm">
            {(["ALL", "STUDENT", "FACULTY", "ADMIN"] as const).map((item) => (
              <button key={item} onClick={() => { setRole(item); setPage(1); }} className={`px-4 py-1 text-xs font-bold rounded-md ${role === item ? "bg-primary text-white shadow-sm" : "text-secondary hover:text-primary transition-colors"}`}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f2ece4] text-[#605850] text-xs uppercase tracking-widest font-bold border-b border-outline-variant/40">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Activity</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Join Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 text-sm">
              {users.map((member) => (
                <tr key={member.id} className="hover:bg-[#fbe8d8]/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#ece6dc] flex items-center justify-center font-bold text-primary">
                        {member.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-[#3a302a]">{member.name}</p>
                        <p className="text-xs text-secondary mt-0.5">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select value={member.role} onChange={(event) => updateUser(member.id, { role: event.target.value as UserRole })} className="px-2.5 py-1 bg-[#fbe8d8] text-[#8a4518] text-[10px] font-bold uppercase rounded tracking-wider">
                      <option value="STUDENT">STUDENT</option>
                      <option value="FACULTY">FACULTY</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-[#605850] font-medium">{member._count.doubts} doubts / {member._count.answers} answers</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-xs font-semibold w-fit px-2 py-1 rounded border ${member.isActive ? "text-green-700 bg-green-50 border-green-100" : "text-[#8c3c3c] bg-[#fce0e0]/50 border-[#fce0e0]"}`}>
                      <span className={`w-2 h-2 rounded-full ${member.isActive ? "bg-green-600" : "bg-[#8c3c3c]"}`}></span> {member.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-secondary font-medium">{new Date(member.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => updateUser(member.id, { isActive: !member.isActive })} className="px-3 py-1 text-xs font-bold bg-white border border-outline-variant/60 rounded-lg text-[#3a302a] hover:bg-[#f6f0e8] transition-all shadow-sm">
                      {member.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
              {!users.length && (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-secondary font-medium">No users found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-[#f2ece4]/50 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-secondary font-medium">Page <span className="font-bold text-[#3a302a]">{page}</span> of <span className="font-bold text-[#3a302a]">{totalPages}</span></p>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page <= 1} className="p-2 bg-white border border-outline-variant/60 rounded-lg text-secondary hover:bg-[#f6f0e8] disabled:opacity-50 shadow-sm">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page >= totalPages} className="p-2 bg-white border border-outline-variant/60 rounded-lg text-secondary hover:bg-[#f6f0e8] disabled:opacity-50 shadow-sm">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
