import React, { useState, useEffect } from "react";
import styles from "../styles/AlbumGallery.module.scss";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
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
  const [textInput, setTextInput] = useState('');

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 35,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);
  
  const albumSize = 200;
  const dragOverlayStyles = { cursor: "grabbing" };

  useEffect(() => {
    localStorage.setItem("albums", JSON.stringify(albums));
  }, [albums]);

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

  function handleAlbumAdd() {
    if (isImageURL(textInput)) {
      setAlbums([...albums, textInput]);
      setTextInput("");
    }
  }

  function isImageURL(url) {
    return(url.match(/\.(jpeg|jpg|png)$/) != null);
  }


  if (isEditable) {
    return (
      <>
        <div className={styles.add_album}>
          <input
            type="text"
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
            placeholder="Album artwork URL"/>
          
          <button onClick={handleAlbumAdd}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div> 
        
        <DndContext
          autoScroll={true}
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext items={albums} strategy={rectSortingStrategy}>
            <Grid>
              {albums && (albums.map((url, index) => (
                <SortableAlbum
                  key={url}
                  url={url}
                  index={index}
                  onDeleteClick={handleDeleteClick}
                  isEditable={true}
                  size={albumSize}
                />
              )))}
            </Grid>
          </SortableContext>
          
          <DragOverlay
            adjustScale={true}
            modifiers={[restrictToParentElement]}
            dropAnimation={{
              duration: 300,
              easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
            }}
          >
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
      </>
    );
  } else {
    return (
      <Grid>
        {albums.map((url) => (
          <Album key={url} url={url} isEditable={false} size={albumSize} />
        ))}
      </Grid>
    );
  }
};

export default AlbumGallery;
