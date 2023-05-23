const apiUrl = "https://api.pexels.com/v1"; //l'indirizzo dell'endpoint da passare al fetch come url
const apiKey = "tF2lGCLg3V2Sl90gHkjdJ6tastROqqRLls6CcktufE4ILNezlPgJLqY4"; //la api key da inserire in authorization nel header della chiamata fetch

const getAlbum = () => {
    fetch(apiUrl + "/search?query=SEA", { 
        //fetch accetta due parametri: un url e un oggetto {qui ci sono diversi paramentri} headers: è un altro oggetto -> headers{authorization: API}
    headers: {
        authorization: apiKey
        }
    })
    .then((res) => {
        return res.json()
    })
    .then((resJson) => {
        console.log(resJson.photos)
    })
    .catch((err) => {console.log("Errore: " + err)});
}

getAlbum();