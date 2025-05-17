# Adaptive Quiz App

A React-based quiz application that intelligently adapts question difficulty based on user performance.

## Features

- **Adaptive Difficulty**: Questions dynamically adjust in difficulty based on performance
- **Performance Tracking**: Detailed metrics and history of answers
- **Visual Indicators**: Color-coded difficulty levels for intuitive user experience
- **Sophisticated Algorithm**: Increases or decreases difficulty based on consecutive correct/incorrect answers
- **Question Variety**: Pool of questions across 4 difficulty levels (Easy, Medium, Hard, Expert)
- **Score Weighting**: Higher scores for correctly answering more difficult questions

## How It Works

1. The quiz starts with easy questions (difficulty level 1)
2. Correctly answering questions increases the difficulty level
3. Incorrectly answering questions may decrease the difficulty level
4. The quiz ends after 10 questions
5. Final results show score, accuracy, average difficulty, and question history

## Technical Details

- Built with React using functional components and hooks
- Uses useState and useEffect for state management
- Implements a shuffle algorithm for randomizing questions
- Responsive design for both desktop and mobile devices
- Custom CSS for modern visual styling

## How to Run

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the development server with `npm start`

## Future Enhancements

Potential improvements for future versions:

- Adding more question categories (e.g., Science, History, Literature)
- User accounts and persistent score tracking
- Timed questions with bonus points
- Difficulty level selection at the start
- More sophisticated adaptive algorithms

## License

MIT
