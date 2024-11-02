import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import MyEditor from "../components/Editor"


interface Slide {
  id: number;
  content: string;
  backgroundImage: string;
}

export default function PodcastCreator() {
  const [story, setStory] = useState('')
  const [sentencesPerSlide, setSentencesPerSlide] = useState(2)
  const [slides, setSlides] = useState<Slide[]>([])
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const createSlides = () => {
    const sentences = story.match(/[^.!?]+[.!?]+/g) || []
    const newSlides: Slide[] = []
    for (let i = 0; i < sentences.length; i += sentencesPerSlide) {
      newSlides.push({
        id: i / sentencesPerSlide,
        content: sentences.slice(i, i + sentencesPerSlide).join(' '),
        backgroundImage: ''
      })
    }
    setSlides(newSlides)
  }

  const handleSlideClick = (slide: Slide) => {
    setEditingSlide(slide)
  }

  const handleSlideContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (editingSlide) {
      const updatedSlide = { ...editingSlide, content: e.target.value }
      setEditingSlide(updatedSlide)
      setSlides(slides.map(s => s.id === updatedSlide.id ? updatedSlide : s))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && editingSlide) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const updatedSlide = { ...editingSlide, backgroundImage: reader.result as string }
        setEditingSlide(updatedSlide)
        setSlides(slides.map(s => s.id === updatedSlide.id ? updatedSlide : s))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Story Slide Creator</h1>
      
      <div className="mb-6">
        <MyEditor
          onChange={(content) => setStory(content)}
        />
      </div>
      <div>
        <Label htmlFor="story">Your Story</Label>
        <Textarea
          id="story"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Enter your story here..."
          className="h-40"
        />
      </div>
      
      <div className="mb-6">
        <Label htmlFor="sentencesPerSlide">Sentences per Slide</Label>
        <Input
          id="sentencesPerSlide"
          type="number"
          value={sentencesPerSlide}
          onChange={(e) => setSentencesPerSlide(parseInt(e.target.value))}
          min={1}
          className="w-20"
        />
      </div>
      
      <Button onClick={createSlides} className="mb-6">Create Slides</Button>
      
      {editingSlide && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">Edit Slide</h2>
            <Textarea
              value={editingSlide.content}
              onChange={handleSlideContentChange}
              className="mb-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="hidden"
            />
            <Button onClick={() => fileInputRef.current?.click()}>
              {editingSlide.backgroundImage ? 'Change Background' : 'Add Background'}
            </Button>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-4 overflow-x-auto whitespace-nowrap pb-4 w-full">
        {slides.map((slide, idx) => (
          <Card
            key={slide.id}
            className=" inline-block mr-4 w-40 h-40 cursor-pointer overflow-hidden mb-4"
            onClick={() => handleSlideClick(slide)}
          >
            <CardContent className="p-0 h-full relative">
              {slide.backgroundImage && (
                <div
                  className="absolute inset-0 bg-cover bg-center "
                  style={{ backgroundImage: `url(${slide.backgroundImage})` }}
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50  p-2">
                <p className={`text-sm text-center line-clamp-2 ${slide.backgroundImage ? "text-white" : ""}`}>{slide.content}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50  p-2">
                <p className="text-sm">{idx + 1}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
