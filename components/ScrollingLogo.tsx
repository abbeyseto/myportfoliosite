import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
} from "framer-motion";
import Image from "next/image";
import useMeasure from "react-use-measure";
import { Companies } from "../typings";
import { urlFor } from "../sanity";
import { fetchCompanies } from "../utils";

interface CardProps {
  company: Companies;
}

const Card: React.FC<CardProps> = ({ company }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setShowOverlay(true)}
      onHoverEnd={() => setShowOverlay(false)}
      className="relative overflow-hidden h-auto p-5 w-full rounded-xl object-contain"
    >
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="absolute inset-0 z-10 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute bg-black pointer-events-none opacity-50 h-full w-full"></div>
            <motion.h1
              className="bg-white font-semibold text-sm z-10 px-3 py-2 rounded-full flex items-center gap-[0.5ch] hover:opacity-75"
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              exit={{ y: 10 }}
            >
              <a href={company.website} target="_blank" rel="noreferrer">
                <span>Visit {company.title}</span>
              </a>
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
      <img
        src={urlFor(company?.image).url()}
        alt={company.title}
        className="w-[300px] max-w-[600px]"
      />
      {/* <p className="text-sm m-2 pt-10">{company.title}</p> */}
    </motion.div>
  );
};

export default function InfiniteScrollLogos() {
    const [companies, setCompanies] = useState([] as Companies[]);

    useEffect(() => {
      async function fetchData() {
        const companies = await fetchCompanies();
        setCompanies(companies);
      }
      fetchData();
    }, []);

  const FAST_DURATION = 25;
  const SLOW_DURATION = 75;

  const [duration, setDuration] = useState(FAST_DURATION);
  let [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);

  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    let controls;
    let finalPosition = -width / 2 - 8;
    if (mustFinish) {
      controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
        ease: "linear",
        duration: duration * (1 - xTranslation.get() / finalPosition),
        onComplete: () => {
          setMustFinish(false);
          setRerender(!rerender);
        },
      });
    } else {
      controls = animate(xTranslation, [0, finalPosition], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }

    return controls?.stop;
  }, [xTranslation, width, duration, rerender, mustFinish]);
  return (
    <div className="p-8">
      <div className="h-screen relative flex overflow-hidden flex-col text-left md:flex-row max-w-1/2 justify-evenly mx-auto items-center z-0">
        <div className="absolute top-20 md:top-24 items-center">
          <h3 className=" uppercase tracking-[20px] text-gray-500 text-xl md:text-2xl">Companies</h3>
          <p className="tracking-[5px] text-lg text-gray-700 pt-10">
            Here are some of the companies i have worked with.
          </p>
        </div>

        <motion.div
          className="absolute left-0 flex gap-8"
          ref={ref}
          style={{ x: xTranslation }}
          onHoverStart={() => {
            setMustFinish(true);
            setDuration(SLOW_DURATION);
          }}
          onHoverEnd={() => {
            setMustFinish(true);
            setDuration(FAST_DURATION);
          }}
        >
          {[...companies, ...companies].map((company, index) => (
            <Card key={index} company={company} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
