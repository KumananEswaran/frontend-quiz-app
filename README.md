# Interactive Rating Component: <a target="_blank" href="https://fm-quiz-app.netlify.app/">Visit Here</a>
 
<a href="https://fm-quiz-app.netlify.app/" target="_blank">
 
![image](https://github.com/user-attachments/assets/aec0f042-5f99-40a5-a881-204d1f497e5e)

![image](https://github.com/user-attachments/assets/4788c94e-163c-4c49-beb7-6aaf29a492eb)

![image](https://github.com/user-attachments/assets/ada35ef3-b306-469c-95d7-ea86ceee5315)

![image](https://github.com/user-attachments/assets/5ff08e70-5a5d-42f4-8105-2cb79b77d21d)

 
### INTERACTIVE FRONTEND QUIZ APP - FRONTEND MENTOR CHALLENGE

## Tech used: ![HTML5 BADGE](https://img.shields.io/static/v1?label=|&message=HTML5&color=23555f&style=plastic&logo=html5)![CSS BADGE](https://img.shields.io/static/v1?label=|&message=CSS3&color=285f65&style=plastic&logo=css3)![JAVASCRIPT BADGE](https://img.shields.io/static/v1?label=|&message=JAVASCRIPT&color=3c7f5d&style=plastic&logo=javascript)

This project is an interactive quiz app with dark mode functionality, where users can choose subjects (HTML, CSS, JavaScript, Accessibility), answer questions, and track their score.

## What I'm Most Proud Of:

Dynamic Question Handling: The showQuestion() function effectively updates the displayed question and options based on the current question index.

Answer Validation: The logic in submitButton.addEventListener('click', ...) for checking the selected answer and providing visual feedback (correct/incorrect icons)

## What I'd Do Differently:

Improve Event Delegation

Improve mobile responsiveness

## Challenges Encountered:

Handling Dynamic Data for Questions: I structured the question data into separate objects for each subject (stored in questionSets) and used event listeners on subject buttons to trigger the startQuiz() function, dynamically updating the questions and category-related content based on the selected subject.

Preventing User from Skipping Questions: I added validation in the submitButton click handler to check if an answer was selected. If no option was selected, a warning message was shown, ensuring that the user had to make a selection before moving forward.
