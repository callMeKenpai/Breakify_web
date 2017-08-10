var refreshDisplayTimeout;
var bgpage = chrome.extension.getBackgroundPage(); //importing background.js and pre-defined funtions
var previousValues = [3, 5, 10, 30];
var editing = false;

document.addEventListener('DOMContentLoaded', function () {
    load();
    document.querySelector('#start').addEventListener('click', setTimer);
    document.querySelector('#cancel').addEventListener('click', resetButton);
    document.querySelector('#pause').addEventListener('click', pauseTimer);
    document.querySelector('#resume').addEventListener('click', resumeTimer);
    document.querySelector('#restart').addEventListener('click', restartTimer);
});

function show(section){
    document.getElementById(section).style.display = "block";
}

function showInline(section){
    document.getElementById(section).style.display = "inline";
}

function hide(section){
    document.getElementById(section).style.display = "none";
}

function load(){
    hide("settings");
    hide("modify");
    hide("resume");
    editing = false;

    // if timer is paused, show resume button and hide pause button
    if(bgpage.pauseDate){
        showInline("resume");
        hide("pause");
    }

   // if timer is off, show settings
	if(!bgpage.alarmDate){
		show("settings");
      hide("display");
	}

	// else, show countdown
	else
	{
		show("display");
      refreshDisplay();
		show("modify");
	}
}

function setTimer(){
  var num;
  //it finds a checked option among others bullet-points and assing that value to 'num'
	for(var i = 0; i < document.choices.radio.length; i++)
	{
		if(document.choices.radio[i].checked == true)
			num = parseInt(document.getElementById("s"+i).textContent);
	}

	// set timer, hide settings, display reset button
	if(num > 0 && num < 240)//its max is 240 mins
	{
		bgpage.setAlarm(num * 60000);

    hide("settings");//setting is for setting times
		show("modify");//showing 'cancel,pause,restart' buttons
    show("display");//displaying a timer
		refreshDisplay();
	}
	else
		bgpage.error();
}

//refreshing each second to display how many times are left
function refreshDisplay(){
	document.getElementById("bar").textContent = bgpage.getTimeLeftString(); //getting how many time left in string
	refreshDisplayTimeout = setTimeout(refreshDisplay, 100);
  //ALARM
  if(bgpage.getTimeLeft == 0)
    bgpage.ring();

}
//The Pause button
function pauseTimer(){
    hide("pause");
    showInline("resume");
    bgpage.pause();
    clearTimeout(refreshDisplayTimeout);
}
//The resume button
function resumeTimer(){
    hide("resume");
    showInline("pause");
    refreshDisplay();
    bgpage.resume();
}
//The restart button
function restartTimer(){
    hide("resume");
    showInline("pause");
    refreshDisplay();
    bgpage.restart();
}
// The cancel button
function resetButton(){
	clearTimeout(refreshDisplayTimeout);
	bgpage.turnOff();
	hide("display");
	show("settings");
	hide("modify");
}
