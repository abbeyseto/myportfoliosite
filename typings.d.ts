

interface SanityBody {
    _createdAt: string;
    _id: string;
    _rev: string;
    _updatedAt: string;
}

interface Image {
    _type: 'image';
    asset: {
        _ref: string;
        _type: 'reference';
    };
}

export interface PageInfo extends SanityBody {
    _type: 'pageInfo';
    address: string;
    backgroundInformation: string;
    email: string;
    role: string;
    heroImage: Image | null;
    name: string;
    phoneNumber: string;
    profilePic: Image | null;
    socials?: Social[];
}

export interface Technology extends SanityBody {
    _type: 'technology';
    image: Image;
    progress: number;
    title: string;
}

export interface Skill extends SanityBody {
    _type: 'skill';
    image: Image;
    progress: number;
    title: string;
}

export interface Experience extends SanityBody {
    _type: 'experience';
    company: string;
    companyImage: Image;
    dateStarted: string;
    dateEnded?: string;
    isCurrentlyWorkingHere: boolean;
    jobTitle: string;
    points: string[];
    technologies: Technology[];
}

export interface Project extends SanityBody {
    _type: 'project';
    title: string;
    linkToBuild: string;
    image: Image;
    summary: string;
    technologies: Technology[];
    challenge?: string;
    outcome?: string;
    role?: string;
    year?: string;
    featured?: boolean;
}

export interface Social extends SanityBody {
    _type: 'social';
    title: string;
    url: string;
}

export interface WhatIDo extends SanityBody {
    _type: 'whatido';
    title: string;
}

export interface Companies extends SanityBody {
    _type: 'companies';
    title: string;
    website: string;
    image: Image;
}

export interface Modelomics extends SanityBody {
    _type: 'modelomics';
    title: string;
    summary: string;
    canonicalUrl: string;
    highlights: string[];
    heroTitle?: string;
    heroSummary?: string;
    keywords?: string[];
    readingPathTitle?: string;
    readingPathDescription?: string;
    readingSteps?: ModelomicsReadingStep[];
    sectionCards?: ModelomicsSectionCard[];
    articles?: ModelomicsArticle[];
    footerNote?: string;
    featuredProjects?: Project[];
}

export interface ModelomicsReadingStep {
    title: string;
    description: string;
}

export interface ModelomicsSectionCard {
    label: string;
    count: string;
    title: string;
    summary: string;
    href: string;
}

export interface ModelomicsArticle {
    title: string;
    summary: string;
    href: string;
    category: string;
}

export interface Testimonial extends SanityBody {
    _type: 'testimonial';
    name: string;
    role: string;
    company?: string;
    quote: string;
}

export interface WritingEntry extends SanityBody {
    _type: 'writing';
    title: string;
    summary: string;
    href: string;
    category: string;
    publishedAt?: string;
}
