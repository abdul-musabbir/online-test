import React from 'react';
import type { Question as QuestionType } from '../types';

interface QuestionProps {
  question: QuestionType;
  selectedAnswer: number | null;
  onAnswerSelect: (answer: number) => void;
}

const Question: React.FC<QuestionProps> = ({ 
  question, 
  selectedAnswer, 
  onAnswerSelect 
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Question {question.id}
        </h2>
        <span className="px-3 sm:px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-xs sm:text-sm font-medium">
          {question.image ? 'Visual Question' : 'Text Question'}
        </span>
      </div>
      
      {question.image && (
        <div className="mb-6">
          <img
            src={question.image}
            alt="Question visual"
            className="rounded-xl w-full object-cover max-h-[300px] sm:max-h-[400px]"
          />
        </div>
      )}
      
      <p className="text-gray-700 text-base sm:text-lg mb-6 font-medium">{question.text}</p>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`w-full flex items-center p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-200
              ${selectedAnswer === index 
                ? 'bg-blue-50 border-2 border-blue-500 shadow-md transform scale-[1.02]' 
                : 'border-2 border-gray-100 hover:border-blue-100 hover:bg-blue-50/30'}`}
          >
            <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center
              ${selectedAnswer === index 
                ? 'border-blue-500 bg-blue-500' 
                : 'border-gray-300'}`}
            >
              {selectedAnswer === index && (
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />
              )}
            </div>
            <span className="ml-3 text-gray-700 font-medium text-left text-sm sm:text-base">
              {String.fromCharCode(65 + index)}. {option}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;