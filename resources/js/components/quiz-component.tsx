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
      <h3 className="text-2xl font-bold mb-6 text-gray-800 bg-yellow-100 py-2 px-4 rounded-lg inline-block">{question}</h3>
      
      <div className="grid grid-cols-2 gap-4 my-8">
        {options.map((option, index) => (
          <div 
            key={index}
            className={`
              rounded-lg p-6 text-center text-xl font-medium shadow-md text-gray-800
              ${showAnswer && index === correctAnswer 
                ? "bg-gradient-to-r from-green-100 to-green-200 border-2 border-green-500 text-green-800 font-bold transform scale-105" 
                : "bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-400 hover:bg-blue-100 hover:border-blue-600 transition-colors transform hover:scale-105"
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