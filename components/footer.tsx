"use client";

import React from "react";
import Link from "next/link";
import { Heart, Instagram, Twitter, Github, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const Footer = ({ className }: { className?: string }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "relative border-t border-white/5  backdrop-blur-xl hidden sm:block",
        className,
      )}
    >
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-1.5 rounded-lg  transition-colors">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/logo.svg"
                  alt="logo"
                  className="w-6 h-6 opacity-70"
                />
              </div>
              <span className="font-sourgummy text-xl font-bold tracking-tight">
                <span className="text-orange-400">Mood</span>
                <span className="text-orange-300">Menu</span>
              </span>
            </Link>
            <p className="text-sm text-primary-foreground leading-relaxed">
              Elevating your cooking experience by matching recipes to your
              current vibration.
            </p>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 col-span-1 md:col-span-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-orange-300 font-black">
                Explore
              </h4>
              <ul className="space-y-2 text-sm text-primary-foreground">
                <li>
                  <Link
                    href="/"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Search
                  </Link>
                </li>
                <li>
                  <Link
                    href="/recipes"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Recipes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/favorites"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Favorites
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-orange-300 font-black">
                Company
              </h4>
              <ul className="space-y-2 text-sm text-primary-foreground">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-orange-400 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about#contact"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter/Socials Column */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-orange-300 font-black">
              Social
            </h4>
            <div className="flex gap-4">
              {[
                { Icon: Instagram, color: "hover:text-orange-400" },
                { Icon: Twitter, color: "hover:text-orange-400" },
                { Icon: Github, color: "hover:text-orange-400" },
                { Icon: Mail, color: "hover:text-orange-400" },
              ].map(({ Icon, color }, idx) => (
                <Link
                  key={idx}
                  href="#"
                  className={cn(
                    "text-slate-500 transition-all hover:scale-110",
                    color,
                  )}
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-primary-foreground">
            © {currentYear} MoodMenu. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-[11px] text-primary-foreground">
            <span>Made with</span>
            <Heart
              size={10}
              className="text-rose-500 fill-rose-500 animate-pulse"
            />
            <a
              href="https://www.themealdb.com/"
              className="hover:text-orange-400 transition-colors"
            >
              themealdb
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
