const URL = 'http://localhost:3000';

async function createGroup(e) {
  e.preventDefault();
  const token = localStorage.getItem('tokenExam');
  const groupId = e.target.groupId.value;
  const data = await fetch(`${URL}/accounts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(groupId),
  });
  const dataJson = await data.json();
  console.log(dataJson);
}
