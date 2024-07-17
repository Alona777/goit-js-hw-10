import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    compareDates(selectedDates[0]);
  },
};
flatpickr('#datetime-picker', options);

const elements = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('button[data-start]'),
  day: document.querySelector('[ data-days]'),
  hour: document.querySelector('[data-hours]'),
  minute: document.querySelector('[data-minutes]'),
  second: document.querySelector('[data-seconds]'),
};
let userSelectedDate = 0;

elements.button.classList.add('inactive');
elements.button.addEventListener('click', handlerClick);

function compareDates(selectedDate) {
  const currentDate = new Date();
  if (selectedDate < currentDate) {
    iziToast.info({
      message: 'Please choose a date in the future',
      backgroundColor: '#ef4040',
      messageColor: '#fff',
      position: 'topRight',
    });
    // alert('Please choose a date in the future');
  } else {
    userSelectedDate = selectedDate;
    elements.button.classList.remove('inactive');
    elements.button.classList.add('active');
  }
}

function handlerClick() {
  elements.button.classList.add('inactive');
  elements.input.style.backgroundColor = '#f5f5f5';
  const countDown = setInterval(() => {
    const now = new Date();
    const timeRemaining = userSelectedDate - now;
    if (timeRemaining <= 0) {
      clearInterval(countDown);
      alert('Time is up!');
      return;
    }
    const timeComponents = convertMs(timeRemaining);
    elements.day.textContent = padWithZero(timeComponents.days);
    elements.hour.textContent = padWithZero(timeComponents.hours);
    elements.minute.textContent = padWithZero(timeComponents.minutes);
    elements.second.textContent = padWithZero(timeComponents.seconds);
  }, 1000);
}
function padWithZero(num) {
  return num.toString().padStart(2, '0');
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