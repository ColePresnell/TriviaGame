var triviaQuestions = [{
	question: "In what year was the city of Dallas granted an NFL expansion team?",
	answerList: ["1948", "1956", "1960", "1966"],
	answer: 2
},{
	question: "Which Cowboys quarterback holds the NFL record for most passes to start a career without an interception?",
	answerList: ["Roger Staubach", "Danny White", "Troy Aikman", "Dak Prescott"],
	answer: 3
},{
	question: "Who was the first Cowboy to win the NFL MVP award?",
	answerList: ["Bob Lilly", "Roger Staubach", "Randy White", "Emmitt Smith"],
	answer: 3
},{
	question: "The 2014 season ended for the Cowboys in a Divisional Playoff Game on an overturned call of an indisputably completed catch by what receiver?",
	answerList: ["Jason Witten", "Dez Bryant", "Terrance Williams", "Cole Beasley"],
	answer: 1
},{
	question: "Which Cowboys head coach invented the 'flex' defense?",
	answerList: ["Tom Landry", "Jimmy Johnson", "Wade Phillips", "Jason Garrett"],
	answer: 0
},{
	question: "How many consecutive winning seasons did the Cowboys have under head coach Tom Landry?",
	answerList: ["8", "12", "16", "20"],
	answer: 3
},{
	question: "Who was the first ever player selected by the Cowboys in the NFL draft?",
	answerList: ["Don Meredith", "Bob Lilly", "Don Perkins", "Mel Renfro"],
	answer: 1
},{
	question: "Which Cowboy put (future Cowboy) Terrell Owens in his place for celebrating on the mid-field star in Texas Stadium (twice) after a touchdown recpetion?",
	answerList: ["Leon Lett", "Dat Nguyen", "George Teague", "Darren Woodson"],
	answer: 2
},{
	question: "In the 1993 final regular season game against the New York Giants, what ailment did Emmitt Smith play through for most of the game?",
	answerList: ["The flu", "A sprained ankle", "Turf toe", "A separated shoulder"],
	answer: 3
},{
	question: "Which Cowboy played in the 1970 NFC Championship Game with a broken collarbone?",
	answerList: ["Bob Lilly", "Calvin Hill", "Walt Garrison", "Bob Hayes"],
	answer: 2
},{
	question: "Which Cowboy is affectionately known as 'Mr. Cowboy'?",
	answerList: ["Don Meredith", "Bob Lilly", "Roger Staubach", "Jason Witten"],
	answer: 1
},{
	question: "How many pounds could offensive guard Larry Allen bench press?",
	answerList: ["500", "600", "650", "700"],
	answer: 3
},{
	question: "Where did the Cowboys play their home games from the founding until 1970?",
	answerList: ["Texas Stadium", "The Cotton Bowl", "Cowboys Stadium", "Farrington Field"],
	answer: 1
},{
	question: "Who was the first player inducted into the Ring of Honor?",
	answerList: ["Don Meredith", "Bob Lilly", "Mel Renfro", "Chuck Howley"],
	answer: 1
},{
	question: "Who was the first Cowboys running back to have a 1,000-yard rushing season?",
	answerList: ["Calvin Hill", "Tony Dorsett", "Don Perkins", "Herschel Walker"],
	answer: 0
}];


var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
    }
    countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}
function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    //checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
    }
    if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}
function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$("gif").empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}