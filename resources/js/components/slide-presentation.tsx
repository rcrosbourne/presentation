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
  const processSlideContent = (content: string, slideIndex: number) => {
    // Special handling for the title slide (first slide)
    if (slideIndex === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-yellow-400 animate-pulse" />
          <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-blue-400 animate-bounce" />
          <div className="absolute -bottom-6 -left-6 h-16 w-16 rounded-full bg-green-400 animate-pulse" />
          <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-purple-400 animate-bounce" />
          
          <ReactMarkdown 
            components={{
              p: ({node, ...props}) => <p className="text-xl mb-6 text-gray-600 max-w-md text-center" {...props} />,
              h1: ({node, ...props}) => <h1 className="text-5xl font-bold mb-8 text-blue-600 text-center" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-3xl font-bold mb-6 text-purple-600 text-center" {...props} />,
              strong: ({node, ...props}) => <strong className="font-bold text-blue-700" {...props} />,
              img: ({node, alt, src, ...props}) => (
                <div className="mt-4 mb-8">
                  <div className="p-2 bg-gradient-to-r from-yellow-200 via-red-200 to-pink-200 rounded-full rotate-3 hover:rotate-0 transition-transform duration-300 inline-block">
                    <img 
                      src={src} 
                      alt={alt || 'Profile image'} 
                      className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-lg" 
                      {...props} 
                    />
                  </div>
                </div>
              )
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      );
    }
    
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
                ul: ({node, ...props}) => <ul className="space-y-4 mb-6 text-lg text-gray-800 mx-auto max-w-md" {...props} />,
                ol: ({node, ...props}) => <ol className="space-y-4 mb-6 text-lg text-gray-800 mx-auto max-w-md" {...props} />,
                li: ({node, ...props}) => (
                  <li className="flex items-start text-gray-800">
                    <div className="mr-3 mt-1.5 h-4 w-4 rounded-full bg-blue-500 flex-shrink-0"></div>
                    <span>{props.children}</span>
                  </li>
                ),
                strong: ({node, ...props}) => <strong className="font-bold text-blue-700" {...props} />,
                img: ({node, ...props}) => null // Don't render images here - we'll handle them separately
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
    
    // Check if the slide contains an image
    const hasImage = content.includes('![');
    
    if (hasImage) {
      // Extract image details
      const imgMatch = content.match(/!\[(.*?)\]\((.*?)\)/);
      
      if (imgMatch) {
        const [fullImgTag, alt, src] = imgMatch;
        
        // Remove the image tag from content for text rendering
        const textContent = content.replace(fullImgTag, '');
        
        // Extract title (h1 or h2) from content
        const titleMatch = textContent.match(/^#+\s+(.*)$/m);
        let title = '';
        let contentWithoutTitle = textContent;
        
        if (titleMatch) {
          title = titleMatch[0];
          contentWithoutTitle = textContent.replace(titleMatch[0], '').trim();
        }
        
        return (
          <div className="flex flex-col">
            {/* Title at the top, full width */}
            {title && (
              <div className="w-full mb-6">
                <ReactMarkdown 
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-4xl font-bold mb-6 text-blue-600 text-center" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-3xl font-bold mb-4 text-purple-600 text-center" {...props} />
                  }}
                >
                  {title}
                </ReactMarkdown>
              </div>
            )}
            
            {/* Content in two columns */}
            <div className="flex flex-col md:flex-row md:gap-8 items-center">
              <div className="md:w-1/2 mb-6 md:mb-0 flex justify-center">
                <div className="p-2 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 rounded-lg rotate-1 hover:rotate-0 transition-transform duration-300">
                  <img 
                    src={src} 
                    alt={alt || 'Presentation image'} 
                    className="max-h-[40vh] rounded-lg shadow-md border-2 border-white object-contain transform hover:scale-105 transition-transform" 
                  />
                </div>
              </div>
              <div className="md:w-1/2 text-left">
                <ReactMarkdown 
                  components={{
                    p: ({node, ...props}) => <p className="text-lg mb-4 text-gray-800 text-left" {...props} />,
                    h1: ({node, ...props}) => null, // Hide h1 as we've already rendered it
                    h2: ({node, ...props}) => null, // Hide h2 as we've already rendered it
                    h3: ({node, ...props}) => <h3 className="text-2xl font-semibold mb-3 text-gray-800 text-left" {...props} />,
                    ul: ({node, ...props}) => <ul className="space-y-4 mb-6 text-lg text-gray-800 text-left" {...props} />,
                    ol: ({node, ...props}) => <ol className="space-y-4 mb-6 text-lg text-gray-800 text-left" {...props} />,
                    li: ({node, ...props}) => (
                      <li className="flex items-start text-gray-800">
                        <div className="mr-3 mt-1.5 h-4 w-4 rounded-full bg-blue-500 flex-shrink-0"></div>
                        <span>{props.children}</span>
                      </li>
                    ),
                    strong: ({node, ...props}) => <strong className="font-bold text-blue-700" {...props} />,
                    img: ({node, ...props}) => null // Prevent rendering other images that might be in content
                  }}
                >
                  {contentWithoutTitle}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        );
      }
    }
    
    // Regular slide without quiz or images
    return (
      <ReactMarkdown 
        components={{
          p: ({node, ...props}) => <p className="text-lg mb-4 text-gray-800 text-left px-3 py-1 hover:bg-blue-50 rounded-md transition-colors" {...props} />,
          h1: ({node, ...props}) => <h1 className="text-4xl font-bold mb-6 text-blue-600 text-center bg-gradient-to-r from-blue-100 to-purple-100 py-2 px-4 rounded-lg inline-block" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-3xl font-bold mb-4 text-purple-600 text-center bg-gradient-to-r from-purple-100 to-pink-100 py-2 px-4 rounded-lg inline-block" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-2xl font-semibold mb-3 text-gray-800 text-left bg-blue-50 py-1 px-3 rounded-md inline-block" {...props} />,
          ul: ({node, ...props}) => <ul className="space-y-4 mb-6 text-lg text-gray-800 mx-auto max-w-md text-left" {...props} />,
          ol: ({node, ...props}) => <ol className="space-y-4 mb-6 text-lg text-gray-800 mx-auto max-w-md text-left" {...props} />,
          li: ({node, ...props}) => (
            <li className="flex items-start text-gray-800">
              <div className="mr-3 mt-1.5 h-4 w-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0"></div>
              <span className="hover:bg-blue-50 rounded-md transition-colors px-2">{props.children}</span>
            </li>
          ),
          strong: ({node, ...props}) => <strong className="font-bold text-blue-700 bg-blue-100 px-1 rounded" {...props} />,
          img: ({node, alt, src, ...props}) => (
            <div className="p-2 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-lg rotate-1 hover:rotate-0 transition-transform duration-300 inline-block mx-auto my-6">
              <img 
                src={src} 
                alt={alt || 'Presentation image'} 
                className="max-h-[40vh] rounded-lg shadow-md border-2 border-white transform hover:scale-105 transition-transform" 
                {...props} 
              />
            </div>
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-8 font-sans">
      <div className="relative w-full max-w-4xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-xl shadow-2xl p-12 min-h-[60vh] flex flex-col justify-center border-4 border-blue-200">
        <div className="text-center">
          {processSlideContent(slides[currentSlide], currentSlide)}
        </div>
        
        {currentSlide !== 0 && (
          <div className="absolute bottom-6 right-6 flex gap-4">
            <span className="text-gray-500 text-sm">
              {currentSlide + 1} / {slides.length}
            </span>
          </div>
        )}
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