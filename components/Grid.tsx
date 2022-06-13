import React from "react";
import styles from "../styles/Grid.module.scss";

export const Grid: React.FC<any> = ({ children }) => (
  <div className={styles.grid}>
    {children}
  </div>
);
