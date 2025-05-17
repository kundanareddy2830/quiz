import React, { useState, useEffect } from "react";
import "./App.css";

// Expanded question pool with difficulty levels
const questions = [
  // Difficulty 1 (Easy)
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4", difficulty: 1 },
  { question: "What is 5 x 6?", options: ["11", "30", "56", "60"], answer: "30", difficulty: 1 },
  { question: "What is 10 - 7?", options: ["2", "3", "4", "5"], answer: "3", difficulty: 1 },
  { question: "What is 8 ÷ 2?", options: ["2", "4", "6", "8"], answer: "4", difficulty: 1 },
  
  // Difficulty 2 (Medium)
  { question: "What is the capital of France?", options: ["Berlin", "London", "Paris", "Madrid"], answer: "Paris", difficulty: 2 },
  { question: "What is the square root of 81?", options: ["7", "8", "9", "10"], answer: "9", difficulty: 2 },
  { question: "Which planet is known as the Red Planet?", options: ["Jupiter", "Venus", "Mars", "Saturn"], answer: "Mars", difficulty: 2 },
  { question: "What is 3² + 4²?", options: ["15", "25", "35", "45"], answer: "25", difficulty: 2 },
  
  // Difficulty 3 (Hard)
  { question: "Solve: 12²", options: ["124", "144", "142", "154"], answer: "144", difficulty: 3 },
  { question: "Who developed the theory of relativity?", options: ["Newton", "Einstein", "Tesla", "Curie"], answer: "Einstein", difficulty: 3 },
  { question: "What is the value of π (pi) to two decimal places?", options: ["3.14", "3.15", "3.16", "3.17"], answer: "3.14", difficulty: 3 },
  { question: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], answer: "Au", difficulty: 3 },
  
  // Difficulty 4 (Expert)
  { question: "What is the derivative of f(x) = x³?", options: ["f'(x) = x²", "f'(x) = 2x", "f'(x) = 3x²", "f'(x) = 3x"], answer: "f'(x) = 3x²", difficulty: 4 },
  { question: "Which subatomic particle has a positive charge?", options: ["Electron", "Neutron", "Proton", "Photon"], answer: "Proton", difficulty: 4 },
  { question: "In which year was the first programmable computer invented?", options: ["1936", "1943", "1954", "1962"], answer: "1936", difficulty: 4 },
  { question: "What is Avogadro's number?", options: ["6.022 × 10²³", "6.022 × 10²²", "6.022 × 10²¹", "6.022 × 10²⁴"], answer: "6.022 × 10²³", difficulty: 4 },
];

function App() {
  const [currentDifficulty, setCurrentDifficulty] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [consecutiveIncorrect, setConsecutiveIncorrect] = useState(0);
  const [performanceHistory, setPerformanceHistory] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  
  const maxDifficulty = 4;

  // Initialize the quiz
  useEffect(() => {
    setStartTime(new Date());
    // Shuffle questions on initial load
    shuffleQuestions();
  }, []);

  // Shuffle the questions to avoid repetitive patterns
  const shuffleQuestions = () => {
    // Implementation happens on the original array, no need to modify state
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
  };

  // Filter questions by current difficulty
  const availableQuestions = questions.filter(q => q.difficulty === currentDifficulty);
  const question = availableQuestions.length > 0 
    ? availableQuestions[currentQuestionIndex % availableQuestions.length]
    : null;

  // More sophisticated difficulty adjustment logic
  const adjustDifficulty = (correct) => {
    if (correct) {
      setConsecutiveCorrect(consecutiveCorrect + 1);
      setConsecutiveIncorrect(0);
      
      // Increase difficulty after 2 consecutive correct answers
      if (consecutiveCorrect >= 1 && currentDifficulty < maxDifficulty) {
        setCurrentDifficulty(currentDifficulty + 1);
        setConsecutiveCorrect(0);
        setCurrentQuestionIndex(0);
      }
    } else {
      setConsecutiveIncorrect(consecutiveIncorrect + 1);
      setConsecutiveCorrect(0);
      
      // Decrease difficulty after 2 consecutive incorrect answers
      if (consecutiveIncorrect >= 1 && currentDifficulty > 1) {
        setCurrentDifficulty(currentDifficulty - 1);
        setConsecutiveIncorrect(0);
        setCurrentQuestionIndex(0);
      }
    }
  };

  const handleAnswer = (option) => {
    const correct = option === question.answer;
    
    // Track this question's result
    setPerformanceHistory([
      ...performanceHistory, 
      { 
        question: question.question, 
        answer: option,
        correct: correct,
        difficulty: currentDifficulty
      }
    ]);
    
    setQuestionCount(questionCount + 1);
    
    if (correct) {
      setScore(score + currentDifficulty); // Score based on difficulty
      adjustDifficulty(true);
    } else {
      adjustDifficulty(false);
    }
    
    // Check if this is the 10th question to end the quiz
    if (questionCount >= 9) {
      setEndTime(new Date());
      setShowResult(true);
    } else {
      // Go to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const restartQuiz = () => {
    setCurrentDifficulty(1);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuestionCount(0);
    setShowResult(false);
    setConsecutiveCorrect(0);
    setConsecutiveIncorrect(0);
    setPerformanceHistory([]);
    setStartTime(new Date());
    setEndTime(null);
    shuffleQuestions();
  };

  // Get a color representing the current difficulty
  const getDifficultyColor = () => {
    switch(currentDifficulty) {
      case 1: return "#4CAF50"; // Green for easy
      case 2: return "#2196F3"; // Blue for medium
      case 3: return "#FF9800"; // Orange for hard
      case 4: return "#F44336"; // Red for expert
      default: return "#4CAF50";
    }
  };

  // Get difficulty level name
  const getDifficultyName = () => {
    switch(currentDifficulty) {
      case 1: return "Easy";
      case 2: return "Medium";
      case 3: return "Hard";
      case 4: return "Expert";
      default: return "Easy";
    }
  };

  // Calculate performance metrics
  const getPerformanceMetrics = () => {
    if (performanceHistory.length === 0) return { accuracy: 0, avgDifficulty: 0 };
    
    const correctAnswers = performanceHistory.filter(item => item.correct).length;
    const accuracy = (correctAnswers / performanceHistory.length) * 100;
    
    const totalDifficulty = performanceHistory.reduce((sum, item) => sum + item.difficulty, 0);
    const avgDifficulty = totalDifficulty / performanceHistory.length;
    
    const timeSpent = endTime ? Math.floor((endTime - startTime) / 1000) : 0;
    
    return {
      accuracy,
      avgDifficulty,
      timeSpent
    };
  };

  if (!question && !showResult) {
    return <div className="App"><h2>Loading questions...</h2></div>;
  }

  if (showResult) {
    const metrics = getPerformanceMetrics();
    
    return (
      <div className="App">
        <div className="result-container">
          <h2>Quiz Complete!</h2>
          <p className="score">Your score: <strong>{score}</strong></p>
          
          <div className="metrics">
            <h3>Performance Metrics</h3>
            <p>Accuracy: <strong>{metrics.accuracy.toFixed(1)}%</strong></p>
            <p>Average Difficulty: <strong>{metrics.avgDifficulty.toFixed(2)}</strong></p>
            <p>Time Spent: <strong>{metrics.timeSpent} seconds</strong></p>
          </div>
          
          <h3>Question History</h3>
          <div className="history">
            {performanceHistory.map((item, index) => (
              <div key={index} className={`history-item ${item.correct ? 'correct' : 'incorrect'}`}>
                <span className="difficulty-badge" style={{ backgroundColor: 
                  item.difficulty === 1 ? "#4CAF50" : 
                  item.difficulty === 2 ? "#2196F3" : 
                  item.difficulty === 3 ? "#FF9800" : "#F44336" 
                }}>
                  {item.difficulty}
                </span>
                <p>{item.question}</p>
                <p>Your answer: <strong>{item.answer}</strong> ({item.correct ? "Correct" : "Incorrect"})</p>
              </div>
            ))}
          </div>
          
          <button className="restart-btn" onClick={restartQuiz}>Restart Quiz</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <h2>Adaptive Quiz App</h2>
      <div className="quiz-container">
        <div className="quiz-header">
          <div className="difficulty-indicator" style={{ backgroundColor: getDifficultyColor() }}>
            <span>Difficulty: {getDifficultyName()}</span>
          </div>
          <div className="progress-info">
            <span>Question {questionCount + 1} of 10</span>
            <span>Score: {score}</span>
          </div>
        </div>
        
        <div className="question-container">
          <h3>{question.question}</h3>
          <div className="options-container">
            {question.options.map((option, idx) => (
              <button key={idx} className="option-btn" onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
