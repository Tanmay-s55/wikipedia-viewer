let endpoint = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch='
let inputQuery = document.getElementById('input-el');
let searchButton = document.getElementById('search-btn');
let resultsContainer = document.querySelector('.results');
let inputField = document.getElementById('input-el');

inputField.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
        clearResults(); 
        endpoint += inputQuery.value;
        giveResults(endpoint);
    }
})
searchButton.addEventListener('click', function(){
    clearResults(); //clears result of previous search
    endpoint += inputQuery.value;
    giveResults(endpoint);
});

function giveResults(url){
    fetch(url)
    .then((response) => response.json())
    .then((data) => displayResults(data));
}

function displayResults(obj) {
    let queries = obj;
    let arr = queries.query.search;
    resultsContainer.classList.remove('hide');
    arr.forEach(element => {
        resultsContainer.innerHTML += `
            <div class="result">
                
            <h3><a href="https://en.wikipedia.org/?curid=${element.pageid}" target="_blank">${element.title}</a></h3>
            <p>${element.snippet}</p>

            </div>
            `;
    });
}

const clearResults = () => {
    resultsContainer.innerHTML = '';
    endpoint = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=';
}
