import { useState } from 'react';
import Head from "next/head"
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import WorkExperience from "../components/WorkExperience";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import ContactMe from "../components/ContactMe";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";
import InfiniteScrollLogos from "../components/ScrollingLogo";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';

const Home = () => {
  const [heroDisplayed, setHeroDisplayed] = useState(false);

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

      {/* Header */}
      <Header />

      {/* Hero */}
      <section id="hero" className="snap-start">
        <Hero onDisplay={() => setHeroDisplayed(true)} />
      </section>

      {/* Conditionally render sections below the Hero */}
      {heroDisplayed && (
        <>
          {/* About */}
          <section id="about" className="snap-center">
            <About />
          </section>

          {/* Experiences */}
          <section id="experience" className="snap-center">
            <WorkExperience />
          </section>

          {/* Skills */}
          <section id="skills" className="snap-start">
            <Skills />
          </section>

          {/* Projects */}
          <section id="projects" className="snap-start">
            <Projects />
          </section>

          {/* Companies I work with */}
          <section id="clients" className="snap-start">
            <InfiniteScrollLogos />
          </section>

          {/* Contact */}
          <section id="contact" className="snap-start">
            <ContactMe />
          </section>
        </>
      )}

      {/* Back to Top Link */}
      <Link href="#hero">
        <footer className="sticky bottom-5 w-full cursor-pointer">
          <div className="flex items-center justify-center">
            <div className="h-10 w-10 bg-darkGreen/80 rounded-full flex items-center justify-center">
              <HomeIcon className="h-7 w-17 pb-0.5 hover:grayscale-100 text-white animate-pulse" />
            </div>
          </div>
        </footer>
      </Link>
      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default Home;
