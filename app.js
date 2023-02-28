// Fetching 
const getCurrencyOptions = async () => {
    const optionUrl = 'https://api.exchangerate.host/symbols';

    const response = await fetch(optionUrl);

    const json = await response.json ();

    return json.symbols;
    
}

// getCurrencyOptions().then(console.log);

// Fetching the currency rates (convert endpoint result) data from Api endpoint
const getCurrencyRate = async (fromCurrency,toCurrency) => {
    const currencyConvertUrl = new URL ('https://api.exchangerate.host/convert?');
    currencyConvertUrl.searchParams.append('from', fromCurrency);
    currencyConvertUrl.searchParams.append('to', toCurrency);

    const response = await fetch(currencyConvertUrl)

    const json = await response.json();

    return json.result;
}
// this function will create new option element and create it for the element being pass as an argument
const appendOptionsElToSelect = (selectEl, optionItem) => {
    const optionEl = document.createElement('option');
    optionEl.value = optionItem.code;
    optionEl.textContent = optionItem.description;

    selectEl.appendChild(optionEl);
}


const populateSelectEl = (selectEl, optionList) => {
    optionList.forEach((optionItem) => {
        appendOptionsElToSelect(selectEl, optionItem);
    })
};


// Set up currencies and make references to the DOM elements
const setUpCurrencies = async () => {
    const fromCurrency = document.querySelector('#fromCurrency');
    const toCurrency = document.querySelector('#toCurrency');
    
    const currencyOptions = await getCurrencyOptions();
    const currencies = Object.keys(currencyOptions).map(currencykeys => currencyOptions[currencykeys]);

    populateSelectEl(fromCurrency, currencies);
    populateSelectEl(toCurrency, currencies);
    
}

setUpCurrencies()


// Setting up the event listeners for our form elements.

const setupEventListener =  () => {
    const  formEl = document.getElementById('convertForm')
    formEl.addEventListener('submit', async (event) => {
        event.preventDefault();
        const fromCurrency = document.querySelector('#fromCurrency');
        const toCurrency = document.querySelector('#toCurrency');
        const amount = document.querySelector('#amount');
        const convertResultEl = document.querySelector('#convertResult');

       try {
        const rate = await getCurrencyRate(fromCurrency.value, toCurrency.value);


        const amountValue = Number(amount.value);
        const conversionRate = Number(amountValue * rate).toFixed(2);
        convertResultEl.textContent =`${amountValue} ${fromCurrency.value} = ${conversionRate} ${toCurrency.value} `
       } catch (error) {
        convertResultEl.textContent = `There is an error fetching data [${error.message}]`
        convertResultEl.classList.add('error');
       }
    })





}


setupEventListener()


// Try cash block 
