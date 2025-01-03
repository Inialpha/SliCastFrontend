import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import parse from 'html-react-parser';


interface SlideProps {
  backgroundImage: string;
  text: string;
}

export default function Slide({ backgroundImage, text, slide }: SlideProps = {
}) {
  const [offset, setOffset] = useState(0);
  console.log(slide)
  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      setOffset(eventData.deltaX);
    },
    onSwiped: () => {
      setOffset(0);
    },
  });

  return (
    <div className="relative w-full h-screen overflow-hidden" {...handlers}>
      {slide.backgroundImage ? ( 
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out"
          style={{
            backgroundImage: `url(${slide.backgroundImage})`,
            transform: `translateX(${offset}px)`,
            opacity: 0.5,
          }}
        />
      ) : (
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out"
        style={{
          backgroundColor: slide.backgroundColor,
          transform: `translateX(${offset}px)`,
          opacity: 0.5,
        }}
      />)}
        <div
          className="relative z-10 flex items-center justify-center h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${offset}px)` }}
        >
          <h1 className="text-center px-4">
            {parse(slide.text)}
          </h1>
        </div>
    </div>
  )
}
