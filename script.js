const apiUrl = "https://api.pexels.com/v1/search?"; // l'indirizzo dell'endpoint da passare al fetch come url
const apiKey = "tF2lGCLg3V2Sl90gHkjdJ6tastROqqRLls6CcktufE4ILNezlPgJLqY4"; // la api key da inserire in authorization nel header della chiamata fetch
const mainDiv = document.getElementById("main"); // div contenitore delle card
const amountDiv = document.getElementById("amount"); // div che indica il numero di elementi trovati
const footButtonsDiv = document.getElementById("foot-buttons");


function getAlbum() {
    let userInput = document.getElementById("input-text").value;
    fetch(apiUrl + "page=1&per_page=15&query=" + userInput, { 
        headers: {
            authorization: apiKey
            }
        })
    .then((res) => {
        return res.json()
    })
    .then((resJson) => {
        putAlbum(userInput, resJson);
    })
    .catch((err) => {console.log("Errore: " + err)});
}

function putAlbum(uInput, json) {
    console.log(json);
    mainDiv.innerHTML = "";
    let totalResults = json.total_results;
    let jsonPhotos = json.photos;
    jsonPhotos.forEach((element, index) => {
        createCard(element);
    });
    amountDiv.innerHTML = `<h4>${totalResults} elementi trovati.</h4>`;
    createFootButtons(uInput, json.page, totalResults);
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

function createFootButtons(startInput, pageNumber, totalImages) {
    let prevButton = document.createElement("button");
    prevButton.type = "submit";
    prevButton.classList.add("btn", "btn-primary");
    prevButton.addEventListener("click", () => {
        getNext(startInput, pageNumber - 1);
    })
    prevButton.innerText = "Prev.";

    let nextButton = document.createElement("button");
    nextButton.type = "submit";
    nextButton.classList.add("btn", "btn-primary");
    nextButton.addEventListener("click", () => {
        getPrev(startInput, pageNumber + 1);
    })
    nextButton.innerText = "Next";

    let pages = document.createElement("span");
    let totalPages = Math.ceil(totalImages / 15);
    pages.innerText = `Pagina ${pageNumber} di ${totalPages}`;

    footButtonsDiv.innerHTML = "";
    footButtonsDiv.appendChild(prevButton);
    footButtonsDiv.appendChild(pages);
    footButtonsDiv.appendChild(nextButton);
}


function getNext(oldInput, nextPage) {
    fetch(apiUrl + "page=" + nextPage + "&per_page=15&query=" + oldInput, { 
        headers: {
            authorization: apiKey
            }
        })
    .then((res) => {
        return res.json()
    })
    .then((resJson) => {
        putAlbum(oldInput, resJson);
    })
    .catch((err) => {console.log("Errore: " + err)});
}

function getPrev(oldInput, prevPage) {
    fetch(apiUrl + "page=" + prevPage + "&per_page=15&query=" + oldInput, { 
        headers: {
            authorization: apiKey
            }
        })
    .then((res) => {
        return res.json()
    })
    .then((resJson) => {
        putAlbum(oldInput, resJson);
    })
    .catch((err) => {console.log("Errore: " + err)});
}
