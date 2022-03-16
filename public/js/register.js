const URL = 'http://localhost:3000';
const errorsContainerEl = document.querySelector('.errors');
document.querySelector('form').addEventListener('submit', sendDataToDatabase);

async function sendDataToDatabase(e) {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  const dataToSend = {
    email,
    password,
  };
  const result = await fetch(`${URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataToSend),
  });
  const data = await result.json();
  console.log(data);
  if (data.success === false) {
    handleErrors(data.formatedError);
  }
  if (data.success === true) {
    alert('registration successful');
    window.location.replace('login.html');
  }
}

function handleErrors(erorrArray) {
  errorsContainerEl.innerHTML = '';
  console.log('erorrArray ===', erorrArray);
  erorrArray.forEach((err) => {
    errorsContainerEl.innerHTML += err.message;
    console.log(err.message);
  });
}
