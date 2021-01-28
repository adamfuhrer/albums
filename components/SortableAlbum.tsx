import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Album } from "./Album";

export const SortableAlbum = (props) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: props.url,
    transition: {
      duration: 300,
      easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Album
      ref={setNodeRef}
      style={style}
      faded={isDragging}
      onDeleteClick={props.onDeleteClick}
      isEditable={props.isEdiable}
      size={props.size}
      attributes={attributes}
      listeners={listeners}
      {...props}
    />
  );
};
