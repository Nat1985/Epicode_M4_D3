const apiUrl = "https://api.pexels.com/v1"; // l'indirizzo dell'endpoint da passare al fetch come url
const apiKey = "tF2lGCLg3V2Sl90gHkjdJ6tastROqqRLls6CcktufE4ILNezlPgJLqY4"; // la api key da inserire in authorization nel header della chiamata fetch
let mainDiv = document.getElementById("main"); // div contenitore delle card
let amountDiv = document.getElementById("amount"); // div che indica il numero di elementi trovati

function getAlbum() {
    let userInput = document.getElementById("input-text").value;
    fetch(apiUrl + "/search?query=" + userInput, { 
        headers: {
            authorization: apiKey
            }
        })
    .then((res) => {
        return res.json()
    })
    .then((resJson) => {
        putAlbum(resJson);
    })
    .catch((err) => {console.log("Errore: " + err)});
}

function putAlbum(json) {
    console.log(json);
    console.log("Pagina successiva: " + json.next_page); // riferimento pagina successiva (da associare ai button avanti e indietro)
    mainDiv.innerHTML = "";
    let totalResults = json.total_results;
    let jsonPhotos = json.photos;
    jsonPhotos.forEach((element, index) => {
        createCard(element);

    });
    amountDiv.innerHTML = `<h4>${totalResults} elementi trovati.</h4>`;
}

function createCard(foreachObject) {
    let img = document.createElement("img");
    let bootCardDiv = document.createElement("div");
    let bootCardBodyDiv = document.createElement("div");

    bootCardDiv.classList.add("card");
    bootCardDiv.style = "width: 18rem;";
    img.src = foreachObject.src.tiny;
    img.classList.add("card-img-top");
    bootCardBodyDiv.classList.add("card-body");
    bootCardBodyDiv.textContent = foreachObject.alt;
    mainDiv.appendChild(bootCardDiv);
    bootCardDiv.appendChild(img);
    bootCardDiv.appendChild(bootCardBodyDiv);
}