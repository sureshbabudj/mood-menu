"use client";

/**
 * Gradient wave animation for skeleton screens
 * Creates a premium, playful loading experience with moving gradient
 */

export const skeletonWaveStyles = `
  @keyframes skeletal-wave {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: calc(1000px + 100%) 0;
    }
  }
  
  @keyframes skeleton-pulse {
    0%, 100% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
  }
  
  .skeleton-wave {
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.1) 20%,
      rgba(255, 255, 255, 0.3) 60%,
      rgba(255, 255, 255, 0)
    );
    background-size: 1000px 100%;
    animation: skeletal-wave 2.5s infinite;
    background-color: rgba(248, 113, 113, 0.08);
  }
  
  .skeleton-pulse {
    background-color: rgba(248, 113, 113, 0.08);
    animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  @media (prefers-reduced-motion: reduce) {
    .skeleton-wave,
    .skeleton-pulse {
      animation: none;
      opacity: 0.6;
    }
  }
`;

export function SkeletonWave({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`skeleton-wave ${className}`} {...props} />;
}

export function SkeletonPulse({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`skeleton-pulse ${className}`} {...props} />;
}
