/* eslint-disable camelcase */
/* eslint-disable operator-linebreak */
const URL = 'http://localhost:3000';
const errorsContainerEl = document.querySelector('.errors');

function handleErrors(erorrArray) {
  errorsContainerEl.innerHTML = '';
  erorrArray.forEach((err) => {
    errorsContainerEl.innerHTML += `<p>${err.message}</p>`;
  });
}

async function sendDataToDatabase(e) {
  e.preventDefault();
  const full_name = e.target.fullName.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  const password2 = e.target.rpassword.value;
  if (password !== password2) {
    errorsContainerEl.innerHTML = 'Passwords do not match!';
    return;
  }
  const dataToSend = {
    full_name,
    email,
    password,
  };
  const result = await fetch(`${URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataToSend),
  });
  const data = await result.json();
  if (data.success === false) {
    handleErrors(data.formatedError);
  }
  if (data.success === true) {
    window.location.replace('login.html');
  }
}

document.querySelector('form').addEventListener('submit', sendDataToDatabase);
