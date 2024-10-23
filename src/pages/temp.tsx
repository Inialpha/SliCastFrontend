/*import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
//import landscapeImage from '../assets/podcast_images/landscape_1.jpeg';
import landscapeImage from '../assets/podcast_images/landscape_1.jpeg';
import Ini from '../assets/inimfon_ebong.jpg'
interface SlidablePageProps {
  backgroundImage: string;
  text: string;
}

export default function SlidablePage() {
console.log(landscapeImage);
  const [offset, setOffset] = useState(0);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      setOffset(eventData.deltaX);
    },
    onSwiped: () => {
      setOffset(0);
    },
  });

  return (
    <div className="relative w-full h-screen overflow-hidden" {...handlers}>start
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out h-full"
        style={{
          backgroundImage: `url(${Ini})`,
          transform: `translateX(${offset}px)`,
          opacity: 0.5, // Lowered opacity for the background image
        }}
      >new
      <div
        className="relative z-10 flex items-center justify-center h-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(${offset}px)` }}
      >
        <h1 className="text-4xl font-bold text-white text-center px-4">
          text
        </h1>
      </div>
      </div>
    </div>
  );
}*/
