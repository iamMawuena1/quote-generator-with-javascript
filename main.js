const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const TweetButton = document.getElementById('tweet');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get quote from API(forismatic a free api)
async function getQuote() {
    loading();
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch (proxyUrl + apiUrl); //both need to be added to create a response after awaiting fetch
        const data = await response.json();

        //if author is blank, add unknown
        if (data.quoteAuthour === '') {
            authorText.innerText = 'Unknown';
        }else{
            authorText.innerText = data.quoteAuthour;
        }

        //reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            authorText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        //Show and Stop Loader
        complete();
    } catch (error) {
        getQuote();
    }
}

//instagram quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const tweetUrl = `https://twitter.com/intent/tweet${quote} - ${author}`;
    window.open(tweetUrl, '_blank');
}

//event listners
newQuoteBtn.addEventListener('click', getQuote);
TweetButton.addEventListener('click', tweetQuote);

//on loading
getQuote(); 