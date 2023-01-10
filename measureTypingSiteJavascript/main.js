//사용변수
const GAME_TIME = 60;

let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];
let startTime = Date.now();
let endTime = Date.now;



const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display')
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const speedDisplay = document.querySelector('.speed');
const button = document.querySelector('.button');




init();


function init(){
  buttonChange('게임로딩중...');
  getWords();
  //단어 입력시 호출되는 함수
  wordInput.addEventListener('input', checkMatch)
}

//게임 실행
function run() {
  if(isPlaying){
    return;
  }
  isPlaying = true;
  time = GAME_TIME;
  wordInput.focus();
  scoreDisplay.innerText = 0;
  startTime = Date.now();
  timeInterval = setInterval(countDown, 1000);
  checkInterval = setInterval(checkStatus, 50);
  buttonChange('게임 중');
}

function checkStatus(){
  if(!isPlaying && time === 0){
    buttonChange("게임시작");
    clearInterval(checkInterval);
  }
}


//단어 불러오기
function getWords(){
  // Make a request for a user with a given ID
  axios.get('https://random-word-api.herokuapp.com/word?number=100')
  .then(function (response) {
    response.data.forEach(word => {
      if(word.length < 10){
        words.push(word);
      }
    })
    buttonChange('게임시작');
    console.log(words);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
}





//단어일치 체크 + 타수 내보내기
function checkMatch(){
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
      wordInput.value = "";
      if(!isPlaying){
        return;
      }
      score++;

      // endTime을 넣고 여기서 계산하고 내보면 ㅇㅋ
      endTime = Date.now();
      const elapsedTime = endTime - startTime;
      const typingSpeed = Math.floor(wordDisplay.innerText.length / (elapsedTime / 100000));  // speed in characters per second
      speedDisplay.innerText = typingSpeed;

 
      scoreDisplay.innerText = score;
      time = GAME_TIME;
      const randomIndex = Math.floor(Math.random() * words.length);
      wordDisplay.innerText = words[randomIndex];
      startTime = Date.now();
      console.log(`first ${startTime}`);
    }
}


//자바 스크립트가 실행되면 자동 호출됨
//setInterval(countDown, 1000);


function countDown(){
  time > 0 ? time-- : isPlaying = false;
  if(!isPlaying){
    clearInterval(timeInterval);
  }
  timeDisplay.innerText = time;
}



function buttonChange(text){
  button.innerHTML = text;
  text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading');
}