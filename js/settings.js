import refs from './refs.js';
const { settingsOpenBtn,
    settingsWindow,
    time,
    date,
    greetingContainer,
    todoContainer,
    quoteContainer,
    player,
    weather,
    showTimeFlag,
    showDateFlag,
    showGreetingFlag,
    showWeatherFlag,
    showPlayerFlag,
    showTodoFlag,
    showQuoteFlag,
} = refs;


let timeIsShow = true;
let dateIsShow = true;
let greetingIsShow = true;
let todoIsShow = true;
let quoteIsShow = true;
let playerIsShow = true;
let weatherIsShow = true;




function elementHiddenFoo(event, flag, element, name) {
    if (event.target.checked===false) {
         element.classList.add('hidden')
        flag = false;     
    } else {
        element.classList.remove('hidden')
        flag = true;    
    }
     localStorage.setItem(name, flag)
}

function showElemCreate(name,checkbox, elem, flag) {
    const targetShowElem = JSON.parse(localStorage.getItem(name));
     if (targetShowElem !== null) {
      checkbox.checked = targetShowElem;
        if (!checkbox.checked) {
        elem.classList.add('hidden')
        flag = false;     
    } else {
        elem.classList.remove('hidden')
        flag = true;    
    } 
    }
}

showDateFlag.addEventListener('click', (e) => {
    elementHiddenFoo(e, dateIsShow, date, 'showDate');
});
showTimeFlag.addEventListener('click', (e) => {
    elementHiddenFoo(e, timeIsShow, time, 'showTime');   
});
showWeatherFlag.addEventListener('click', (e) => {
    elementHiddenFoo(e, weatherIsShow, weather,  'showWeather');   
});
showPlayerFlag.addEventListener('click', (e) => {
    elementHiddenFoo(e, playerIsShow, player,  'showPlayer');   
});
showTodoFlag.addEventListener('click', (e) => {
    elementHiddenFoo(e, todoIsShow, todoContainer,  'showTodo');   
});
showQuoteFlag.addEventListener('click', (e) => {
    elementHiddenFoo(e, quoteIsShow, quoteContainer,  'showQuote');   
});
showGreetingFlag.addEventListener('click', (e) => {
    elementHiddenFoo(e, greetingIsShow, greetingContainer,  'showGreeting');   
});

window.addEventListener('DOMContentLoaded', ()=>{
    showElemCreate('showTime', showTimeFlag, time, timeIsShow);
    showElemCreate('showDate', showDateFlag, date, dateIsShow);
    showElemCreate('showWeather', showWeatherFlag, weather, weatherIsShow);
    showElemCreate('showPlayer', showPlayerFlag, player, playerIsShow);
    showElemCreate('showTodo', showTodoFlag, todoContainer, todoIsShow);
    showElemCreate('showQuote', showQuoteFlag, quoteContainer, quoteIsShow);
    showElemCreate('showGreeting', showGreetingFlag, greetingContainer, greetingIsShow);
})




settingsOpenBtn.addEventListener('click', () => {
    settingsWindow.classList.toggle('hidden');

   
});





