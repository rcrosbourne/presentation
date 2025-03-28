import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { QuizComponent } from './quiz-component';

interface SlideProps {
  markdownContent: string;
}

export default function SlidePresentation({ markdownContent }: SlideProps) {
  const [slides, setSlides] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to process slide content and handle quiz components
  const processSlideContent = (content: string) => {
    // Check if the slide contains a quiz component
    const quizMatch = content.match(/<!--\s*QUIZ:(.*?)\s*-->/);
    
    if (quizMatch && quizMatch[1]) {
      try {
        // Parse the quiz data from the comment
        const quizData = JSON.parse(quizMatch[1]);
        const { question, options, correctAnswer, showAnswer } = quizData;
        
        // Split content into parts (before and after the quiz)
        const [beforeQuiz] = content.split('<!--');
        
        return (
          <>
            <ReactMarkdown 
              components={{
                p: ({node, ...props}) => <p className="text-lg mb-4 text-gray-800" {...props} />,
                h1: ({node, ...props}) => <h1 className="text-4xl font-bold mb-6 text-blue-600" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-3xl font-bold mb-4 text-purple-600" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-2xl font-semibold mb-3 text-gray-800" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 text-lg text-gray-800" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 text-lg text-gray-800" {...props} />,
                li: ({node, ...props}) => <li className="mb-2 text-gray-800" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-blue-700" {...props} />,
                img: ({node, alt, src, ...props}) => (
                  <img 
                    src={src} 
                    alt={alt || 'Presentation image'} 
                    className="mx-auto my-6 max-h-[40vh] rounded-lg shadow-md border-4 border-blue-200" 
                    {...props} 
                  />
                )
              }}
            >
              {beforeQuiz}
            </ReactMarkdown>
            
            <QuizComponent 
              question={question}
              options={options}
              correctAnswer={correctAnswer}
              showAnswer={showAnswer}
            />
            
            {/* Render anything after the quiz if needed */}
          </>
        );
      } catch (error) {
        console.error('Error parsing quiz data:', error);
      }
    }
    
    // Regular slide without quiz
    return (
      <ReactMarkdown 
        components={{
          p: ({node, ...props}) => <p className="text-lg mb-4 text-gray-800" {...props} />,
          h1: ({node, ...props}) => <h1 className="text-4xl font-bold mb-6 text-blue-600" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-3xl font-bold mb-4 text-purple-600" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-2xl font-semibold mb-3 text-gray-800" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 text-lg text-gray-800" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 text-lg text-gray-800" {...props} />,
          li: ({node, ...props}) => <li className="mb-2 text-gray-800" {...props} />,
          strong: ({node, ...props}) => <strong className="font-bold text-blue-700" {...props} />,
          img: ({node, alt, src, ...props}) => (
            <img 
              src={src} 
              alt={alt || 'Presentation image'} 
              className="mx-auto my-6 max-h-[40vh] rounded-lg shadow-md border-4 border-blue-200" 
              {...props} 
            />
          )
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };
  
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
          {processSlideContent(slides[currentSlide])}
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