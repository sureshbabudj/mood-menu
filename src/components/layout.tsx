import { Outlet } from "react-router-dom";
import Header from "@/components/header";
import { BottomNavBar } from "./bottom-nav-bar";
import Footer from "./footer";
import { useRef, useState, useEffect } from "react";

function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function (...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function Layout() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const bottomNavBarRef = useRef<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [mobileContainerHeight, setMobileContainerHeight] = useState(0);
  const updateHeights = () => {
    if (headerRef.current && footerRef.current) {
      setContainerHeight(
        headerRef.current.offsetHeight + footerRef.current.offsetHeight
      );
    }
    if (headerRef.current && bottomNavBarRef.current) {
      setMobileContainerHeight(
        headerRef.current.offsetHeight - bottomNavBarRef.current.offsetHeight
      );
    }
  };

  useEffect(() => {
    const debouncedUpdateHeights = debounce(updateHeights, 200);
    updateHeights();
    window.addEventListener("resize", debouncedUpdateHeights);
    return () => {
      window.removeEventListener("resize", debouncedUpdateHeights);
    };
  }, []);

  return (
    <>
      <div ref={headerRef}>
        <Header />
      </div>
      <div
        className="min-h-[var(--mobile-outlet-height)] max-sm:pb-[var(--bottom-bar-height)] sm:min-h-[var(--outlet-height)]"
        style={
          {
            "--outlet-height": `calc(100dvh - ${containerHeight}px)`,
            "--mobile-outlet-height": `calc(100dvh - ${mobileContainerHeight}px)`,
            "--bottom-bar-height": `${bottomNavBarRef.current?.offsetHeight}px`,
          } as React.CSSProperties
        }
      >
        <Outlet />
      </div>
      <div ref={footerRef}>
        <Footer />
      </div>
      <div
        className="fixed bottom-[env(safe-area-inset-bottom)] w-full left-[env(safe-area-inset-left)] z-50"
        ref={bottomNavBarRef}
      >
        <BottomNavBar />
      </div>
    </>
  );
}
