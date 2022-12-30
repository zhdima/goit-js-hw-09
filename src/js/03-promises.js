import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(evt) {
  
  evt.preventDefault();

  const { delay, step, amount } = evt.currentTarget.elements;

  for (let i = 0; i < Number(amount.value); i += 1) {
    createPromise(i+1, Number(delay.value) + i * Number(step.value))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {useIcon: false});
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {useIcon: false});
      });
  }
}

function doTask03() {

  const form = document.querySelector('.form');

  if (!form) {
    console.log('Error: invalid markup!');
    return;
  }

  form.addEventListener('submit', onFormSubmit);
}

doTask03();