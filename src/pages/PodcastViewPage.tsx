//import { useSwipeable } from 'react-swipeable';
import landscapeImage from '../assets/podcast_images/landscape_1.jpeg';
import Ini from '../assets/inimfon_ebong.jpg'
//import React
import { useState, useEffect } from 'react';
import Slide from './Slide';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface SlideData {
  text: string;
  imageUrl: string;
}

/*const slides: SlideData[] = [
    { text: "Welcome to our presentation", imageUrl: landscapeImage },

    { text: "Discover amazing features", imageUrl: Ini },
    { text: "Join us on this journey", imageUrl: landscapeImage },
]*/

export default function PodcastViewPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState(null);
  const location = useLocation();

    const { podcast } = location.state || {};
    useEffect(() => {
      if (podcast) {
        setSlides(podcast.slides);
      }
    }, []);
    console.log(podcast)
    console.log(podcast.slides)
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); // Auto-advance every 5 seconds
    return () => clearInterval(timer);
  }, [slides]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500">
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
