import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => value.toString().padStart(2, '0');

let endDate = null;

const refs = {
  btnStart:  document.querySelector('button[data-start]'),
  inputDate: document.querySelector('#datetime-picker'),
  days:      document.querySelector('.value[data-days]'),
  hours:     document.querySelector('.value[data-hours]'),
  minutes:   document.querySelector('.value[data-minutes]'),
  seconds:   document.querySelector('.value[data-seconds]'),
};

function clockCountdown() {
  const leftMs = (endDate > Date.now()) ? (endDate - Date.now()) : 0;
  const { days, hours, minutes, seconds } = convertMs(leftMs);

  refs.days.textContent    = addLeadingZero(days);
  refs.hours.textContent   = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}
  
function onStart() {
  if (!endDate) return;

  clockCountdown();  // immediately start
  setInterval(clockCountdown, 1000);

  refs.inputDate.toggleAttribute('disabled');  
  refs.btnStart.toggleAttribute('disabled');  
}

function doTask02() {

  if (Object.values(refs).some(el => !el)) {
    console.log('Error: invalid markup!');
    return;
  }

  refs.btnStart.addEventListener('click', onStart);
  refs.btnStart.toggleAttribute('disabled', true);   // initial state

  const opts = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      endDate = selectedDates[0];
      if (endDate <= Date.now()) { 
        Notiflix.Notify.failure('Please choose a date in the future', { position: 'center-top', clickToClose: true });
      } else {
        refs.btnStart.toggleAttribute('disabled', false);   
      }
    },
  };

  flatpickr(refs.inputDate, opts);
}

doTask02();
