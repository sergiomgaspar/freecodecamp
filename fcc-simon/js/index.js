/**
	Simon Game challenge for FreeCodeCamp
	
	This is the code for the Simon Game challenge. Feel free to use but keep in mind its a WIP :)
	Any comments feel free to reach-out @sergiomgaspar.
	
    Note: This JS is a bit different than the other since i adopted a JS "approach" and included all simon-related objects/functions inside their specific object (based on online examples). Looks a lot "cleaner" this way!
    
	author: Sergio Gaspar
	date: 2017.01
*/
var colors = ['#yellow', '#red', '#green', '#blue'];
var maxSeq = 20; // Max sequences necessary to win
var sounds = { // Sound provided by FCC
	red_sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
	green_sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
	yellow_sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
	blue_sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
};
// Debug variable, true = turn on console logging
var debug = false;

/* This function animates and plays the sound of specific button */
function animateClick(id) {
	var cs = id.slice(1, id.length);
	console.log(cs);
	$(id).addClass('clicked-' + cs);
	var s = id.slice(1, 2);
	switch (s) {
		case 'r':
			sounds.red_sound.play();
			break;
		case 'g':
			sounds.green_sound.play();
			break;
		case 'y':
			sounds.yellow_sound.play();
			break;
		case 'b':
			sounds.blue_sound.play();
			break;
	}
	var time = setTimeout(function() {
		$(id).removeClass('clicked-' + cs);
	}, 400);
}

/* This function animates without sound (used when finished) */
function animateWithoutSound(id) {
	var cs = id.slice(1, id.length);
	$(id).addClass('clicked-' + cs);
	var timenosound = setTimeout(function() {
		$(id).removeClass('clicked-' + cs);
	}, 400);
}

/* Simple log wrapper */
function log(text) {
	if (debug)
		console.log(text);
}

/* question object - includes question functions */
var question = {
	name: 'question',

	/* use Math.random() to add new random button to question */
	newQuestion: function() {
		game.values.push(colors[Math.floor(4 * Math.random())]);
		game.steps++;
		$('.steps').html("Current Nb steps: " + game.steps);
		log("Game Steps: " + game.steps);
		log("logging game values:");
		log(game.values);
	},

	playQuestion:

		function() {
			var i = 0;
			var t = setInterval(function() {
				animateClick(game.values[i]);
				if (i >= game.values.length - 1) {
					clearInterval(t);
					game.change_state(question);
				} else {
					i++;
				}
			}, 800);
		}
};

/* Answer object - includes answer functions */
var answers = {
	name: 'answers',
	index_so_far: 0,
	total_correct: 0,

	/* resets answers */
	init_answers: function() {
		$(".simon").removeClass('disabled');

		answers.index_so_far = 0;
		answers.total_correct = game.values.length;
		log("init answers.index_so_far:" + answers.index_so_far);
		log("init answers.total_correct" + answers.total_correct);
	},

	/* Checks answers[index] with button pressed */
	check_answers: function(id) {
		log("check_answers ID:" + id);
		log("check_answers game.values:" + game.values);
		if (id == game.values[answers.index_so_far]) {
			answers.index_so_far++;
			log("check_answers answers.index_so_far:" + answers.index_so_far);
			log("check_answers answers.total_correct:" + answers.total_correct);

			if (answers.index_so_far >= answers.total_correct) {
				log("check_answers EXECUTAR O CHANGE STATE:");
				game.change_state(answers);
			}
		} else {
			game.lose();
		}
	}
};

/* Game object */
var game = {
	state: question,
	values: [],
	mode: 'dificulty: easy',
	steps: 0,
	reset: function() {
		game.steps = 0;
		game.state = question;
		game.values = [];
		$('.steps').html("Current Nb steps: " + game.steps);
	},

	start: function() {
		game.reset();
		$('.status').html('game running');
		$('.simon').addClass('disabled');
		question.newQuestion();
		question.playQuestion();
	},

	change_state: function(state) {
		log("change_state state.name:" + state.name);
		if (state.name == 'question') {
			game.state = answers;
			answers.init_answers();
		} else {
			game.state = question;
			$('.simon').addClass('disabled');
			if (game.steps >= maxSeq) {
				game.stop();
			} else {
				question.newQuestion();
				setTimeout(question.playQuestion, 1000);
			}
		}
	},

	/* Hanldes the player loss of the game */
	lose: function() {
		$('.status').html('game loss :(');
		log("GAME OVER");
		if (game.mode == 'dificulty: strict') {
			game.celebrate(700, 2);
			setTimeout(game.start, 1200);
		} else {
			game.state = question;
			$('.simon').addClass('disabled');
			game.celebrate(700, 2);
			setTimeout(function() {
				$('.status').html('game running');
				question.playQuestion();
			}, 1200);
		}
	},

	/* Stops the game when the player wins */
	stop: function() {
		$('.status').html('game WON!!!');
		game.celebrate(700, 3);
		game.reset();
	},

	/* Do a quick flash of the y,b,r,g buttons */
	celebrate: function(interval, number) {
		for (var j = 0; j < number; j++) {
			setTimeout(function() {
				for (var i in colors) {
					animateWithoutSound(colors[i]);
				}
				sounds.green_sound.play();
			}, j * interval);
		}
	}
};

$(document).ready(function() {
	sounds.red_sound.load();
	sounds.green_sound.load();
	sounds.yellow_sound.load();
	sounds.blue_sound.load();
	$('.simon').on('click', function(e) {
		var id = '#' + e.target.id;
		var s = id.slice(1, 2);
		log("ID:" + id);
		log("S:" + s);
		switch (s) {
			case 'r':
				sounds.red_sound.play();
				break;
			case 'g':
				sounds.green_sound.play();
				break;
			case 'y':
				sounds.yellow_sound.play();
				break;
			case 'b':
				sounds.blue_sound.play();
				break;
		}
		if (game.state.name == 'answers') {
			answers.check_answers(id);
		}
	});

	$('.start').on('click', function() {
		log("Game starting...");
		game.start();
	});

	$('.strict').on('click', function() {
		log("Changing dificulty");
		if (game.mode == 'dificulty: easy') {
			game.mode = 'dificulty: strict';
			$(this).html('dificulty: strict');
		} else {
			game.mode = 'dificulty: easy';
			$(this).html('dificulty: easy');
		}
	});

});