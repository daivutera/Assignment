/* eslint-disable camelcase */
const URL = 'http://localhost:3000';
const groupSelected = localStorage.getItem('selectedGroup');
const token = localStorage.getItem('tokenExam');
const errorsContainerEl = document.querySelector('.errors');
const createBillForm = document.querySelector('#add-bill');

function handleErrors(obj) {
  errorsContainerEl.innerHTML = '';
  errorsContainerEl.innerHTML += `<p style="color:red">${obj}</p>`;
}

async function renderSelectedGroupBills() {
  const data = await fetch(`${URL}/bills/${groupSelected}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const dataJson = await data.json();
  if (dataJson.success === false) {
    handleErrors(dataJson.message);
  }
  if (dataJson.success === true) {
    if (!data.length) {
      errorsContainerEl.innerHTML =
        '<h2 class="no-content" style="color:grey"> No bills at the moment for this group</h2>';
    }
    const tablePlace = document.querySelector('.table');
    const divForTable = document.createElement('div');
    const table = document.createElement('table');
    divForTable.innerHTML = ` 
    <tr>
    <th>ID</th>
    <th>Description</th>
    <th>Amount</th>
  </tr>`;
  }
}
renderSelectedGroupBills();

async function addBillToSelectedGroup(e) {
  e.preventDefault();
  const amount = e.target.amount.value;
  const description = e.target.description.value;
  const group_id = groupSelected;
  const amountNumber = Number(amount);
  const groupIdNumber = Number(group_id);

  const dataToSend = {
    group_id: groupIdNumber,
    amount: amountNumber,
    description,
  };
  console.log(dataToSend);
  const data = await fetch(`${URL}/bills`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dataToSend),
  });
  const dataJson = await data.json();
  if (dataJson.success === false) {
    handleErrors(dataJson.message);
  }
  if (dataJson.success === true) {
    renderSelectedGroupBills();
  }
}
createBillForm.addEventListener('submit', addBillToSelectedGroup);
