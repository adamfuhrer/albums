import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";

import { Grid } from "./Grid";
import { SortableAlbum } from "./SortableAlbum";
import albumsJson from "../albums.json";
import { Album } from "./Album";

interface AlbumGalleryProps {
  isEditable?: boolean;
}

const AlbumGallery: React.FC<AlbumGalleryProps> = ({ isEditable = true }) => {
  const [albums, setAlbums] = useState(albumsJson);
  const [activeId, setActiveId] = useState(null);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 35,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setAlbums((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  function handleDeleteClick(index: number) {
    setAlbums(albums.filter((_, i) => i !== index));
  }

  // const dragOverlayStyles = {
  //   transform: "scale(1.1)",
  //   transition: "all 350ms var(--cubic-bezier) 0s",
  // };

  if (isEditable) {
    return (
      <DndContext
        autoScroll={false}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={albums} strategy={rectSortingStrategy}>
          <Grid columns={4}>
            {albums.map((url, index) => (
              <SortableAlbum
                key={url}
                url={url}
                index={index}
                onDeleteClick={handleDeleteClick}
                isEditable={true}
              />
            ))}
          </Grid>
        </SortableContext>
        <DragOverlay adjustScale={true} modifiers={[restrictToParentElement]}>
          {activeId && (
            <Album
              url={activeId}
              index={albums.indexOf(activeId)}
              // style={dragOverlayStyles}
            />
          )}
        </DragOverlay>
      </DndContext>
    );
  } else {
    return (
      <Grid columns={4}>
        {albums.map((url, index) => (
          <Album url={url} isEditable={false} />
        ))}
      </Grid>
    );
  }
};

export default AlbumGallery;
