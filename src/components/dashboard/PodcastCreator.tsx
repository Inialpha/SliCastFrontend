import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Slide from './Slide'

interface SlideData {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
}

export default function PodcastCreator() {
  const [slides, setSlides] = useState<SlideData[]>([])
  const [currentSlide, setCurrentSlide] = useState<SlideData>({
    id: 0,
    title: '',
    content: '',
    imageUrl: ''
  })

  const handleSlideChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentSlide({ ...currentSlide, [e.target.name]: e.target.value })
  }

  const addSlide = () => {
    setSlides([...slides, { ...currentSlide, id: slides.length }])
    setCurrentSlide({ id: slides.length + 1, title: '', content: '', imageUrl: '' })
  }

  const createPodcast = () => {
    console.log('Creating podcast with slides:', slides)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Create Podcast</h2>
      <div className="space-y-4">
        <Input
          type="text"
          name="title"
          placeholder="Slide Title"
          value={currentSlide.title}
          onChange={handleSlideChange}
        />
        <Textarea
          name="content"
          placeholder="Slide Content"
          value={currentSlide.content}
          onChange={handleSlideChange}
        />
        <Input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={currentSlide.imageUrl}
          onChange={handleSlideChange}
        />
        <Button onClick={addSlide}>Add Slide</Button>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Podcast Slides</h3>
        {slides.map((slide) => (
          <Slide key={slide.id} {...slide} />
        ))}
      </div>
      {slides.length > 0 && (
        <Button onClick={createPodcast}>Create Podcast</Button>
      )}
    </div>
  )
}
