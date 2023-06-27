//Creating an array of questions

var quizQuestions = [
  {
    title: "Commonly used data types DO NOT include:",
    options: ["strings", "booleans", "alerts", "numbers"],
    answer: 3,
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    options: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: 3,
  },
  {
    title:"Inside which HTML element do we put the JavaScript?",
    options: ["<js>", "<script>","<javascript>","<scripting>"],
    answer:2,
  },
  {
    title:'How do you write "Hello World" in an alert box?',
    options:[ 'alertBox("Hello World")',' msg("Hello World")', ' msgBox("Hello World")',' alert("Hello World")'],
    answer: 4,
  },
  {
    title:'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
    options: ['if(i!=5)',' if i =! 5 then', ' if (i<>5)',' if i<>5'],
    answer:1,
  }
];

var time = document.querySelector("#time");
var startScreen = document.querySelector("#start-screen");
var showhighScores = document.querySelector("#show-scores");
var startBtn = document.querySelector("#startBtn");
var quizScreen = document.querySelector("#quiz-screen");
var answerDiv = document.querySelector("#answer");


var endScreen = document.querySelector("#end-screen");
var scoreScreen = document.querySelector("#score-screen");
var scoreTable = document.querySelector("#score-table");

var finalScore = document.querySelector("#final-score");
var initials = document.querySelector("#initials");
var submit = document.querySelector("#submit");

//state variables
var timeleft = 75;
var questionIndex = 0;
var quizScore = 0;
let quizScores = localStorage.quizScores ? JSON.parse(localStorage.quizScores) : [];

//holds state for setInterval
var timeInterval;

// create event listener for quiz start button(s) that starts timer , hide start screen and unhide questions
let quizbtns = document.querySelectorAll("#quizstart");

for (i of quizbtns){
  i.addEventListener('click',function(){

    startScreen.setAttribute("class", "hide");
    scoreScreen.classList.add("hide");

    //display timer;
    displayTimer();
  
    //build the questions into HTML
    buildQuestions();

  
    quizScreen.classList.remove("hide");
  
    //display each question
    questionIndex = 0;
    displayQuestion();
  
  });
}

startBtn.addEventListener("click", function(){

  startScreen.setAttribute("class", "hide");
  

  //display timer;
  displayTimer();

  //build the questions into HTML
  buildQuestions();

  quizScreen.classList.remove("hide");

  //display each question
  displayQuestion();

});

showhighScores.addEventListener("click", function(){

  startScreen.classList.add("hide");
  quizScreen.classList.add("hide");
  endScreen.classList.add("hide");
  answerDiv.classList.add("hide");

  showScores();

})



function displayTimer() {
  timeInterval = setInterval(function(){
    //subtract 1 from previous timeleft state
    timeleft--;
    //update screen to match timeleft state
    time.textContent = timeleft;
    if ( timeleft <= 0){
        clearInterval(timeInterval);
    }
  }, 1000);
}

function buildQuestions(){

  var questionsDiv = document.createElement("div");
  questionsDiv.setAttribute("id", "questions");

  quizQuestions.forEach(function(question, qIndex){
    var questionDiv = document.createElement("div");
    questionDiv.setAttribute("id", "question");
    questionDiv.setAttribute("data-question", qIndex);
    questionDiv.classList.add('hide','question');

    var questionTitle = document.createElement("h2");
    questionTitle.textContent = question.title;
    questionDiv.append(questionTitle);

    var answerList = document.createElement("ol");
    answerList.setAttribute("data-answers",question.options.length);

    question.options.forEach(function(answer,aIndex){
      var answerListItem = document.createElement("li");  
      var answerButton = document.createElement("button");
      answerButton.textContent = aIndex+1+". "+answer;
      answerButton.setAttribute("data-q", qIndex);
      answerButton.setAttribute("data-a",aIndex);
      answerButton.onclick = displayAnswer;
      answerButton.addEventListener("click", displayQuestion);
      answerListItem.append(answerButton);
      answerList.append(answerListItem);
    });

    //append the answers to the question
    questionDiv.append(answerList);

    //append the questions to the main list
    questionsDiv.append(questionDiv);

  });

  quizScreen.append(questionsDiv);

}

function displayQuestion(){

  var questions = document.querySelectorAll('[data-question]');
  for (var i=0; i < questions.length; i++){
    questions[i].classList.add("question", "hide");
  }

  if (questionIndex < quizQuestions.length) {
    questions[questionIndex].classList.remove("hide");
    questionIndex++;
  } else {
    
    finalScore.innerHTML = quizScore;
    endScreen.setAttribute("class","");
  }
}


//checking for the right answer
function checkAnswer(x){

  var target = x.target;
  var findQuestion = quizQuestions[target.dataset.q];
  var chosenAnswer = parseInt(target.dataset.a,10)+1;

  if (chosenAnswer == findQuestion.answer) {
      return true;
    } else {
      return false;
  }
}

function displayAnswer(x){

//check for the Answer
  var showAnswerStatus = checkAnswer(x);

  answerDiv.classList.remove('hide');

  setTimeout(()=>{
    answerDiv.style.opacity = 1
  },0);

  //store the score, and show if correct or wrong.
  if (showAnswerStatus) {
    quizScore++;
    answerDiv.innerHTML = "Correct!";
  } else {
    timeleft = timeleft - 10;
    answerDiv.innerHTML = "Wrong!";

  }

  setTimeout(()=>{
    answerDiv.style.opacity = 0
  },500); 

  return showAnswerStatus;
}

function saveScore(){

  var nameInitial = document.getElementById("initials").value;

  quizScores.push({name: nameInitial, score: quizScore});

  if (quizScores.length > 0){
    quizScores.sort(function(a,b){return b.score - a.score});
  }

  localStorage.quizScores = JSON.stringify(quizScores);

  showScores();
}


function showScores(){

  //hide existing screens

  endScreen.classList.add("hide");
  answerDiv.classList.add("hide");

  tbl = document.createElement('table');

  tbh = document.createElement('thead');

  tbth = document.createElement('th');
  tbth.textContent = "Name";
  tbh.append(tbth);

  tbth = document.createElement('th');
  tbth.textContent = "Score";
  tbh.append(tbth);

  tbl.append(tbh);

  tbody = document.createElement('tbody');

  scoreTable.innerHTML = "";

  if (quizScores.length > 0) {

    for (let i = 0; i < quizScores.length; i++) {
      var tr = document.createElement('tr');
      var quiz = quizScores[i];

      for (key in quiz) {
        console.log(key+ ": "+ quiz[key]);
        var td = document.createElement('td');
        td.textContent = quiz[key];
        tr.appendChild(td);
      }

      tbody.appendChild(tr);

    }
  } else {
    var tr = document.createElement("tr");
    var td = document.createElement('td');
    td.setAttribute("colspan", 2);
    td.textContent = "No quiz scores yet."
    tr.appendChild(td);
    tbody.appendChild(tr);
  }

  tbl.appendChild(tbody);

  scoreTable.append(tbl);
  scoreScreen.classList.remove("hide");

}

function resetScores(){
  quizScores = [];
  localStorage.removeItem('quizScores');
  showScores();
}
