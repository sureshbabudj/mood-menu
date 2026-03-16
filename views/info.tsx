import Link from "next/link";

type InfoSection = {
  id: string;
  title: string;
  body: string;
};

const sections: InfoSection[] = [
  {
    id: "about",
    title: "About MoodMenu",
    body: "MoodMenu helps you discover meals based on your mood, dietary preferences, and cuisine choices.",
  },
  {
    id: "termsOfUse",
    title: "Terms of Use",
    body: "The app is provided as-is. Users should validate ingredients and nutrition details before cooking.",
  },
  {
    id: "privacyPolicy",
    title: "Privacy Policy",
    body: "We use authentication and cloud services to personalize your experience and sync your favorites.",
  },
  {
    id: "cookiePolicy",
    title: "Cookie Statement",
    body: "Cookies and local storage are used for essential functionality and basic analytics.",
  },
  {
    id: "credits",
    title: "Credits",
    body: "Recipe data is powered by TheMealDB. Additional visual resources are credited to their respective owners.",
  },
];

export default function Information() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <header className="rounded-2xl border border-primary/10 bg-card p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Information</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Legal and app details</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Read the key policies and background information for MoodMenu.
        </p>
      </header>

      <nav className="flex flex-wrap gap-2">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="rounded-xl border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
          >
            {section.title}
          </a>
        ))}
      </nav>

      {sections.map((section) => (
        <section key={section.id} id={section.id} className="rounded-2xl border border-primary/10 bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold">{section.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
        </section>
      ))}

      <section id="contact" className="rounded-2xl border border-primary/10 bg-card p-6 shadow-sm">
        <h2 className="text-xl font-bold">Contact</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Need help? Reach out at{" "}
          <a href="mailto:sureshofcbe@gmail.com" className="font-semibold text-primary hover:underline">
            sureshofcbe@gmail.com
          </a>
          .
        </p>
        <Link href="/" className="mt-4 inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          Back to Home
        </Link>
      </section>
    </div>
  );
}
