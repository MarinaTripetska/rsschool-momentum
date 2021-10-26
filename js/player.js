import refs from './refs.js';
const { playPrev, play: playBtn, playNext, playList: playListEl } = refs;
import playList from './playList.js'

let isPlay = false;
let playNum = 0; 

playList.forEach((el) => {
    const li = document.createElement('li');
    li.classList.add('play-item', 'play', 'player-icon');

    const audioEl = document.createElement('audio');
    audioEl.src = el.src;

    const audioName = document.createElement('p');
    audioName.classList.add('audio-name');
    audioName.textContent = el.title;
      
    li.append(audioEl, audioName);
    playListEl.append(li);
});

const elems = [...document.querySelectorAll('.play-item')];

const audio = new Audio();


function playAudio(srcAdress) {
     elems.forEach((el) =>{
       el.classList.remove('item-active', 'pause') 
     })
     elems[playNum].classList.add('item-active');
    
   if (!isPlay) {
        audio.src = srcAdress;
       audio.play();
       
        playBtn.classList.add('pause');
        elems[playNum].classList.add('pause', 'item-active');
        isPlay = true;
    }
    else {
        audio.pause();
        isPlay = false;
        playBtn.classList.remove('pause');
        elems[playNum].classList.remove('pause');
    };  
};


function playPrevAudio() {
    elems.forEach((el) => {
        el.classList.remove('item-active', 'pause')
    });  
    if (playNum === 0) {
        playNum = 4;
    };
    playNum -= 1;
    isPlay = false;
    // audio.pause();
    // playBtn.classList.remove('pause')
    // elems[playNum].classList.remove('pause');
    elems[playNum].classList.add('item-active')
     playAudio(elems[playNum].firstChild.src)
        
};

function playNextAudio() {
    elems.forEach((el) =>{
       el.classList.remove('item-active', 'pause') 
    })
    playNum += 1;
    if (playNum === 4) {
        playNum = 0;
    };
    isPlay = false;
    // audio.pause();
    // playBtn.classList.remove('pause');
    playAudio(elems[playNum].firstChild.src)
    
    elems[playNum].classList.add('item-active');

};


elems.forEach((el, index) => {
    el.addEventListener('click', () => {
        // audio.pause();
        isPlay = false;
       
        
         playNum = index;
        el.classList.add('item-active');
         playAudio(el.firstChild.src);
        
           
    });
  
});

audio.addEventListener('ended', () => {
    // isPlay = false;
    playNextAudio();
}
);

playBtn.addEventListener('click', () => {
        playAudio(playList[playNum].src);
 }
);

playPrev.addEventListener('click', playPrevAudio);

playNext.addEventListener('click', playNextAudio);
