import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface SlideProps {
  markdownContent: string;
}

export default function SlidePresentation({ markdownContent }: SlideProps) {
  const [slides, setSlides] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    // Split the markdown content by slide separator '---'
    const slideContent = markdownContent.split('---').map(slide => slide.trim());
    setSlides(slideContent);
  }, [markdownContent]);
  
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };
  
  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  
  const keyHandler = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  };
  
  useEffect(() => {
    window.addEventListener('keydown', keyHandler);
    return () => {
      window.removeEventListener('keydown', keyHandler);
    };
  }, [currentSlide]);
  
  if (slides.length === 0) {
    return <div>Loading presentation...</div>;
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-8">
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl p-12 min-h-[60vh] flex flex-col justify-center">
        <div className="text-center">
          <ReactMarkdown className="prose prose-lg max-w-none">
            {slides[currentSlide]}
          </ReactMarkdown>
        </div>
        
        <div className="absolute bottom-6 right-6 flex gap-4">
          <span className="text-gray-500 text-sm">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
      </div>
      
      <div className="mt-8 flex gap-4">
        <button 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="px-6 py-2 bg-blue-500 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button 
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="px-6 py-2 bg-blue-500 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
