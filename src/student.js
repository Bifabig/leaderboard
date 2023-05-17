export default class Student {
  constructor(name, score) {
    this.id = Math.random() * 1000;
    this.name = name;
    this.score = score;
  }

  storeStudent() {
    let student = {};
    // add form validation
    if (this.name && this.score !== '') {
      student = {
        id: this.id,
        name: this.name,
        score: this.score,
      };
    }

    return student;
  }

  addStudent() {
    const studentItem = document.createElement('tr');
    studentItem.setAttribute('id', this.id);
    const namePara = document.createElement('td');
    namePara.textContent = `${this.name}: ${this.score}`;

    const recentScores = document.querySelector('.recent-scores');

    studentItem.appendChild(namePara);

    return recentScores.appendChild(studentItem);
  }
}
