`use strict`;

const innerContainer = document.querySelector('.section--quiz');
const btnSubmit = document.querySelector('.btn--submit');
const form = document.querySelector('.form');
const questions = document.querySelector('.questions');
const last_page = document.querySelector('.last-page');
const totalQuestions = document.querySelector('.total-questions');

const quizes = document.querySelector('.quizes');
const answers = document.querySelectorAll('.ans');

const quiz_category = document.querySelector('.quiz-category');
const quiz_difficulty = document.querySelector('.quiz-difficulty');
const quiz_type = document.querySelector('.quiz-type');
const quiz_number = document.querySelector('.quiz_number');
const currentScore = document.querySelector('.current-scrore');

let numberOfQuestions = 0;
let questionNum = 0;
let current_score = 0;

const consuming_API = () => {
  const state_difficulty =
    quiz_difficulty.value && `&difficulty=${quiz_difficulty.value}`;
  const state_category =
    quiz_category.value && `&category=${quiz_category.value}`;
  const state_type = quiz_type.value && `&type=${quiz_type.value}`;

  return (API_URL = `https://opentdb.com/api.php?amount=${quiz_number.value}${state_category}${state_difficulty}${state_type}`);
};

const apiTo_html = data => {
  const html = `
      <h2 class="secondary-text">Question <span class='current-question'> ${
        questionNum + 1
      }</span></h2>
      <p class="quiz">
       ${data.question}
      </p>
      <ul class="answers">
        <li class="ans correct">${data.correct_answer}</li>
         ${data.incorrect_answers
           .map(answer => `<li class="ans">${answer}</li>`)
           .join('')}
      </ul>

      <p class="score">
        Score <span class="current-scrore"> ${current_score} </span>/<span
          class="total-questions">${numberOfQuestions}</span>
      </p>
    `;
  quizes.innerHTML = '';
  quizes.insertAdjacentHTML('afterbegin', html);
};

const quizes_Func = async number => {
  // const res = await fetch(`quizes.json`);
  const res = await fetch(consuming_API());
  const data = await res.json();

  numberOfQuestions = data.results.length;
  apiTo_html(data.results[number]);
};

btnSubmit.addEventListener('click', function (e) {
  e.preventDefault();
  form.classList.add('hidden');
  questions.classList.remove('hidden');

  quizes_Func(questionNum);
});

innerContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target;

  if (clicked.classList.contains('ans')) {
    Array.from(answers).map(el => el.classList.remove('ans--correct'));
    clicked.classList.add('ans--correct');
    if (clicked.classList.contains('correct')) current_score += 1;

    questionNum += 1;

    if (questionNum === numberOfQuestions) {
      currentScore.textContent = current_score;
      last_page.classList.remove('hidden');
      questions.classList.add('hidden');
      return;
    }
    setTimeout(() => quizes_Func(questionNum), 1000);
  }

  if (clicked.classList.contains('btn--back')) {
    last_page.classList.add('hidden');
    form.classList.remove('hidden');

    quiz_number.value = 10;
    numberOfQuestions = 0;
    questionNum = 0;
    quizes.innerHTML = `
      <div class="spinner-div">
        <div class="spinner"></div>
      </div>
      `;

    quiz_difficulty.value = 0;
    quiz_category.value = 0;
    quiz_type.value = 0;
    current_score = 0;
  }
});
