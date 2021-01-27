import React, { forwardRef, useState } from "react";
import styles from "../styles/Album.module.scss";
import { useSpring, animated } from "react-spring";

export const Album = forwardRef(
  (
    {
      url,
      index,
      faded,
      style,
      onDeleteClick,
      isEditable = false,
      size = 200,
      ...props
    },
    ref
  ) => {
    const albumStyles = {
      opacity: faded ? "0" : "1",
      backgroundImage: `url("${url}")`,
      width: `${size}px`,
      height: `${size}px`,
      ...style,
    };

    const [isDeleting, setIsDeleting] = useState(false);
    const [isShowingInfo, setIsShowingInfo] = useState(false);

    function deleteWithAnimation(index: number, e: Event) {
      setIsDeleting(true);

      setTimeout(() => {
        setIsDeleting(false);
        onDeleteClick(index, e);
      }, 800);
    }

    function onInfoClick() {
      setIsShowingInfo(!isShowingInfo);
    }

    const deleteSpring = useSpring({
      opacity: isDeleting ? 0.3 : 1,
      transformOrigin: "bottom center",
      transform: `
        rotateX(${isDeleting ? 80 : 0}deg)
        scale(${isDeleting ? 0.9 : 1})
        translateY(${isDeleting ? -16 : 0}px)
      `,
      config: {
        mass: 4,
      },
    });

    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>} // Draggable element ref
        style={{
          perspective: `${size + 200}px`,
        }}
        {...props}
        // tabIndex={0} // needed for keyboard events to work
      >
        <animated.div style={{ ...deleteSpring }}>
          <div
            className={`
              ${styles.album}
              ${isEditable ? styles.editable : ""} 
            `}
            style={albumStyles}
          >
            {isEditable && (
              <button
                className={`${styles.button} ${styles.delete}`}
                onClick={(e) => deleteWithAnimation(index, e)}
              >
                <svg viewBox="0 0 510 510" xmlns="http://www.w3.org/2000/svg">
                  <path d="m118.832 467.243c1.193 24.006 20.863 42.757 44.944 42.757h182.447c24.081 0 43.753-18.75 44.944-42.757l26.28-302.243h-324.895zm181.168-227.243h30v165h-30zm-60 0h30v165h-30zm-60 0h30v165h-30z" />
                  <path d="m330 75v-30c0-24.812-20.186-45-45-45h-60c-24.812 0-45 20.188-45 45v30h-120v60h390v-60zm-120 0v-30c0-8.271 6.73-15 15-15h60c8.272 0 15 6.729 15 15v30z" />
                </svg>
              </button>
            )}

            <button
              className={`${styles.button} ${styles.info}`}
              onClick={() => onInfoClick()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 469.333 469.333"
              >
                <path d="M234.667 0C105.271 0 0 114.844 0 256v117.333C0 379.224 4.776 384 10.667 384h32v42.667c0 23.531 19.135 42.667 42.667 42.667h32a10.66 10.66 0 0010.667-10.667v-192A10.66 10.66 0 00117.334 256h-32c-23.531 0-42.667 19.135-42.667 42.667V256c0-117.635 86.135-213.333 192-213.333s192 95.698 192 213.333v42.667C426.667 275.135 407.531 256 384 256h-32a10.66 10.66 0 00-10.667 10.667v192A10.66 10.66 0 00352 469.334h32c23.531 0 42.667-19.135 42.667-42.667V384h32c5.891 0 10.667-4.776 10.667-10.667V256C469.333 114.844 364.063 0 234.667 0z" />
              </svg>
            </button>
          </div>
        </animated.div>
      </div>
    );
  }
);
