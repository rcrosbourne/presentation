import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import SlidePresentation from '@/components/slide-presentation';

export default function Presentation() {
  const [markdownContent, setMarkdownContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the markdown file content
    fetch('/api/presentations/angels')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load presentation');
        }
        return response.json();
      })
      .then(data => {
        setMarkdownContent(data.content);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error loading presentation:', err);
        setError('Could not load the presentation. Please try again later.');
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Head title="Angels Presentation" />
      
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Loading presentation...</div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-red-500">{error}</div>
        </div>
      ) : (
        <SlidePresentation markdownContent={markdownContent} />
      )}
    </>
  );
}
