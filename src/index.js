import './style.css';
import Student from './student.js';

let studentList = [];

const previousStudentList = JSON.parse(localStorage.getItem('studentList'));
if (previousStudentList) {
  studentList = [...previousStudentList];
}

const name = document.getElementById('name');
const score = document.getElementById('score');
const form = document.querySelector('.add-score');

form.addEventListener('submit', (e) => {
  const myStudent = new Student(name.value, score.value);
  const msg = document.querySelector('small');

  e.preventDefault();
  myStudent.storeStudent();

  if (name.value && score.value !== '') {
    myStudent.addStudent();
    studentList.push(myStudent);
    msg.innerText = '';
  } else {
    msg.innerText = '* name and score required';
  }

  localStorage.setItem('studentList', JSON.stringify(studentList));

  form.reset();
});

const recentScores = document.querySelector('.recent-scores');
studentList.forEach((studentItem) => {
  const students = document.createElement('tr');

  const student = document.createElement('td');
  student.setAttribute('id', `${studentItem.id}`);
  student.textContent = `${studentItem.name}: ${studentItem.score}`;
  students.append(student);
  recentScores.append(students);
});
