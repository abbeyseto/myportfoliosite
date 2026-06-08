import Head from "next/head";
import Link from "next/link";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { HomeIcon } from "@heroicons/react/24/solid";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import WorkExperience from "../components/WorkExperience";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Insights from "../components/Insights";
import ContactMe from "../components/ContactMe";
import InfiniteScrollLogos from "../components/ScrollingLogo";
import ModelomicsSection from "../components/Modelomics";
import { fetchHomeContent } from "../lib/cms";
import type { HomeContent } from "../data/fallbackHome";

type Props = {
  content: HomeContent;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const content = await fetchHomeContent();

  return {
    props: {
      content,
    },
    revalidate: 60,
  };
};

export default function Home({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const testimonials = content.testimonials ?? [];
  const writings = content.writings ?? [];

  return (
    <main id="top" className="theme-shell">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <title>{"Abiodun's Portfolio"}</title>
        <meta
          name="description"
          content="A refined portfolio for Abiodun, featuring product systems work, experience, projects, skills, and Modelomics."
        />
      </Head>

      <Header socials={content.socials} />
      <Hero pageInfo={content.pageInfo} whatIDo={content.whatIDo} />
      <About pageInfo={content.pageInfo} />
      <ModelomicsSection modelomics={content.modelomics} />
      <WorkExperience experiences={content.experiences} />
      <Skills skills={content.skills} />
      <Projects projects={content.projects} />
      <Insights testimonials={testimonials} writings={writings} />
      <InfiniteScrollLogos companies={content.companies} />
      <ContactMe pageInfo={content.pageInfo} />

      <div className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2">
        <Link
          href="#top"
          aria-label="Back to top"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0d1315]/90 text-stone-200 shadow-[0_16px_50px_rgba(0,0,0,0.35)] backdrop-blur"
        >
          <HomeIcon className="h-6 w-6" />
        </Link>
      </div>
    </main>
  );
}
