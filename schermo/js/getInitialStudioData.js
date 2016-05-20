function getStudioData() {
  var url='php/situazioneStudio.json';
  fetch(url).then(function(response) {
    return response.json();
  }).then(function(data) {
    putStudioData(data);
  }).catch(function(err) {
      console.log ('ERRORE ', err);
  })
}

function putStudioData(dataJSON) {
    document.getElementById("titolo").innerHTML = dataJSON.studio.titolo;
    document.getElementById("sottotitolo").innerHTML = dataJSON.studio.sottotitolo;
    document.getElementById("info").innerHTML = dataJSON.studio.orari;
}

//PRENDI DATI CODA INIZIALI
/* RECUPERO DATI DAL JSON GENERALE */
function getJsonCode() {
  console.log('getJSON COVE FUNCTION STARTED')
  var url='php/situazioneCode.json';
  fetch(url).then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log(data);
    aggiornaSchermo(data);
  }).catch(function(err) {
      console.log ('ERRORE ', err);
  })
}

function aggiornaSchermo(dataJSON) {
    document.getElementById("servito01").innerHTML = dataJSON.studio01.numeroServito;
    document.getElementById("servito02").innerHTML = dataJSON.studio02.numeroServito;
    document.getElementById("servito03").innerHTML = dataJSON.studio03.numeroServito;
}

getJsonCode();
getStudioData();