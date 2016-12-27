var run = false; // variable for determination if time runs or not
var type = 'session'; // variable for determination if session time runs or break time

// button for decreasing break length
$('.break-minus').click(function() {
  if (run == false) {
    var length = document.getElementById('break-length').value;
    if (length > 1) {
      length = +length - 1;
      document.getElementById('break-length').value = length;
      if (type == 'break') {
        if (length < 10) {
          length = '0' + length;
        };
        document.getElementById('time').innerHTML = length +":00";
      };
    };
  };
});

// button for increasing break length
$('.break-plus').click(function() {
  if (run == false) {
    var length = document.getElementById('break-length').value;
    if (length < 60) {
      length = +length + 1;
      document.getElementById('break-length').value = length;
      if (type == 'break') {
        if (length < 10) {
          length = '0' + length;
        };
        document.getElementById('time').innerHTML = length +":00";
      };
    };
    
  };
});

// button for decreasing session length
$('.session-minus').click(function() {
  if (run == false) {
    var length = document.getElementById('session-length').value;
    if (length > 1) {
      length = +length - 1;
      document.getElementById('session-length').value = length;
      if (type == 'session') {
        if (length < 10) {
          length = '0' + length;
        };
        document.getElementById('time').innerHTML = length +":00";
      };
    };
  };
});

// button for increasing session length
$('.session-plus').click(function() {
  if (run == false) {
    var length = document.getElementById('session-length').value;
    if (length < 60) {
      length = +length + 1;
      document.getElementById('session-length').value = length;
      if (type == 'session') {
        if (length < 10) {
          length = '0' + length;
        };
        document.getElementById('time').innerHTML = length +":00";
      };
    };
  };
});

// progress bar filler function
function drawSector(perc, colour) {
  var clock = $('#clock');
  var deg = 90 + perc*360;
  if (perc <= 0.5) {
    clock.css('background-image','linear-gradient(' + deg + 'deg, transparent 50%, #ffffff 50%), linear-gradient(90deg, #ffffff 50%, transparent 50%)');
  } else {
    if (deg >= 360) {
      deg -= 360;
    };
    clock.css('background-image','linear-gradient(' + deg + 'deg, '+colour+' 50%, transparent 50%),linear-gradient(90deg, #ffffff 50%, transparent 50%)');
  };
};

// function to run session
function startSession() {
  if (run) {
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
        $('#clock').css('background-color', 'white');
        $('#clock').css('background-image', 'none');
        var length2 = document.getElementById('break-length').value;
        if (length2 < 10) {
          length2 = "0" + length2;
        };
        document.getElementById('time').innerHTML = length2+":00";
        type = 'break';
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
  if (run) {
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
        $('#clock').css('background-color', 'white');
        $('#clock').css('background-image', 'none');
        var length2 = document.getElementById('session-length').value;
        if (length2 < 10) {
          length2 = "0" + length2;
        };
        document.getElementById('time').innerHTML = length2+":00";
        type = 'session';
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
  if (run == false) { // if timer isn't running we start/resume it
    run = true;
    if (type == 'session') { // here we determine if it is session time is about to start/resume
      setTimeout(startSession,1000);
    } else if (type == 'break') { // here we determine if it is break time is about to start/resume
      setTimeout(startBreak,1000);
    };
  } else { // if timer is running we stop it
    run = false;
  };
});

// button to reset timer
$('.reset').click(function() {
  run = false;
  type = 'session';
  var length = document.getElementById('session-length').value;
  if (length < 10) {
    length = '0' + length;
  };
  document.getElementById('time').innerHTML = length +":00";
  $('#clock').css('background-color', 'white');
  $('#clock').css('background-image', 'none');
});