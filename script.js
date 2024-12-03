document.addEventListener('DOMContentLoaded', () => {
	const switchInput = document.querySelector('.switch input');
	const body = document.body;

	switchInput.addEventListener('change', () => {
		if (switchInput.checked) {
			body.classList.add('dark-mode');
		} else {
			body.classList.remove('dark-mode');
		}
	});
});

const accessibilityButton = document.querySelector('.accessibility-btn');
const htmlButton = document.querySelector('.subjects button:nth-child(1)');
const cssButton = document.querySelector('.subjects button:nth-child(2)');
const jsButton = document.querySelector('.subjects button:nth-child(3)');
const container = document.querySelector('.container');
const containerQuestion = document.querySelector('.container-question');
const questionElement = document.querySelector('.question h2');
const answerButtonElements = document.querySelectorAll(
	'.answers button:not(#submit-answer):not(#next-question)'
);
const submitButton = document.getElementById('submit-answer');
const nextQuestion = document.getElementById('next-question');
const warningMessage = document.querySelector('.warning-message');
const questionNumberElement = document.querySelector('.question p');
const containerEnd = document.querySelector('.container-end');

let questions = [];

let currentQuestionIndex = 0;
let selectedOptionIndex = null;

htmlButton.addEventListener('click', () => startQuiz('html'));
cssButton.addEventListener('click', () => startQuiz('css'));
jsButton.addEventListener('click', () => startQuiz('javascript'));
accessibilityButton.addEventListener('click', () => startQuiz('accessibility'));

function startQuiz(subject) {
	const subjectData = questionSets[subject];
	questions = subjectData.questions;

	// Update quiz screen category
	const categoryImage = document.querySelector(
		'.container-question .category img'
	);
	const categoryTitle = document.querySelector(
		'.container-question .category h2'
	);
	categoryImage.src = subjectData.image;
	categoryImage.style.backgroundColor = subjectData.bgColor;
	categoryTitle.innerText = subjectData.name;

	// Update end screen category
	const endImage = document.querySelector('.container-end .category-end img');
	const endTitle = document.querySelector('.container-end .category-end h2');
	endImage.src = subjectData.image;
	endImage.style.backgroundColor = subjectData.bgColor;
	endTitle.innerText = subjectData.name;

	const scoreCardImage = document.querySelector('.score-category img');
	const scoreCardTitle = document.querySelector('.score-category h2');
	scoreCardImage.src = subjectData.image;
	scoreCardImage.style.backgroundColor = subjectData.bgColor;
	scoreCardTitle.innerText = subjectData.name;

	container.classList.add('hide');
	containerQuestion.classList.remove('hide');
	currentQuestionIndex = 0;
	score = 0;
	nextQuestion.style.display = 'none';
	warningMessage.style.display = 'none';
	updateQuestionNumber();
	showQuestion(currentQuestionIndex);
}

function showQuestion(index) {
	const currentQuestion = questions[index]; // Get the current question object
	questionElement.innerText = currentQuestion.question; // Set the question text

	// Loop through the options for this question
	currentQuestion.options.forEach((option, i) => {
		if (answerButtonElements[i]) {
			const span = answerButtonElements[i].querySelector('span'); // Get the span inside the button
			// Clear existing button content (coz options have HTML syntax)
			answerButtonElements[i].innerHTML = '';
			answerButtonElements[i].appendChild(span); // Add the span back
			answerButtonElements[i].appendChild(document.createTextNode(option.text)); // Appen text as plain text
			answerButtonElements[i].dataset.correct = option.correct; // Add a dataset to indicate correctness
			answerButtonElements[i].classList.remove(
				'correct',
				'incorrect',
				'disabled'
			);
			answerButtonElements[i].disabled = false;
		}
	});

	selectedOptionIndex = null; // Reset selected option
	answerButtonElements.forEach((button) => {
		button.disabled = false; // Enable button
	});
}

// Handle answer selection
answerButtonElements.forEach((button, index) => {
	button.addEventListener('click', () => {
		selectedOptionIndex = index; // Save the selected option index
	});
});

let score = 0;

// Handle answer submission
submitButton.addEventListener('click', () => {
	if (selectedOptionIndex === null) {
		warningMessage.style.display = 'flex';
	} else {
		warningMessage.style.display = 'none';
	}

	const selectedButton = answerButtonElements[selectedOptionIndex];
	const isCorrect = selectedButton.dataset.correct === 'true'; // Check if the selected answer is correct

	if (isCorrect) {
		score++;
	}

	// Add correct/incorrect icon dynamically
	const correctIcon = document.createElement('img');
	correctIcon.src = '/images/icon-correct.svg';
	correctIcon.alt = 'Correct';

	const incorrectIcon = document.createElement('img');
	incorrectIcon.src = '/images/icon-incorrect.svg';
	incorrectIcon.alt = 'Incorrect';

	// Append the appropriate icon
	selectedButton.appendChild(isCorrect ? correctIcon : incorrectIcon);
	selectedButton.classList.add(isCorrect ? 'correct' : 'incorrect');

	// Highlight the correct answer if the selected on is wrong
	if (!isCorrect) {
		answerButtonElements.forEach((button) => {
			if (button.dataset.correct === 'true' && !button.querySelector('img')) {
				button.appendChild(correctIcon.cloneNode(true));
			}
		});
	}

	// Disable all button to prevent further selectin
	answerButtonElements.forEach((button) => {
		button.disabled = true;
		button.classList.add('disabled-hover');
	});

	// Show Next Question button and hide submit
	nextQuestion.style.display = 'inline-block';
	submitButton.style.display = 'none';
});

// Handle moving to the next question
nextQuestion.addEventListener('click', () => {
	currentQuestionIndex++;
	answerButtonElements.forEach((button) => {
		button.disabled = false;
		button.classList.remove('disabled-hover');
	});
	if (currentQuestionIndex < questions.length) {
		updateQuestionNumber();
		showQuestion(currentQuestionIndex); // Show the next question
		nextQuestion.style.display = 'none';
		submitButton.style.display = 'inline-block';
	} else {
		endQuiz();
	}
});

function endQuiz() {
	containerQuestion.classList.add('hide');
	containerEnd.classList.remove('hide');

	// Update the score in the score card
	const scoreElement = document.querySelector('.score-result h2');
	const totalQuestions = questions.length;
	scoreElement.innerText = score;
	document.querySelector(
		'.score-result p'
	).innerText = `out of ${totalQuestions}`;
}

// Function to update the question number
function updateQuestionNumber() {
	questionNumberElement.innerText = `Question ${
		currentQuestionIndex + 1
	} out of ${questions.length}`;
}

// Reset the quiz for "Play Again"
const playAgainButton = document.getElementById('play-again');
playAgainButton.addEventListener('click', () => {
	score = 0;
	currentQuestionIndex = 0;
	selectedOptionIndex = null;

	containerEnd.classList.add('hide');
	container.classList.remove('hide');

	nextQuestion.style.display = 'none';
	submitButton.style.display = 'inline-block';

	showQuestion(currentQuestionIndex);
});

const questionSets = {
	accessibility: {
		name: 'Accessibility',
		image: '/images/icon-accessibility.svg',
		bgColor: '#f6e7ff',
		questions: [
			{
				question: "What does 'WCAG' stand for?",
				options: [
					{ text: 'Web Content Accessibility Guidelines', correct: true },
					{ text: 'Web Compliance Accessibility Guide', correct: false },
					{ text: 'Web Content Accessibility Goals', correct: false },
					{
						text: 'Website Compliance and Accessibility Guidelines',
						correct: false,
					},
				],
			},
			{
				question:
					'Which element is used to provide alternative text for images for screen reader users?',
				options: [
					{ text: '<alt>', correct: false },
					{ text: '<figcaption>', correct: false },
					{ text: '<description>', correct: false },
					{ text: "<img alt='description'>", correct: true },
				],
				answer: "<img alt='description'>",
			},
			{
				question: 'What does ARIA stand for in web development?',
				options: [
					{ text: 'Accessible Rich Internet Applications', correct: true },
					{ text: 'Advanced Responsive Internet Assistance', correct: false },
					{
						text: 'Accessible Responsive Internet Applications',
						correct: false,
					},
					{ text: 'Automated Responsive Internet Actions', correct: false },
				],
				answer: 'Accessible Rich Internet Applications',
			},
			{
				question: 'Which of the following is not a principle of the WCAG?',
				options: [
					{ text: 'Perceivable', correct: false },
					{ text: 'Dependable', correct: true },
					{ text: 'Operable', correct: false },
					{ text: 'Understandable', correct: false },
				],
				answer: 'Dependable',
			},
			{
				question:
					'Which of these color contrast ratios defines the minimum WCAG 2.1 Level AA requirement for normal text?',
				options: [
					{ text: '3:1', correct: false },
					{ text: '4.5:1', correct: true },
					{ text: '7:1', correct: false },
					{ text: '2:1', correct: false },
				],
				answer: '4.5:1',
			},
			{
				question:
					"Which of the following elements is inherently focusable, meaning it can receive focus without a 'tabindex' attribute?",
				options: [
					{ text: '<div>', correct: false },
					{ text: '<span>', correct: false },
					{ text: "<a href='...'>", correct: true },
					{ text: '<p>', correct: false },
				],
				answer: "<a href='...'>",
			},
			{
				question:
					"What is the purpose of the 'lang' attribute in an HTML page?",
				options: [
					{ text: 'To specify the scripting language', correct: false },
					{ text: 'To define the character set', correct: false },
					{
						text: 'To indicate the language of the page content',
						correct: true,
					},
					{ text: 'To declare a language pack', correct: false },
				],
				answer: 'To indicate the language of the page content',
			},
			{
				question:
					'Which guideline ensures that content is accessible by keyboard as well as by mouse?',
				options: [
					{ text: 'Keyboard Accessible', correct: true },
					{ text: 'Mouse Independence', correct: false },
					{ text: 'Device Independence', correct: false },
					{ text: 'Operable Controls', correct: false },
				],
				answer: 'Keyboard Accessible',
			},
			{
				question:
					"What is the role of 'skip navigation' links in web accessibility?",
				options: [
					{
						text: 'To skip over primary navigation to the main content',
						correct: true,
					},
					{
						text: 'To provide shortcuts to different sections of the website',
						correct: false,
					},
					{
						text: 'To help users skip unwanted sections like advertisements',
						correct: false,
					},
					{ text: 'To bypass broken links in the navigation', correct: false },
				],
				answer: 'To skip over primary navigation to the main content',
			},
			{
				question:
					'Which of these tools can help in checking the accessibility of a website?',
				options: [
					{ text: 'W3C Validator', correct: false },
					{ text: 'Google Lighthouse', correct: true },
					{ text: 'CSS Validator', correct: false },
					{ text: 'JavaScript Console', correct: false },
				],
				answer: 'Google Lighthouse',
			},
		],
	},

	html: {
		name: 'HTML',
		image: '/images/icon-html.svg',
		bgColor: '#fff1e9',
		questions: [
			{
				question: 'What does HTML stand for?',
				options: [
					{ text: 'Hyper Trainer Marking Language', correct: false },
					{ text: 'Hyper Text Marketing Language', correct: false },
					{ text: 'Hyper Text Markup Language', correct: true },
					{ text: 'Hyper Text Markup Leveler', correct: false },
				],
				answer: 'Hyper Text Markup Language',
			},
			{
				question:
					'Which of the following is the correct structure for an HTML document?',
				options: [
					{ text: '<html><head></head><body></body></html>', correct: true },
					{ text: '<head><html></html><body></body></head>', correct: false },
					{ text: '<body><head></head><html></html></body>', correct: false },
					{ text: '<html><body></body><head></head></html>', correct: false },
				],
				answer: '<html><head></head><body></body></html>',
			},
			{
				question:
					'Which HTML element is used to define the title of a document?',
				options: [
					{ text: '<head>', correct: false },
					{ text: '<title>', correct: true },
					{ text: '<header>', correct: false },
					{ text: '<top>', correct: false },
				],
				answer: '<title>',
			},
			{
				question: 'What is the purpose of the <body> tag in HTML?',
				options: [
					{ text: "It defines the document's head section.", correct: false },
					{
						text: 'It contains all the content such as text, images, and links.',
						correct: true,
					},
					{
						text: 'It is used to define the main content of an HTML document.',
						correct: false,
					},
					{
						text: 'It specifies the body of the email content in HTML.',
						correct: false,
					},
				],
				answer: 'It contains all the content such as text, images, and links.',
			},
			{
				question: 'Which HTML tag is used to create a hyperlink?',
				options: [
					{ text: '<hyperlink>', correct: false },
					{ text: '<link>', correct: false },
					{ text: '<a>', correct: true },
					{ text: '<href>', correct: false },
				],
				answer: '<a>',
			},
			{
				question: 'Which tag is used to display images in HTML?',
				options: [
					{ text: '<img>', correct: true },
					{ text: '<image>', correct: false },
					{ text: '<src>', correct: false },
					{ text: '<pic>', correct: false },
				],
				answer: '<img>',
			},
			{
				question:
					'What attribute is used to provide the path of an image in the <img> tag?',
				options: [
					{ text: 'link', correct: false },
					{ text: 'src', correct: true },
					{ text: 'href', correct: false },
					{ text: 'url', correct: false },
				],
				answer: 'src',
			},
			{
				question: 'Which HTML tag is used to create an unordered list?',
				options: [
					{ text: '<ul>', correct: true },
					{ text: '<ol>', correct: false },
					{ text: '<list>', correct: false },
					{ text: '<li>', correct: false },
				],
				answer: '<ul>',
			},
			{
				question: 'What does the <br> tag do?',
				options: [
					{ text: 'It breaks the text into two sections.', correct: false },
					{ text: 'It creates a bold text.', correct: false },
					{ text: 'It inserts a line break.', correct: true },
					{ text: 'It adds a new row in a table.', correct: false },
				],
				answer: 'It inserts a line break.',
			},
			{
				question: 'In HTML, what does the `fieldset` tag do?',
				options: [
					{
						text: 'It is used to group related data in a form.',
						correct: true,
					},
					{ text: 'It sets the field to a fixed size.', correct: false },
					{
						text: 'It automatically validates the fields within a form.',
						correct: false,
					},
					{ text: 'It hides the fields in a form.', correct: false },
				],
				answer: 'It is used to group related data in a form.',
			},
		],
	},

	css: {
		name: 'CSS',
		image: '/images/icon-css.svg',
		bgColor: ' #e0fdef',
		questions: [
			{
				question: 'What does CSS stand for?',
				options: [
					{ text: 'Colorful Style Sheets', correct: false },
					{ text: 'Computer Style Sheets', correct: false },
					{ text: 'Cascading Style Sheets', correct: true },
					{ text: 'Creative Style Sheets', correct: false },
				],
				answer: 'Cascading Style Sheets',
			},
			{
				question: 'Which HTML attribute is used to define inline styles?',
				options: [
					{ text: 'styles', correct: false },
					{ text: 'style', correct: true },
					{ text: 'class', correct: false },
					{ text: 'font-style', correct: false },
				],
				answer: 'style',
			},
			{
				question: 'How do you insert a comment in a CSS file?',
				options: [
					{ text: '// this is a comment //', correct: false },
					{ text: '/* this is a comment */', correct: true },
					{ text: '-- this is a comment --', correct: false },
					{ text: '<!-- this is a comment -->', correct: false },
				],
				answer: '/* this is a comment */',
			},
			{
				question:
					'Which property is used to change the background color of an element?',
				options: [
					{ text: 'color', correct: false },
					{ text: 'bgcolor', correct: false },
					{ text: 'background-color', correct: true },
					{ text: 'background', correct: false },
				],
				answer: 'background-color',
			},
			{
				question: 'How do you apply a style to all <p> elements?',
				options: [
					{ text: 'p { }', correct: true },
					{ text: '.p { }', correct: false },
					{ text: '#p { }', correct: false },
					{ text: 'all.p { }', correct: false },
				],
				answer: 'p { }',
			},
			{
				question: 'Which property is used to change the font of an element?',
				options: [
					{ text: 'font-style', correct: false },
					{ text: 'text-style', correct: false },
					{ text: 'font-family', correct: true },
					{ text: 'typeface', correct: false },
				],
				answer: 'font-family',
			},
			{
				question:
					'How do you make each word in a text start with a capital letter?',
				options: [
					{ text: 'text-transform: capitalize', correct: true },
					{ text: 'text-transform: uppercase', correct: false },
					{ text: 'text-style: capital', correct: false },
					{ text: 'font-transform: capitalize', correct: false },
				],
				answer: 'text-transform: capitalize',
			},
			{
				question: "How do you select an element with the class name 'header'?",
				options: [
					{ text: '.header', correct: true },
					{ text: '#header', correct: false },
					{ text: 'header', correct: false },
					{ text: '*header', correct: false },
				],
				answer: '.header',
			},
			{
				question: "What is the default value of the 'position' property?",
				options: [
					{ text: 'relative', correct: false },
					{ text: 'fixed', correct: false },
					{ text: 'absolute', correct: false },
					{ text: 'static', correct: true },
				],
				answer: 'static',
			},
			{
				question: 'What is the purpose of the z-index property in CSS?',
				options: [
					{ text: 'To count the number of elements', correct: false },
					{
						text: 'To set the magnification level of an element',
						correct: false,
					},
					{ text: 'To specify the stack order of an element', correct: true },
					{ text: 'To create a zoom effect', correct: false },
				],
				answer: 'To specify the stack order of an element',
			},
		],
	},

	javascript: {
		name: 'JavaScript',
		image: '/images/icon-js.svg',
		bgColor: '#ebf0ff',
		questions: [
			{
				question:
					"Which syntax is correct to output 'Hello World' in an alert box?",
				options: [
					{ text: "alertBox('Hello World');", correct: false },
					{ text: "msg('Hello World');", correct: false },
					{ text: "alert('Hello World');", correct: true },
					{ text: "msgBox('Hello World');", correct: false },
				],
				answer: "alert('Hello World');",
			},
			{
				question: "How do you call a function named 'myFunction'?",
				options: [
					{ text: 'call function myFunction()', correct: false },
					{ text: 'call myFunction()', correct: false },
					{ text: 'myFunction()', correct: true },
					{ text: 'execute myFunction()', correct: false },
				],
				answer: 'myFunction()',
			},
			{
				question: 'How to write an IF statement in JavaScript?',
				options: [
					{ text: 'if i = 5 then', correct: false },
					{ text: 'if (i == 5)', correct: true },
					{ text: 'if i == 5', correct: false },
					{ text: 'if i = 5', correct: false },
				],
				answer: 'if (i == 5)',
			},
			{
				question:
					"How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
				options: [
					{ text: 'if (i <> 5)', correct: false },
					{ text: 'if i =! 5 then', correct: false },
					{ text: 'if (i != 5)', correct: true },
					{ text: 'if i not = 5', correct: false },
				],
				answer: 'if (i != 5)',
			},
			{
				question: 'How does a FOR loop start?',
				options: [
					{ text: 'for (i = 0; i <= 5)', correct: false },
					{ text: 'for i = 1 to 5', correct: false },
					{ text: 'for (i <= 5; i++)', correct: false },
					{ text: 'for (i = 0; i <= 5; i++)', correct: true },
				],
				answer: 'for (i = 0; i <= 5; i++)',
			},
			{
				question: 'How can you add a single-line comment in JavaScript?',
				options: [
					{ text: "'This is a single-line comment", correct: false },
					{ text: '//This is a single-line comment', correct: true },
					{ text: '<!--This is a single-line comment-->', correct: false },
					{ text: '/* This is a single-line comment */', correct: false },
				],
				answer: '//This is a single-line comment',
			},
			{
				question: 'What is the correct way to write a JavaScript array?',
				options: [
					{
						text: "var colors = (1:'red', 2:'green', 3:'blue')",
						correct: false,
					},
					{ text: "var colors = ['red', 'green', 'blue']", correct: true },
					{ text: "var colors = 'red', 'green', 'blue'", correct: false },
					{
						text: "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')",
						correct: false,
					},
				],
				answer: "var colors = ['red', 'green', 'blue']",
			},
			{
				question:
					'How do you find the number with the highest value of x and y?',
				options: [
					{ text: 'Math.ceil(x, y)', correct: false },
					{ text: 'top(x, y)', correct: false },
					{ text: 'Math.max(x, y)', correct: true },
					{ text: 'Math.highest(x, y)', correct: false },
				],
				answer: 'Math.max(x, y)',
			},
			{
				question: 'Which operator is used to assign a value to a variable?',
				options: [
					{ text: '-', correct: false },
					{ text: '*', correct: false },
					{ text: '=', correct: true },
					{ text: 'x', correct: false },
				],
				answer: '=',
			},
			{
				question: 'What is the correct way to write a JavaScript object?',
				options: [
					{
						text: "var person = {firstName: 'John', lastName: 'Doe'};",
						correct: true,
					},
					{
						text: "var person = {firstName = 'John', lastName = 'Doe'};",
						correct: false,
					},
					{
						text: "var person = (firstName: 'John', lastName: 'Doe');",
						correct: false,
					},
					{
						text: "var person = (firstName = 'John', lastName = 'Doe');",
						correct: false,
					},
				],
				answer: "var person = {firstName: 'John', lastName: 'Doe'};",
			},
		],
	},
};
