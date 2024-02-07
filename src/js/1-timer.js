import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Отримуємо доступ до поля вибору дати
const input = document.querySelector('#datetime-picker');
input.disabled = false;

// Отримуємо кнопку Start та розміщаємо її у змінній та деактивуємо її напочатку
const startButton = document.querySelector('[data-start]');
startButton.disabled = true;

// Поточна вибрана дата
let userSelectedDate;

// Додаємо опції вибору дати та перевіряємо її валідність відповідно чи є вибрана дата більшою за теперішню
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onChange(selectedDates) {
    if (Date.now() < selectedDates[0].getTime()) {
      startButton.disabled = false;
      userSelectedDate = selectedDates[0];
    } else {
      startButton.disabled = true;
    }
    console.log(selectedDates[0].getTime());
  },

  onClose(selectedDates) {
    if (Date.now() > selectedDates[0].getTime()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else if (Date.now() < selectedDates[0].getTime()) {
      startButton.addEventListener('click', () => {
        startTimer(selectedDates[0]);
      });
    }
  },
};

flatpickr(input, options);
  
// Після вибору валідної дати реалізовуємо конвертацію обраного інтервалу часу в указаний формат для відображення в полях таймеру на сторінці

function startTimer(chooseDate) {
  const days = document.querySelector('[data-days]');
  const hours = document.querySelector('[data-hours]');
  const minutes = document.querySelector('[data-minutes]');
  const seconds = document.querySelector('[data-seconds]');

  const intervalId = setInterval(() => {
    const {
      days: daysValue,
      hours: hoursValue,
      minutes: minutesValue,
      seconds: secondsValue,
    } = convertMs(chooseDate.getTime() - Date.now());

      days.textContent = `${daysValue}`.padStart(2, '0');
      hours.textContent = `${hoursValue}`.padStart(2, '0');
      minutes.textContent = `${minutesValue}`.padStart(2, '0');
      seconds.textContent = `${secondsValue}`.padStart(2, '0');

// Запускаємо відлік часу на живій сторінці та блокуємо поле вибору дати

  function timeIsUp() {
    input.disabled = true;
    const result =
      parseInt(days.textContent) === 0 &&
      parseInt(hours.textContent) === 0 &&
      parseInt(minutes.textContent) === 0 &&
      parseInt(seconds.textContent) === 0;
      return result;
    }

// Після закінчення відліку обраного інтервалу часу Зупиняємо роботу таймера та очищаємо його поля і знову робимо поле вибору дати доступним, а кнопку неактивною

  function stopTimer() {
      clearInterval(intervalId);
    }
    if (timeIsUp() === true) {
      stopTimer();
      input.disabled = false;
    }
  }, 1000);
  
  startButton.disabled = true;
  
}

// Функція для підрахунку значень між кінцевою і поточною датою, яка повертає значення в мілісекундах

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