import refs from './refs.js';
const { body, slidePrev, slideNext} = refs;
import { getTimeOfDay } from './time.js'

let randomNum = getRandomNum();
setBg(randomNum);

slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);

function getRandomNum() {
    const min = 1;
    const max = 21;
  let  randomNum = Math.floor(Math.random() * (max - min) + min);
    return randomNum.toString().padStart(2, '0');
    };


function setBg(randomNum) {
   const img = new Image();
    const date = new Date();

    const hours = date.getHours();
    const timeOfDay = getTimeOfDay(hours);
    let bgNum = randomNum;
    
    // body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
 
    img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`
  }; 
}

 

function getSlideNext() {
     
    if (randomNum === '20') {
        randomNum = '01';
        setBg(randomNum);
      
    } else {
        randomNum = String(parseInt(randomNum) + 1).padStart(2, '0')
        setBg(randomNum);
    }
   

}
function getSlidePrev() {
        if (randomNum === '01') {
        randomNum = '20';
        setBg(randomNum);
      
    } else {
        randomNum = String(parseInt(randomNum) - 1).padStart(2, '0')
        setBg(randomNum);
    }
}