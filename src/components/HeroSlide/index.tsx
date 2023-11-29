'use client'
import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from 'next/image'

import HeroPicture from "../HeroPicture";

import styles from './heroesSlider.module.scss'

import { IHeroData } from "@/interfaces/heroes";


const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

interface IProps {
  heroes: IHeroData[];
  imageIndex: number;
  direction: number;
  page: number
  setPage: Dispatch<SetStateAction<[number, number]>>
}


const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export function HeroSlide({ heroes, imageIndex, direction, page, setPage }: IProps) {

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className={styles.container}>
      <AnimatePresence initial={false} custom={direction}>

        <motion.a
          key={page}
          href={`/hero/${heroes[imageIndex].id}`}
          className={styles.hero}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "tween", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
          <HeroPicture hero={heroes[imageIndex]} />
        </motion.a>
      </AnimatePresence>
      <div className={styles.next} onClick={() => paginate(1)}>
        <Image
          className="menu"
          src="/icons/arrowRight.svg"
          alt='Opções de menu'
          width={14}
          height={14}
        />
      </div>
      <div className={styles.prev} onClick={() => paginate(-1)}>
        <Image
          className="menu"
          src="/icons/arrowLeft.svg"
          alt='Opções de menu'
          width={14}
          height={14}
        />
      </div>
      <div className={styles.dot}>
        {heroes.map((hero, i) => (
          <div key={hero.id} onClick={() => setPage([i, 0])} style={{ background: i === imageIndex ? '#fff' : 'transparent' }} />
        ))}
      </div>
    </div>
  );
};
