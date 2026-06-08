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

export type HomeContent = {
  pageInfo: PageInfo;
  socials: Social[];
  whatIDo: WhatIDo[];
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  companies: Companies[];
  testimonials: Testimonial[];
  writings: WritingEntry[];
  modelomics: Modelomics;
};

export const fallbackHomeContent: HomeContent = {
  pageInfo: {
    _createdAt: "",
    _id: "fallback-page-info",
    _rev: "",
    _updatedAt: "",
    _type: "pageInfo",
    address: "Lagos, Nigeria",
    backgroundInformation:
      "I build product systems that connect strategy, operations, and shipping velocity. My work blends technical leadership, product thinking, and AI-enabled workflows so teams can move faster with more clarity.",
    email: "hello@adenleabiodun.com",
    role: "Technical Product & Systems Leader",
    heroImage: null,
    name: "Abiodun",
    phoneNumber: "",
    profilePic: null,
    socials: [],
  },
  socials: [],
  whatIDo: [
    {
      _createdAt: "",
      _id: "fallback-whatido-1",
      _rev: "",
      _updatedAt: "",
      _type: "whatido",
      title: "Product systems",
    },
    {
      _createdAt: "",
      _id: "fallback-whatido-2",
      _rev: "",
      _updatedAt: "",
      _type: "whatido",
      title: "AI workflows",
    },
    {
      _createdAt: "",
      _id: "fallback-whatido-3",
      _rev: "",
      _updatedAt: "",
      _type: "whatido",
      title: "Technical leadership",
    },
  ],
  skills: [],
  projects: [],
  experiences: [],
  companies: [],
  testimonials: [
    {
      _createdAt: "",
      _id: "fallback-testimonial-1",
      _rev: "",
      _updatedAt: "",
      _type: "testimonial",
      name: "Team lead",
      role: "Product partner",
      company: "Cross-functional team",
      quote:
        "Abiodun brings structure to ambiguity and turns messy requirements into systems the whole team can actually use.",
    },
    {
      _createdAt: "",
      _id: "fallback-testimonial-2",
      _rev: "",
      _updatedAt: "",
      _type: "testimonial",
      name: "Founder",
      role: "Startup collaborator",
      company: "Independent product work",
      quote:
        "He thinks like an operator, not just an engineer, which makes the work faster, clearer, and easier to scale.",
    },
  ],
  writings: [
    {
      _createdAt: "",
      _id: "fallback-writing-1",
      _rev: "",
      _updatedAt: "",
      _type: "writing",
      category: "Modelomics",
      href: "https://modelomics.org/articles/definition",
      summary:
        "The core definition of Modelomics and why disciplined AI allocation matters.",
      title: "Modelomics Definition",
      publishedAt: "",
    },
    {
      _createdAt: "",
      _id: "fallback-writing-2",
      _rev: "",
      _updatedAt: "",
      _type: "writing",
      category: "Modelomics",
      href: "https://modelomics.org/articles/operating-lens",
      summary:
        "How founders and operators should apply the framework in practice.",
      title: "Operating Lens",
      publishedAt: "",
    },
  ],
  modelomics: {
    _createdAt: "",
    _id: "fallback-modelomics",
    _rev: "",
    _updatedAt: "",
    _type: "modelomics",
    canonicalUrl: "https://modelomics.org",
    highlights: [
      "Intelligence is a scarce resource and should be applied with restraint.",
      "Modelomics helps teams reduce cost, confusion, and unnecessary AI usage.",
      "The work expands across philosophy, operating models, frameworks, and research.",
    ],
    heroSummary:
      "We treat intelligence as a scarce resource. The goal is to apply the minimum effective intelligence needed to create value, reduce cost, and keep systems understandable.",
    heroTitle:
      "Modelomics is the discipline of allocating AI intelligence with restraint.",
    keywords: [
      "Minimum Effective Intelligence",
      "Intelligence Debt",
      "Return on Intelligence",
      "Progressive Intelligence Escalation",
    ],
    readingPathTitle: "Start with the definition, then move into the lenses",
    readingPathDescription:
      "The site is arranged as a short sequence: the core definition first, then the operating, implementation, and governance lenses, followed by supporting material.",
    readingSteps: [
      {
        title: "Definition first",
        description: "Start with the core meaning before moving into applications.",
      },
      {
        title: "Audience lenses",
        description:
          "Read the operating, implementation, and governance views in sequence.",
      },
      {
        title: "Growing library",
        description:
          "Frameworks, references, and deeper material continue to expand here.",
      },
    ],
    sectionCards: [
      {
        label: "Articles",
        count: "4 items",
        title: "Articles",
        summary: "Accessible essays that introduce Modelomics and its vocabulary.",
        href: "https://modelomics.org/articles",
      },
      {
        label: "Frameworks",
        count: "2 items",
        title: "Frameworks",
        summary:
          "Operating models, maturity models, and practical methods.",
        href: "https://modelomics.org/frameworks",
      },
      {
        label: "Metrics",
        count: "Not public yet",
        title: "Metrics",
        summary:
          "Scorecards and measurement models for intelligence allocation.",
        href: "https://modelomics.org/metrics",
      },
      {
        label: "Whitepaper",
        count: "1 items",
        title: "Whitepaper",
        summary: "Long-form material for deeper distribution and citation.",
        href: "https://modelomics.org/whitepaper",
      },
      {
        label: "Research",
        count: "1 items",
        title: "Research",
        summary:
          "Comparative analysis, terminology, and literature notes.",
        href: "https://modelomics.org/research",
      },
      {
        label: "References",
        count: "1 items",
        title: "References",
        summary: "Curated supporting sources and related material.",
        href: "https://modelomics.org/references",
      },
    ],
    articles: [
      {
        category: "Articles",
        href: "https://modelomics.org/articles/definition",
        summary:
          "The core definition of Modelomics and why intelligence allocation matters.",
        title: "Modelomics Definition",
      },
      {
        category: "Articles",
        href: "https://modelomics.org/articles/operating-lens",
        summary: "How founders and operators should apply Modelomics.",
        title: "Operating Lens",
      },
      {
        category: "Articles",
        href: "https://modelomics.org/articles/implementation-lens",
        summary: "How engineers and product teams should apply Modelomics.",
        title: "Implementation Lens",
      },
      {
        category: "Articles",
        href: "https://modelomics.org/articles/governance-lens",
        summary: "How leaders should govern Modelomics.",
        title: "Governance Lens",
      },
    ],
    summary:
      "Modelomics is a publishing and research project about AI allocation discipline. The public site is the canonical home for the definition, the lenses, and the expanding library.",
    footerNote:
      "Canonical home for the project, its writing, and future resources.",
    title: "Modelomics",
    featuredProjects: [],
  },
};
