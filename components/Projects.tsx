import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { urlFor } from "../sanity";
import { Project } from "../typings";
import { fetchProjects } from "../utils";
import Image from "next/image";

export default function Projects() {
  const [projects, setProjects] = useState([] as Project[]);

  useEffect(() => {
    async function fetchData() {
      const projects = await fetchProjects();
      setProjects(projects);
    }
    fetchData();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className=" h-screen relative flex overflow-hidden flex-col text-left md:flex-row max-w-1/2 justify-evenly mx-auto items-center z-0"
    >
      <h3 className="absolute top-20 mx-6 md:top-24 uppercase tracking-[20px] text-gray-500 text-xl md:text-2xl">
        Some Projects
      </h3>

      <div className="relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-darkGreen/80">
        {projects?.map((project, i) => (
          <div
            key={project._id}
            className="w-3/4 lg:w-2/5 flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-8 md:p-22 h-screen"
          >
            <motion.img
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
              className=" h-20 xl:h-42 md:h-46 object-contain"
              src={urlFor(project?.image).url()}
              alt=""
            />

            <div className="space-y-5 md:space-y-10 px-0 md:px-10 max-w-6xl">
              <h4 className="text-lg md:text-2xl lg:text-4xl font-semibold text-center">
                <span className="underline decoration-darkGreen/50">
                  Project {i + 1}:
                </span>{" "}
                {project?.title}
              </h4>
              <div className="flex items-center space-x-2 justify-center ">
                {project?.technologies.map((technology) => (
                  <Image
                    key={technology._id}
                    quality={90}
                    className="h-10 w-10 rounded-full object-cover"
                    src={urlFor(technology?.image).url()}
                    alt=""
                    width={10}
                    height={0}
                  />
                ))}
              </div>

              <p className="text-sm md:text-md lg:text-lg text-justify ">
                {project?.summary}
              </p>
              <a
                href={project.linkToBuild}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-lightGreen hover:bg-lightGreen-700 text-white font-normal py-4 px-4 rounded inline-flex items-center"
              >
                <span>Explore {project.title}</span>
                
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full absolute top-[20%] md:top-[30%] bg-darkGreen/40 left-0 h-[500px] -skew-y-12"></div>
    </motion.div>
  );
}
