import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { SocialIcon } from "react-social-icons";
import { Social } from "../typings";
import { fetchSocials } from "../utils";

export default function Header() {
  const [socials, setSocials] = useState([] as Social[]);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const socialsData = await fetchSocials();
      setSocials(socialsData);
      setIsDataReady(true);
    }
    fetchData();
  }, []);

  if (!isDataReady) {
    return (
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <header className="sticky top-0 p-5 flex items-start justify-between max-w-7xl mx-auto z-20 xl:items-center">
      <motion.div
        initial={{
          x: -500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
        className=" flex flex-row items-center"
      >
        {/* React social icons */}
        {socials.map((social) => (
          <SocialIcon
            key={social._id}
            url={social.url}
            fgColor="gray"
            bgColor="transparent"
          />
        ))}
      </motion.div>

      <motion.div
        initial={{
          x: 500,
          opacity: 0.5,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
        className="flex flex-row items-center text-gray-300 cursor-pointer"
      >
        <SocialIcon
          url="#contact"
          className="cursor-pointer"
          network="email"
          fgColor="grey"
          label="Get in touch"
          bgColor="transparent"
        />
        <a
          href="#contact"
          className="uppercase hidden md:inline-flex text-sm text-gray-400"
        >
          Get in touch
        </a>
      </motion.div>
    </header>
  );
}
