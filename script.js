const apiUrl = "https://api.pexels.com/v1"; //l'indirizzo dell'endpoint da passare al fetch come url
const apiKey = "tF2lGCLg3V2Sl90gHkjdJ6tastROqqRLls6CcktufE4ILNezlPgJLqY4"; //la api key da inserire in authorization nel header della chiamata fetch
let mainDiv = document.getElementById("main");

function getAlbum() {
    let userInput = document.getElementById("input-text").value;
    console.log(userInput);
    fetch(apiUrl + "/search?query=" + userInput, { 
        headers: {
            authorization: apiKey
            }
        })
    .then((res) => {
        return res.json()
    })
    .then((resJson) => {
        putAlbum(resJson.photos)
    })
    .catch((err) => {console.log("Errore: " + err)});
}

function putAlbum(json) {
    let img;
    let bootCardDiv;
    let bootCardBodyDiv;
    let bootPCardBoyElement;
    json.forEach(element => {
        console.log(element);
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
}