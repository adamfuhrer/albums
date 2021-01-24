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
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { Grid } from "./Grid";
import { SortableAlbum } from "./SortableAlbum";
import albumsJson from "../albums.json";
import { Album } from "./Album";

const AlbumGallery = () => {
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
        <Grid columns={3}>
          {albums.map((url, index) => (
            <SortableAlbum
              key={url}
              url={url}
              index={index}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </Grid>
      </SortableContext>
      <DragOverlay adjustScale={true}>
        {activeId ? (
          <Album url={activeId} index={albums.indexOf(activeId)} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
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
};

export default AlbumGallery;
