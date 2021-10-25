import refs from './refs.js'
const { quote: quoteEl, author: authorEl, changeQuote} = refs;


async function getQuotes() {
  const quotes = 'https://favqs.com/api/qotd/';
    const res = await fetch(quotes);
    
  const data = await res.json(); 
    // console.log(data);
    const { body, author } = data.quote;
     quoteEl.textContent = body;
    authorEl.textContent = author;   
    
}
getQuotes();
changeQuote.addEventListener('click', getQuotes)
