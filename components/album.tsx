import React, { forwardRef } from "react";
import styles from "../styles/Album.module.scss";
// import Image from "next/image";

export const Album = forwardRef(
  ({ url, index, faded, style, ...props }, ref) => {
    const inlineStyles = {
      opacity: faded ? "0.3" : "1",
      backgroundImage: `url("${url}")`,
      ...style,
    };

    return (
      <div
        tabIndex={0} // needed for keyboard events to work
        ref={ref}
        className={styles.album}
        style={inlineStyles}
        {...props}
      />
    );

    // return (
    //   <Image
    //     ref={ref}
    //     src={url}
    //     alt="Picture of the author"
    //     width={200}
    //     height={200}
    //     {...props}
    //   />
    // );
  }
);
