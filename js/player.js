import refs from './refs.js';
const { playPrev, play: playBtn, playNext, playList: playListEl } = refs;
import playList from './playList.js'


let isPlay = false;
let playNum = 0; 

//створює розмітку списку
playList.forEach((el) => {
    const li = document.createElement('li');
    li.classList.add('play-item');

    const audioEl = document.createElement('audio');
    audioEl.src = el.src;
    audioEl.setAttribute('controls', 'controls');

    li.append(audioEl);
    playListEl.append(li);
})







const audio = new Audio();

function playAudio() {
  
   
    if (!isPlay) {
        
        audio.src = './assets/sounds/aqua-caelestis.mp3';
        // audio.stc = srcAdress;
        audio.currentTime = 0;
        audio.play();
        playBtn.classList.add('pause');
        isPlay = true;
    }
    else {
        audio.pause();
        isPlay = false;
      playBtn.classList.remove('pause')

    }
  
}

function playPrevAudio() {
 const elems = document.querySelectorAll('.play-item');
    elems.forEach((el) => {
        el.classList.remove('item-active')
    });
   

   
    if (playNum === 0) {
        playNum = 4;
    };
 playNum -= 1;

    if (isPlay) {
       isPlay = false;
    audio.pause();
    playBtn.classList.remove('pause') 
    }
    
    // console.log(playNum);

 elems[playNum].classList.add('item-active')
   playAudio(playList[playNum].src)     
}

function playNextAudio() {
    const elems = document.querySelectorAll('.play-item');
    elems.forEach((el) =>{
       el.classList.remove('item-active') 
    })
   
    // console.log(elems);

    playNum += 1;
    
    if (playNum === 4) {
        playNum = 0;
    };

    // console.log(playNum);

    if (isPlay) {
       isPlay = false;
    audio.pause();
    playBtn.classList.remove('pause') 
    }

    elems[playNum].classList.add('item-active')
   playAudio(playList[playNum].src)  
}

playBtn.addEventListener('click', () => {
    playAudio();
 }
);
// playPrev.addEventListener('click', playPrevAudio);
// playNext.addEventListener('click', playNextAudio);
