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
    options: ["Datu Lapu-Lapu", "Rajah Sulayman", "Datu Kalantiaw", "Rajah Humabon"],
    correctAnswer: "Datu Lapu-Lapu"
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

// Get DOM elements
const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const recommendationContainer = document.getElementById("recommendation");
const askPromptButton = document.getElementById("askPromptButton");

// Hiding the ask prompt button by default
askPromptButton.style.display = "none";

// Function to start the quiz
function startQuiz() {
  // Get the username input and trim the value
  const usernameInput = document.getElementById("username");
  const username = usernameInput.value.trim();

  // Check if the username is empty
  if (username === "") {
    alert("Please Enter your username.");
    return;
  }

  // Set the current user and disable the input
  currentUser = username;
  usernameInput.disabled = true;

  // Build the quiz
  buildQuiz();

  // Hide the start button after clicking it
  const startButton = document.getElementById("startButton");
  startButton.style.display = "none";
}

// Function to prompt for a new user
function promptForNewUser() {
  // Prompt for a new username
  const newUsername = prompt("Please Enter your username:");

  // Check if the username is empty
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

    // Replacing the existing username in the input while disabling the inputbox as well
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

// Function to reset the quiz
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

// Function to build the quiz
function buildQuiz() {
  // Loop through questions and create HTML elements
  questions.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = `<strong>${index + 1}. ${question.question}</strong>`;

    const optionsDiv = document.createElement("div");
    optionsDiv.classList.add("options");
    question.options.forEach((option, i) => {
      const inputId = `q${index}_option${i}`;
      optionsDiv.innerHTML += `<label for="${inputId}"><input type="radio" name="q${index}" id="${inputId}" value="${option}">${option}</label><br>`;
    });

    quizContainer.appendChild(questionDiv);
    quizContainer.appendChild(optionsDiv);
  });

  // Create and append the submit button
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.id = "submit";
  submitButton.addEventListener("click", showResult);
  quizContainer.appendChild(submitButton);
}

// Function to display the quiz result
function showResult() {
  // Initialize variables
  let score = 0;
  const userAnswers = [];
  let allQuestionsAnswered = true;

  // Loop through questions and check user answers
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

  // Check if all questions are answered
  if (!allQuestionsAnswered) {
    alert("Please answer all questions before submitting.");
    return;
  }

  // Ask for confirmation before submitting
  const confirmSubmit = confirm("Are you sure you want to submit the quiz?");

  // Proceed if the user confirms
  if (confirmSubmit) {
    // Update result message
    const resultMessage = document.getElementById("result-message");
    resultMessage.textContent = `Your result: ${score} out of ${questions.length}`;
    // Show correct and wrong answers
    showCorrectAndWrongAnswers(userAnswers);
    // Show recommendation based on the score
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

// Function to show correct and wrong answers
function showCorrectAndWrongAnswers(userAnswers) {
  // Iterate all of the questions to check whether if it is correct or wrong
  userAnswers.forEach((userAnswer, index) => {
    const questionIndex = index;
    const correctAnswer = questions[index].correctAnswer;

    const selectedOption = document.querySelector(`input[name="q${questionIndex}"][value="${userAnswer.answer}"]`);
    const selectedLabel = selectedOption.parentElement;

    // Remove existing classes to avoid conflicts
    selectedLabel.classList.remove("correct", "incorrect");

    // Add correct or incorrect class based on the answer
    if (userAnswer.answer === correctAnswer) {
      selectedLabel.classList.add("correct");
    } else {
      selectedLabel.classList.add("incorrect");
    }
  });
}

// Function to show recommendation based on the score
function showRecommendation(score) {
  // Initialize recommendation variables
  let recommendation = "";
  let recommendationClass = "";

  // Determine recommendation based on the score
  if (score === questions.length) {
    recommendation = "Excellent! Isa kang napakagaling sa kasaysayan ng ating bansang Pilipinas! ^_^.";
    recommendationClass = "excellent";
  } else if (score >= Math.ceil(questions.length * 0.75)) {
    recommendation = "Very Good! Kahit papaano may konting mali lamang sa mga nasagutan mo, keep it up! Subukan mo ulit mag review.";
    recommendationClass = "very-good";
  } else if (score >= Math.ceil(questions.length * 0.5)) {
    recommendation = "Fair. Mukhang sakto lang ang iyong nalalaman sa kasaysayan ng Pilipinas mukhang kailangan mo yatang magbasa basa ng mga libro o artikulo patungkol sa kasaysayan ng bansang Pilipinas.";
    recommendationClass = "fair";
  } else {
    recommendation = "Failed. Minsan nakakalimutan talaga natin ang ating kasaysayan ngunit wag kang sumuko sapagkat ang karunungan ay natututuhan kapag gusto mong matutunan sa pamamagitan ng pagsasaliksik.";
    recommendationClass = "failed";
  }

  // Display the recommendation
  recommendationContainer.innerHTML = `<p class="${recommendationClass}">${recommendation}</p>`;
}

// Function to display progress in a table
function displayProgress() {
  // Get the progress table body and header
  const progressBody = document.getElementById("progress-body");
  const progressHeader = document.getElementById("progress-header");

  // Display the result in ascending order
  const displayUserResults = Object.entries(userResults).sort(([, a], [, b]) => a.score - b.score);

  // Update the progress table header
  progressHeader.innerHTML = "<th>User</th><th>Score</th><th>Total Questions</th><th>Status</th>";

  // Update the progress table
  displayUserResults.forEach(([user, result]) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${user}</td><td>${result.score}</td><td>${questions.length}</td><td>${getRecommendationClass(result.score)}</td>`;
    progressBody.appendChild(row);
  });

  // Display the ask prompt button
  askPromptButton.style.display = "block";
}

// Function to get recommendation class based on the score
function getRecommendationClass(score) {
  if (score === questions.length) {
    return "Excellent";
  } else if (score >= Math.ceil(questions.length * 0.75)) {
    return "Very Good";
  } else if (score >= Math.ceil(questions.length * 0.5)) {
    return "Fair";
  } else {
    return "Failed";
  }
}

