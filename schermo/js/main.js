'use strict';
var subscriptionID;

if ('serviceWorker' in navigator) {
    //console.log('Service Worker is supported');
    navigator.serviceWorker.register('sw.js').then(function(reg) {
        console.log("SW registration succeeded. Scope is "+reg.scope);
        reg.pushManager.subscribe({
            userVisibleOnly: true
        }).then(function(sub) {
            //elimino la prima parte dell'URL Google
            subscriptionID = sub.endpoint.slice(40,sub.endpoint.length)    
            console.log(subscriptionID);      
        }).then(function(){
            var xmlhttp = new XMLHttpRequest();
            var url = "php/insertIntoDB.php?subscriptionID="+subscriptionID+"&nome_dispositivo="+nome_dispositivo;
            xmlhttp.open("GET", url ,true);
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send();  
        });
    }).catch(function(error) {
        console.log(':^(', error);
    });
    //GESTIONE DEL MESSAGGIO CHE ARRIVA DAL SERVICE WORKER
    navigator.serviceWorker.addEventListener('message', function(event){
        aggiornaValoriCodaNellaPagina(event.data);
    });
    //
}

function aggiornaValoriCodaNellaPagina(messaggioArrivato) {
    var arr = messaggioArrivato.split("::"); //estraggo i valori separati con :: e li metto in un array
    console.log(arr[0]);
    document.getElementById("servito01").innerHTML = arr[0];
    document.getElementById("servito02").innerHTML = arr[1];
    document.getElementById("servito03").innerHTML = arr[2];
}

/*
FUNZIONI ALL'AVVIO DI PAGINA
- prelievo dati studio
- prelievo dati inizio coda
 */

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


