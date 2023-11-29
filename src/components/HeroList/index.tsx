'use client'
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { wrap } from "popmotion";

import HeroPicture from "../HeroPicture";
import { HeroSlide } from "../HeroSlide";

import styles from "./heroesList.module.scss";

import { spidermanFont } from "@/fonts"
import { IHeroData } from "@/interfaces/heroes"

interface IProps {
  heroes: IHeroData[]
}

export default function HeroesList({ heroes }: IProps) {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, heroes.length, page);

  return (
    <>
      <motion.h1
        className={`${spidermanFont.className} ${styles.title}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2 }}
      >
        Personagens
      </motion.h1>

      <motion.section
        className={styles.heroes}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
      >
        {heroes.map((hero, i) => {
          const widthWindow = window.screen.width
          return (
            <motion.div
              key={hero.id}
              className={`${styles.imageContainer} ${styles[hero.id]}`}
              style={widthWindow < 768 && i === imageIndex ? { display: 'none' } : {}}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.8 }}
              transition={{ duration: 0.8 }}
            >
              <Link href={`/hero/${hero.id}`}>
                <HeroPicture hero={hero} />
              </Link>
            </motion.div>
          )
        })}
      </motion.section>
      <HeroSlide
        heroes={heroes}
        imageIndex={imageIndex}
        page={page}
        setPage={setPage}
        direction={direction}
      />
    </>
  )
}
