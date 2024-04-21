import {
  Companies,
  Experience,
  PageInfo,
  Project,
  Skill,
  Social,
  WhatIDo,
} from "../typings";

export const fetchWhatIDo = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getWhatIDo`);
  const data = await res.json();
  const whatido: WhatIDo[] = data.whatido;
  return whatido;
};

export const fetchSocials = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSocials`);
  const data = await res.json();
  const socials: Social[] = data.socials;
  return socials;
};

export const fetchSkills = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSkills`);
  const data = await res.json();
  const skills: Skill[] = data.skills;
  return skills;
};

export const fetchProjects = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getProjects`
  );
  const data = await res.json();
  const projects: Project[] = data.projects;
  return projects;
};

export const fetchExperiences = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getExperience`
  );
  const data = await res.json();
  const experiences: Experience[] = data.experiences;
  return experiences;
};

export const fetchPageInfo = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getPageInfo`
  );
  const data = await res.json();
  const pageInfo: PageInfo = data.pageInfo;
  return pageInfo;
};

export const fetchCompanies = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getCompanies`
  );
  const data = await res.json();
  const companies: Companies[] = data.companies;
  return companies;
};

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html: string
) => {
  const res = await fetch(`/api/sendEmail`, {
    method: "POST",
    body: JSON.stringify({ to, subject, text, html }),
  });
  const data = await res.json();
  return data;
};
