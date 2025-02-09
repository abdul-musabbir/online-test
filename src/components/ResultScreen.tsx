import React from 'react';
import type { ExamResult, Question } from '../types';
import { CheckCircle, XCircle, RefreshCw, AlertCircle } from 'lucide-react';

interface ResultScreenProps {
  result: ExamResult;
  questions: Question[];
  onRetry: () => void;
  onClose: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  questions,
  onRetry,
  onClose,
}) => {
  const getScoreColor = (score: number) => {
    if (score < 65) return 'text-red-500';
    if (score < 85) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-4 sm:p-8 max-w-2xl w-full mx-auto max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-8">
          <div className={`w-16 h-16 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 flex items-center justify-center
            ${result.score < 65 ? 'bg-red-100' : 'bg-green-100'}`}>
            {result.score < 65 ? (
              <AlertCircle size={32} className="text-red-500 sm:w-10 sm:h-10" />
            ) : (
              <CheckCircle size={32} className="text-green-500 sm:w-10 sm:h-10" />
            )}
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Exam Results</h2>
          <p className={`text-4xl sm:text-5xl font-bold mb-4 ${getScoreColor(result.score)}`}>
            {result.score}%
          </p>
          
          {result.score < 65 ? (
            <p className="text-sm sm:text-base text-gray-600">
              Don't worry! You can retake the exam to improve your score.
            </p>
          ) : (
            <p className="text-sm sm:text-base text-gray-600">
              Excellent work! You have {result.attemptsLeft} attempts left to improve.
            </p>
          )}
        </div>

        <div className="space-y-4 mb-8">
          {questions.map((question, index) => {
            const userAnswer = result.answers.find(a => a.questionId === question.id);
            const isCorrect = userAnswer?.selectedAnswer === question.correctAnswer;

            return (
              <div key={index} 
                className={`p-3 sm:p-4 rounded-xl border-2 transition-colors
                  ${isCorrect 
                    ? 'border-green-100 bg-green-50' 
                    : 'border-red-100 bg-red-50'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-sm sm:text-base">Question {question.id}</span>
                      {isCorrect ? (
                        <span className="text-green-600 text-xs sm:text-sm bg-green-100 px-2 py-0.5 rounded-full">Correct</span>
                      ) : (
                        <span className="text-red-600 text-xs sm:text-sm bg-red-100 px-2 py-0.5 rounded-full">Incorrect</span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base">{question.text}</p>
                  </div>
                  {userAnswer?.selectedAnswer !== null && (
                    isCorrect ? (
                      <CheckCircle className="text-green-500 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                      <XCircle className="text-red-500 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
                    )
                  )}
                </div>
                
                {userAnswer?.selectedAnswer !== null && (
                  <div className="mt-2 text-xs sm:text-sm">
                    <p>Your answer: {String.fromCharCode(65 + userAnswer.selectedAnswer)}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end space-x-4">
          {(result.score >= 65 && result.attemptsLeft > 0) && (
            <button
              onClick={onRetry}
              className="flex items-center px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              <RefreshCw size={16} className="mr-2 sm:w-4 sm:h-4" />
              Improve Score
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 sm:px-6 py-2 sm:py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;