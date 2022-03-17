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
  const tablePlace = document.querySelector('.table');
  tablePlace.innerHTML = '';
  const data = await fetch(`${URL}/bills/${groupSelected}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const dataJson = await data.json();
  if (dataJson.success === false) {
    handleErrors(dataJson.message);
  }
  if (dataJson.success === true) {
    if (dataJson.data.length === 0) {
      errorsContainerEl.innerHTML =
        '<h2 class="no-content" style="color:grey; font-size: 13px"> No bills at the moment for this group</h2>';
    }
    const divForTable = document.createElement('div');
    divForTable.classList.add('table-div');
    const table = document.createElement('table');

    table.innerHTML = ` 
    <tr>
    <th>ID</th>
    <th>Description</th>
    <th>Amount</th>
  </tr>`;
    dataJson.data.forEach((bill) => {
      table.innerHTML += `
      <tr>
      <td>${bill.id}</td>
      <td>${bill.description}</td>
      <td>$${bill.amount}</td>
    </tr>`;
    });
    divForTable.append(table);
    tablePlace.append(divForTable);
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
