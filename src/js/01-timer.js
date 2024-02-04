import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector('button[data-start]');
const selectedDates = document.querySelector('input#datetime-picker');
// const clockface = document.querySelector('.js-clockface');

class Timer {
  constructor(tick) {
    this.intervalId = null;
    this.tick = tick;
  }

  start() {
    const init = Date.now();

    this.intervalId = setInterval(() => {
      const diff = init - Date.now();
      const time = this.msToTime(diff);
      this.tick(time);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return { hrs, mins, secs };
  }
}

const timer = new Timer(onTick);

startBtn.addEventListener('click', () => {
  timer.start();
  flatpickr(selectedDates, options)
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
  };
});

stopBtn.addEventListener('click', () => {
  timer.stop();
});

function onTick(time) {
  const str = formatTime(time);
  clockface.textContent = str;
}

function formatTime({ hrs, mins, secs }) {
  hrs = hrs.toString().padStart(2, '0');
  mins = mins.toString().padStart(2, '0');
  secs = secs.toString().padStart(2, '0');

  return `${hrs}:${mins}:${secs}`;
}
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
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

  flatpickr(selector, options)