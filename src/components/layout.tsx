import { Outlet } from "react-router-dom";
import Header from "@/components/header";
import { BottomNavBar } from "./bottom-nav-bar";
import Footer from "./footer";
import { useRef, useState, useEffect } from "react";
import { debounce } from "@/lib/utils";

export default function Layout() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const bottomNavBarRef = useRef<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [mobileContainerHeight, setMobileContainerHeight] = useState(0);
  const updateHeights = () => {
    if (headerRef.current && footerRef.current) {
      setContainerHeight(
        headerRef.current.offsetHeight + footerRef.current.offsetHeight,
      );
    }
    if (headerRef.current && bottomNavBarRef.current) {
      setMobileContainerHeight(
        headerRef.current.offsetHeight - bottomNavBarRef.current.offsetHeight,
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

  const defaultHeight = `100dvh - env(safe-area-inset-top) - env(safe-area-inset-top)`;
  return (
    <>
      <div ref={headerRef} className="lg:mx-4">
        <Header />
      </div>
      <main
        className="min-h-[var(--mobile-outlet-height)] max-sm:pb-[var(--bottom-bar-height)] sm:min-h-[var(--outlet-height)]"
        style={
          {
            "--outlet-height": `calc(${defaultHeight} - ${containerHeight}px)`,
            "--mobile-outlet-height": `calc(${defaultHeight} - ${mobileContainerHeight}px)`,
            "--bottom-bar-height": `${bottomNavBarRef.current?.offsetHeight}px`,
          } as React.CSSProperties
        }
      >
        <Outlet />
      </main>
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
