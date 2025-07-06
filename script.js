const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Load previously selected answers from session storage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Display score from localStorage if quiz was submitted previously
const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  scoreElement.innerText = `Your score is ${storedScore} out of 5.`;
}

// Render questions with options and restore selections
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear any existing content
  questions.forEach((q, i) => {
    const questionDiv = document.createElement("div");

    const questionTitle = document.createElement("p");
    questionTitle.innerText = q.question;
    questionDiv.appendChild(questionTitle);

    q.choices.forEach(choice => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      // Restore from sessionStorage
      if (userAnswers[i] === choice) {
        input.checked = true;
      }

      // Save to sessionStorage on selection
      input.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionDiv);
  });
}

renderQuestions();

// Submit button handler
submitButton.addEventListener("click", () => {
  let score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) {
      score++;
    }
  });

  // Display and store score
  scoreElement.innerText = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score.toString());
});
