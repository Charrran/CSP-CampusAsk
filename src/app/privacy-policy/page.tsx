import Link from "next/link";

const sections = [
  {
    title: "Information We Collect",
    body: "We may collect account details such as your name, email address, role, school or institution, and the content you submit while using CampusAsk. We may also collect basic device and usage information to keep the platform secure and reliable.",
  },
  {
    title: "How We Use Information",
    body: "We use personal information to create and manage accounts, verify institutional access, respond to support requests, moderate content, improve product performance, and send important service updates.",
  },
  {
    title: "Sharing and Disclosure",
    body: "We do not sell personal information. We may share limited data with service providers who help us operate the platform, or when disclosure is required for legal, security, or institutional integrity reasons.",
  },
  {
    title: "Data Retention and Security",
    body: "We keep data only as long as needed for the purposes described above, subject to legal and operational needs. We use reasonable administrative, technical, and organizational safeguards to protect the information we hold.",
  },
  {
    title: "Your Choices",
    body: "Depending on your role and location, you may have rights to access, correct, or delete certain personal data, and to request information about how it is used. You can also contact us to raise privacy concerns or update your account details.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#faf5ee] text-[#3a302a]">
      <section className="border-b border-outline-variant/60 bg-gradient-to-b from-[#f6f0e8] to-[#faf5ee]">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">CampusAsk</p>
          <h1 className="mt-4 font-headline text-4xl md:text-6xl">Privacy Policy</h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[#605850] md:text-lg">
            This privacy policy is written for the CampusAsk academic portal and is based on common privacy-notice practices described by privacy guidance from regulators such as the FTC and the ICO, including notice, purpose, sharing, retention, and user-choice disclosures. It is not legal advice.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/register" className="rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90">
              Create Account
            </Link>
            <Link href="/login" className="rounded-lg border border-outline-variant px-5 py-3 text-sm font-bold text-[#3a302a] transition-colors hover:bg-[#f2ece4]">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <article key={section.title} className="rounded-3xl border border-outline-variant/40 bg-white/70 p-6 shadow-sm">
              <h2 className="font-headline text-2xl text-[#291B15]">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#605850]">{section.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-outline-variant/40 bg-[#3a302a] p-6 text-[#f6f0e8] shadow-lg md:p-8">
          <h2 className="font-headline text-3xl">Contact Us</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#f6f0e8]/80">
            If you have questions about this policy or about your personal data, contact your institution administrator or the CampusAsk support team through the app’s support channels.
          </p>
        </div>
      </section>
    </main>
  );
}
