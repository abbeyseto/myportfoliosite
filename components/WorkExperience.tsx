import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import type { Experience } from "../typings";
import { urlFor } from "../sanity";
import SectionFrame from "./SectionFrame";
import SectionHeading from "./SectionHeading";

type Props = {
  experiences: Experience[];
};

const getStartTime = (value?: string) => {
  if (!value) {
    return 0;
  }

  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
};

const formatDate = (value?: string) => {
  if (!value) {
    return "Present";
  }

  const date = new Date(value);
  return `${new Intl.DateTimeFormat("en-US", { month: "short" }).format(date)} ${date.getFullYear()}`;
};

export default function WorkExperience({ experiences }: Readonly<Props>) {
  const sortedExperiences = [...experiences].sort((a, b) => getStartTime(b.dateStarted) - getStartTime(a.dateStarted));

  return (
    <SectionFrame id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="I’ve led delivery across products, systems, and cross-functional teams."
        description="The thread through my work is the same: reduce friction, improve clarity, and make the operating model more durable than any one project."
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {sortedExperiences.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/4 p-6 text-sm text-stone-400">
            Add experience entries in Sanity with job title, company, dates, points, and technologies so this section can read like a real career timeline.
          </div>
        ) : sortedExperiences.map((experience, index) => {
          const companyUrl = experience.companyImage ? urlFor(experience.companyImage).url() : "";
          const technologies = experience.technologies ?? [];

          return (
            <motion.article
              key={experience._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.04 }}
              className="grid gap-5 rounded-[1.8rem] border border-white/10 bg-white/4 p-5 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.4rem] border border-white/10 bg-black/35 p-2">
                    {companyUrl ? (
                      <Image
                        src={companyUrl}
                        alt={experience.company}
                        width={64}
                        height={64}
                        className="h-12 w-12 rounded-2xl object-contain"
                      />
                    ) : (
                      <div className="text-center text-[0.65rem] uppercase tracking-[0.2em] text-stone-500">
                        {experience.company}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-medium tracking-tight text-white md:text-[1.35rem]">
                      {experience.jobTitle}
                    </h3>
                    <p className="mt-1 text-[0.72rem] uppercase tracking-[0.3em] text-[#6f9f98]">
                      {experience.company}
                    </p>
                  </div>
                </div>

                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-stone-400">
                  {formatDate(experience.dateStarted)} -{" "}
                  {experience.isCurrentlyWorkingHere ? "Present" : formatDate(experience.dateEnded)}
                </p>
              </div>

              {technologies.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {technologies.map((technology) => (
                    <span
                      key={technology._id}
                      className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[0.62rem] uppercase tracking-[0.24em] text-stone-300"
                    >
                      {technology.title}
                    </span>
                  ))}
                </div>
              ) : null}
            </motion.article>
          );
        })}
      </div>
    </SectionFrame>
  );
}
