function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('button[data-start]');
const btnStop  = document.querySelector('button[data-stop]');

let timerId = null;

function changeBodyBgColor() {
  document.body.style.backgroundColor = getRandomHexColor();  
}

function switchButtonsDisabled() {
  btnStart.toggleAttribute('disabled');
  btnStop.toggleAttribute('disabled');
}

function onStart() {
  changeBodyBgColor();                              // immediately action
  timerId = setInterval(changeBodyBgColor, 1000);   // planned interval action
  switchButtonsDisabled();
}

function onStop() {
  if (timerId) {
    clearInterval(timerId);
    switchButtonsDisabled();
  }
}

function doTask01() {

  if (!btnStart || !btnStop) {
    console.log('Error: invalid markup!');
    return;
  }

  btnStart.addEventListener('click', onStart);
  btnStop.addEventListener('click', onStop);
  
  btnStop.toggleAttribute('disabled', true);   // initial state
}

doTask01();

