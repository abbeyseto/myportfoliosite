import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import type { PageInfo } from "../typings";
import { urlFor } from "../sanity";
import SectionFrame from "./SectionFrame";
import SectionHeading from "./SectionHeading";

type Props = {
  pageInfo: PageInfo;
};

const getExcerpt = (value: string, maxLength = 240) => {
  const sentences = value
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  if (sentences.length > 1) {
    return sentences.slice(0, 2).join(" ");
  }

  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength).trim()}...`;
};

export default function About({ pageInfo }: Readonly<Props>) {
  const profileUrl = pageInfo.profilePic ? urlFor(pageInfo.profilePic).url() : "";
  const backgroundSummary = getExcerpt(pageInfo.backgroundInformation);

  return (
    <SectionFrame id="about">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <SectionHeading
          eyebrow="About"
          title="I build systems that make product teams faster, clearer, and more effective."
          description="My work sits at the intersection of product thinking, delivery, and AI-enabled systems. I like shaping the messy middle: turning goals into workflows, workflows into tools, and tools into measurable momentum."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid gap-5 rounded-[2rem] border border-white/10 bg-white/4 p-5 backdrop-blur-sm sm:grid-cols-[220px_1fr] lg:p-6"
        >
          <div className="relative mx-auto min-h-[15rem] w-full max-w-[220px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/40 sm:min-h-[17rem] sm:max-w-none">
            {profileUrl ? (
              <Image
                src={profileUrl}
                alt="Profile"
                fill
                sizes="(max-width: 1024px) 100vw, 260px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-stone-400">
                Profile image
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between gap-6">
            <p className="max-w-2xl text-sm leading-7 text-stone-300 md:text-[0.98rem]">
              {backgroundSummary}
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-4 border-t border-white/8 pt-4">
              <div>
                <p className="text-[0.58rem] uppercase tracking-[0.4em] text-stone-500">
                  Location
                </p>
                <p className="mt-2 text-sm text-white">{pageInfo.address}</p>
              </div>
              <div>
                <p className="text-[0.58rem] uppercase tracking-[0.4em] text-stone-500">
                  Contact
                </p>
                <p className="mt-2 text-sm text-white">{pageInfo.email}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionFrame>
  );
}
