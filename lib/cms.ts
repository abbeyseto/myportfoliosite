import { groq } from "next-sanity";
import { sanityClient } from "../sanity";
import type {
  Companies,
  Experience,
  Modelomics,
  PageInfo,
  Project,
  Skill,
  Social,
  Testimonial,
  WritingEntry,
  WhatIDo,
} from "../typings";
import { fallbackHomeContent, type HomeContent } from "../data/fallbackHome";

const pageInfoQuery = groq`*[_type == "pageInfo"][0]`;
const socialsQuery = groq`*[_type == "social"]`;
const whatIDoQuery = groq`*[_type == "whatido"]`;
const skillsQuery = groq`*[_type == "skill"] | order(progress desc, title asc)`;
const projectsQuery = groq`*[_type == "project"]{
  ...,
  technologies[]-> | order(title asc)
} | order(featured desc, _createdAt desc)`;
const experiencesQuery = groq`*[_type == "experience"]{
  ...,
  technologies[]-> | order(title asc)
} | order(dateStarted desc)`;
const companiesQuery = groq`*[_type == "companies"] | order(title asc)`;
const testimonialsQuery = groq`*[_type == "testimonial"] | order(_createdAt desc)`;
const writingsQuery = groq`*[_type == "writing"] | order(_createdAt desc)`;
const modelomicsQuery = groq`*[_type == "modelomics"][0]{
  ...,
  featuredProjects[]->{
    ...,
    technologies[]->
  }
}`;

type SanityHomeContent = {
  pageInfo: PageInfo | null;
  socials: Social[];
  whatIDo: WhatIDo[];
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  companies: Companies[];
  testimonials: Testimonial[];
  writings: WritingEntry[];
  modelomics: Modelomics | null;
};

export async function fetchHomeContent(): Promise<HomeContent> {
  try {
    const [
      pageInfo,
      socials,
      whatIDo,
      skills,
      projects,
      experiences,
      companies,
      testimonials,
      writings,
      modelomics,
    ] =
      await Promise.all([
        sanityClient.fetch<PageInfo | null>(pageInfoQuery),
        sanityClient.fetch<Social[]>(socialsQuery),
        sanityClient.fetch<WhatIDo[]>(whatIDoQuery),
        sanityClient.fetch<Skill[]>(skillsQuery),
        sanityClient.fetch<Project[]>(projectsQuery),
        sanityClient.fetch<Experience[]>(experiencesQuery),
        sanityClient.fetch<Companies[]>(companiesQuery),
        sanityClient.fetch<Testimonial[]>(testimonialsQuery),
        sanityClient.fetch<WritingEntry[]>(writingsQuery),
        sanityClient.fetch<Modelomics | null>(modelomicsQuery),
      ]);

    const content: SanityHomeContent = {
      pageInfo,
      socials: socials ?? [],
      whatIDo: whatIDo ?? [],
      skills: skills ?? [],
      projects: projects ?? [],
      experiences: experiences ?? [],
      companies: companies ?? [],
      testimonials: testimonials ?? [],
      writings: writings ?? [],
      modelomics,
    };

    return {
      pageInfo: content.pageInfo ?? fallbackHomeContent.pageInfo,
      socials: content.socials.length ? content.socials : fallbackHomeContent.socials,
      whatIDo: content.whatIDo.length ? content.whatIDo : fallbackHomeContent.whatIDo,
      skills: content.skills,
      projects: content.projects,
      experiences: content.experiences,
      companies: content.companies,
      testimonials: content.testimonials.length ? content.testimonials : fallbackHomeContent.testimonials,
      writings: content.writings.length ? content.writings : fallbackHomeContent.writings,
      modelomics: content.modelomics ?? fallbackHomeContent.modelomics,
    };
  } catch (error) {
    console.error("Failed to fetch home content from Sanity", error);
    return fallbackHomeContent;
  }
}

export async function fetchModelomics(): Promise<Modelomics> {
  try {
    const modelomics = await sanityClient.fetch<Modelomics | null>(modelomicsQuery);
    return modelomics ?? fallbackHomeContent.modelomics;
  } catch (error) {
    console.error("Failed to fetch modelomics content from Sanity", error);
    return fallbackHomeContent.modelomics;
  }
}
