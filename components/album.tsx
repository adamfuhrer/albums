import React from "react";
import { motion } from "framer-motion";
import styles from '../styles/Album.module.scss'

interface albumProps {
  name: string;
  img: string;
}

const Album: React.FC<albumProps> = ({ name, img }) => {
  return (
    <div>
      <motion.div
          className={styles.album}
          drag
          dragConstraints={{
            top: -50,
            left: -50,
            right: 50,
            bottom: 50,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />

    </div>
  );
};

export default Album;
