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

