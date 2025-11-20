const jsQuizQuestions = [
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "define", "let", "int"],
    answer: "var",
  },
  {
    question: "What is the correct way to write a comment in JavaScript?",
    options: [
      "// This is a comment",
      "<!-- This is a comment -->",
      "# This is a comment",
      "**comment**",
    ],
    answer: "// This is a comment",
  },
  {
    question: "Which method is used to convert JSON to an object?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.convert()",
      "JSON.object()",
    ],
    answer: "JSON.parse()",
  },
  {
    question: "Which symbol is used for strict equality comparison?",
    options: ["==", "===", "!=", "=>"],
    answer: "===",
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["String", "Number", "Boolean", "Character"],
    answer: "Character",
  },
  {
    question: "Which built-in method removes the last element from an array?",
    options: ["shift()", "pop()", "push()", "slice()"],
    answer: "pop()",
  },
  {
    question: "How do you create a function in JavaScript?",
    options: [
      "function myFunc()",
      "func = myFunc()",
      "create function myFunc()",
      "function:myFunc()",
    ],
    answer: "function myFunc()",
  },
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Method",
      "Digital Operation Module",
      "Document Oriented Machine",
    ],
    answer: "Document Object Model",
  },
  {
    question: "Which method is used to add an element to the end of an array?",
    options: ["push()", "pop()", "unshift()", "append()"],
    answer: "push()",
  },
  {
    question: "Which keyword stops a loop?",
    options: ["break", "stop", "end", "halt"],
    answer: "break",
  },
];
const questionEl = document.getElementById("questionEl");
const optionList = document.getElementById("optionList");
const nextBtn = document.getElementById("nextBtn");
const scoreArea = document.getElementById("scoreArea");
const progress = document.getElementById("progress");
const counterData = document.getElementById("counterData");
function handleStartNowBtn() {
  const StartNowBtn = document.getElementById("startNow");
  const quizmainContent = document.getElementById("quizmainContent");
  StartNowBtn.style.display = "none";
  quizmainContent.style.display = "block";
  
}
function restartQuiz(){
const restartbtn = document.getElementById("Restart")
restartbtn.style.display='block'
}
let currentIndex = 0;
let score = 0;
let timerId = null;
function startCounter(second) {
   clearInterval(timerId)
  let counter = second;
timerId = setInterval(() => {
    // console.log(counter);
    counterData.textContent = counter;
    counter--;
    if (counter < 0) {
      clearInterval(timerId);
      console.log("stopped!");
      disableoptions()
    }
  }, 1000);
}
function disableoptions() {
  const btns = optionList.querySelectorAll("button");
  btns.forEach(btn => btn.disabled = true);
  nextBtn.disabled = false;
}


const showQuestion = () => {
  // show ques
  optionList.innerHTML = "";
  questionEl.innerHTML = "";
  progress.innerText = `Question ${currentIndex + 1} of ${
    jsQuizQuestions.length
  }`;
  console.log(jsQuizQuestions[currentIndex]);
  const currentQuestion = jsQuizQuestions[currentIndex].question;
  questionEl.innerText = currentQuestion;
  // show current opts
  const currentOpt = jsQuizQuestions[currentIndex].options;
  console.log(currentOpt);
  currentOpt.forEach((data, ind) => {
    const btn = document.createElement("button");
    btn.textContent = data;
    optionList.appendChild(btn);
    btn.addEventListener("click", () => {
      handleOnclick(data);
    });
  });
  nextBtn.disabled = true;
  startCounter(5);
};
showQuestion();

const handleOnclick = (clcickedOpt) => {
  console.log("data clicked", clcickedOpt);
  const correctAnswer = jsQuizQuestions[currentIndex].answer;
  if (clcickedOpt === correctAnswer) {
    console.log("correct answer");
    score++;
  } else {
    console.log("wrong anwer");
  }

  const btnss = optionList.querySelectorAll("button");
  for (const button of btnss) {
    const btnText = button.innerText.trim();
    button.disabled = true;

    if (btnText === clcickedOpt) {
      if (btnText === correctAnswer) {
        button.classList.add("correct");
      } else {
        button.classList.add("wrong");
      }
    }

    if (btnText === correctAnswer) {
      button.classList.add("correct");
    }
  }
  nextBtn.disabled = false;
};

nextBtn.addEventListener("click", () => {
  if (currentIndex < jsQuizQuestions.length - 1) {
    currentIndex++;
    showQuestion();
  } else {
    scoreArea.innerText = `You scored ${score} out of ${jsQuizQuestions.length}`;
  }
});
