//Creating an array for questions
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
var startBtn = document.querySelector("#startBtn");
var questionsDiv = document.querySelector("#questions");

var questionTitle = document.querySelector("#question-title");
var optionsDiv= document.querySelector("#options");
var currentAnswer =document.querySelector("#answer");

//state variables
var timeleft = 60;
var questionIndex = 0;
//holds state for setInterval
var timeInterval;

// Create event listener for start button that starts timer, hides startscreen and unhide questions

startBtn.addEventListener("click", function(){
    startScreen.setAttribute("class", "hide");
    questionsDiv.removeAttribute("class", "hide");
    questionsDiv.setAttribute("class", "start");
    
    timeInterval = setInterval(function(){
        //subtract 1 from previous timeleft state
        timeleft = timeleft - 1;
        //update screen to match timeleft state
        time.textContent = timeleft;
        if ( timeleft <= 0){
            clearInterval(timeInterval);
        }
    }, 1000);

    //Run function to display questions.
    displayQuestion();
})

function displayQuestion(){
    var currentQuestion = quizQuestions[questionIndex];
    questionTitle.textContent = currentQuestion.title;

  //Display options as buttons in an ordered list 
    if (currentQuestion.options.length<1){
      return null;
    }
    var optionsOrderedList =document.createElement("ol");
  
    
  
    currentQuestion.options.forEach(function(optionsIndex,i){ 
      var optionsList = document.createElement("li");  
      var optionsButton = document.createElement("button");
     
      optionsButton.textContent = optionsIndex;
      console.log(optionsButton); 
      optionsList.append(optionsButton);
      optionsOrderedList.append(optionsList);
    });
     optionsDiv.append(optionsOrderedList);
  };