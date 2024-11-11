import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import Preview from '../components/podcast/Preview';
import DragDropSlide from '../components/podcast/DragDropSlide';
import Feedback from '../components/feedback';
import {FeedbackType } from '../utils/types'
import GenreSelector, { Genre } from '../components/podcast/Genre';
import MyEditor from "../components/Editor"
import { postRequest, postFormData } from '../utils/apis';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';


interface Slide {
  position: number;
  text: string;
  backgroundImage: File | null;
  backgroundColor: string;
  textColor: string;
  audioFile: string | null;
  audio: File | null
}

interface Genre {
  id: string;
  name: string;
}

export default function EnhancedStorySlideCreator() {
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [description, setDescription] = useState('');
  const [sentencesPerSlide, setSentencesPerSlide] = useState(2)
  const [slides, setSlides] = useState<Slide[]>([])
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null)
  const [previewSlide, setPreviewSlide] = useState<Slide | null>(null)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [feedback, setFeedback] = useState<FeedbackType | null>(null);

  const user = useSelector((state) => state.user);

  const fileInputRef = useRef<HTMLInputElement>(null)
  const audioInputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const createSlides = () => {
    const sentences = story.match(/[^.!?]+[.!?]+/g) || []
    const newSlides: Slide[] = []
    for (let i = 0; i < sentences.length; i += sentencesPerSlide) {
      newSlides.push({
        position: i / sentencesPerSlide,
        text: sentences.slice(i, i + sentencesPerSlide).join(' '),
        backgroundImage: '',
        backgroundColor: '#ffffff',
        textColor: '#000000',
        audioFile: null
      })
    }
    setSlides(newSlides)
  }
  const createPodcast = async (type: string, slides: Slide[]) => {
    const podcast = {

      authors: [user.id],
      status: type,
      title: title,
      text: story,
      duration: sentencesPerSlide,
      description: description,
      genres: selectedGenres.map((g: Genre) => g.id),
      slides: slides.map((s: Slide) => ({
        ...s,
        background_image: s.image_file,
        audio: s.audio_file,
        background_color: s.backgroundColor
      }))
    }

    const formData = new FormData()
    Object.entries(podcast).forEach(([key, value]) => { 
      if (key !== "slides") {
        if (Array.isArray(value)) {
          value.forEach((item: any) => {
            formData.append(key, item)
          });
        } else {
          formData.append(key, value)
        }
      }
    });
    slides.forEach((item: any, idx: number) => {
      Object.entries(item).forEach(([key, value]) => {
        formData.append(`slides[${idx}]${key}`, value);
      });
    });

    for (const data of formData.entries()) {
      console.log("form: ", data[0], data[1]);
    }
    
    const url = `${import.meta.env.VITE_API_URL}/podcasts/`;
    try {
      const res = await postFormData(url, formData)
      const response = await res.json()
      console.log(res)
      if (res.ok) {
        console.log(response)
        setFeedback({message: "Podcast was successfully created"});
      } else {
        console.log(response)
        setFeedback({message: "There was an error creating podcast"});
      }
      setTimeout(() => setFeedback(""), 5000);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSlideClick = (slide: Slide) => {
    setEditingSlide(slide)
  }

  const handleSlideContentChange = (content: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (editingSlide) {
      content = DOMPurify.sanitize(content)
      updateSlide({ ...editingSlide, text: content })
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && editingSlide) {
      editingSlide.image_file = file
      const reader = new FileReader()
      reader.onloadend = () => {
        updateSlide({ ...editingSlide, backgroundImage: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && editingSlide) {
      editingSlide.audio_file = file
      const reader = new FileReader()
      reader.onloadend = () => {
        updateSlide({ ...editingSlide, audioFile: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleColorChange = (type: 'backgroundColor' | 'textColor', color: string) => {
    if (editingSlide) {
      updateSlide({ ...editingSlide, [type]: color })
    }
  }

  const updateSlide = (updatedSlide: Slide) => {
    setEditingSlide(updatedSlide)
    setSlides(slides.map(s => s.position === updatedSlide.position ? updatedSlide : s))
  }

  const handlePreview = (slide: Slide) => {
    setPreviewSlide(slide)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const items = Array.from(slides)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const updatedSlides = items.map((item, index) => ({
      ...item,
      position: index
    }))

    setSlides(updatedSlides)
  }

  return (
    <div className="container mx-auto p-4 ">
      {feedback && <Feedback variant={feedback.variant} message={feedback.message} className={"text-center bg-green-200"}/>}
      <div className="flex justify-between end">
        <h1 className="text-3xl font-bold mb-6">Enhanced Story Slide Creator</h1>
        <div className="flex space-x-2">
          <Button onClick={() => slides.length ? createPodcast("draft", slides) : setFeedback({message: "Please add slides" }) }>Save as Draft</Button>
          <Button onClick={() => slides.length ? createPodcast("published", slides) : setFeedback({message: "Please add slides" })}>Publish</Button>
        </div>
      </div>
      <div className="mb-6">
        <Label htmlFor="tile">Podcast Title</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <Label htmlFor="description">Podcast Title</Label>
        <Textarea
          id="description"
          value={description}
          placeholder="Enter a  brief introduttion of your podcast here..."
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <GenreSelector selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />

      <div className="mb-6">
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
            <MyEditor
              value={editingSlide.text}
              onChange={handleSlideContentChange}
              className="mb-2"
            />
            <div className="flex space-x-2 mb-2">
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
              <input
                type="file"
                accept="audio/*"
                onChange={handleAudioUpload}
                ref={audioInputRef}
                className="hidden"
              />
              <Button onClick={() => audioInputRef.current?.click()}>
                {editingSlide.audioFile ? 'Change Audio' : 'Add Audio'}
              </Button>
            </div>
            <div className="flex space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Background Color</Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="flex flex-wrap gap-1">
                    {['#ffffff', '#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6'].map((color) => (
                      <div
                        key={color}
                        className="w-8 h-8 rounded-full cursor-pointer border border-gray-300"
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorChange('backgroundColor', color)}
                      />
                    ))}
                  </div>
                  <Input
                    type="color"
                    value={editingSlide.backgroundColor}
                    onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                    className="mt-2"
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Text Color</Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="flex flex-wrap gap-1">
                    {['#000000', '#ffffff', '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'].map((color) => (
                      <div
                        key={color}
                        className="w-8 h-8 rounded-full cursor-pointer border border-gray-300"
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorChange('textColor', color)}
                      />
                    ))}
                  </div>
                  <Input
                    type="color"
                    value={editingSlide.textColor}
                    onChange={(e) => handleColorChange('textColor', e.target.value)}
                    className="mt-2"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>
      )}
      <DragDropSlide slides={slides} editingSlide={editingSlide} setEditingSlide={setEditingSlide} />
      <Preview slides={slides} />
    </div>
  )
}
