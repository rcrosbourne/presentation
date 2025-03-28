import React from 'react';

interface QuizProps {
  question: string;
  options: string[];
  correctAnswer?: number;
  showAnswer?: boolean;
}

export const QuizComponent: React.FC<QuizProps> = ({ 
  question, 
  options, 
  correctAnswer = -1,
  showAnswer = false 
}) => {
  return (
    <div className="quiz-container my-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">{question}</h3>
      
      <div className="grid grid-cols-2 gap-4 my-8">
        {options.map((option, index) => (
          <div 
            key={index}
            className={`
              rounded-lg p-6 text-center text-xl font-medium shadow-md text-gray-800
              ${showAnswer && index === correctAnswer 
                ? "bg-green-100 border-2 border-green-500 text-green-800 font-bold" 
                : "bg-white border-2 border-blue-400 hover:bg-blue-50 hover:border-blue-600 transition-colors"
              }
            `}
          >
            {option} {showAnswer && index === correctAnswer ? "✓" : ""}
          </div>
        ))}
      </div>
    </div>
  );
};