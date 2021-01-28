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
import { Album } from "./Album";

interface AlbumGalleryProps {
  isEditable?: boolean;
  albumList: any;
}

const AlbumGallery: React.FC<AlbumGalleryProps> = ({
  albumList,
  isEditable = true,
}) => {
  const [albums, setAlbums] = useState(albumList);
  const [activeId, setActiveId] = useState(null);
  const [albumSize, setAlbumSize] = useState(200);

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

  const dragOverlayStyles = {
    cursor: "grabbing",
  };

  if (isEditable) {
    return (
      <DndContext
        autoScroll={true}
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
                size={albumSize}
              />
            ))}
          </Grid>
        </SortableContext>
        <DragOverlay adjustScale={true} modifiers={[restrictToParentElement]}>
          {activeId && (
            <Album
              url={activeId}
              index={albums.indexOf(activeId)}
              size={albumSize}
              style={dragOverlayStyles}
            />
          )}
        </DragOverlay>
      </DndContext>
    );
  } else {
    return (
      <Grid columns={4}>
        {albums.map((url) => (
          <Album key={url} url={url} isEditable={false} size={albumSize} />
        ))}
      </Grid>
    );
  }
};

export default AlbumGallery;
