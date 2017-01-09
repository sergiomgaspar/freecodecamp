/**
	Pomodoro Clock challenge for FreeCodeCamp
	
	This is the code for the Pomodoro Clock challenge. Feel free to use but keep in mind its a WIP :)
	Any comments feel free to reach-out @sergiomgaspar.
	
    Note: This JS is a bit different than the simon game. In this, a "direct" JQuery approach is used where all of the buttons have a caller functions!
    
	author: Sergio Gaspar
	date: 2017.01
*/

var isRunning = false; 
var execType = 'work'; 
var maxWorkLength = 60; //in minutes
var maxBreakLength = 60; //in minutes
var minWorkLength = 1; //in minutes
var minBreakLength = 1; //in minutes

// button to decrease break length
$('.break-minus').click(function() {
  if (isRunning === false) {
    var length = Number(document.getElementById('break-length').value);
    if (length > minBreakLength) {
      length -= 1;
      document.getElementById('break-length').value = length;
      if (execType === 'break') {
        if (length < 10) {
          length = '0' + length;
        };
        document.getElementById('time').innerHTML = length +":00";
      };
    };
  };
});

// button to increase break length
$('.break-plus').click(function() {
  if (isRunning === false) {
    var length = Number(document.getElementById('break-length').value);
    if (length < maxBreakLength) {
      length += 1;
      document.getElementById('break-length').value = length;
      if (execType === 'break') {
        if (length < 10) {
          length = '0' + length;
        };
        document.getElementById('time').innerHTML = length +":00";
      };
    };
    
  };
});

// button to decrease session length
$('.session-minus').click(function() {
  if (isRunning === false) {
    var length = Number(document.getElementById('session-length').value);
    if (length > minWorkLength) {
      length -= 1;
      document.getElementById('session-length').value = length;
      if (execType === 'work') {
        if (length < 10) {
          length = '0' + length;
        };
        document.getElementById('time').innerHTML = length +":00";
      };
    };
  };
});

// button to increase session length
$('.session-plus').click(function() {
  if (isRunning === false) {
    var length = Number(document.getElementById('session-length').value);
    if (length < maxWorkLength) {
      length += 1;
      document.getElementById('session-length').value = length;
      if (execType === 'work') {
        if (length < 10) {
          length = '0' + length;
        };
        document.getElementById('time').innerHTML = length +":00";
      };
    };
  };
});

// here is where the drawing "magic" happens
function drawSector(perc, colour) {
  var clock = $('#clock');
  var deg = 90 + perc*360;
  if (perc <= 0.5) {
    clock.css('background-image','linear-gradient(' + deg + 'deg, transparent 50%, grey 50%), linear-gradient(90deg, grey 50%, transparent 50%)');
  } else {
    if (deg >= 360) {
      deg -= 360;
    };
    clock.css('background-image','linear-gradient(' + deg + 'deg, '+colour+' 50%, transparent 50%),linear-gradient(90deg, grey 50%, transparent 50%)');
  };
};

function startSession() {
  if (isRunning) {
    var colour = '#FF5252'; // color for progress bar
    $('#clock').css('background-color', colour);
    var my_session = document.getElementById('time');
    var session_time = my_session.innerHTML;
    var arr = session_time.split(":");
    var min = arr[0];
    var sec = arr[1];
    
    var length = document.getElementById('session-length').value; // count total length of session
    
    if (sec == 0) {
      if (min == 0) {
        $('#clock').css('background-color', 'grey');
        $('#clock').css('background-image', 'none');
        var length2 = document.getElementById('break-length').value;
        if (length2 < 10) {
          length2 = "0" + length2;
        };
        document.getElementById('time').innerHTML = length2+":00";
        execType = 'break';
        setTimeout(startBreak,1000);
        return;
      };
      min--;
      sec = 59;
      if (min < 10) min = "0" + min;
    } else {
      sec--;
      if (sec < 10) {
        sec = "0" + sec;
      };
    };
    var perc = (+length*60 - +min*60 - +sec) / (+length*60); // count part of passed time
    drawSector(perc, colour); // call function to show progress
    document.getElementById('time').innerHTML = min+":"+sec; // show time remain
    setTimeout(startSession,1000);
  } else {
    return; // if we press 'play-pause' button, variable 'run' becomes false and we get out of repeating call of this function
  };
};

// function to run break
function startBreak() {
  if (isRunning) {
    var colour = '#00E676'; // color for progress bar
    $('#clock').css('background-color', colour);
    var my_break = document.getElementById('time');
    var break_time = my_break.innerHTML;
    var arr = break_time.split(":");
    var min = arr[0];
    var sec = arr[1];

    var length = document.getElementById('break-length').value; // count total length of break

    if (sec == 0) {
      if (min == 0) {
        $('#clock').css('background-color', 'grey');
        $('#clock').css('background-image', 'none');
        var length2 = document.getElementById('session-length').value;
        if (length2 < 10) {
          length2 = "0" + length2;
        };
        document.getElementById('time').innerHTML = length2+":00";
        execType = 'work';
        setTimeout(startSession,1000);
        return;
      };
      min--;
      sec = 59;
      if (min < 10) {
        min = "0" + min;
      };
    } else {
      sec--;
      if (sec < 10) {
        sec = "0" + sec;
      };
    };

    var perc = (+length*60 - +min*60 - +sec) / (+length*60); // count part of passed time
    drawSector(perc, colour); // call function to show progress
    document.getElementById('time').innerHTML = min+":"+sec; // show time remain
    setTimeout(startBreak,1000);
  } else {
    return; // if we press 'play-pause' button, variable 'run' becomes false and we get out of repeating call of this function
  };
};

// button to start/stop timer
$('.play-pause').click(function() {
  if (isRunning === false) { // if timer isn't running we start/resume it
    isRunning = true;
    if (execType === 'work') { // here we determine if it is session time is about to start/resume
      setTimeout(startSession,1000);
    } else if (execType === 'break') { // here we determine if it is break time is about to start/resume
      setTimeout(startBreak,1000);
    };
  } else { // if timer is running we stop it
    isRunning = false;
  };
});

// button to reset timer
$('.reset').click(function() {
  isRunning = false;
  execType = 'work';
  var length = document.getElementById('session-length').value;
  if (length < 10) {
    length = '0' + length;
  };
  document.getElementById('time').innerHTML = length +":00";
  $('#clock').css('background-color', 'grey');
  $('#clock').css('background-image', 'none');
});
