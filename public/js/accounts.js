/* eslint-disable no-alert */
/* eslint-disable camelcase */
const URL = 'http://localhost:3000';
const formOfAddingGroup = document.querySelector('form');
const token = localStorage.getItem('tokenExam');
const errorsContainerEl = document.querySelector('.errors');

function handleErrors(obj) {
  errorsContainerEl.innerHTML = '';
  errorsContainerEl.innerHTML += `<p style="color:red">${obj}</p>`;
}

function linkToBills(e) {
  e.preventDefault();
  const getIdOfSelectedGroup = e.currentTarget.dataset.id;
  localStorage.setItem('selectedGroup', getIdOfSelectedGroup);
  window.location.assign('bills.html');
}

async function renderGroups() {
  const data = await fetch(`${URL}/accounts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const dataJson = await data.json();
  if (dataJson.success === false) {
    handleErrors(dataJson.message);
  }
  if (dataJson.success === true) {
    const placeForRenderGroups = document.querySelector('.groups-list');
    placeForRenderGroups.innerHTML = '';
    dataJson.data.forEach((group) => {
      const groupDiv = document.createElement('div');
      groupDiv.classList.add('group-div');
      groupDiv.setAttribute('data-id', group.group_id);
      groupDiv.classList.add(`group-${group.group_id}`);
      groupDiv.addEventListener('click', linkToBills);
      const groupId = document.createElement('h2');
      groupId.classList.add('group-id');
      groupId.innerText = `ID: ${group.group_id}`;
      const groupName = document.createElement('h3');
      groupName.classList.add('group-name');
      groupName.innerText = group.groups;
      placeForRenderGroups.append(groupDiv);
      groupDiv.append(groupId, groupName);
    });
  }
}

renderGroups();

async function createGroup(e) {
  e.preventDefault();
  const group_id = e.target.groupId.value;
  const foundGroup = document.querySelector(`.group-${group_id}`);
  if (foundGroup) {
    alert('This group is allready added');
    return;
  }
  const data = await fetch(`${URL}/accounts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ group_id: Number(group_id) }),
  });

  const dataJson = await data.json();
  if (dataJson.success === false) {
    handleErrors(dataJson.message);
  }
  if (dataJson.success === true) {
    renderGroups();
  }
}

formOfAddingGroup.addEventListener('submit', createGroup);
