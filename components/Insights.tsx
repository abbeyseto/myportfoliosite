import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import type { Testimonial, WritingEntry } from "../typings";
import SectionFrame from "./SectionFrame";
import SectionHeading from "./SectionHeading";

type Props = {
  testimonials: Testimonial[];
  writings: WritingEntry[];
};

export default function Insights({
  testimonials = [],
  writings = [],
}: Readonly<Partial<Props>>) {
  return (
    <SectionFrame id="insights">
      <SectionHeading
        eyebrow="Signal"
        title="Testimonials and writing help the site sound like a real body of work."
        description="This section adds proof from other people and a place for your thinking to live publicly. It gives the portfolio more voice, not just visuals."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-medium tracking-tight text-white">Testimonials</h3>
            <p className="text-[0.58rem] uppercase tracking-[0.35em] text-stone-500">
              Social proof
            </p>
          </div>

          <div className="mt-4 grid gap-3">
            {testimonials.length === 0 ? (
              <div className="rounded-[1.8rem] border border-dashed border-white/10 bg-white/4 p-6 text-sm text-stone-400">
                Add short testimonial quotes in Sanity so the portfolio has third-party proof.
              </div>
            ) : (
              testimonials.map((testimonial, index) => (
                <motion.blockquote
                  key={testimonial._id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                  className="rounded-[1.6rem] border border-white/10 bg-white/4 px-5 py-4"
                >
                  <p className="text-sm leading-7 text-stone-200">
                    “{testimonial.quote}”
                  </p>
                  <footer className="mt-4 flex flex-col gap-1">
                    <p className="text-sm font-medium text-white">{testimonial.name}</p>
                    <p className="text-[0.58rem] uppercase tracking-[0.35em] text-stone-500">
                      {testimonial.role}
                      {testimonial.company ? ` · ${testimonial.company}` : ""}
                    </p>
                  </footer>
                </motion.blockquote>
              ))
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-medium tracking-tight text-white">Writing</h3>
            <p className="text-[0.58rem] uppercase tracking-[0.35em] text-stone-500">
              Public thinking
            </p>
          </div>

          <div className="mt-4 grid gap-3">
            {writings.length === 0 ? (
              <div className="rounded-[1.8rem] border border-dashed border-white/10 bg-white/4 p-6 text-sm text-stone-400">
                Add articles or essays that reflect your thinking, frameworks, and observations.
              </div>
            ) : (
              writings.map((entry, index) => (
                <motion.article
                  key={entry._id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                  className="rounded-[1.6rem] border border-white/10 bg-white/4 px-5 py-4"
                >
                  <p className="text-[0.58rem] uppercase tracking-[0.35em] text-stone-500">
                    {entry.category}
                  </p>
                  <h4 className="mt-3 text-base font-medium tracking-tight text-white">{entry.title}</h4>
                  <p className="mt-2 text-sm leading-7 text-stone-300">{entry.summary}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Link
                      href={entry.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/15 px-4 py-2 text-[0.64rem] uppercase tracking-[0.3em] text-stone-200 transition hover:border-[#6f9f98]/80 hover:text-white"
                    >
                      Open
                    </Link>
                  </div>
                </motion.article>
              ))
            )}
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
