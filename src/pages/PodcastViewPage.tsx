//import { useSwipeable } from 'react-swipeable';
//import React
import { useState, useEffect } from 'react';
import Slide from './Slide';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface SlideData {
  text: string;
  imageUrl: string;
}


export default function PodcastViewPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState(null);
  const loc = useLocation();

    const { podcast } = loc.state || {};
    useEffect(() => {
      if (podcast) {
        podcast.slides.sort((a, b) => a.position - b.position);
        setSlides(podcast.slides);
      }
    }, []);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 160;
    const words = text.trim().split(/\s+/).length;
    const minutes = words / wordsPerMinute;
    const milliseconds = minutes * 60 * 1000;
    //console.log(slides[currentSlide].text, milliseconds)
    return Math.round(milliseconds)
}

  useEffect(() => {
    if (slides) {
      const timer = setInterval(nextSlide, calculateReadingTime(slides[currentSlide].text));
      return () => clearInterval(timer);
    }
  }, [slides, currentSlide]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides && slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-full h-full">
            <Slide text={slide.text} backgroundImage={slide.imageUrl} slide={slide} />
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides && slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
