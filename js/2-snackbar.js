import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// import { default as Toast } from 'izitoast';

const form = document.querySelector('.form');
form.addEventListener('submit', handlerSubmit);
function handlerSubmit(event) {
  event.preventDefault();
  const formInside = event.target;
  const delay = event.target.elements.delay.value;
  const stateF = event.target.elements.state.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateF === 'fulfilled') {
        resolve(`Fulfilled promise in ${delay}ms`);
      } else {
        reject(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
  promise
    .then(value =>
      iziToast.show({
        message: value,
        backgroundColor: '#59a10d',
        position: 'topRight',
      })
    )
    .catch(value =>
      iziToast.info({
        message: value,
        backgroundColor: '#ef4040',
        position: 'topRight',
      })
    )
    .finally(() => form.reset());
}