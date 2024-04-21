import { GetStaticProps } from "next";
import Head from "next/head"
import Header from "../components/Header";
import Hero from "../components/Hero";
import {
  Experience,
  PageInfo,
  Skill,
  Project,
  Social,
  WhatIDo,
  Companies,
} from "../typings";
import {
  fetchPageInfo,
  fetchSocials,
  fetchExperiences,
  fetchProjects,
  fetchSkills,
  fetchWhatIDo,
  fetchCompanies,
} from "../utils";
import About from "../components/About";
import WorkExperience from "../components/WorkExperience";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import ContactMe from "../components/ContactMe";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";
import Script from "next/script";
import InfiniteScrollLogos from "../components/ScrollingLogo";

type Props = {
  pageInfo: PageInfo;
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
  socials: Social[];
  whatido: WhatIDo[];
  companies: Companies[];
};

const Home = ({
  pageInfo,
  experiences,
  projects,
  skills,
  socials,
  whatido,
  companies,
}: Props) => {
  return (
    <div
      className="bg-lightBackground text-darkBlack h-screen snap-y snap-mandatory
    overflow-y-scroll overflow-x-hidden z-0 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-darkGreen/80"
    >
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <title>{"Abiodun's Portfolio"}</title>
      </Head>

      {/* Google Analytics */}
      {/* <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-LV1LN9VBT0"
        strategy="afterInteractive"
      ></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config', 'G-LV1LN9VBT0')`}
        ;
      </Script> */}

      {/* Header */}
      <Header socials={socials} />

      {/* Hero */}
      <section id="hero" className="snap-start">
        <Hero pageInfo={pageInfo} whatido={whatido} />
      </section>

      {/* About */}
      <section id="about" className="snap-center">
        <About pageInfo={pageInfo} />
      </section>

      {/* Experiences */}
      <section id="experience" className="snap-center">
        <WorkExperience experiences={experiences} />
      </section>

      {/* Skills */}
      <section id="skills" className="snap-start">
        <Skills skills={skills} />
      </section>

      {/* Projects */}
      <section id="projects" className="snap-start">
        <Projects projects={projects} />
      </section>

      {/* Companies I work with */}
      <section id="clients" className="snap-start">
        <InfiniteScrollLogos companies={companies} />
      </section>

      {/* Contact */}
      <section id="contact" className="snap-start">
        <ContactMe pageInfo={pageInfo} />
      </section>

      <Link href="#hero">
        <footer className="sticky bottom-5 w-full cursor-pointer">
          <div className="flex items-center justify-center">
            <div className="h-10 w-10 bg-darkGreen/80 rounded-full flex items-center justify-center">
              <HomeIcon className="h-7 w-17 pb-0.5 hover:grayscale-100 text-white animate-pulse" />
            </div>
          </div>
        </footer>
      </Link>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo = await fetchPageInfo();
  const experiences = await fetchExperiences();
  const skills = await fetchSkills();
  const projects = await fetchProjects();
  const socials = await fetchSocials();
  const whatido = await fetchWhatIDo();
  const companies = await fetchCompanies();

  return {
    props: {
      pageInfo,
      experiences,
      skills,
      projects,
      socials,
      whatido,
      companies
    },
    revalidate: 10,
  };
};
