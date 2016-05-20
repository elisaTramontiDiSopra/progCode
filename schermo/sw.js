'use strict';

console.log('Started', self);
self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});
self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});
self.addEventListener('push', function(event) {  
  console.log('Push message', event);
  aggiornaCode();
  var title = 'La coda sta avanzando';
  event.waitUntil(
    self.registration.showNotification(title, {
      body: 'Il tuo turno si sta avvicinando',
      icon: 'images/icon.png',
      tag: 'my-tag'
    })
  );
})





function aggiornaCode() {
  console.log('getJSON CODE FUNCTION STARTED')
  var url='php/recuperaCoda.php';
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
    document.getElementById("servito01").innerHTML = dataJSON['1']['numeroServito'];
    document.getElementById("servito02").innerHTML = dataJSON['2']['numeroServito'];
    document.getElementById("servito03").innerHTML = dataJSON['3']['numeroServito'];
}






/*
function getJsonCode() {
  var url='php/situazioneCode.json';
  fetch(url).then(function(response) {
    return response.json();
  }).then(function(data) {
    aggiornaLoSchermo(data);
    console.log(data);
  }).catch(function(err) {
      console.log ('ERRORE ', err);
  })
}
*/


/*
function getCode() {
  console.log('get code iniziato');
  richiestaCode = new XMLHttpRequest();
  richiestaCode.open('get', 'php/recuperaCoda.php', true);
  richiestaCode.send();
  rispostaJSON = richiestaCode.responseText;
  console.log('rispostaJSON');
}
*/






      
function checkStatus (response) {
  if (response.status === 200) {
    return Promise.resolve(response);
  }else {
    return Promise.reject(
      new Error (response.statusText));
  }
}      

function getJSON(response){
  return response.json();
}