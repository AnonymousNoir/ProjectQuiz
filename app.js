let currentUser;
let userResults = {};

const questions = [
  {
    question: "Sino ang naging unang pangulo ng Pilipinas?",
    options: ["Emilio Aguinaldo", "Manuel L. Quezon", "Jose P. Laurel", "Sergio Osmena"],
    correctAnswer: "Emilio Aguinaldo"
  },
  {
    question: "Saan idineklara ang kalayaan ng Pilipinas mula sa Espanya noong Hunyo 12, 1898?",
    options: ["Kawit, Cavite", "Barasoain Church, Malolos", "Balintawak, Quezon City", "Aguinaldo Shrine, Kawit"],
    correctAnswer: "Kawit, Cavite"
  },
  {
    question: "Ano ang pangalan ng tanyag na lider na nagtagumpay sa Laban sa Mactan noong 1521?",
    options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
    correctAnswer: "George Washington"
  },
  {
    question: "Ano ang kilalang lakandula ng Tondo na nakipag-ugnayan kay Ferdinand Magellan?",
    options: ["Lakandula Matanda", "Lakandula Alibasbas", "Lakandula Sulaiman", "Lakandula Ache"],
    correctAnswer: "Lakandula Alibasbas"
  },
  {
    question: "Saan naganap ang Sigaw ng Pugad Lawin?",
    options: ["Caloocan", "Balintawak", "San Juan del Monte", "Pasig"],
    correctAnswer: "Balintawak"
  },
  {
    question: "Ano ang pangalan ng kagubatan kung saan nagtago si Heneral Emilio Aguinaldo noong panahon ng himagsikan?",
    options: ["Sierra Madre", "Mount Samat", "Mount Arayat", "Biak-na-Bato"],
    correctAnswer: "Mount Arayat"
  },
  {
    question: "Sino ang \"Sublime Paralytic\" o ang pambansang bayani na naging unang Pangulo ng Malolos Republic?",
    options: ["Andres Bonifacio", "Apolinario Mabini", "Emilio Aguinaldo", "Jose Rizal"],
    correctAnswer: "Apolinario Mabini"
  },
  {
    question: "Ano ang pangalan ng huling gobernador-heneral ng Pilipinas at kauna-unahang pangulo ng Komonwelt?",
    options: ["Manuel Roxas", "Emilio Aguinaldo", "Sergio Osmena", "Douglas MacArthur"],
    correctAnswer: "Sergio Osmena"
  },
  {
    question: "Saan unang itinatag ang Unang Republika ng Pilipinas noong 1899?",
    options: ["Malolos", "Kawit", "Tanauan", "Pasig"],
    correctAnswer: "Malolos"
  },
  {
    question: "Ano ang pangalan ng kilalang bahay-kubyerta sa Corregidor kung saan huling sumuko ang mga sundalong Pilipino sa Amerikano?",
    options: ["Mile-Long Barracks", "Pacific War Memorial", "Malinta Tunnel", "Battery Way"],
    correctAnswer: "Malinta Tunnel"
  },
  {
    question: "Sino ang \"Dakilang Alagad\" ng Pambansang Wika?",
    options: ["Fernando Amorsolo", "Carlos P. Romulo", "Lope K. Santos", "Jose Palma"],
    correctAnswer: "Lope K. Santos"
  },
  {
    question: "Ano ang pangalan ng tanyag na pintor na lumikha ng Spoliarium, isang obra na nagpapakita ng trahedya ng mga Filipino sa panahon ng Espanyol?",
    options: ["Fernando Amorsolo", "Juan Luna", "Felix Resurreccion Hidalgo", "Carlos \"Botong\" Francisco"],
    correctAnswer: "Juan Luna"
  },
  {
    question: "Saan isinagawa ang unang peaceful People Power Revolution noong 1986?",
    options: ["EDSA Shrine, Quezon City", "Luneta Park, Manila", "Mendiola, Manila", "Fort Bonifacio, Taguig"],
    correctAnswer: "EDSA Shrine, Quezon City"
  },
  {
    question: "Ano ang pangalan ng tanyag na lider ng Moro National Liberation Front (MNLF) na lumaban para sa karapatan ng mga Muslim sa Mindanao?",
    options: ["Nur Misuari", "Hashim Salamat", "Abdullah Dimaporo", "Mujiv Hataman"],
    correctAnswer: "Nur Misuari"
  },
  {
    question: "Sino ang naging pangulo ng Pilipinas na kilala sa tawag na \"The Incorruptible\"?",
    options: ["Ferdinand Marcos", "Diosdado Macapagal", "Benigno Aquino III", "Ramon Magsaysay"],
    correctAnswer: "Ramon Magsaysay"
  },
  {
    question: "Ano ang pangalan ng tanyag na feministang lider na naging pangulo ng Pilipinas noong 1986?",
    options: ["Imelda Marcos", "Gloria Macapagal-Arroyo", "Corazon Aquino", "Miriam Defensor-Santiago"],
    correctAnswer: "Corazon Aquino"
  },
  {
    question: "Sa ilalim ng anong pangulo naganap ang EDSA Dos noong 2001?",
    options: ["Joseph Estrada", "Gloria Macapagal-Arroyo", "Fidel V. Ramos", "Benigno Aquino III"],
    correctAnswer: "Gloria Macapagal-Arroyo"
  },
];

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const recommendationContainer = document.getElementById("recommendation");

const askPromptButton = document.getElementById("askPromptButton");
askPromptButton.style.display = "none";


function startQuiz() {
  const usernameInput = document.getElementById("username");
  const username = usernameInput.value.trim();

  if (username === "") {
    alert("Please enter a username.");
    return;
  }

  currentUser = username;
  usernameInput.disabled = true;

  buildQuiz();
  const startButton = document.getElementById("startButton");
  startButton.style.display = "none";
}

function promptForNewUser() {
  const newUsername = prompt("Enter the username of the new user:");

  if (newUsername == ""){
    alert("Please enter a username.");
    return;
  }
  else if (newUsername != "") {
    // Check if the user already exists in userResults
    if (userResults.hasOwnProperty(newUsername)) {
      alert("The user is already exist. Please choose a different username.");
      return;
    }
    // Reset the quiz for the new user
    resetQuiz();

    // Set the new username
    currentUser = newUsername;

    // Enable the username input for the new user
    const usernameInput = document.getElementById("username");
    usernameInput.value = newUsername;
    usernameInput.disabled = true;

    // Clear previous results and recommendation
    resultContainer.innerHTML = "";
    recommendationContainer.innerHTML = "";

    // Start the quiz for the new user
    buildQuiz();

    // Scroll the page to the top
    window.scrollTo(0, 0); // or use window.scroll(0, 0);
  }
}


function resetQuiz() {
  // Reset user-related variables
  currentUser = null;
  userResults = {};

  // Clear the quiz
  quizContainer.innerHTML = "";

  // Clear the result and recommendation containers
  resultContainer.innerHTML = "";
  recommendationContainer.innerHTML = "";

  // removing the ask prompt button
  askPromptButton.style.display = "none";

  // Reset the result message
  const resultMessage = document.getElementById("result-message");
  resultMessage.textContent = "Good luck on the quiz :)";
}

function buildQuiz() {
  questions.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = `<strong>${index + 1}. ${question.question}</strong>`;

    const optionsDiv = document.createElement("div");
    optionsDiv.classList.add("options");
    question.options.forEach((option, i) => {
      optionsDiv.innerHTML += `<label><input type="radio" name="q${index}" value="${option}">${option}</label><br>`;
    });

    quizContainer.appendChild(questionDiv);
    quizContainer.appendChild(optionsDiv);
  });

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.id = "submit";
  submitButton.addEventListener("click", showResult);
  quizContainer.appendChild(submitButton);
}

function showResult() {
  let score = 0;
  const userAnswers = [];
  let allQuestionsAnswered = true;

  questions.forEach((question, index) => {
    const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
    if (selectedOption) {
      const userAnswer = selectedOption.value;
      userAnswers.push({ question: index + 1, answer: userAnswer });

      if (userAnswer === question.correctAnswer) {
        score++;
      }
    } else {
      allQuestionsAnswered = false;
    }
  });

  if (!allQuestionsAnswered) {
    alert("Please answer all questions before submitting.");
    return;
  }

  // Ask for confirmation before submitting
  const confirmSubmit = confirm("Are you sure you want to submit the quiz?");

  if (confirmSubmit)
  {
    const resultMessage = document.getElementById("result-message");
    resultMessage.textContent = `Your result: ${score} out of ${questions.length}`;
    showRecommendation(score);

    // Hide the submit button after clicking it
    const submitButton = document.getElementById("submit");
    submitButton.style.display = "none";

    // Save the user's results
    userResults[currentUser] = { score, answers: userAnswers };

    // Display progress for different takers
    displayProgress();
  }
}

function showRecommendation(score) {
  let recommendation = "";
  let recommendationClass = "";

  if (score === questions.length) {
    recommendation = "Excellent! You are a history expert.";
    recommendationClass = "excellent";
  } else if (score >= Math.ceil(questions.length * 0.75)) {
    recommendation = "Very Good! You have a strong grasp of history.";
    recommendationClass = "very-good";
  } else if (score >= Math.ceil(questions.length * 0.5)) {
    recommendation = "Fair. You have some knowledge of history.";
    recommendationClass = "fair";
  } else {
    recommendation = "Failed. You may need to brush up on your history.";
    recommendationClass = "failed";
  }

  recommendationContainer.innerHTML = `<p class="${recommendationClass}">${recommendation}</p>`;
}

function displayProgress() {
  const progressBody = document.getElementById("progress-body");

  // display the result in ascending order
  const displayUserResults = Object.entries(userResults).sort(([, a], [, b]) => a.score - b.score);

  // Update the progress table
  displayUserResults.forEach(([user, result]) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${user}</td><td>${result.score}</td><td>${questions.length}</td>`;
    progressBody.appendChild(row);
  });

  const askPromptButton = document.getElementById("askPromptButton");
  askPromptButton.style.display = "block";
}
