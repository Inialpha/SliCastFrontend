'use client'

import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, ArrowDown, ArrowUp } from 'lucide-react'
import PodcastDisplay, { Message } from '@/components/podcast-display'


import Preview from '../components/podcast/Preview';
//import Feedback from '../components/feedback';
import {FeedbackType } from '../utils/types'
import GenreSelector, { Genre } from '../components/podcast/Genre';
import MyEditor from "../components/Editor"
import { postRequest, postFormData } from '../utils/apis';
import { useSelector } from 'react-redux';
import Feedback, { FeedbackState }from '../components/Alert';

interface Segment {
  type: string;
  position: number;
  alt?: string | null;
  text?: string;
  image?: string;
  imageFile?: File;
  
  backgroundColor?: string;
}

type Podcast = {
  authors: string[];
  status: string;
  title: string;
  text: string;
  coverPhoto?: string;
  coverPhotoFile?: File;
  duration: number;
  description: string;
  genres: string[];
  segments: Segment;
};

interface Genre {
  id: string;
  name: string;
}

interface CurrentImage {
  file: File;
  data: string;
}

export default function PodcastCreator() {
  const [podcast, setPocast] = useState<Podcast | {}>({});
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [description, setDescription] = useState('');
  const [sentencesPerSegment, setSentencesPerSegment] = useState(2)
  const [segments, setSegments] = useState<Slide[]>([])
  const [editingSegment, setEditingSegment] = useState<Segment | null>(null)
  //const [previewSlide, setPreviewSlide] = useState<Slide | null>(null)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [feedback, setFeedback] = useState<FeedbackType | null>(null);
  const [currentImage, setCurrentImage] = useState<CurrentImage | {}>({});

  /****************************/
  const [messages, setMessages] = useState<Message[]>([])
  const [currentContent, setCurrentContent] = useState('')
  const [currentContentType, setCurrentContentType] = useState<'text' | 'image'>('text')
  const [insertPosition, setInsertPosition] = useState<'start' | 'end' | number>('end')

  const user = useSelector((state) => state.user);

  const fileInputRef = useRef<HTMLInputElement>(null)
  const audioInputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const createSegments = () => {
    const sentences = story.match(/[^.!?]+[.!?]+/g) || []
    const newSegments: Segment[] = []
    for (let i = 0; i < sentences.length; i += sentencesPerSegment) {
      const newSegment = {
        position: i / sentencesPerSegment,
        text: sentences.slice(i, i + sentencesPerSegment).join(' '),
        backgroundColor: '#ffffff',
        type: "text",
      }
      newSegments.push(newSegment)
    }
    setSegments(newSegments)
    setPodcast((prevPodcast) => {
      return {...prevPodcast, segments: newSegments}
    });
  }
  const createPodcast = async (type: string) => {
    if (!segments.length) {
      setFeedback({message: "Please add segments"})
      setTimeout(() => {
        setFeedback(null)
      }, 5000)
      return;
    }
    const podcastData = {
      authors: [user.id],
      status: type,
      title: title,
      text: story,
      cover_photo: podcast.coverPhoto,
      duration: sentencesPerSegment,
      description: description,
      genres: selectedGenres.map((g: Genre) => g.id),
      segments: segments.map((s: Segment, index: number) => ({
        ...s,
        ...(s.type === 'image' && {image_file: s.imageFile, image: undefined}),
        position: index + 1,


        background_color: s.backgroundColor
      }))
    }
    console.log(podcastData)

    const formData = new FormData()
    Object.entries(podcastData).forEach(([key, value]) => { 
      if (key !== "segments") {
        if (Array.isArray(value)) {
          value.forEach((item: any) => {
            formData.append(key, item)
          });
        } else {
          formData.append(key, value)
        }
      }
    });
    podcastData.segments.forEach((item: any, idx: number) => {
      Object.entries(item).forEach(([key, value]) => {
        formData.append(`segments[${idx}]${key}`, value);
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
      updateSlide({ ...editingSlide, text: content })
    }
  }
  

  const readFileData = (file: File): string | ArrayBuffer | null => {
    const reader = new FileReader();

    reader.onloadend = () => {
      return reader.result;
    };

    reader.onerror = () => {
      return "";
    };
    reader.readAsDataURL(file);
  };


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "cover_photo" | "segment_photo") => {
    const file = e.target.files?.[0]
    if (!file) return;
    const reader = new FileReader()

    reader.onloadend = () => {
      const result = reader.result as string;

      if (type === "cover_photo") {
        podcast.coverPhotoFile = file;
        podcast.coverPhoto = result;
      } else if (type === "segment_photo") {
        setCurrentImage({file: file, data: result})
        setCurrentContent(file)
      }
    };

    reader.readAsDataURL(file);
  };



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


  const addSegment = () => {
    let newSegment: Segment;
    let position = insertPosition === "start" ? 0 : insertPosition === "start" ? segments.length - 0 : insertPosition;

    if (currentContentType === "text" && currentContent.trim() !== '')  {
      newSegment = { type: currentContentType, text: currentContent, position: position};
    } else if (currentContentType === "image") {
      newSegment = { type: currentContentType, imageFile: currentImage.file, image: currentImage.data, position: position, text: "Image"};
    }
      
    if (newSegment) {
      setSegments(prevSegments => {
        if (insertPosition === 'start') {
          return [newSegment, ...prevSegments]
        } else if (insertPosition === 'end' || insertPosition >= prevMessages.length) {
          return [...prevSegments, newSegment]
        } else {
          return [
            ...prevSegments.slice(0, insertPosition as number),
            newSegments,
            ...prevSegments.slice(insertPosition as number)
          ]
        }
      })
      setCurrentContent('')
      setInsertPosition('end')
    }
  }

  const removeSegments = (index: number) => {
    setSegments(segments.filter((_, i) => i !== index))
  }

  const moveSegments = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index > 0) || (direction === 'down' && index < segments.length - 1)) {
      const newSegments = [...segments]
      const temp = newSegments[index]
      newSegments[index] = newSegments[index + (direction === 'up' ? -1 : 1)]
      newSegments[index + (direction === 'up' ? -1 : 1)] = temp
      setSegments(newSegments)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {feedback && <Feedback
        message={feedback.message}
        {...(feedback.variant && { variant: feedback.variant })}
      />}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Create Your Podcast</h1>
        <div className="flex space-x-4 justify-center">
          <Button onClick={() => createPodcast("draft")}>Save as Draft</Button>
          <Button onClick={() => createPodcast("published")}>Publish</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="podcast-title">Podcast Title</Label>
              <Input
                id="podcast-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter podcast title"
              />
            </div>
            <div className="mb-6">
        <Label htmlFor="description">Podcast Description</Label>
        <Textarea
          id="description"
          value={description}
          placeholder="Enter a  brief introduttion of your podcast here..."
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                
                className="hidden"
              />
              <Button onClick={() => fileInputRef.current?.click()}>
                {podcast?.coverPhoto ? 'Change CoverPhoto' : 'Add CoverPhoto'}
              </Button>
      <GenreSelector selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
      <div className="bg-gray-200 p-6 rounded-lg">
        <p className="pb-2">Enter the text content of your podcast here and segment it by sentences.</p>
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
        <Label htmlFor="sentencesPerSlide">Sentences per Segment</Label>
        <Input
          id="sentencesPerSlide"
          type="number"
          value={sentencesPerSegment}
          onChange={(e) => setSentencesPerSegment(parseInt(e.target.value))}
          min={1}
          className="w-20"
        />
      </div>
      
      <Button onClick={createSegments} className="mb-6 w-full">Create Text Segments</Button>
        </div>
            <div>
              <Label>Content Type</Label>
              <RadioGroup
                value={currentContentType}
                onValueChange={(value) => setCurrentContentType(value as 'text' | 'image')}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="text" id="text" />
                  <Label htmlFor="text">Text</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="image" id="image" />
                  <Label htmlFor="image">Image URL</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="message-content">Segment Content</Label>
              {currentContentType === 'text' ? (
                <Textarea
                  id="message-content"
                  value={currentContent}
                  onChange={(e) => setCurrentContent(e.target.value)}
                  placeholder="Enter your message"
                />
              ) : (
                <div>
                <Input
                  id="message-content"
                  value={currentContent}
                  onChange={(e) => setCurrentContent(e.target.value)}
                  placeholder="Enter image URL"
                />
                <p>OR</p>
                <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "segment_photo")}
                ref={fileInputRef}
                className="hidden"
              />
              <Button onClick={() => fileInputRef.current?.click()}>
                Upload Image
              </Button>
              </div>
              )}
            </div>
            <div>
              <Label htmlFor="insert-position">Insert Position</Label>
              <Select
                value={insertPosition.toString()}
                onValueChange={(value) => setInsertPosition(value === 'start' || value === 'end' ? value : parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select insert position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="start">At the beginning</SelectItem>
                  {segments.map((_, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      After segment {index + 1}
                    </SelectItem>
                  ))}
                  <SelectItem value="end">At the end</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={addSegment} className="w-full">
              <Plus className="w-4 h-4 mr-2" /> Add Segment
            </Button>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Messages:</h2>
              {segments.map((message, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
                  <span className="truncate flex-grow mr-2">
                    {index + 1}. {message.type === 'text' ? message.content : 'Image'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => moveSegments(index, 'up')} disabled={index === 0}>
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => moveSegments(index, 'down')} disabled={index === segments.length - 1}>
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => removeSegments(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Preview</h2>
            <PodcastDisplay title={title || 'Untitled Podcast'} messages={segments} hideShowNextButton={true} />
          </div>
        </div>
      </div>
    </div>
  )
}


