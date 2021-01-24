import React, { forwardRef } from "react";
import styles from "../styles/Album.module.scss";

export const Album = forwardRef(
  ({ url, index, faded, style, onDeleteClick, ...props }, ref) => {
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
      >
        <button
          className={styles.delete}
          onClick={(e) => onDeleteClick(index, e)}
        >
          <svg
            enable-background="new 0 0 510 510"
            height="512"
            viewBox="0 0 510 510"
            width="512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m118.832 467.243c1.193 24.006 20.863 42.757 44.944 42.757h182.447c24.081 0 43.753-18.75 44.944-42.757l26.28-302.243h-324.895zm181.168-227.243h30v165h-30zm-60 0h30v165h-30zm-60 0h30v165h-30z" />
            <path d="m330 75v-30c0-24.812-20.186-45-45-45h-60c-24.812 0-45 20.188-45 45v30h-120v60h390v-60zm-120 0v-30c0-8.271 6.73-15 15-15h60c8.272 0 15 6.729 15 15v30z" />
          </svg>
        </button>
      </div>
    );
  }
);
