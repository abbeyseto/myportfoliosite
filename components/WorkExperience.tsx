import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Experience } from "../typings";
import ExperienceCard from "./ExperienceCard";
import { fetchExperiences } from "../utils";

export default function WorkExperience() {
  const [experiences, setExperience] = useState([] as Experience[]);

  useEffect(() => {
    async function fetchData() {
      const experiences = await fetchExperiences();
      setExperience(experiences);
    }
    fetchData();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen  flex relative overflow-hidden flex-col text-left md:flex-row max-w-full px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-20 md:top-24 uppercase tracking-[20px] text-gray-500 text-xl md:text-2xl">
        Experience
      </h3>

      {/* Experience cards */}
      <div className="w-screen h-1/2 md:w-full text-left pb-5 md:pb-10 flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-darkGreen/80">
        {experiences && experiences?.map((experience) => (
          <ExperienceCard key={experience._id} experience={experience} />
        ))}
      </div>
    </motion.div>
  );
}
