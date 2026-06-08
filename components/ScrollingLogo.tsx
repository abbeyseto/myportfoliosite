import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import type { Companies } from "../typings";
import { urlFor } from "../sanity";
import SectionFrame from "./SectionFrame";
import SectionHeading from "./SectionHeading";

type Props = {
  companies: Companies[];
};

export default function InfiniteScrollLogos({ companies }: Readonly<Props>) {
  return (
    <SectionFrame id="clients">
      <SectionHeading
        eyebrow="Clients"
        title="A few of the teams and organizations I’ve worked alongside."
        description="The work is strongest when it disappears into the system, but these logos still tell part of the story."
      />

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {companies.length === 0 ? (
          <div className="surface-card rounded-[1.8rem] border-dashed p-6 text-sm text-[color:var(--page-muted)]">
            Add client logos or organizations you’ve worked with to strengthen proof and trust.
          </div>
        ) : companies.map((company, index) => {
          const imageUrl = company.image ? urlFor(company.image).url() : "";

          return (
            <motion.a
              key={company._id}
              href={company.website}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
              className="group surface-card flex min-h-[7rem] items-center justify-center rounded-[1.6rem] p-5 backdrop-blur-sm transition hover:border-[#6f9f98]/60"
            >
              <div className="theme-logo-surface relative h-16 w-full max-w-[10rem] rounded-2xl p-3">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={company.title}
                    fill
                    sizes="160px"
                    className="object-contain opacity-100 transition group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-[color:var(--page-muted)]">
                    {company.title}
                  </div>
                )}
              </div>
            </motion.a>
          );
        })}
      </div>
    </SectionFrame>
  );
}
