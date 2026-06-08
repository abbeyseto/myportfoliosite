import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import type { Project } from "../typings";
import { urlFor } from "../sanity";
import SectionFrame from "./SectionFrame";
import SectionHeading from "./SectionHeading";

type Props = {
  projects: Project[];
};

export default function Projects({ projects }: Readonly<Props>) {
  const buildRole = (project: Project) =>
    project.role ?? "Product + engineering contribution";

  return (
    <SectionFrame id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="Selected work that shows how I think, not just what I ship."
        description="Each project should tell a story: what problem was being solved, what leverage was created, and what the system now makes possible."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.length === 0 ? (
          <div className="surface-card rounded-[2rem] border-dashed p-6 text-sm text-[color:var(--page-muted)]">
            Add featured projects with an image, summary, technologies, and link so the portfolio can show the quality of your recent work.
          </div>
        ) : projects.map((project, index) => {
          const imageUrl = project.image ? urlFor(project.image).url() : "";
          const technologies = project.technologies ?? [];
          const previewTechnologies = technologies.slice(0, 3);

          return (
            <motion.article
              key={project._id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.04 }}
              className="surface-card overflow-hidden rounded-[1.9rem] backdrop-blur-sm"
            >
              <div className="theme-logo-surface relative flex aspect-[4/3] items-center justify-center overflow-hidden">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-6"
                  />
                ) : null}
              </div>

              <div className="space-y-4 p-5">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[0.58rem] uppercase tracking-[0.35em] text-stone-500">
                      Case study
                    </p>
                    {project.year && (
                      <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[0.58rem] uppercase tracking-[0.28em] text-stone-400">
                        {project.year}
                      </span>
                    )}
                    {project.featured && (
                      <span className="rounded-full border border-[#6f9f98]/30 bg-[#6f9f98]/10 px-3 py-1 text-[0.58rem] uppercase tracking-[0.28em] text-[#b8d7d2]">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-medium tracking-tight text-[color:var(--page-fg)] md:text-[1.55rem]">
                    {project.title}
                  </h3>
                  <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#6f9f98]">
                    {buildRole(project)}
                  </p>
                </div>

                <p className="text-sm leading-7 text-[color:var(--page-muted)]">
                  {project.summary}
                </p>

                {project.outcome ? (
                  <p className="border-l border-[color:var(--border-subtle)] pl-4 text-sm leading-7 text-[color:var(--page-fg)]">
                    <span className="text-[color:var(--page-muted)]">Impact:</span> {project.outcome}
                  </p>
                ) : null}

                {previewTechnologies.length > 0 && (
                  <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[color:var(--page-muted)]">
                    {previewTechnologies.map((technology) => technology.title).join(" / ")}
                    {technologies.length > previewTechnologies.length
                      ? ` / +${technologies.length - previewTechnologies.length}`
                      : ""}
                  </p>
                )}

                <a
                  href={project.linkToBuild}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full border border-[color:var(--border-subtle)] px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.32em] text-[color:var(--page-fg)] transition hover:border-[#6f9f98]/80"
                >
                  View case study
                </a>
              </div>
            </motion.article>
          );
        })}
      </div>
    </SectionFrame>
  );
}
