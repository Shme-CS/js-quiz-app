# Quiz Master - Interactive Quiz Application

A modern, production-quality quiz application built with HTML5, CSS3, and Vanilla JavaScript. Test your knowledge across multiple categories with an engaging, responsive interface.

![Quiz Master](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow.svg)

## 🎯 Overview

Quiz Master is a fully-featured quiz application that demonstrates modern frontend development practices. Built without frameworks, it showcases clean JavaScript architecture, responsive design, and smooth user interactions.

## ✨ Features

### Core Features
- **Multiple Quiz Categories**: JavaScript, HTML, CSS, and General Knowledge
- **Difficulty Levels**: Easy, Medium, and Hard questions
- **Interactive Timer**: 30-second countdown per question
- **Real-time Scoring**: Track your score as you progress
- **Progress Tracking**: Visual progress bar and question counter
- **Instant Feedback**: Immediate visual feedback for correct/wrong answers
- **Comprehensive Results**: Detailed score breakdown with percentage
- **Answer Review**: Review all questions and correct answers after completion

### Advanced Features
- **Dark/Light Theme Toggle**: Persistent theme preference
- **Question Randomization**: Different questions each time
- **High Score Tracking**: Saves your best score locally
- **Smooth Animations**: Professional transitions and effects
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Keyboard Navigation**: Full accessibility support
- **Local Storage**: Persistent data across sessions

## 🚀 Technologies Used

- **HTML5**: Semantic markup and modern structure
- **CSS3**: 
  - CSS Variables for theming
  - Flexbox and Grid layouts
  - Animations and transitions
  - Media queries for responsiveness
- **JavaScript (ES6+)**:
  - Modular architecture
  - State management
  - DOM manipulation
  - Event handling
  - Local Storage API

## 📁 Project Structure

```
js-quiz-app/
│
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styles with CSS variables
├── js/
│   └── script.js          # Application logic
├── data/
│   └── questions.js       # Quiz questions database
├── assets/
│   ├── sounds/            # Sound effects (optional)
│   └── images/            # Images and icons
└── README.md              # Project documentation
```

## 🎮 How to Use

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/js-quiz-app.git
```

2. Navigate to the project directory:
```bash
cd js-quiz-app
```

3. Open `index.html` in your browser:
```bash
# On macOS
open index.html

# On Windows
start index.html

# On Linux
xdg-open index.html
```

Or use a local development server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server
```

### Playing the Quiz

1. **Select Category**: Choose from JavaScript, HTML, CSS, or General Knowledge
2. **Choose Difficulty**: Pick Easy, Medium, or Hard
3. **Answer Questions**: Click on your answer choice within 30 seconds
4. **View Results**: See your score, percentage, and performance message
5. **Review Answers**: Check which questions you got right or wrong
6. **Try Again**: Restart the quiz or choose a different category

## 🎨 Features Breakdown

### State Management
The application uses a centralized state object to manage:
- Current category and difficulty
- Question data and progress
- Score and timer
- User answers for review

### Modular Functions
```javascript
initializeApp()           // Initialize the application
loadQuestions()           // Load and filter questions
renderQuestion()          // Display current question
handleAnswerSelection()   // Process user answer
startTimer()              // Start countdown timer
stopTimer()               // Stop timer
updateProgress()          // Update progress bar
calculateScore()          // Calculate final score
showResults()             // Display results screen
restartQuiz()             // Reset and restart
saveHighScore()           // Save to localStorage
loadHighScore()           // Load from localStorage
toggleTheme()             // Switch dark/light mode
```

### Responsive Breakpoints
- **Desktop**: > 768px
- **Tablet**: 481px - 768px
- **Mobile**: < 480px

## 🎯 Code Quality

### Best Practices Implemented
- ✅ Semantic HTML5 elements
- ✅ CSS custom properties for theming
- ✅ Modular JavaScript architecture
- ✅ Minimal global variables
- ✅ Event delegation where appropriate
- ✅ Optimized DOM updates
- ✅ Accessible markup and ARIA labels
- ✅ Clean, commented code
- ✅ Consistent naming conventions
- ✅ DRY (Don't Repeat Yourself) principles

### Performance Optimizations
- Efficient DOM manipulation
- CSS animations using transforms
- Debounced event handlers
- Minimal reflows and repaints

## 🔧 Customization

### Adding New Questions

Edit `data/questions.js`:

```javascript
javascript: [
    {
        question: "Your question here?",
        answers: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correct: 0, // Index of correct answer
        difficulty: "medium"
    }
]
```

### Changing Theme Colors

Modify CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #10b981;
    --danger-color: #ef4444;
    /* Add more custom colors */
}
```

### Adjusting Timer Duration

In `js/script.js`, modify the `startTimer()` function:

```javascript
function startTimer() {
    appState.timeLeft = 30; // Change to desired seconds
    // ...
}
```

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

## 🚀 Future Improvements

- [ ] Add sound effects for interactions
- [ ] Implement multiplayer mode
- [ ] Add leaderboard with backend
- [ ] Create more question categories
- [ ] Add question difficulty mixing
- [ ] Implement timed quiz mode
- [ ] Add social sharing features
- [ ] Create quiz creation interface
- [ ] Add hints system
- [ ] Implement achievements/badges

## 📸 Screenshots

### Start Screen
![Start Screen](assets/images/screenshot-start.png)

### Quiz Screen
![Quiz Screen](assets/images/screenshot-quiz.png)

### Results Screen
![Results Screen](assets/images/screenshot-results.png)

### Dark Mode
![Dark Mode](assets/images/screenshot-dark.png)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2024 Quiz Master

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👨‍💻 Author

Created with ❤️ by [Your Name]

## 🙏 Acknowledgments

- Inspired by modern quiz applications
- Icons and emojis from Unicode standard
- Color palette inspired by Tailwind CSS
- Design principles from Material Design

---

⭐ Star this repository if you found it helpful!

📧 Questions? Open an issue or reach out!

🔗 [Live Demo](#) | [Report Bug](#) | [Request Feature](#)
