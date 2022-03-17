const URL = 'http://localhost:3000';
const errorsContainerEl = document.querySelector('.errors');

function handleErrors(obj) {
  errorsContainerEl.innerHTML = '';
  errorsContainerEl.innerHTML += `<p style="color:red">${obj}</p>`;
}

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
  if (data.success === false) {
    handleErrors(data.message);
  }
  if (data.success === true) {
    localStorage.setItem('tokenExam', data.data);
    window.location.replace('accounts.html');
  }
}

document.querySelector('form').addEventListener('submit', loginToDatabase);
