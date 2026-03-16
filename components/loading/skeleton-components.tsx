"use client";

import { SkeletonWave } from "./skeleton-gradient-wave";
import { cn } from "@/lib/utils";

/**
 * Skeleton states for loading content
 * All components support reduced-motion preferences
 */

export function RecipeCardSkeleton({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <article
      className={cn(
        "group block relative overflow-hidden rounded-xl aspect-square",
        className,
      )}
      style={{
        animation: "fade-in 300ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        animationDelay: `${delay}ms`,
        opacity: 0,
      }}
    >
      <div className="h-full w-full space-y-3 p-3 flex flex-col justify-between">
        <SkeletonWave className="w-full h-24 rounded-lg" />
        <div className="space-y-2">
          <SkeletonWave className="w-full h-3 rounded" />
          <SkeletonWave className="w-3/4 h-3 rounded" />
        </div>
        <div className="flex gap-2">
          <SkeletonWave className="w-12 h-6 rounded-full" />
          <SkeletonWave className="w-12 h-6 rounded-full" />
        </div>
      </div>
    </article>
  );
}

export function RecipeGridSkeleton({
  count = 12,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <RecipeCardSkeleton key={i} delay={i * 50} />
      ))}
    </div>
  );
}

export function HotRecipesSkeleton() {
  return (
    <div>
      <div className="mb-6 space-y-2">
        <SkeletonWave className="w-32 h-4 rounded" />
      </div>

      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="shrink-0 w-32 h-32 rounded-xl overflow-hidden"
            style={{
              animation:
                "fade-in 300ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
              animationDelay: `${i * 50}ms`,
              opacity: 0,
            }}
          >
            <SkeletonWave className="w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function RecipeDetailsSkeleton() {
  return (
    <div
      className="space-y-8"
      style={{
        animation: "fade-in 400ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        opacity: 0,
      }}
    >
      <SkeletonWave className="w-full aspect-video rounded-2xl" />

      <div className="space-y-4">
        <SkeletonWave className="w-3/4 h-8 rounded" />
        <div className="flex gap-3">
          <SkeletonWave className="w-20 h-6 rounded-full" />
          <SkeletonWave className="w-20 h-6 rounded-full" />
        </div>
      </div>

      <div className="space-y-3">
        <SkeletonWave className="w-32 h-6 rounded" />
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="space-y-2"
              style={{
                animation:
                  "fade-in 300ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
                animationDelay: `${i * 40}ms`,
                opacity: 0,
              }}
            >
              <SkeletonWave className="w-full h-12 rounded-lg" />
              <SkeletonWave className="w-3/4 h-3 rounded" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <SkeletonWave className="w-32 h-6 rounded" />
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonWave
              key={i}
              className="w-full h-4 rounded"
              style={{
                animation:
                  "fade-in 300ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
                animationDelay: `${(i + 8) * 40}ms`,
                opacity: 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FavoritesSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <SkeletonWave className="w-48 h-6 rounded" />
        <SkeletonWave className="w-3/4 h-4 rounded" />
      </div>
      <RecipeGridSkeleton count={8} />
    </div>
  );
}
