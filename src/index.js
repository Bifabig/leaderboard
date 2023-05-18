import './style.css';
import Student from './student.js';

let gameId = {};
let key = '';

// creates the game
const myGame = async () => {
  await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/',
    {
      method: 'POST',
      body: JSON.stringify({ name: 'leaderboard' }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  )
    .then((response) => response.json())
    .then((json) => {
      gameId = json.result.slice(14, 34);
      // save key on local storage
      localStorage.setItem('leaderboard_key', JSON.stringify(gameId));
    });
};

// get key from local storage
key = JSON.parse(localStorage.getItem('leaderboard_key'));

// getting game data
const getData = async () => {
  await fetch(
    `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`,
  )
    .then((response) => response.json())
    .then((json) => {
      // const recentScores = document.querySelector('.recent-scores');
      const recentScores = document.querySelector('.table-body');
      recentScores.innerHTML = '';
      json.result.forEach((studentItem) => {
        const students = document.createElement('tr');

        const name = document.createElement('td');
        const score = document.createElement('td');
        students.setAttribute('id', `${studentItem.id}`);
        name.textContent = `${studentItem.user}`;
        score.textContent = `${studentItem.score}`;
        students.append(name);
        students.append(score);
        recentScores.append(students);
      });
    });
};

// sending game data
const name = document.getElementById('name');
const score = document.getElementById('score');
const form = document.querySelector('.add-score');

form.addEventListener('submit', async (e) => {
  const myStudent = new Student(name.value, score.value);
  const msg = document.querySelector('small');

  e.preventDefault();
  myStudent.storeStudent();

  if (name.value && score.value !== '') {
    msg.innerText = '';
  } else {
    msg.innerText = '* name and score required';
  }

  await fetch(
    `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`,
    {
      method: 'POST',
      body: JSON.stringify({ user: myStudent.name, score: myStudent.score }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  )
    .then((response) => response.json())
    .then((json) => json);

  form.reset();
  getData();
});

// handle refresh button
const refresh = document.getElementById('ref');
refresh.addEventListener('click', (e) => {
  e.preventDefault();
  getData();
});

myGame();
