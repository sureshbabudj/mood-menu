"use client";

import { RecipeForm } from "@/components/recipe-from";
import { Utensils, Sparkles, Smile, HandPlatter } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 scale-105 animate-pulse-slow"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=2070")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px] animate-blob" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />

      <main className="container relative z-10 mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Side: Value Prop */}
          <div className="flex-1 text-center lg:text-left space-y-2 sm:space-y-6">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium animate-bounce-subtle"
              style={{
                animation: "slide-up-fade 0.5s ease-out forwards",
                opacity: 0,
              }}
            >
              <HandPlatter size={16} />
              <span>Feeling snacky, spicy, or soulful?</span>
            </div>

            <h1
              className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight"
              style={{
                animation: "slide-up-fade 0.5s ease-out forwards",
                opacity: 0,
                animationDelay: "150ms",
              }}
            >
              Feeling{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-rose-400">
                Hungry?
              </span>{" "}
              <br />
              Let your mood decide.
            </h1>

            <p
              className="hidden sm:block text-lg text-slate-300 max-w-xl mx-auto lg:mx-0"
              style={{
                animation: "slide-up-fade 0.5s ease-out forwards",
                opacity: 0,
                animationDelay: "300ms",
              }}
            >
              Your mood deserves more than takeout. In seconds, we match your
              vibe to a recipe that gets you. Cook what you’re craving, not just
              what’s trending.
            </p>
          </div>

          {/* Right Side: The Form Card */}
          <div
            className="w-full max-w-xl group"
            style={{
              animation: "slide-up-fade 0.6s ease-out forwards",
              opacity: 0,
              animationDelay: "450ms",
            }}
          >
            <div className="relative transition-all duration-500 group-hover:-translate-y-1">
              {/* Card Glow */}
              <div className="absolute -inset-1 bg-linear-to-r from-orange-500/70 to-rose-500/70 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

              <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-white">
                      Recipe Finder
                    </h2>
                    <p className="text-sm text-white">
                      Enter your mood or craving
                    </p>
                  </div>
                  <div className="p-3 bg-orange-500/20 rounded-2xl text-orange-400">
                    <Utensils size={28} />
                  </div>
                </div>

                <RecipeForm className="w-full space-y-4" />

                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-center gap-4 text-slate-500 text-xs">
                  <span className="flex items-center gap-1 transition-all duration-300 hover:text-orange-400 hover:scale-110 cursor-pointer">
                    <Smile size={14} /> Happy
                  </span>
                  <span className="flex items-center gap-1 transition-all duration-300 hover:text-orange-400 hover:scale-110 cursor-pointer">
                    <Smile size={14} className="rotate-180" /> Tired
                  </span>
                  <span className="flex items-center gap-1 transition-all duration-300 hover:text-orange-400 hover:scale-110 cursor-pointer">
                    <Sparkles size={14} /> Adventurous
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
