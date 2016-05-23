function getStudioData() {
  var url='php/situazioneStudio.json';
  fetch(url).then(function(response) {
    return response.json();
  }).then(function(data) {
    putStudioData(data);
  }).catch(function(err) {
      console.log ('ERRORE NEL RECUPERO DATI STUDIO', err);
  })
}

function putStudioData(dataJSON) {
    document.getElementById("titolo").innerHTML = dataJSON.studio.titolo;
    document.getElementById("sottotitolo").innerHTML = dataJSON.studio.sottotitolo;
    document.getElementById("info").innerHTML = dataJSON.studio.orari;
}

function controllaCode() {
    console.log('Repeat funzione');
    getJsonCode();
    setTimeout(controllaCode(), 15000);
}

// FUNZIONE CON PHP
function getJsonCode() {
  //console.log('getJSON CODE FUNCTION STARTED')
  var url='php/recuperaCoda.php';
  fetch(url).then(function(response) {
    return response.json();
  }).then(function(data) {
    //console.log(data);
    aggiornaSchermo(data);
  }).catch(function(err) {
      console.log ('ERRORE ', err);
  })
}

function aggiornaSchermo(dataJSON) {
    document.getElementById("servito01").innerHTML = dataJSON['1']['numeroServito'];
    document.getElementById("servito02").innerHTML = dataJSON['2']['numeroServito'];
    document.getElementById("servito03").innerHTML = dataJSON['3']['numeroServito'];
}

getJsonCode();
getStudioData();
controllaCode();