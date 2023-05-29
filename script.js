const apiUrl = "https://api.pexels.com/v1"; //l'indirizzo dell'endpoint da passare al fetch come url
const apiKey = "tF2lGCLg3V2Sl90gHkjdJ6tastROqqRLls6CcktufE4ILNezlPgJLqY4"; //la api key da inserire in authorization nel header della chiamata fetch
let mainDiv = document.getElementById("main");
let amountDiv = document.getElementById("amount");

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
    let jsonPhotos = json.photos;
    let img;
    let bootCardDiv;
    let bootCardBodyDiv;
    let bootPCardBoyElement;
    let indexAmount = 0;
    jsonPhotos.forEach((element, index) => {
        console.log(element);
        indexAmount++;
        img = document.createElement("img");
        bootCardDiv = document.createElement("div");
        bootCardBodyDiv = document.createElement("div");
        bootPCardBoyElement = document.createElement("p");

        bootCardDiv.classList.add("card");
        bootCardDiv.style = "width: 18rem;";
        img.src = element.src.tiny;
        img.classList.add("card-img-top");
        bootCardBodyDiv.classList.add("card-body");
        bootPCardBoyElement.classList.add("card-text");
        bootCardBodyDiv.textContent = element.alt;
        mainDiv.appendChild(bootCardDiv);
        bootCardDiv.appendChild(img);
        bootCardDiv.appendChild(bootCardBodyDiv);
        bootCardBodyDiv.appendChild(bootPCardBoyElement);
    });
    amountDiv.innerHTML = `<h4>${indexAmount} elementi trovati.</h4>`;
}