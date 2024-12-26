'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, ArrowDown, ArrowUp } from 'lucide-react'
import PodcastDisplay, { Message } from '@/components/podcast-display'

export default function PodcastCreator() {
  const [title, setTitle] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [currentMessageType, setCurrentMessageType] = useState<'text' | 'image'>('text')
  const [insertPosition, setInsertPosition] = useState<'start' | 'end' | number>('end')

  const addMessage = () => {
    if (currentMessage.trim() !== '') {
      const newMessage: Message = { type: currentMessageType, content: currentMessage.trim() }
      setMessages(prevMessages => {
        if (insertPosition === 'start') {
          return [newMessage, ...prevMessages]
        } else if (insertPosition === 'end' || insertPosition >= prevMessages.length) {
          return [...prevMessages, newMessage]
        } else {
          return [
            ...prevMessages.slice(0, insertPosition as number),
            newMessage,
            ...prevMessages.slice(insertPosition as number)
          ]
        }
      })
      setCurrentMessage('')
      setInsertPosition('end')
    }
  }

  const removeMessage = (index: number) => {
    setMessages(messages.filter((_, i) => i !== index))
  }

  const moveMessage = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index > 0) || (direction === 'down' && index < messages.length - 1)) {
      const newMessages = [...messages]
      const temp = newMessages[index]
      newMessages[index] = newMessages[index + (direction === 'up' ? -1 : 1)]
      newMessages[index + (direction === 'up' ? -1 : 1)] = temp
      setMessages(newMessages)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Create Your Podcast</h1>
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
            <div>
              <Label>Message Type</Label>
              <RadioGroup
                value={currentMessageType}
                onValueChange={(value) => setCurrentMessageType(value as 'text' | 'image')}
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
              <Label htmlFor="message-content">Message Content</Label>
              {currentMessageType === 'text' ? (
                <Textarea
                  id="message-content"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Enter your message"
                />
              ) : (
                <Input
                  id="message-content"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Enter image URL"
                />
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
                  {messages.map((_, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      After message {index + 1}
                    </SelectItem>
                  ))}
                  <SelectItem value="end">At the end</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={addMessage} className="w-full">
              <Plus className="w-4 h-4 mr-2" /> Add Message
            </Button>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Messages:</h2>
              {messages.map((message, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
                  <span className="truncate flex-grow mr-2">
                    {index + 1}. {message.type === 'text' ? message.content : 'Image'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => moveMessage(index, 'up')} disabled={index === 0}>
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => moveMessage(index, 'down')} disabled={index === messages.length - 1}>
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => removeMessage(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Preview</h2>
            <PodcastDisplay title={title || 'Untitled Podcast'} messages={messages} hideShowNextButton={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

