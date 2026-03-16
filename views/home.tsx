"use client";

import { RecipeForm } from "@/components/recipe-from";

const moodTiles = [
  { name: "Energetic", emoji: "⚡" },
  { name: "Relaxed", emoji: "🫖" },
  { name: "Adventurous", emoji: "🧭" },
  { name: "Comforted", emoji: "🍲" },
];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-14 text-white sm:px-10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-tr from-slate-900 via-slate-900/70 to-transparent" />
        <div className="relative max-w-2xl space-y-3">
          <p className="inline-flex rounded-full bg-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Mood Discovery
          </p>
          <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">
            How are you feeling today?
          </h1>
          <p className="text-sm text-slate-200 sm:text-base">
            Tell us your mood and preferences. We will curate recipe ideas that match your vibe.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {moodTiles.map((tile) => (
          <article
            key={tile.name}
            className="group flex aspect-square flex-col items-center justify-center rounded-2xl border border-primary/20 bg-card/90 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
          >
            <span className="mb-2 text-4xl">{tile.emoji}</span>
            <h2 className="text-base font-bold">{tile.name}</h2>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-primary/10 bg-card p-5 shadow-sm sm:p-8">
        <h2 className="mb-5 text-xl font-extrabold tracking-tight">Pick your cuisine and dietary preferences</h2>
        <RecipeForm className="space-y-5" />
      </section>
    </div>
  );
}
