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

getStudioData();