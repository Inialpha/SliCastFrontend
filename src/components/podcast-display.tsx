import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronDown } from 'lucide-react'

interface Message {
  type: 'text' | 'image';
  content: string;
}

interface PodcastProps {
  title: string;
  messages: Message[];
}

export default function PodcastDisplay({ title, messages }: PodcastProps) {
  const [visibleMessages, setVisibleMessages] = useState(1)
  const contentRef = useRef<HTMLDivElement>(null)

  const showNextMessage = () => {
    if (visibleMessages < messages.length) {
      setVisibleMessages(prev => prev + 1)
    }
  }

  useEffect(() => {
    if (contentRef.current) {
      const { scrollHeight, clientHeight } = contentRef.current
      if (scrollHeight > clientHeight) {
        contentRef.current.scrollTop = scrollHeight - clientHeight
      }
    }
  }, [visibleMessages])

  const readFileData = (file: File): string | ArrayBuffer | null => {
    console.log("new", file)
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result)
      return reader.result;
    };
    reader.onerror = () => {
      return "";
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col h-[80vh]">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div 
        ref={contentRef}
        className="space-y- flex-grow overflow-y-auto"
      >
        {messages.slice(0, visibleMessages).map((message, index) => (
          <div
            key={index}
            className="space-y-4 relative pl-6 flex-grow overflow-y-auto"
          >
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300"></div>
            <div className="flex space-y-">
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center"
                aria-hidden="true"
              >
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold">
                  {index + 1}
                </div>
                <div className="w-8 h-px bg-gray-300"></div>
              </div>
              <div className={`max-w-[90%] p-3 mt-2 rounded-lg ml-8 ${index % 2 === 0 ? 'bg-blue-100' : 'bg-green-100'} text-gray-600 relative`}>
                {message.type === 'text' ? (
                  <p className="text-gray-800">{message.text}</p>
                ) : (
                  <img
                    src={message.image}
                    alt={`Podcast visual ${index + 1}`}
                    width={300}
                    height={200}
                    className="rounded-lg"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {visibleMessages < messages.length && (
        <Button 
          onClick={showNextMessage}
          className="mt-4 self-center"
        >
          <ChevronDown className="mr-2 h-4 w-4" /> Show Next
        </Button>
      )}
    </div>
  )
}


