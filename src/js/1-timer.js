import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datePicker = flatpickr('#datetime-picker');

  // Отримуємо кнопку Start та розміщаємо її у змінній
  const startButton = document.querySelector('[data-start]');

  // Поточна вибрана дата
  let selectedDate = null;

  // Функція для перевірки, чи дата вибрана з майбутнього
  function isFutureDate(date) {
    const currentDate = new Date();
    return date.getTime() > currentDate.getTime();
  }

  // Функція для оновлення таймера
  function updateTimer() {
    // Отримуємо поточну дату та час
    const currentDate = new Date();

    // Розраховуємо різницю між поточною датою та вибраною датою
    const difference = selectedDate.getTime() - currentDate.getTime();

    // Якщо різниця менше або дорівнює нулю, таймер зупиняється
    if (difference === 0) {
      clearInterval(timerInterval);
      difference = 0;

      // Повідомлення про закінчення таймера
      iziToast.show({
        title: 'Timer Finished',
        message: 'The selected time has passed.',
        position: 'topCenter',
        timeout: 5000,
        progressBarColor: 'rgb(0, 255, 0)'
      });
    }

    // Отримуємо час у форматі дні:години:хвилини:секунди
    const days = Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((difference % (1000 * 60)) / 1000).toString().padStart(2, '0');

    // Відображаємо час у відповідні елементи інтерфейсу
    document.querySelector('[data-days]').textContent = days;
    document.querySelector('[data-hours]').textContent = hours;
    document.querySelector('[data-minutes]').textContent = minutes;
    document.querySelector('[data-seconds]').textContent = seconds;
  }

  // Обробники подій

  // Коли обрано дату, перевіряємо, чи вона з майбутнього
  datePicker.config.onChange = function(selectedDates) {
    const date = selectedDates[0];
    selectedDate = date;
    if (isFutureDate(date)) {
      startButton.disabled = false;
      iziToast.hide();
    } else {
      startButton.disabled = true;
      iziToast.error({
        title: 'Please choose a date in the future',
        position: 'topCenter',
        timeout: false
      });
    }
  };

  // При кліку на кнопку Start, таймер запускається
  startButton.addEventListener('click', function() {
    if (selectedDate !== null) {
      // Відключаємо кнопку Start
      startButton.disabled = true;

      // Встановлюємо оновлення таймера кожну секунду
      timerInterval = setInterval(updateTimer, 1000);
    }
  });

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

