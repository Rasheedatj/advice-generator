let advice = document.querySelector('.advice');
let changeBtn = document.querySelector('.icon');
let blur = document.querySelector('.blur');
const adviceQuote = document.querySelector('.advice');

const copyBtn = document.querySelector('.copy_advice');

function fetchAdvice2() {
  adviceQuote.innerHTML = 'Loading...';
  const advicePromise = new Promise((resolve, reject) => {
    const response = fetch('https://api.adviceslip.com/advice');

    response
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });

  advicePromise.then((data) => {
    adviceQuote.innerHTML = data.slip.advice;
    document.querySelector('span').innerText = `${data.slip.id}`;
  });
}

async function copyAdvice() {
  await navigator.clipboard.writeText(adviceQuote.innerHTML);

  document.querySelector('.copy_advice').innerHTML = 'Copied!';

  await new Promise((resolve) => setTimeout(resolve, 1000));

  document.querySelector('.copy_advice').innerHTML = 'Copy advice';
}

changeBtn.addEventListener('click', fetchAdvice2);
copyBtn.addEventListener('click', copyAdvice);
