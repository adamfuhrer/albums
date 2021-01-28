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
      attributes,
      listeners,
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
      opacity: isDeleting ? 0.4 : 1,
      transformOrigin: "bottom center",
      transform: `
        rotateX(${isDeleting ? 76 : 0}deg)
        scale(${isDeleting ? 0.86 : 1})
        translateY(${isDeleting ? -20 : 0}px)
      `,
      config: {
        mass: 4,
      },
    });

    if (isEditable) {
      return (
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          style={{
            perspective: `${size + 200}px`,
          }}
          {...props}
          // tabIndex={0} // needed for keyboard events to work
        >
          <animated.div style={{ ...deleteSpring }}>
            <div className={styles.album} style={albumStyles}>
              {!isDeleting && (
                <>
                  <button
                    className={`${styles.button} ${styles.delete}`}
                    onClick={(e) => deleteWithAnimation(index, e)}
                  >
                    <svg
                      enable-background="new 0 0 492 492"
                      viewBox="0 0 492 492"
                    >
                      <path d="M300.19 246L484.14 62.04c5.06-5.06 7.85-11.82 7.86-19.02 0-7.21-2.79-13.97-7.86-19.03L468.02 7.87c-5.07-5.08-11.82-7.86-19.04-7.86 -7.2 0-13.96 2.78-19.02 7.86L246.01 191.82 62.05 7.87c-5.06-5.08-11.82-7.86-19.03-7.86 -7.2 0-13.96 2.78-19.02 7.86L7.87 23.99c-10.5 10.5-10.5 27.57 0 38.05L191.83 246 7.87 429.95c-5.06 5.07-7.85 11.83-7.85 19.03 0 7.2 2.79 13.96 7.85 19.03l16.12 16.12c5.06 5.07 11.82 7.86 19.02 7.86 7.21 0 13.97-2.78 19.03-7.86l183.96-183.95 183.95 183.95c5.07 5.07 11.82 7.86 19.02 7.86h0.01c7.2 0 13.96-2.78 19.03-7.86l16.12-16.12c5.06-5.06 7.85-11.82 7.85-19.03 0-7.2-2.79-13.96-7.85-19.03L300.19 246z"></path>
                    </svg>
                  </button>
                  <button
                    className={`${styles.button} ${styles.drag}`}
                    {...attributes}
                    {...listeners}
                  >
                    <svg viewBox="0 0 20 20">
                      <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
                    </svg>
                  </button>
                </>
              )}
            </div>
          </animated.div>
        </div>
      );
    } else {
      return <div className={styles.album} style={albumStyles}></div>;
    }
  }
);
