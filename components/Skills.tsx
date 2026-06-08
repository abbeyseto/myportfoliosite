import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import type { Skill as SkillType } from "../typings";
import { urlFor } from "../sanity";
import SectionFrame from "./SectionFrame";
import SectionHeading from "./SectionHeading";

type Props = {
  skills: SkillType[];
};

export default function Skills({ skills }: Readonly<Props>) {
  return (
    <SectionFrame id="skills">
      <SectionHeading
        eyebrow="Skills"
        title="A compact stack, selected for leverage."
        description="I’m not trying to collect tools. I care about the handful that help me build better systems, communicate more clearly, and move from idea to shipped work with less waste."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.length === 0 ? (
          <div className="rounded-[1.8rem] border border-dashed border-white/10 bg-white/4 p-6 text-sm text-stone-400">
            Add skills with progress values and icons so this area reflects your real stack instead of a generic list.
          </div>
        ) : skills.map((skill, index) => {
          const imageUrl = skill.image ? urlFor(skill.image).url() : "";

          return (
            <motion.div
              key={skill._id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
              className="rounded-[1.75rem] border border-white/10 bg-white/4 p-4 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                  {imageUrl ? (
                    <Image src={imageUrl} alt={skill.title} fill sizes="48px" className="object-cover" />
                  ) : null}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{skill.title}</p>
                  <p className="mt-1 text-[0.58rem] uppercase tracking-[0.32em] text-stone-500">
                    Proficiency
                  </p>
                </div>
              </div>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#6f9f98]"
                  style={{ width: `${skill.progress}%` }}
                />
              </div>

              <p className="mt-2 text-[0.58rem] uppercase tracking-[0.32em] text-stone-400">
                {skill.progress}%
              </p>
            </motion.div>
          );
        })}
      </div>
    </SectionFrame>
  );
}
