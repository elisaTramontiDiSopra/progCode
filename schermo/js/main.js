'use strict';
var subscriptionID;

if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
    navigator.serviceWorker.register('sw.js').then(function(reg) {
        console.log(':^)', reg);
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
}
// TODO