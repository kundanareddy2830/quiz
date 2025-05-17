import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// Expanded question pool with difficulty levels and explanations
const allQuestions = [
  // Difficulty 1 (Easy)
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4", difficulty: 1, category: "Math", explanation: "2 + 2 = 4 is a basic addition fact.", hint: "Count two fingers and then two more." },
  { question: "What is 5 x 6?", options: ["11", "30", "56", "60"], answer: "30", difficulty: 1, category: "Math", explanation: "5 multiplied by 6 equals 30 (5 groups of 6).", hint: "It's the same as adding 5 six times." },
  { question: "What is 10 - 7?", options: ["2", "3", "4", "5"], answer: "3", difficulty: 1, category: "Math", explanation: "10 - 7 = 3 is a basic subtraction equation.", hint: "Count backward from 10 seven times." },
  { question: "What is 8 ÷ 2?", options: ["2", "4", "6", "8"], answer: "4", difficulty: 1, category: "Math", explanation: "8 divided by 2 equals 4 because 4 × 2 = 8.", hint: "Think of dividing 8 objects into 2 equal groups." },
  
  // Difficulty 2 (Medium)
  { question: "What is the capital of France?", options: ["Berlin", "London", "Paris", "Madrid"], answer: "Paris", difficulty: 2, category: "Geography", explanation: "Paris is the capital and largest city of France, situated on the Seine River.", hint: "It's known as the 'City of Light'." },
  { question: "What is the square root of 81?", options: ["7", "8", "9", "10"], answer: "9", difficulty: 2, category: "Math", explanation: "The square root of 81 is 9 because 9² = 81.", hint: "Think of a number that when multiplied by itself gives 81." },
  { question: "Which planet is known as the Red Planet?", options: ["Jupiter", "Venus", "Mars", "Saturn"], answer: "Mars", difficulty: 2, category: "Science", explanation: "Mars appears red because of iron oxide (rust) on its surface.", hint: "It's named after the Roman god of war." },
  { question: "What is 3² + 4²?", options: ["15", "25", "35", "45"], answer: "25", difficulty: 2, category: "Math", explanation: "3² + 4² = 9 + 16 = 25. This is also known as the Pythagorean theorem for a 3-4-5 triangle.", hint: "Calculate each square separately then add them." },
  
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

// Audio files for sound effects
const correctSound = new Audio("https://www.soundjay.com/buttons/sounds/button-09.mp3"); // Clear positive click
const incorrectSound = new Audio("https://www.soundjay.com/buttons/sounds/button-10.mp3"); // Clear buzzer sound
const tickSound = new Audio("https://www.soundjay.com/clock/sounds/clock-ticking-4.mp3"); // Clear tick sound
const confettiSound = new Audio("https://www.soundjay.com/human/sounds/applause-01.mp3"); // Clear celebration sound

// Achievement definitions
const achievements = [
  { id: 'perfect_quiz', name: 'Perfect Quiz', description: 'Score 100% on a quiz', icon: '🏆', unlocked: false },
  { id: 'speed_demon', name: 'Speed Demon', description: 'Answer 3 questions in under 5 seconds each', icon: '⚡', unlocked: false },
  { id: 'master_difficulty', name: 'Master of Difficulty', description: 'Reach expert difficulty in a quiz', icon: '🌟', unlocked: false },
  { id: 'hint_resistant', name: 'Hint Resistant', description: 'Complete a quiz without using hints', icon: '🧠', unlocked: false },
  { id: 'category_expert', name: 'Category Expert', description: 'Score 100% in a specific category', icon: '📚', unlocked: false }
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
  const [quizLength, setQuizLength] = useState(10);
  
  // New states for new features
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(20);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedStartingDifficulty, setSelectedStartingDifficulty] = useState(1);
  
  // New states for achievements, visualization, and sharing
  const [userAchievements, setUserAchievements] = useState([...achievements]);
  const [showAchievementNotification, setShowAchievementNotification] = useState(null);
  const [highestDifficultyReached, setHighestDifficultyReached] = useState(1);
  const [fastAnswers, setFastAnswers] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showSharePanel, setShowSharePanel] = useState(false);
  
  const timerRef = useRef(null);
  const maxDifficulty = 4;

  // Initialize the quiz
  useEffect(() => {
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

  // Confetti effect for correct answers on medium or higher difficulties
  useEffect(() => {
    if (confetti) {
      // Play confetti celebration sound
      if (soundEnabled) {
        confettiSound.currentTime = 0; // Reset sound to beginning
        confettiSound.volume = 0.6;
        confettiSound.play().catch(err => console.error("Error playing confetti sound:", err));
      }
      
      const timer = setTimeout(() => setConfetti(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [confetti, soundEnabled]);
  
  // Timer effect for timed mode
  useEffect(() => {
    if (!timerEnabled || showStartScreen || showResult || showExplanation || selectedOption !== null) return;
    
    if (timeRemaining <= 0) {
      // Time's up - handle as incorrect answer
      handleTimerExpired();
      return;
    }
    
    // Last 5 seconds, play tick sound
    if (timeRemaining <= 5 && soundEnabled) {
      tickSound.currentTime = 0; // Reset sound to beginning
      tickSound.volume = 0.3;
      tickSound.play().catch(err => console.error("Error playing sound:", err));
    }
    
    timerRef.current = setTimeout(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);
    
    return () => clearTimeout(timerRef.current);
  }, [timeRemaining, timerEnabled, showStartScreen, showResult, showExplanation, selectedOption]);

  // Effect for checking and awarding achievements
  useEffect(() => {
    if (showResult) {
      const newAchievements = [...userAchievements];
      const unlockedAchievements = [];
      const metrics = getPerformanceMetrics();
      
      // Check for perfect quiz
      if (metrics.accuracy === 100 && !newAchievements[0].unlocked) {
        newAchievements[0].unlocked = true;
        unlockedAchievements.push(newAchievements[0]);
      }
      
      // Check for speed demon
      if (fastAnswers >= 3 && !newAchievements[1].unlocked) {
        newAchievements[1].unlocked = true;
        unlockedAchievements.push(newAchievements[1]);
      }
      
      // Check for master of difficulty
      if (highestDifficultyReached >= 4 && !newAchievements[2].unlocked) {
        newAchievements[2].unlocked = true;
        unlockedAchievements.push(newAchievements[2]);
      }
      
      // Check for hint resistant
      if (hintsUsed === 0 && !newAchievements[3].unlocked) {
        newAchievements[3].unlocked = true;
        unlockedAchievements.push(newAchievements[3]);
      }
      
      // Check for category expert
      if (selectedCategory !== "All") {
        const categoryStats = metrics.categoryStats[selectedCategory];
        if (categoryStats && categoryStats.accuracy === 100 && !newAchievements[4].unlocked) {
          newAchievements[4].unlocked = true;
          unlockedAchievements.push(newAchievements[4]);
        }
      }
      
      setUserAchievements(newAchievements);
      
      // Show notification for new achievements one by one
      if (unlockedAchievements.length > 0) {
        let delay = 0;
        unlockedAchievements.forEach((achievement, index) => {
          setTimeout(() => {
            setShowAchievementNotification(achievement);
            setTimeout(() => setShowAchievementNotification(null), 3000);
          }, delay);
          delay += 3500;
        });
      }
    }
  }, [showResult]);

  // Update highest difficulty reached
  useEffect(() => {
    if (currentDifficulty > highestDifficultyReached) {
      setHighestDifficultyReached(currentDifficulty);
    }
  }, [currentDifficulty]);

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
    // Set starting difficulty based on user selection
    setCurrentDifficulty(selectedStartingDifficulty);
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
      setCurrentQuestionIndex(0);
      setScore(0);
      setQuestionCount(0);
      setConsecutiveCorrect(0);
      setConsecutiveIncorrect(0);
      setPerformanceHistory([]);
      resetTimer();
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
  
  // Reset timer for next question
  const resetTimer = () => {
    clearTimeout(timerRef.current);
    // Base time + adjustments for difficulty
    const baseTime = 20;
    const difficultyAdjustment = {
      1: 0,     // Easy: no adjustment
      2: -5,    // Medium: 5 seconds less
      3: -8,    // Hard: 8 seconds less
      4: -10    // Expert: 10 seconds less
    };
    
    setTimeRemaining(baseTime + (difficultyAdjustment[currentDifficulty] || 0));
  };
  
  // Handle timer expired
  const handleTimerExpired = () => {
    if (soundEnabled) {
      incorrectSound.currentTime = 0; // Reset sound to beginning
      incorrectSound.volume = 0.5;
      incorrectSound.play().catch(err => console.error("Error playing sound:", err));
    }
    
    // Record as incorrect answer
    setPerformanceHistory([
      ...performanceHistory, 
      { 
        question: question.question, 
        answer: "Time Expired",
        correct: false,
        difficulty: currentDifficulty,
        category: question.category,
        timeSpent: 20 - timeRemaining
      }
    ]);
    
    setShowCorrectAnswer(true);
    
    setTimeout(() => {
      setQuestionCount(questionCount + 1);
      adjustDifficulty(false);
      
      setSelectedOption(null);
      setShowCorrectAnswer(false);
      
      if (questionCount >= quizLength - 1) {
        setEndTime(new Date());
        setShowResult(true);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        resetTimer();
      }
    }, 2000);
  };
  
  // Show hint with penalty
  const handleShowHint = () => {
    setShowHint(true);
    setHintsUsed(hintsUsed + 1);
    // Apply small point penalty for using hint
    setScore(Math.max(0, score - 1)); // Minimum score is 0
  };

  const handleAnswer = (option) => {
    // Prevent multiple selections during animation
    if (selectedOption !== null) return;
    
    const correct = option === question.answer;
    
    // Play sound effect
    if (soundEnabled) {
      if (correct) {
        correctSound.currentTime = 0; // Reset sound to beginning
        correctSound.volume = 0.5;
        correctSound.play().catch(err => console.error("Error playing sound:", err));
      } else {
        incorrectSound.currentTime = 0; // Reset sound to beginning
        incorrectSound.volume = 0.5;
        incorrectSound.play().catch(err => console.error("Error playing sound:", err));
      }
    }
    
    // Display visual feedback before moving to next question
    setSelectedOption(option);
    setShowCorrectAnswer(true);
    
    // If correct answer at medium or higher difficulties, show confetti (changed from hard)
    if (correct && currentDifficulty >= 2) {
      setConfetti(true);
    }
    
    // Calculate time bonus (if applicable)
    let timeBonus = 0;
    if (timerEnabled && correct) {
      // More bonus points for faster answers, adjusted by difficulty
      timeBonus = Math.ceil(timeRemaining / 4) * currentDifficulty;
      
      // Track fast answers for achievement
      if (timeRemaining > 15) {
        setFastAnswers(fastAnswers + 1);
      }
    }
    
    // Track this question's result
    setPerformanceHistory([
      ...performanceHistory, 
      { 
        question: question.question, 
        answer: option,
        correct: correct,
        difficulty: currentDifficulty,
        category: question.category,
        timeSpent: 20 - timeRemaining,
        timeBonus: timeBonus
      }
    ]);
    
    // Update score
    if (correct) {
      setScore(score + currentDifficulty + timeBonus); // Score based on difficulty + time bonus
    }
    
    // Show explanation for a moment
    setShowExplanation(true);
    
    // Set timeout to show the correct answer briefly
    setTimeout(() => {
      setShowExplanation(false);
      setShowHint(false);
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
        resetTimer();
      }
    }, 3000); // Show explanation for 3 seconds
  };

  const restartQuiz = () => {
    setShowStartScreen(true);
    setShowResult(false);
    setSelectedOption(null);
    setShowCorrectAnswer(false);
    setShowExplanation(false);
    setShowHint(false);
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
    
    // Calculate average response time
    const totalResponseTime = performanceHistory.reduce((sum, item) => sum + (item.timeSpent || 0), 0);
    const avgResponseTime = totalResponseTime / performanceHistory.length;
    
    // Calculate total time bonus points
    const totalTimeBonus = performanceHistory.reduce((sum, item) => sum + (item.timeBonus || 0), 0);
    
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
      avgResponseTime,
      totalTimeBonus,
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

  // Function to handle social sharing
  const shareResult = (platform) => {
    const metrics = getPerformanceMetrics();
    const shareText = `I scored ${score} points in Adaptive Quiz with ${metrics.accuracy.toFixed(1)}% accuracy! Can you beat my score?`;
    const shareUrl = window.location.href;
    
    let shareLink = '';
    switch(platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        return;
    }
    
    window.open(shareLink, '_blank', 'width=600,height=400');
    setShowSharePanel(false);
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
          
          <div className="difficulty-selector">
            <h3>Starting Difficulty</h3>
            <div className="difficulty-buttons">
              {[1, 2, 3].map((difficulty) => (
                <button
                  key={difficulty}
                  className={`difficulty-btn ${selectedStartingDifficulty === difficulty ? 'selected' : ''}`}
                  style={{
                    borderColor: selectedStartingDifficulty === difficulty ?
                      (difficulty === 1 ? "#4CAF50" : 
                       difficulty === 2 ? "#2196F3" : "#FF9800") : 
                      "transparent",
                    backgroundColor: `rgba(${
                      difficulty === 1 ? '76, 175, 80' : 
                      difficulty === 2 ? '33, 150, 243' : 
                      '255, 152, 0'}, 0.2)`
                  }}
                  onClick={() => setSelectedStartingDifficulty(difficulty)}
                >
                  {difficulty === 1 ? "Easy" : 
                   difficulty === 2 ? "Medium" : "Hard"}
                </button>
              ))}
            </div>
          </div>
          
          <div className="quiz-options">
            <label className="option-switch">
              <input 
                type="checkbox" 
                checked={timerEnabled}
                onChange={() => setTimerEnabled(!timerEnabled)}
              />
              <span className="slider"></span>
              <span className="label">Timed Mode</span>
            </label>
            
            <label className="option-switch">
              <input 
                type="checkbox" 
                checked={soundEnabled}
                onChange={() => setSoundEnabled(!soundEnabled)}
              />
              <span className="slider"></span>
              <span className="label">Sound Effects</span>
            </label>
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
        {/* Achievement notification */}
        {showAchievementNotification && (
          <div className="achievement-notification">
            <div className="achievement-icon">{showAchievementNotification.icon}</div>
            <div className="achievement-text">
              <h4>Achievement Unlocked!</h4>
              <p>{showAchievementNotification.name}</p>
              <p className="achievement-desc">{showAchievementNotification.description}</p>
            </div>
          </div>
        )}
        
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
              {timerEnabled && (
                <>
                  <div className="metric-item">
                    <span className="metric-value">{metrics.avgResponseTime.toFixed(1)}</span>
                    <span className="metric-label">Avg. Response Time</span>
                  </div>
                  <div className="metric-item highlight">
                    <span className="metric-value">+{metrics.totalTimeBonus}</span>
                    <span className="metric-label">Time Bonus Points</span>
                  </div>
                </>
              )}
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
          
          {/* Achievements section */}
          <div className="achievements-section">
            <h3>Achievements</h3>
            <div className="achievements-grid">
              {userAchievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`achievement-badge ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                >
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-info">
                    <h4>{achievement.name}</h4>
                    <p>{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Social sharing */}
          <div className="share-section">
            <button 
              className="share-btn" 
              onClick={() => setShowSharePanel(!showSharePanel)}
            >
              Share Result
            </button>
            
            {showSharePanel && (
              <div className="share-panel">
                <button className="social-btn twitter" onClick={() => shareResult('twitter')}>
                  Twitter
                </button>
                <button className="social-btn facebook" onClick={() => shareResult('facebook')}>
                  Facebook
                </button>
                <button className="social-btn linkedin" onClick={() => shareResult('linkedin')}>
                  LinkedIn
                </button>
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
                {item.timeBonus > 0 && (
                  <p className="time-bonus">Time Bonus: +{item.timeBonus} points</p>
                )}
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
      
      {/* Achievement notification in quiz mode too */}
      {showAchievementNotification && (
        <div className="achievement-notification">
          <div className="achievement-icon">{showAchievementNotification.icon}</div>
          <div className="achievement-text">
            <h4>Achievement Unlocked!</h4>
            <p>{showAchievementNotification.name}</p>
            <p className="achievement-desc">{showAchievementNotification.description}</p>
          </div>
        </div>
      )}
      
      <h2>Adaptive Quiz: {selectedCategory}</h2>
      
      {/* Progressive difficulty visualization */}
      <div className="difficulty-progress">
        <div className="progress-track">
          {[1, 2, 3, 4].map((level) => (
            <div 
              key={level} 
              className={`progress-point ${level <= currentDifficulty ? 'reached' : ''} ${level < highestDifficultyReached ? 'passed' : ''}`}
            >
              <span className="progress-level">{level}</span>
              <span className="progress-label">
                {level === 1 ? 'Easy' : 
                 level === 2 ? 'Medium' : 
                 level === 3 ? 'Hard' : 'Expert'}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className={`quiz-container ${animateQuestion ? 'fade-in' : ''}`}>
        <div className="quiz-header">
          <div className="difficulty-indicator" style={{ backgroundColor: getDifficultyColor() }}>
            <span>Difficulty: {getDifficultyName()}</span>
          </div>
          <div className="progress-info">
            <span>Question {questionCount + 1} of {quizLength}</span>
            <span>Score: {score}</span>
            {timerEnabled && (
              <span className={`timer ${timeRemaining <= 5 ? 'timer-warning' : ''}`}>
                Time: {timeRemaining}s
              </span>
            )}
          </div>
        </div>
        
        <div className="question-container">
          <div className="question-category">
            <span style={{ backgroundColor: getCategoryColor(question.category) }}>
              {question.category}
            </span>
          </div>
          <h3>{question.question}</h3>
          
          {showExplanation && (
            <div className="explanation-box">
              <h4>{selectedOption === question.answer ? "Correct!" : "Incorrect!"}</h4>
              <p>{question.explanation}</p>
            </div>
          )}
          
          {showHint && !showExplanation && (
            <div className="hint-box">
              <p><strong>Hint:</strong> {question.hint}</p>
            </div>
          )}
          
          <div className="options-container">
            {question.options.map((option, idx) => (
              <button 
                key={idx} 
                className={getButtonClass(option)} 
                onClick={() => handleAnswer(option)}
                disabled={selectedOption !== null || showExplanation}
              >
                {option}
              </button>
            ))}
          </div>
          
          {!showExplanation && !showCorrectAnswer && !showHint && (
            <button 
              className="hint-button"
              onClick={handleShowHint}
              disabled={selectedOption !== null}
            >
              Get Hint (-1 point)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
