let advice = document.querySelector('.advice');
let changeBtn = document.querySelector('.icon');
let blur = document.querySelector('.blur');
const adviceQuote = document.querySelector('.advice');

async function fetchAdvice() {
  const result = await fetch('https://api.adviceslip.com/advice');
  const data = await result.json();
  adviceQuote.innerHTML = data.slip.advice;
  document.querySelector('span').innerText = `${data.slip.id}`;
  return data;
}

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

changeBtn.addEventListener('click', fetchAdvice2);
