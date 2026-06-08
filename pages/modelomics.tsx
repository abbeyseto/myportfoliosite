import Head from "next/head";
import Link from "next/link";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { motion } from "framer-motion";
import { fetchModelomics } from "../lib/cms";
import type { Modelomics } from "../typings";

type Props = {
  modelomics: Modelomics;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const modelomics = await fetchModelomics();

  return {
    props: {
      modelomics,
    },
    revalidate: 60,
  };
};

export default function ModelomicsPage({
  modelomics,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className="theme-shell min-h-screen">
      <Head>
        <title>Modelomics | Abiodun</title>
      </Head>

      <section className="theme-surface mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 py-16 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <p className="text-[0.72rem] uppercase tracking-[0.7em] text-stone-400">
            Modelomics
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            {modelomics.heroTitle ?? modelomics.title}
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-stone-300 sm:text-base">
            {modelomics.heroSummary ?? modelomics.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {(modelomics.keywords ?? []).map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-white/10 bg-white/4 px-4 py-2 text-[0.68rem] uppercase tracking-[0.3em] text-stone-300"
              >
                {keyword}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[1.8rem] border border-white/10 bg-white/4 p-5">
            <p className="text-[0.62rem] uppercase tracking-[0.4em] text-stone-500">
              Reading path
            </p>
            <h2 className="mt-3 text-xl font-medium text-white">
              {modelomics.readingPathTitle ?? "Start with the definition, then move into the lenses"}
            </h2>
            <p className="mt-3 text-sm leading-7 text-stone-300">
              {modelomics.readingPathDescription ??
                "The site is arranged as a short sequence: the core definition first, then the operating, implementation, and governance lenses, followed by supporting material."}
            </p>
            <div className="mt-5 grid gap-3">
              {(modelomics.readingSteps ?? []).map((step, index) => (
                <div
                  key={step.title}
                  className="theme-dark-surface rounded-2xl border border-white/10 bg-black/25 p-4"
                >
                  <p className="text-[0.62rem] uppercase tracking-[0.4em] text-stone-500">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-sm text-white">{step.title}</p>
                  <p className="mt-2 text-sm leading-6 text-stone-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {(modelomics.sectionCards ?? []).map((card) => (
              <a
                key={card.title}
                href={card.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-[1.8rem] border border-white/10 bg-white/4 p-5 transition hover:border-[#6f9f98]/60"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[0.62rem] uppercase tracking-[0.4em] text-stone-500">
                    {card.label}
                  </p>
                  <p className="text-[0.62rem] uppercase tracking-[0.3em] text-[#6f9f98]">
                    {card.count}
                  </p>
                </div>
                <h3 className="mt-3 text-lg font-medium text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-300">{card.summary}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {(modelomics.articles ?? []).map((article) => (
            <a
              key={article.title}
              href={article.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-[1.8rem] border border-white/10 bg-white/4 p-5 transition hover:border-[#6f9f98]/60"
            >
              <p className="text-[0.62rem] uppercase tracking-[0.4em] text-stone-500">
                {article.category}
              </p>
              <h3 className="mt-3 text-lg font-medium text-white">{article.title}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-300">{article.summary}</p>
            </a>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href={modelomics.canonicalUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#6f9f98] px-5 py-3 text-[0.72rem] uppercase tracking-[0.35em] text-black transition hover:opacity-90"
          >
            Visit modelomics.org
          </a>
          <Link
            href="/"
            className="rounded-full border border-white/15 px-5 py-3 text-[0.72rem] uppercase tracking-[0.35em] text-stone-200 transition hover:border-[#6f9f98]/80 hover:text-white"
          >
            Back home
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {modelomics.highlights.map((item) => (
            <div key={item} className="rounded-[1.8rem] border border-white/10 bg-white/4 p-5">
              <p className="text-[0.62rem] uppercase tracking-[0.4em] text-stone-500">
                Highlight
              </p>
              <p className="mt-3 text-sm leading-7 text-stone-200">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
