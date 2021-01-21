import React from "react";
import { motion } from "framer-motion";
import styles from "../styles/Album.module.scss";
import Image from 'next/image'

interface albumProps {
  name: string;
  img?: string;
}

const Album: React.FC<albumProps> = ({ name, img = "/blonde.jpeg" }) => {
  return (
    <div>
      <motion.img
        className={styles.album}
        drag
        dragConstraints={{
          top: -500,
          left: -500,
          right: 500,
          bottom: 500,
        }}
        src={img}
        whileTap={{ scale: 1.2 }}
      >
      </motion.img>
    </div>
  );
};

export default Album;
