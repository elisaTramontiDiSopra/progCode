'use strict';
var subscriptionID;

if ('serviceWorker' in navigator) {
    //console.log('Service Worker is supported');
    navigator.serviceWorker.register('sw.js').then(function(reg) {
        console.log("SW registration succeeded. Scope is "+reg.scope);
        //console.log(':^)', reg);
        reg.pushManager.subscribe({
            userVisibleOnly: true
        }).then(function(sub) {
            //elimino la prima parte dell'URL Google
            subscriptionID = sub.endpoint.slice(40,sub.endpoint.length)    
            console.log(subscriptionID);      
        }).then(function(){
            var xmlhttp = new XMLHttpRequest();
            var url = "php/insertIntoDB.php?subscriptionID="+subscriptionID+"&nome_dispositivo="+nome_dispositivo;
            //console.log(parameters);
            xmlhttp.open("GET", url ,true);
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send();  
        });
    }).catch(function(error) {
        console.log(':^(', error);
    });
    //
    navigator.serviceWorker.addEventListener('message', function(event){
        console.log(event);
        console.log("Client 1 Received Message: " + event.data);
        event.ports[0].postMessage("Client 1 Says 'Hello back!'");
    });
    //
}
/*
if('serviceWorker' in navigator){
    // Handler for messages coming from the service worker
    navigator.serviceWorker.addEventListener('message', function(event){
        console.log(event);
        console.log("Client 1 Received Message: " + event.data);
        event.ports[0].postMessage("Client 1 Says 'Hello back!'");
    });
}*/



function send_message_to_sw(msg){
    return new Promise(function(resolve, reject){
        // Create a Message Channel
        var msg_chan = new MessageChannel();

        // Handler for recieving message reply from service worker
        msg_chan.port1.onmessage = function(event){
            if(event.data.error){
                reject(event.data.error);
            }else{
                resolve(event.data);
            }
        };

        // Send message to service worker along with port for reply
        navigator.serviceWorker.controller.postMessage("Client 1 says '"+msg+"'", [msg_chan.port2]);
    });
}
// TODO

function aggiornaCode() {
  var url='php/recuperaCoda.php';
  fetch(url).then(function(response) {
    return response.json();
  }).then(function(data) {
    //console.log(data);
    //var notificaArrivata = true;
    //console.log('cambio status notifica');
    //aggiornaSchermoDue(data);
    var numeroServito01 = data['1']['numeroServito'];
    console.log('numServ: ', numeroServito01);
    //var numeroServito02 = dataJSON['2']['numeroServito'];
    //var numeroServito03 = dataJSON['3']['numeroServito'];
    return numeroServito01;
  }).catch(function(err) {
      console.log ('ERRORE ', err);
  })
}
