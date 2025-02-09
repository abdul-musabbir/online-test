import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Question from './components/Question';
import ResultScreen from './components/ResultScreen';
import { questions } from './data/questions';
import type { UserAnswer, ExamResult } from './types';
import { ChevronLeft, ChevronRight, Clock, AlertCircle } from 'lucide-react';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [attempts, setAttempts] = useState(3);
  const [showWarning, setShowWarning] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleAnswerSelect = (answer: number) => {
    setShowWarning(false);
    setUserAnswers(prev => {
      const existing = prev.find(a => a.questionId === questions[currentQuestion].id);
      if (existing) {
        return prev.map(a => 
          a.questionId === questions[currentQuestion].id 
            ? { ...a, selectedAnswer: answer }
            : a
        );
      }
      return [...prev, { 
        questionId: questions[currentQuestion].id, 
        selectedAnswer: answer 
      }];
    });
  };

  const calculateScore = () => {
    let correct = 0;
    userAnswers.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      if (question && answer.selectedAnswer === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const handleSubmit = () => {
    const score = calculateScore();
    setExamResult({
      score,
      attemptsLeft: attempts - 1,
      answers: userAnswers
    });
    setShowResults(true);
  };

  const handleRetry = () => {
    setAttempts(prev => prev - 1);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResults(false);
    setExamResult(null);
  };

  const handleClose = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResults(false);
    setExamResult(null);
    setAttempts(3);
  };

  const getCurrentAnswer = () => {
    const answer = userAnswers.find(
      a => a.questionId === questions[currentQuestion].id
    );
    return answer ? answer.selectedAnswer : null;
  };

  const handleNext = () => {
    const currentAnswer = getCurrentAnswer();
    if (currentAnswer === null) {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    setCurrentQuestion(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} />
      <TopNav isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <main className={`transition-all duration-300 pt-16 p-4 sm:p-8 ${sidebarOpen ? 'ml-0 md:ml-64' : 'ml-0 md:ml-20'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                  Mathematics Final Exam
                </h1>
                <p className="text-sm sm:text-base text-gray-500">
                  Answer all questions carefully. You can review your answers before submission.
                </p>
              </div>
              <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg shrink-0">
                <Clock size={20} className="text-blue-600" />
                <span className="text-blue-600 font-medium">45:00</span>
              </div>
            </div>
          </div>

          <Question
            question={questions[currentQuestion]}
            selectedAnswer={getCurrentAnswer()}
            onAnswerSelect={handleAnswerSelect}
          />

          {showWarning && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center text-red-600">
              <AlertCircle size={20} className="mr-2 flex-shrink-0" />
              <p className="text-sm sm:text-base">Please select an answer before proceeding to the next question.</p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestion(prev => prev - 1)}
              disabled={currentQuestion === 0}
              className={`flex items-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-200 text-sm sm:text-base
                ${currentQuestion === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-blue-600 hover:bg-blue-50 border border-gray-200 hover:border-blue-200'
                }`}
            >
              <ChevronLeft size={18} className="mr-1 sm:mr-2" />
              Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={userAnswers.length !== questions.length}
                className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl transition-all duration-200 text-sm sm:text-base
                  ${userAnswers.length === questions.length
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
              >
                Submit Exam
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 border border-gray-200 hover:border-blue-200 transition-all duration-200 text-sm sm:text-base"
              >
                Next
                <ChevronRight size={18} className="ml-1 sm:ml-2" />
              </button>
            )}
          </div>

          <div className="mt-8 flex justify-center">
            <div className="flex flex-wrap gap-2 justify-center">
              {questions.map((_, index) => {
                const isAnswered = userAnswers.find(a => a.questionId === questions[index].id);
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-200
                      ${index === currentQuestion
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110'
                        : isAnswered
                          ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                          : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                      }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {showResults && examResult && (
        <ResultScreen
          result={examResult}
          questions={questions}
          onRetry={handleRetry}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

export default App;