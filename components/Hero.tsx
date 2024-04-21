import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { urlFor } from "../sanity";
import { PageInfo, WhatIDo } from "../typings";
import BackgroundCircles from "./BackgroundCircles";
import Image from "next/image";
import { fetchPageInfo, fetchWhatIDo } from "../utils";

export default function Hero() {
  const [pageInfo, setPageInfo] = useState({} as PageInfo);
  const [whatido, setWhatIDo] = useState([] as WhatIDo[]);
  const titles = whatido.map((item) => item.title);
  const [text, count] = useTypewriter({
    words: [`Hi , my name is ${pageInfo?.name}`, ...titles],
    loop: true,
    delaySpeed: 2000,
  });
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const pageInfo = await fetchPageInfo();
      const whatido = await fetchWhatIDo();
      setPageInfo(pageInfo);
      setWhatIDo(whatido);
      setIsDataReady(true); // Set data ready flag to true
    }
    fetchData();
  }, []);

  if (!isDataReady) {
    // Render loading indicator or return null
    return null;
  }

  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center bg-black text-white text-center overflow-hidden">
      <BackgroundCircles />

      {pageInfo?.heroImage && (
        <Image
          className="relative rounded-full h-32 w-32 mx-auto object-cover"
          src={urlFor(pageInfo.heroImage).url() ?? ''}
          width={100}
          height={130}
          alt=""
        />
      )}

      <div className="z-20">
        <h2 className="text-sm uppercase text-gray-400 pb-2 tracking-[10px] md:tracking-[15px]">
          {pageInfo?.role}
        </h2>
        <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold px-10">
          <span className="mr-3">{text}</span>
          <Cursor cursorColor="#68B2A0" />
        </h1>

        <div className="pt-5">
          <Link href="#about">
            <button className="heroButton">About</button>
          </Link>
          <Link href="#experience">
            <button className="heroButton">Experience</button>
          </Link>
          <Link href="#skills">
            <button className="heroButton">Skills</button>
          </Link>
          <Link href="#projects">
            <button className="heroButton">Projects</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
