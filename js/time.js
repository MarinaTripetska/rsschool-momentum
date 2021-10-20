import refs from './refs.js';
const { time, date: localDate, greeting, name: userName } = refs;



window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);




function showTime() {
    const date = new Date();
const options = {weekday: 'long', day: 'numeric',  month: 'long', timeZone: 'UTC'};


    const currentTime = date.toLocaleTimeString();
    const currentDate = date.toLocaleDateString('en-US', options);
    const hours = date.getHours();
  
    time.textContent = currentTime;
    localDate.textContent = currentDate;
    greeting.textContent = getTimeOfDay(hours);

    setTimeout(showTime, 1000)
};

showTime();


function getTimeOfDay(hours) {
       let result;
    if (hours < 6) {
    result = `Good night, `
    } else if (hours >= 6 && hours < 12) {
        result = `Good morning, `
    } else if (hours >= 12 && hours < 18) {
       result = `Good afternoon, ` 
    } else {
        result = `Good evening, `
}
    return result;
};

function setLocalStorage() {
    localStorage.setItem('name', userName.value);
};

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        userName.value = localStorage.getItem('name')
    };
};


