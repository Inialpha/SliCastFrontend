import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Slide {
  position: number;
  content: string;
  backgroundImage: string;
  backgroundColor: string;
  textColor: string;
  audioFile: string | null;
}

export default function Preview({ slides }:  Slide[] ) {
  const [previewSlide, setPreviewSlide] = useState<Slide | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handlePreview = (slide: Slide) => {
    setPreviewSlide(slide)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4">Preview Slides</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Slide Preview</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {slides.map((slide, index) => (
            <Button key={slide.position} onClick={() => handlePreview(slide)} className="mr-2 mb-2">
              Slide {index + 1}
            </Button>
          ))}
        </div>
        {previewSlide && (
          <div className="mt-4 relative w-full h-64">
            {previewSlide.backgroundImage ? (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${previewSlide.backgroundImage})` }}
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{ backgroundColor: previewSlide.backgroundColor }}
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <p className="text-center" style={{ color: previewSlide.textColor }}>{previewSlide.text}</p>
            </div>
            {previewSlide.audioFile && (
              <audio ref={audioRef} src={previewSlide.audioFile} controls className="absolute bottom-2 left-2 right-2" />
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
