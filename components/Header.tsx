import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { SocialIcon } from "react-social-icons";
import type { Social } from "../typings";
import { useTheme } from "./ThemeProvider";

type Props = {
  socials: Social[];
};

export default function Header({ socials }: Readonly<Props>) {
  const { theme, toggleTheme } = useTheme();
  const uniqueSocials = socials.filter(
    (social, index, list) => list.findIndex((item) => item.url === social.url) === index
  );

  return (
    <header className="theme-header sticky top-0 z-50 border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
        <motion.div
          initial={{ x: -24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          <Link
            href="/"
            className="hidden text-[0.68rem] uppercase tracking-[0.45em] text-[color:var(--page-muted)] transition hover:text-[color:var(--page-fg)] sm:inline-flex"
          >
            Abiodun
          </Link>
          {uniqueSocials.map((social) => (
            <SocialIcon
              key={social._id}
              url={social.url}
              fgColor={theme === "light" ? "#151515" : "rgba(255,255,255,0.78)"}
              bgColor="transparent"
              style={{ height: 36, width: 36 }}
            />
          ))}
        </motion.div>

        <div className="flex items-center gap-3">
          <motion.div
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Link
              href="#contact"
              className="inline-flex items-center gap-3 rounded-full border border-[color:var(--border-subtle)] px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.35em] text-[color:var(--page-fg)] transition hover:border-[#6f9f98]/80"
            >
              <span className="hidden sm:inline">Get in touch</span>
              <span className="sm:hidden">Contact</span>
            </Link>
          </motion.div>

          <motion.button
            type="button"
            onClick={toggleTheme}
            initial={{ x: 12, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative inline-flex h-10 w-20 items-center rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-strong)] p-1 transition hover:border-[#6f9f98]/80"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-checked={theme === "dark"}
            role="switch"
          >
            <span
              className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--page-bg)] shadow-sm transition-transform duration-300 ${
                theme === "dark" ? "translate-x-0" : "translate-x-10"
              }`}
            >
              {theme === "dark" ? (
                <MoonIcon className="h-4 w-4 text-[color:var(--page-fg)]" />
              ) : (
                <SunIcon className="h-4 w-4 text-[#c58d2a]" />
              )}
            </span>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
