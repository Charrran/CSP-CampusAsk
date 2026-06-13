export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-100/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4 py-8">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground font-bold text-xl mb-4 shadow-lg shadow-primary/25">
            C
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            CampusAsk
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Academic Doubt Resolution Platform
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}
