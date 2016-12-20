/**
		Calculator challenge for FreeCodeCamp
	
	This is the code for the "Build a calculator" challenge. Feel free to use but keep in mind its a WIP :)
	Any comments feel free to reach-out @sergiomgaspar.
	
	author: Sergio Gaspar
	date: 2016.12
*/
var isOn;
var current='';
var maxLengthCurr=20;
var maxLengthResult=12;
var reload=false;

// Turn calculator ON
function onFunc(obj, evt){
  $('#current').html('0') ;
  isOn=true;
  current='';
}

// Turn calculator OFF
function offFunc(obj, evt){
  $('#current').html('') ;
  isOn=false;
  current='';
}

// Handle number pressing
function numberClick(obj, evt){
  if (!isOn) return;
  current+=$(obj).attr("value");
  updScreen();
}

// Handle Zero and doubleZero
function zeroClick(obj, evt){
  if (!isOn) return;
  if (current==='0' || current==='') return;
  if (posLastOper()+1===current.length) return;
  current+=$(obj).attr("value");
  updScreen();
}

// Handle basic math operators
function operationClick(obj, evt){
  if (!isOn) return;
  if (posLastOper()+1===current.length || current==='') return;
  current+=$(obj).attr("value");
  updScreen();
}

// AC button
function acClick(obj, evt){
  if (!isOn) return;
  $('#current').html('0') ;
  current='';
}

// CE button
function ceClick(obj, evt){
  if (!isOn) return;
  var lastOper = posLastOper();
  if (lastOper === -1) {
	// No operations defined, clear the value (if any)
	$('#current').html('0') ;
	current='';
	return;
  } else if (lastOper === current.length) return;
	else current=current.substring(0, lastOper);
	updScreen();
}

// '.' button
function dotClick(obj, evt){
  if (!isOn) return;
  if (current.lastIndexOf('.')===current.length) return; // No 2 sequencial dots
  if ((current==='')||(posLastOper()===current.length)||(posLastOper()+1===current.length)) current+='0.';
  else if(current.lastIndexOf('.') > posLastOper()) return;
  else current+='.';
  updScreen();
}

// '=' button
function equalClick(obj, evt){
  if (!isOn) return;
  var result = eval(current).toString();
  if (result.length>maxLengthResult) result=result.substring(0, maxLengthResult);
  current=result;
  updScreen();
}

// Generic function to update the results screen
function updScreen(){
	// Check if max number of digits reached
	if (current.length > maxLengthCurr) {
	  $('#current').html('Err');
	} else {
		$('#current').html(current);
	}
}

// Generic function to get the last position of a math operator
function posLastOper(){
	if ((current.length < 1) || (current ==='')) return -1;
	var add=current.lastIndexOf('+');
	var sub=current.lastIndexOf('-');
	var mult=current.lastIndexOf('*');
	var div=current.lastIndexOf('/');
	return Math.max(add, sub,mult,div);
}