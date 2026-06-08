import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import type { Modelomics } from "../typings";
import SectionFrame from "./SectionFrame";
import SectionHeading from "./SectionHeading";

type Props = {
  modelomics: Modelomics;
};

export default function ModelomicsSection({ modelomics }: Readonly<Props>) {
  return (
    <SectionFrame id="modelomics" className="bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading
          eyebrow="Modelomics"
          title={modelomics.title}
          description={modelomics.summary}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="theme-dark-surface rounded-[2rem] border border-[#6f9f98]/20 bg-[#081112]/90 p-5 shadow-[0_0_60px_rgba(111,159,152,0.08)]"
        >
          <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
            <p className="text-[0.58rem] uppercase tracking-[0.4em] text-stone-500">
              Canonical home
            </p>
            <p className="mt-3 text-sm leading-7 text-stone-300">
              The home page should only signal the project. The full publishing system, notes, and frameworks belong on the dedicated Modelomics page and the canonical site.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {(modelomics.keywords ?? []).slice(0, 3).map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.62rem] uppercase tracking-[0.28em] text-stone-300"
              >
                {keyword}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/modelomics"
              className="rounded-full border border-white/15 px-4 py-2 text-[0.68rem] uppercase tracking-[0.32em] text-stone-200 transition hover:border-[#6f9f98]/80 hover:text-white"
            >
              View the page
            </Link>
            <Link
              href={modelomics.canonicalUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#6f9f98] px-4 py-2 text-[0.68rem] uppercase tracking-[0.32em] text-black transition hover:opacity-90"
            >
              Visit modelomics.org
            </Link>
          </div>

          <p className="mt-5 text-sm leading-7 text-stone-400">
            {modelomics.footerNote ?? "The canonical home for the deeper work, notes, and experiments."}
          </p>
        </motion.div>
      </div>
    </SectionFrame>
  );
}
