const URL = 'http://localhost:3000';
const errorsContainerEl = document.querySelector('.errors');
document.querySelector('form').addEventListener('submit', loginToDatabase);

async function loginToDatabase(e) {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  const loginUserData = {
    email,
    password,
  };
  const result = await fetch(`${URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginUserData),
  });
  const data = await result.json();
  console.log(data);
  if (data.success === false) {
    handleErrors(data.message);
    console.log('negerai su duomenimis');
  }
  if (data.success === true) {
    console.log('viskas ok su prisijungimu');
    localStorage.setItem('token24', data.data);
    window.location.replace('index.html');
  }
}

function handleErrors(obj) {
  errorsContainerEl.innerHTML = '';
  errorsContainerEl.innerHTML += `<p style="color:red">${obj}</p>`;
}
