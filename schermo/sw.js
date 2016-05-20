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


/* RECUPERO DATI DAL JSON GENERALE */
function getJsonCode() {
  console.log('getJSON COVE FUNCTION STARTED')
  var url='../php/situazioneCode.json';
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
    document.getElementById("servito01").innerHTML = dataJSON[0].numeroServito;
}

getJsonCode();
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







/*
var oReq = new XMLHttpRequest(); //New request object
    oReq.onload = function() {
        //This is where you handle what to do with the response.
        //The actual data is found on this.responseText
        alert(this.responseText); //Will alert: 42
    };
    oReq.open("get", "get-data.php", true);
    //                               ^ Don't block the rest of the execution.
    //                                 Don't wait until the request finishes to 
    //                                 continue.
    oReq.send();


*/


/*self.addEventListener('push', function(event) {  
  console.log('Push message', event);
  test();
  event.waitUntil(
    fetch('php/test.json') 
    
    .then(checkStatus(response))
    /*
    .then (checkStatus(response))
    .then (getJSON(response))
    .then(function(data) {
      console.log('data ', data);
    })
    .catch(function(err) {
      console.log ('ERRORE ', err);
    })*
    
    .then(response => response.json())
    .then(function(response) { 
        if (response.status !== 200) {  
          console.log('PROBLEMA. Status Code: ' +  
            response.status);  
          return;  
        }
        response.json().then(function(data) {  
        console.log(data);  
        })
    })
  )
});*/
      
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



     // function () {
       // servito=response[servito];
     //   console.log(servito);})
 /* .then(data =>
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      tag: data.tag,
    })
  )
});*/
  
  
  /*
  event.waitUntil(
    self.registration.showNotification(title, {
      body: 'The Message',
      icon: 'images/icon.png',
      tag: 'my-tag'
    }));*/
//});

/*


var url = "php/recuperaCoda.php?studio=studio01&data=05052016";
 self.addEventListener('push', function(event) {    
  event.waitUntil(  
    fetch(url).then(function(response) {  
      if (response.status !== 200) {  
        // Either show a message to the user explaining the error  
        // or enter a generic message and handle the
        // onnotificationclick event to direct the user to a web page  
        console.log('Looks like there was a problem. Status Code: ' + response.status);  
        throw new Error();  
      }
 
      // Examine the text in the response  
      return response.json().then(function(data) {  
        if (data.error || !data.notification) {  
          console.log('The API returned an error.', data.error);  
          throw new Error();  
        }  
        var title = data.notification.title;  
        var message = data.notification.message;  
        var icon = data.notification.icon;  
 
        return self.registration.showNotification(title, {  
          body: message,  
          icon: icon,  
          data: {
            url: data.notification.url
          }  
        });  
      });  
    }).catch(function(err) {  
      console.log('Unable to retrieve data', err);
 
      var title = 'An error occurred';
      var message = 'We were unable to get the information for this push message';  
      var icon = 'img/design19.jpg';  
      var notificationTag = 'notification-error';  
      return self.registration.showNotification(title, {  
          body: message,  
          icon: icon,  
          tag: notificationTag  
        });  
    })  
  );  
});
 



*/
