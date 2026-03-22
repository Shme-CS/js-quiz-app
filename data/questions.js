// Quiz Questions Database
const quizQuestions = {
    javascript: [
        // Easy Questions
        {
            question: "What does 'JS' stand for?",
            answers: ["JavaScript", "JavaSource", "JustScript", "JoinScript"],
            correct: 0,
            difficulty: "easy"
        },
        {
            question: "Which symbol is used for single-line comments in JavaScript?",
            answers: ["//", "/*", "#", "--"],
            correct: 0,
            difficulty: "easy"
        },
        {
            question: "What is the correct way to declare a variable in JavaScript?",
            answers: ["var x = 5;", "variable x = 5;", "v x = 5;", "int x = 5;"],
            correct: 0,
            difficulty: "easy"
        },
        {
            question: "Which method is used to write content to the console?",
            answers: ["console.log()", "console.write()", "print()", "log()"],
            correct: 0,
            difficulty: "easy"
        },
        {
            question: "What is the result of: typeof 'Hello'?",
            answers: ["string", "text", "String", "char"],
            correct: 0,
            difficulty: "easy"
        },
        
        // Medium Questions
        {
            question: "What is a closure in JavaScript?",
            answers: [
                "A function with access to its outer scope",
                "A way to close the browser",
                "A method to end a loop",
                "A type of variable"
            ],
            correct: 0,
            difficulty: "medium"
        },
        {
            question: "Which of these is NOT a JavaScript data type?",
            answers: ["Float", "Boolean", "String", "Undefined"],
            correct: 0,
            difficulty: "medium"
        },
        {
            question: "What does the '===' operator do?",
            answers: [
                "Checks value and type equality",
                "Assigns a value",
                "Checks only value equality",
                "Compares strings only"
            ],
            correct: 0,
            difficulty: "medium"
        },
        {
            question: "What is the purpose of 'use strict'?",
            answers: [
                "Enforces stricter parsing and error handling",
                "Makes code run faster",
                "Enables ES6 features",
                "Prevents variable declaration"
            ],
            correct: 0,
            difficulty: "medium"
        },
        {
            question: "Which method adds an element to the end of an array?",
            answers: ["push()", "add()", "append()", "insert()"],
            correct: 0,
            difficulty: "medium"
        },
        
        // Hard Questions
        {
            question: "What is the output of: console.log(0.1 + 0.2 === 0.3)?",
            answers: ["false", "true", "undefined", "NaN"],
            correct: 0,
            difficulty: "hard"
        },
        {
            question: "What is event delegation in JavaScript?",
            answers: [
                "Handling events on parent elements for child elements",
                "Passing events between functions",
                "Creating custom events",
                "Preventing default behavior"
            ],
            correct: 0,
            difficulty: "hard"
        },
        {
            question: "What does the 'bind()' method do?",
            answers: [
                "Creates a new function with a specific 'this' context",
                "Combines two arrays",
                "Connects to a database",
                "Merges objects"
            ],
            correct: 0,
            difficulty: "hard"
        },
        {
            question: "What is the difference between 'null' and 'undefined'?",
            answers: [
                "null is assigned, undefined is default",
                "They are the same",
                "undefined is assigned, null is default",
                "null is a string, undefined is not"
            ],
            correct: 0,
            difficulty: "hard"
        },
        {
            question: "What is a Promise in JavaScript?",
            answers: [
                "An object representing eventual completion of an async operation",
                "A guaranteed return value",
                "A type of loop",
                "A variable declaration"
            ],
            correct: 0,
            difficulty: "hard"
        }
    ],
    
    html: [
        // Easy Questions
        {
            question: "What does HTML stand for?",
            answers: [
                "HyperText Markup Language",
                "HighText Machine Language",
                "HyperText Making Language",
                "Home Tool Markup Language"
            ],
            correct: 0,
            difficulty: "easy"
        },
        {
            question: "Which tag is used to create a hyperlink?",
            answers: ["<a>", "<link>", "<href>", "<url>"],
            correct: 0,
            difficulty: "easy"
        },
        {
            question: "Which tag is used for the largest heading?",
            answers: ["<h1>", "<heading>", "<h6>", "<head>"],
            correct: 0,
            difficulty: "easy"
        },
        {
            question: "What is the correct HTML tag for inserting a line break?",
            answers: ["<br>", "<break>", "<lb>", "<newline>"],
            correct: 0,
            difficulty: "easy"
        },
        {
            question: "Which attribute specifies an alternate text for an image?",
            answers: ["alt", "title", "text", "description"],
            correct: 0,
            difficulty: "easy"
        },
        
        // Medium Questions
        {
            question: "What is the purpose of the <meta> tag?",
            answers: [
                "Provides metadata about the HTML document",
                "Creates metadata variables",
                "Links to external files",
                "Defines page structure"
            ],
            correct: 0,
            difficulty: "medium"
        },
        {
            question: "Which HTML5 element defines navigation links?",
            answers: ["<nav>", "<navigation>", "<navigate>", "<menu>"],
            correct: 0,
            difficulty: "medium"
        },
        {
            question: "What is the correct way to make a checkbox checked by default?",
            answers: [
                '<input type="checkbox" checked>',
                '<input type="checkbox" default>',
                '<input type="checkbox" selected>',
                '<input type="checkbox" value="true">'
            ],
            correct: 0,
            difficulty: "medium"
        },
        {
            question: "Which attribute is used to specify that an input field must be filled?",
            answers: ["required", "mandatory", "needed", "validate"],
            correct: 0,
            difficulty: "medium"
        },
        {
            question: "What does the <canvas> element do?",
            answers: [
                "Draws graphics via JavaScript",
                "Creates a drawing board",
                "Displays images",
                "Creates animations"
            ],
            correct: 0,
            difficulty: "medium"
        },
        
        // Hard Questions
        {
            question: "What is the purpose of the 'data-*' attributes?",
            answers: [
                "Store custom data private to the page",
                "Define database connections",
                "Create data tables",
                "Validate form data"
            ],
            correct: 0,
            difficulty: "hard"
        },
        {
            question: "Which HTML5 element is used for self-contained content?",
            answers: ["<article>", "<section>", "<div>", "<content>"],
            correct: 0,
            difficulty: "hard"
        },
        {
            question: "What is the difference between <section> and <div>?",
            answers: [
                "<section> has semantic meaning, <div> doesn't",
                "They are identical",
                "<div> is newer than <section>",
                "<section> is only for styling"
            ],
            correct: 0,
            difficulty: "hard"
        },
        {
            question: "What is the purpose of the 'defer' attribute in <script>?",
            answers: [
                "Delays script execution until page is parsed",
                "Prevents script from running",
                "Loads script asynchronously",
                "Caches the script"
            ],
            correct: 0,
            difficulty: "hard"
        },
        {
            question: "Which attribute makes an element editable by the user?",
            answers: ["contenteditable", "editable", "userEdit", "allowEdit"],
            correct: 0,
            difficulty: "hard"
        }
    ],
    
    css: [
        // Easy Questions
        {
            question: "What does CSS stand for?",
            answers: [
                "Cascading Style Sheets",
                "Computer Style Sheets",
                "Creative Style Sheets",
                "Colorful Style Sheets"
            ],
            correct: 0,
            difficulty: "easy"
        },
        {
            question: "Which property is used to change the text color?",
            answers: ["color", "text-color", "font-color", "text-style"],
            correct: 0,
            difficulty: "easy"
        },
        {
            question: "How do you select an element with id 'header'?",
            answers: ["#header", ".header", "header", "*header"],
            correct: 0,
            difficulty: "easy"
        },
        {
            question: "Which property is used to change the background color?",
            answers: ["background-color", "bgcolor", "color-background", "bg-color"],
            correct: 0,
            difficulty: "easy"
        },
        {
            question: "How do you make text bold in CSS?",
            answers: ["font-weight: bold;", "text-style: bold;", "font: bold;", "text-weight: bold;"],
            correct: 0,
            difficulty: "easy"
        },
        
        // Medium Questions
        {
            question: "What is the CSS Box Model?",
            answers: [
                "Content, Padding, Border, Margin",
                "Header, Body, Footer",
                "Width, Height, Depth",
                "Top, Right, Bottom, Left"
            ],
            correct: 0,
            difficulty: "medium"
        },
        {
            question: "Which property is used to create space between elements?",
            answers: ["margin", "padding", "spacing", "gap"],
            correct: 0,
            difficulty: "medium"
        },
        {
            question: "What does 'display: flex;' do?",
            answers: [
                "Creates a flexible box layout",
                "Makes element flexible in size",
                "Displays element as flexible",
                "Flexes the content"
            ],
            correct: 0,
            difficulty: "medium"
        },
        {
            question: "Which unit is relative to the font-size of the root element?",
            answers: ["rem", "em", "px", "pt"],
            correct: 0,
            difficulty: "medium"
        },
        {
            question: "What is the purpose of 'z-index'?",
            answers: [
                "Controls stacking order of elements",
                "Sets the zoom level",
                "Defines element depth",
                "Creates 3D effects"
            ],
            correct: 0,
            difficulty: "medium"
        },
        
        // Hard Questions
        {
            question: "What is CSS specificity?",
            answers: [
                "Determines which CSS rule is applied by browsers",
                "How specific a selector is",
                "The speed of CSS rendering",
                "CSS file size optimization"
            ],
            correct: 0,
            difficulty: "hard"
        },
        {
            question: "What does 'position: sticky;' do?",
            answers: [
                "Toggles between relative and fixed positioning",
                "Makes element stick to cursor",
                "Prevents scrolling",
                "Fixes element permanently"
            ],
            correct: 0,
            difficulty: "hard"
        },
        {
            question: "What is the difference between 'grid' and 'flexbox'?",
            answers: [
                "Grid is 2D, Flexbox is 1D",
                "Grid is older than Flexbox",
                "Flexbox is 2D, Grid is 1D",
                "They are the same"
            ],
            correct: 0,
            difficulty: "hard"
        },
        {
            question: "What does the 'calc()' function do?",
            answers: [
                "Performs calculations to determine CSS values",
                "Calculates element size",
                "Computes color values",
                "Measures screen size"
            ],
            correct: 0,
            difficulty: "hard"
        },
        {
            question: "What is a CSS custom property (variable)?",
            answers: [
                "A value defined with -- prefix and used with var()",
                "A property unique to an element",
                "A JavaScript variable in CSS",
                "A browser-specific property"
            ],
            correct: 0,
            difficulty: "hard"
        }
    ],
    
    general: [
        // Easy Questions
        {
            question: "What is the capital of France?",
            answers: ["Paris", "London", "Berlin", "Madrid"],
            correct: 0,
            difficulty: "easy"
        },
        {
            question: "How many continents are there?",
            answers: ["7", "5", "6", "8"],
            correct: 0,
            difficulty: "easy"
        },
        {
            question: "What is the largest planet in our solar system?",
            answers: ["Jupiter", "Saturn", "Earth", "Mars"],
            correct: 0,
            difficulty: "easy"
        },
        {
            question: "How many days are in a leap year?",
            answers: ["366", "365", "364", "367"],
            correct: 0,
            difficulty: "easy"
        },
        {
            question: "What is the smallest prime number?",
            answers: ["2", "1", "3", "0"],
            correct: 0,
            difficulty: "easy"
        },
        
        // Medium Questions
        {
            question: "Who painted the Mona Lisa?",
            answers: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
            correct: 0,
            difficulty: "medium"
        },
        {
            question: "What is the speed of light?",
            answers: ["299,792 km/s", "150,000 km/s", "500,000 km/s", "100,000 km/s"],
            correct: 0,
            difficulty: "medium"
        },
        {
            question: "In which year did World War II end?",
            answers: ["1945", "1944", "1946", "1943"],
            correct: 0,
            difficulty: "medium"
        },
        {
            question: "What is the chemical symbol for gold?",
            answers: ["Au", "Go", "Gd", "Ag"],
            correct: 0,
            difficulty: "medium"
        },
        {
            question: "How many bones are in the adult human body?",
            answers: ["206", "208", "204", "210"],
            correct: 0,
            difficulty: "medium"
        },
        
        // Hard Questions
        {
            question: "What is the smallest country in the world?",
            answers: ["Vatican City", "Monaco", "San Marino", "Liechtenstein"],
            correct: 0,
            difficulty: "hard"
        },
        {
            question: "Who wrote '1984'?",
            answers: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "H.G. Wells"],
            correct: 0,
            difficulty: "hard"
        },
        {
            question: "What is the longest river in the world?",
            answers: ["Nile", "Amazon", "Yangtze", "Mississippi"],
            correct: 0,
            difficulty: "hard"
        },
        {
            question: "What is the hardest natural substance on Earth?",
            answers: ["Diamond", "Graphene", "Titanium", "Tungsten"],
            correct: 0,
            difficulty: "hard"
        },
        {
            question: "In which year was the first iPhone released?",
            answers: ["2007", "2006", "2008", "2005"],
            correct: 0,
            difficulty: "hard"
        }
    ]
};
