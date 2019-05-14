$(document).ready(function(){

    $("#resultsPage").hide();

    //start the game when button is clicked
    $("#startButton").on("click", playGame.startTimer);
});    


//playing the game
var playGame = {

    //set a timer
    timeRemaining : 30,

    //start timer, hide start button, display questions page
    startTimer: function() {
        $("#timer").text("Time remaining: " + playGame.timeRemaining);
        setInterval(playGame.countDown, 1000);
        $("#startPage").hide();
        trivia.displayQuestions();
    },

    //make the timer countdown, display time left
    countDown: function() {
        playGame.timeRemaining--;
        $("#timer").text("Time remaining: " + playGame.timeRemaining);
            if (playGame.timeRemaining < 1) {
                playGame.stopTimer();
                $("#timer").empty();
            }
    },

    //stop timer, check answers
    stopTimer: function () {
        clearInterval();
        trivia.scoreAnswers();
    },

    //hide questions page and show results
    showResults: function (right, wrong, notAnswered) {
        $("#resultsPage").show();
        $("#quizQuestions").empty();
        $("#timer").empty();
        $("#timer").hide();
        $("#correct").text("Correct answers: " + right);
        $("#incorrect").text("Incorrect answers: " + wrong);
        $("#unanswered").text("Unanswered questions: " + notAnswered);
    }
}


    
var trivia = {
    //looping through question array and displaying the questions and answer choices
    displayQuestions: function() {
        var mainContainer = $("#quizQuestions");
        mainContainer.append("<h4>Answer the following questions:</h4>");
        

        
        for (var i=0; i < questions.length; i++) {
            mainContainer.append("<div id='questionTitle'>" + questions[i].question + "</div>");

            var choice1 = questions[i].choices[0];
            var choice2 = questions[i].choices[1];
            var choice3 = questions[i].choices[2];
            var choice4 = questions[i].choices[3];

            mainContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + choice1 + '</label></div>');
            mainContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + choice2 + '</label></div>');
            mainContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + choice3 + '</label></div>');
            mainContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + choice4 + '</label></div>');
        }

        //adding a button for user to click when done
        var doneButton = '<button class="btn btn-outline-warning" id="endButton" type="submit">Done</button>';
        mainContainer.append(doneButton);
        $("#endButton").on("click", playGame.stopTimer);
    },

    //test user's answers and calculate scores
    scoreAnswers: function() {
        var rightAnswer;
        var userAnswer;
        var right = 0;
        var wrong = 0;
        var notAnswered = 0;

        //loop to score user answers
        for (var i=0; i<questions.length; i++) {
            rightAnswer= questions[i].correctAnswer;
            userAnswer= $('input[id=radio'+i+']:checked + label').text();

            if (userAnswer === rightAnswer) {
                right++;
            }
            else if (userAnswer === "") {
                notAnswered++;
            }
            else if (userAnswer !== rightAnswer) {
                wrong++;
            }
        }
    

    playGame.showResults(right, wrong, notAnswered);
    },
}
    

    //question and answer array
    var questions = [
        {
            question: 'Which is not an "Unforgivable Curse"?',
            choices: ["Crucio", "Sectumsempra", "Imperio", "Avada Kedavra"],
            correctAnswer: "Sectumsempra"
        },
        {
            question: "What position does Harry play on his quidditch team?",
            choices: ["Beater", "Keeper", "Seeker", "Chaser"],
            correctAnswer: "Seeker"
        },
        {
            question: "What is Hermione's patronus??",
            choices: ["Rabbit", "Otter", "Unicorn", "Cat"],
            correctAnswer: "Otter"
        },
        {
            question: "Which spell opens locked doors?",
            choices: ["Obliviate", "Lumos", "Expelliarmus", "Alohomora"],
            correctAnswer: "Alohomora"
        },
        {
            question: "Which was not a horcrux?",
            choices: ["Sword of Gryffindor", "Nagini", "Ravenclaw's Diadem", "Riddle's Diary"],
            correctAnswer: "Sword of Gryffindor"
        },
    ];