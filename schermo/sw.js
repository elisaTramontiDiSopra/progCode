//'use strict';

console.log('Started', self);
self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});
self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});

self.addEventListener('push', function(event) {  
  aggiornaCode();  
  /* VISUALIZZAZIONE NOTIFICA
  var title = 'La coda sta avanzando';
  event.waitUntil(
    self.registration.showNotification(title, {
      body: 'Il tuo turno si sta avvicinando',
      icon: 'images/icon.png',
      tag: 'my-tag'
    })
  );*/
})

function aggiornaCode() {
    console.log('aggiorna coda');
    
  var url='php/recuperaCoda.php';
  fetch(url).then(function(response) {
      //console.log("RESPONCE::: ", response);
    return response.json();
  }).then(function(data) {
      console.log(data);
      
    var numeroServito01 = data['1']['numeroServito'];
    var numeroServito02 = data['2']['numeroServito'];
    var numeroServito03 = data['3']['numeroServito'];
    var msg = numeroServito01+"::"+numeroServito02+"::"+numeroServito03
    send_message_to_all_clients(msg);
  }).catch(function(err) {
      console.log ('ERRORE ', err);
  })
  
}


function send_message_to_client(client, msg){
    return new Promise(function(resolve, reject){
        var msg_chan = new MessageChannel();

        msg_chan.port1.onmessage = function(event){
            if(event.data.error){
                reject(event.data.error);
            }else{
                resolve(event.data);
            }
        };

        client.postMessage(msg, [msg_chan.port2]);
    });
};

function send_message_to_all_clients(msg){
    clients.matchAll().then(clients => {
        clients.forEach(client => {
            send_message_to_client(client, msg).then(m => console.log("Messaggio inviato da funzione esterna: "+m));
        })
    })
}