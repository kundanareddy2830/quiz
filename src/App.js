import React, { useState, useEffect } from "react";
import "./App.css";

// Expanded question pool with difficulty levels
const allQuestions = [
  // Difficulty 1 (Easy)
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4", difficulty: 1, category: "Math" },
  { question: "What is 5 x 6?", options: ["11", "30", "56", "60"], answer: "30", difficulty: 1, category: "Math" },
  { question: "What is 10 - 7?", options: ["2", "3", "4", "5"], answer: "3", difficulty: 1, category: "Math" },
  { question: "What is 8 ÷ 2?", options: ["2", "4", "6", "8"], answer: "4", difficulty: 1, category: "Math" },
  
  // Difficulty 2 (Medium)
  { question: "What is the capital of France?", options: ["Berlin", "London", "Paris", "Madrid"], answer: "Paris", difficulty: 2, category: "Geography" },
  { question: "What is the square root of 81?", options: ["7", "8", "9", "10"], answer: "9", difficulty: 2, category: "Math" },
  { question: "Which planet is known as the Red Planet?", options: ["Jupiter", "Venus", "Mars", "Saturn"], answer: "Mars", difficulty: 2, category: "Science" },
  { question: "What is 3² + 4²?", options: ["15", "25", "35", "45"], answer: "25", difficulty: 2, category: "Math" },
  
  // Difficulty 3 (Hard)
  { question: "Solve: 12²", options: ["124", "144", "142", "154"], answer: "144", difficulty: 3, category: "Math" },
  { question: "Who developed the theory of relativity?", options: ["Newton", "Einstein", "Tesla", "Curie"], answer: "Einstein", difficulty: 3, category: "Science" },
  { question: "What is the value of π (pi) to two decimal places?", options: ["3.14", "3.15", "3.16", "3.17"], answer: "3.14", difficulty: 3, category: "Math" },
  { question: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], answer: "Au", difficulty: 3, category: "Science" },
  
  // Difficulty 4 (Expert)
  { question: "What is the derivative of f(x) = x³?", options: ["f'(x) = x²", "f'(x) = 2x", "f'(x) = 3x²", "f'(x) = 3x"], answer: "f'(x) = 3x²", difficulty: 4, category: "Math" },
  { question: "Which subatomic particle has a positive charge?", options: ["Electron", "Neutron", "Proton", "Photon"], answer: "Proton", difficulty: 4, category: "Science" },
  { question: "In which year was the first programmable computer invented?", options: ["1936", "1943", "1954", "1962"], answer: "1936", difficulty: 4, category: "History" },
  { question: "What is Avogadro's number?", options: ["6.022 × 10²³", "6.022 × 10²²", "6.022 × 10²¹", "6.022 × 10²⁴"], answer: "6.022 × 10²³", difficulty: 4, category: "Science" },
  
  // Add more Geography questions
  { question: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Tokyo", "Bangkok"], answer: "Tokyo", difficulty: 1, category: "Geography" },
  { question: "Which country is known as the Land of Fire and Ice?", options: ["Norway", "Iceland", "Greenland", "Finland"], answer: "Iceland", difficulty: 2, category: "Geography" },
  { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific", difficulty: 2, category: "Geography" },
  { question: "Which desert is the largest in the world?", options: ["Gobi", "Kalahari", "Sahara", "Antarctic"], answer: "Antarctic", difficulty: 3, category: "Geography" },
  { question: "Which continent is the driest on Earth?", options: ["Africa", "Australia", "Antarctica", "Asia"], answer: "Antarctica", difficulty: 3, category: "Geography" },
  { question: "What is the longest river in the world?", options: ["Amazon", "Nile", "Mississippi", "Yangtze"], answer: "Nile", difficulty: 3, category: "Geography" },
  
  // Add more History questions
  { question: "In what year did World War II end?", options: ["1943", "1945", "1947", "1950"], answer: "1945", difficulty: 1, category: "History" },
  { question: "Who was the first President of the United States?", options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"], answer: "George Washington", difficulty: 1, category: "History" },
  { question: "The Renaissance period began in which country?", options: ["France", "England", "Italy", "Spain"], answer: "Italy", difficulty: 2, category: "History" },
  { question: "Who wrote 'The Art of War'?", options: ["Confucius", "Sun Tzu", "Genghis Khan", "Lao Tzu"], answer: "Sun Tzu", difficulty: 3, category: "History" },
  { question: "When was the Declaration of Independence signed?", options: ["1776", "1778", "1782", "1789"], answer: "1776", difficulty: 2, category: "History" },
  { question: "Which ancient civilization built the Machu Picchu?", options: ["Aztecs", "Mayans", "Incas", "Olmecs"], answer: "Incas", difficulty: 3, category: "History" },
  
  // Add more Science questions
  { question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "NaCl", "O2"], answer: "H2O", difficulty: 1, category: "Science" },
  { question: "How many bones are in the adult human body?", options: ["186", "206", "246", "286"], answer: "206", difficulty: 2, category: "Science" },
  { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Platinum"], answer: "Diamond", difficulty: 2, category: "Science" },
  { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "200,000 km/s", "250,000 km/s"], answer: "300,000 km/s", difficulty: 3, category: "Science" }
];

// Extract unique categories
const categories = ["All", ...new Set(allQuestions.map(q => q.category))];

function App() {
  const [questions, setQuestions] = useState([]);
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
  const [animateQuestion, setAnimateQuestion] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [perfectScore, setPerfectScore] = useState(false);
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [quizLength, setQuizLength] = useState(10); // Default quiz length
  
  const maxDifficulty = 4;

  // Initialize the quiz
  useEffect(() => {
    // Set title dynamically
    document.title = "Adaptive Quiz | Test Your Knowledge";
  }, []);
  
  // Animation effect when moving to a new question
  useEffect(() => {
    if (questionCount > 0) {
      setAnimateQuestion(true);
      const timer = setTimeout(() => setAnimateQuestion(false), 500);
      return () => clearTimeout(timer);
    }
  }, [questionCount]);

  // Confetti effect for correct answers on higher difficulties
  useEffect(() => {
    if (confetti) {
      const timer = setTimeout(() => setConfetti(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [confetti]);

  // Initialize and shuffle questions
  const initializeQuestions = () => {
    // Filter questions by category if needed
    const filteredQuestions = selectedCategory === "All" 
      ? [...allQuestions]
      : allQuestions.filter(q => q.category === selectedCategory);
    
    // Change from 10 to 5 minimum required questions
    if (filteredQuestions.length < 5) {
      alert("Not enough questions in this category. Please select another category.");
      return false;
    }
    
    let newQuestions = [...filteredQuestions];
    shuffleQuestions(newQuestions);
    setQuestions(newQuestions);
    setCurrentQuizQuestions(newQuestions);
    setStartTime(new Date());
    return true;
  };

  // Shuffle the questions to avoid repetitive patterns
  const shuffleQuestions = (questionsArray) => {
    for (let i = questionsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questionsArray[i], questionsArray[j]] = [questionsArray[j], questionsArray[i]];
    }
    return questionsArray;
  };

  // Filter questions by current difficulty
  const availableQuestions = questions.filter(q => q.difficulty === currentDifficulty);
  const question = availableQuestions.length > 0 && !showStartScreen
    ? availableQuestions[currentQuestionIndex % availableQuestions.length]
    : null;
  
  // Start quiz with selected category
  const startQuiz = () => {
    if (initializeQuestions()) {
      setShowStartScreen(false);
      setCurrentDifficulty(1);
      setCurrentQuestionIndex(0);
      setScore(0);
      setQuestionCount(0);
      setConsecutiveCorrect(0);
      setConsecutiveIncorrect(0);
      setPerformanceHistory([]);
    }
  };

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
    // Prevent multiple selections during animation
    if (selectedOption !== null) return;
    
    const correct = option === question.answer;
    
    // Display visual feedback before moving to next question
    setSelectedOption(option);
    setShowCorrectAnswer(true);
    
    // If correct answer at higher difficulties, show confetti
    if (correct && currentDifficulty >= 3) {
      setConfetti(true);
    }
    
    // Track this question's result
    setPerformanceHistory([
      ...performanceHistory, 
      { 
        question: question.question, 
        answer: option,
        correct: correct,
        difficulty: currentDifficulty,
        category: question.category
      }
    ]);
    
    // Update score
    if (correct) {
      setScore(score + currentDifficulty); // Score based on difficulty
    }
    
    // Set timeout to show the correct answer briefly
    setTimeout(() => {
      setQuestionCount(questionCount + 1);
      
      if (correct) {
        adjustDifficulty(true);
      } else {
        adjustDifficulty(false);
      }
      
      // Reset for next question
      setSelectedOption(null);
      setShowCorrectAnswer(false);
      
      // Check if this is the last question
      if (questionCount >= quizLength - 1) {
        setEndTime(new Date());
        // Check if all answers were correct
        const allCorrect = performanceHistory.every(item => item.correct) && correct;
        setPerfectScore(allCorrect);
        setShowResult(true);
      } else {
        // Go to next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setShowStartScreen(true);
    setShowResult(false);
    setSelectedOption(null);
    setShowCorrectAnswer(false);
    setConfetti(false);
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
  
  // Get category color
  const getCategoryColor = (category) => {
    switch(category) {
      case "Math": return "#9C27B0";
      case "Science": return "#2196F3";
      case "Geography": return "#4CAF50";
      case "History": return "#FF9800";
      default: return "#607D8B";
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
    
    // Calculate category performance
    const categoryStats = {};
    categories.filter(c => c !== "All").forEach(category => {
      const categoryQuestions = performanceHistory.filter(item => item.category === category);
      if (categoryQuestions.length > 0) {
        const correct = categoryQuestions.filter(item => item.correct).length;
        categoryStats[category] = {
          total: categoryQuestions.length,
          correct: correct,
          accuracy: (correct / categoryQuestions.length) * 100
        };
      }
    });
    
    return {
      accuracy,
      avgDifficulty,
      timeSpent,
      categoryStats
    };
  };

  // Get button class based on whether it's selected and correct
  const getButtonClass = (option) => {
    if (!showCorrectAnswer) return "option-btn";
    
    if (option === question.answer) {
      return "option-btn correct-answer";
    }
    
    if (option === selectedOption && option !== question.answer) {
      return "option-btn wrong-answer";
    }
    
    return "option-btn";
  };

  // Start Screen
  if (showStartScreen) {
    return (
      <div className="App">
        <div className="start-screen">
          <h1>Adaptive Quiz</h1>
          <p>Test your knowledge with questions that adapt to your skill level!</p>
          
          <div className="category-selector">
            <h3>Select a Category</h3>
            <div className="category-buttons">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'selected' : ''}`}
                  style={{ 
                    borderColor: selectedCategory === category ? 
                      (category === "All" ? "#64ffda" : getCategoryColor(category)) : 
                      "transparent" 
                  }}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="quiz-length-selector">
            <h3>Quiz Length</h3>
            <div className="quiz-length-buttons">
              {[5, 10, 15].map((length) => (
                <button
                  key={length}
                  className={`quiz-length-btn ${quizLength === length ? 'selected' : ''}`}
                  onClick={() => setQuizLength(length)}
                >
                  {length} Questions
                </button>
              ))}
            </div>
          </div>
          
          <button className="start-btn" onClick={startQuiz}>Start Quiz</button>
        </div>
      </div>
    );
  }

  if (!question && !showResult) {
    return <div className="App"><h2>Loading questions...</h2></div>;
  }

  if (showResult) {
    const metrics = getPerformanceMetrics();
    
    return (
      <div className="App">
        <div className="result-container">
          <h2>Quiz Complete!</h2>
          <div className="final-score">
            <div className="score-circle">
              <span>{score}</span>
              <small>points</small>
            </div>
          </div>
          
          <div className="metrics">
            <h3>Performance Metrics</h3>
            <div className="metrics-grid">
              <div className="metric-item">
                <span className="metric-value">{metrics.accuracy.toFixed(1)}%</span>
                <span className="metric-label">Accuracy</span>
              </div>
              <div className="metric-item">
                <span className="metric-value">{metrics.avgDifficulty.toFixed(2)}</span>
                <span className="metric-label">Avg. Difficulty</span>
              </div>
              <div className="metric-item">
                <span className="metric-value">{metrics.timeSpent}</span>
                <span className="metric-label">Seconds</span>
              </div>
            </div>
            
            {/* Category performance */}
            {Object.keys(metrics.categoryStats).length > 0 && (
              <div className="category-stats">
                <h4>Category Performance</h4>
                <div className="category-stats-grid">
                  {Object.entries(metrics.categoryStats).map(([category, stats]) => (
                    <div 
                      key={category} 
                      className="category-stat-item"
                      style={{ borderLeftColor: getCategoryColor(category) }}
                    >
                      <span className="category-name">{category}</span>
                      <div className="category-accuracy">
                        <div 
                          className="accuracy-bar" 
                          style={{ 
                            width: `${stats.accuracy}%`,
                            backgroundColor: getCategoryColor(category) 
                          }}
                        ></div>
                      </div>
                      <span className="category-score">
                        {stats.correct}/{stats.total} ({stats.accuracy.toFixed(0)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                <span 
                  className="category-tag" 
                  style={{ backgroundColor: getCategoryColor(item.category) }}
                >
                  {item.category}
                </span>
                <p>{index + 1}. {item.question}</p>
                <p>Your answer: <strong>{item.answer}</strong> {item.correct ? 
                  <span className="correct-text">✓ Correct</span> : 
                  <span className="incorrect-text">✗ Incorrect</span>}
                </p>
              </div>
            ))}
          </div>
          
          <button className="restart-btn" onClick={restartQuiz}>
            Choose New Category
          </button>
          
          {!perfectScore && (
            <p className="retry-message">
              Answer all questions correctly to master this category!
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {confetti && <div className="confetti-container">
        {Array(50).fill(null).map((_, i) => (
          <div 
            key={i} 
            className="confetti" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10px`,
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDuration: `${1 + Math.random() * 2}s`,
              animationDelay: `${Math.random() * 0.5}s`
            }}
          />
        ))}
      </div>}
      
      <h2>Adaptive Quiz: {selectedCategory}</h2>
      <div className={`quiz-container ${animateQuestion ? 'fade-in' : ''}`}>
        <div className="quiz-header">
          <div className="difficulty-indicator" style={{ backgroundColor: getDifficultyColor() }}>
            <span>Difficulty: {getDifficultyName()}</span>
          </div>
          <div className="progress-info">
            <span>Question {questionCount + 1} of {quizLength}</span>
            <span>Score: {score}</span>
          </div>
        </div>
        
        <div className="question-container">
          <div className="question-category">
            <span style={{ backgroundColor: getCategoryColor(question.category) }}>
              {question.category}
            </span>
          </div>
          <h3>{question.question}</h3>
          <div className="options-container">
            {question.options.map((option, idx) => (
              <button 
                key={idx} 
                className={getButtonClass(option)} 
                onClick={() => handleAnswer(option)}
                disabled={selectedOption !== null}
              >
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
