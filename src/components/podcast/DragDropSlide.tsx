import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import parse from 'html-react-parser';


interface Slide {
  position: number;
  content: string;
  backgroundImage: string;
  backgroundColor: string;
  textColor: string;
  audioFile: string | null;
}

interface SlidProps {
  slides: Slide[]
}
type SetEditingSlideType = React.Dispatch<React.SetStateAction<Slide | null>>;

interface DragDropSlideProps {
  slides: Slide[];
  editingSlide: Slide | null;
  setEditingSlide: (slide: Slide) => void;
}

export default function DragDropSlide({ slides, editingSlide, setEditingSlide }: DragDropSlideProps ) {

  const handleSlideClick = (slide: Slide) => {
    setEditingSlide(slide)
  }

    const onDragEnd = (result: DropResult) => {
      if (!result.destination) {
        return
      }
    }
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="slides" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="overflow-x-auto whitespace-nowrap pb-4"
          >
            {slides.map((slide, index) => (
              <Draggable key={slide.position} draggableId={slide.position.toString()} index={index}>
                {(provided) => (
                  <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="inline-block mr-4 w-64 h-40 cursor-pointer overflow-hidden"
                    onClick={() => handleSlideClick(slide)}
              >
                    <CardContent className="p-0 h-full relative">
                      {slide.backgroundImage ? (
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${slide.backgroundImage})` }}
                        />
                      ) : (
                        <div
                          className="absolute inset-0"
                          style={{ backgroundColor: slide.backgroundColor }}
                        />
                      )}
                      <div className="absolute bg-opacity-50 p-6">
                        <p className="text-sm">{parse(slide.text)}</p>
                      </div>
                      {slide.audioFile && (
                        <div className="absolute top-2 right-2">
                          🎵
                        </div>
                      )}
                      <div className="absolute top-2 left-2 bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        {index + 1}
                     </div>
                    </CardContent>
                  </Card>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
