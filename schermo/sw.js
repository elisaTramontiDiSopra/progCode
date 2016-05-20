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
  getJsonCode();
  var title = 'La coda sta avanzando';
  event.waitUntil(
    self.registration.showNotification(title, {
      body: 'Il tuo turno si sta avvicinando',
      icon: 'images/icon.png',
      tag: 'my-tag'
    })
  );
})

/*
{
    "1": {
        "numeroServito": "5",
        "medico": "Dottor Dorian"
    },
    "2": {
        "numeroServito": "8",
        "medico": "Dottor Cox"
    },
    "3": {
        "numeroServito": "15",
        "medico": "Dottor Turk"
    }
}*/

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