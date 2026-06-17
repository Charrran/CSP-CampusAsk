// src/lib/api.ts
// Centralized fetch wrapper with JSON handling and error propagation

export async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.method && options.method !== "GET"
        ? { Accept: "application/json" }
        : {}),
    },
    ...options,
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Request failed ${res.status}: ${err}`);
  }

  // Allow empty responses (e.g., logout)
  const text = await res.text();
  return (text ? JSON.parse(text) : {}) as T;
}
