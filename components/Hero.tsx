import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import type { PageInfo, WhatIDo } from "../typings";
import { urlFor } from "../sanity";
import BackgroundCircles from "./BackgroundCircles";

type Props = {
  pageInfo: PageInfo;
  whatIDo: WhatIDo[];
};

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Modelomics", href: "/modelomics" },
];

export default function Hero({ pageInfo, whatIDo }: Readonly<Props>) {
  const portraitUrl = pageInfo.heroImage ? urlFor(pageInfo.heroImage).url() : "";
  const spotlightItems = whatIDo.slice(0, 3);
  const heroSummary =
    "I build scalable digital platforms, AI-powered systems, and product infrastructure that help teams move from idea to execution with less friction.";

  return (
    <section className="theme-dark-surface relative min-h-[calc(100vh-4.5rem)] overflow-hidden bg-black px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
      <BackgroundCircles />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <p className="text-[0.72rem] uppercase tracking-[0.7em] text-stone-400 sm:text-sm">
            {pageInfo.role}
          </p>
          <div className="mx-auto mt-8 flex items-center justify-center">
            <div className="relative h-28 w-28 rounded-full border border-white/15 bg-white/5 p-2 shadow-[0_0_60px_rgba(111,159,152,0.22)] sm:h-32 sm:w-32">
              {portraitUrl ? (
                <Image
                  src={portraitUrl}
                  alt={`${pageInfo.name} portrait`}
                  fill
                  sizes="128px"
                  className="rounded-full object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white/8 text-sm text-stone-300">
                  {pageInfo.name}
                </div>
              )}
            </div>
          </div>

          <h1 className="mx-auto mt-10 max-w-5xl text-4xl font-semibold leading-[0.96] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Building solutions that drive growth.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-stone-300 sm:text-base">
            {heroSummary}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full border border-white/20 px-5 py-3 text-[0.72rem] uppercase tracking-[0.35em] text-stone-200 transition hover:border-[#6f9f98]/80 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>

        {spotlightItems.length > 0 ? (
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[0.68rem] uppercase tracking-[0.32em] text-stone-400">
            {spotlightItems.map((item, index) => (
              <React.Fragment key={item._id}>
                {index > 0 ? <span className="text-stone-600">•</span> : null}
                <span>{item.title}</span>
              </React.Fragment>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
