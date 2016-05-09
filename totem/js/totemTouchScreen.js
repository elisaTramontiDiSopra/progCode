//connect to db

//

function recuperoUltimoNumeroCoda(targetElement) {
    studio = targetElement.getAttribute("data-value");
    //chiamo il php che si connette al database passandogli la variabile
    var url = "php/controllaCoda.php?studio="+studio;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url ,true);
    //xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(); 
    console.log('AGGIORNATA LA CODA'); 
    var ultimoNumeroPrenotato = xmlhttp.responseText;
    console.log(ultimoNumeroPrenotato);
}

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
     document.getElementById("demo").innerHTML = xhttp.responseText;
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}




/*
function recuperoUltimoNumeroCoda() {
    return new Promise(function(resolve, reject) {
        function recuperoUltimoNumeroCoda(targetElement) {
            studio = targetElement.getAttribute("data-value");
            var url = "php/controllaCoda.php?studio="+studio;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", url ,true);
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send(); 
            console.log('AGGIORNATA LA CODA'); 
        }
    }
}

*/


/*

function aggiornaCodaDB(targetElement) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    
    studio = targetElement.getAttribute("data-value");
    var url = "php/controllaCoda.php?studio="+studio;
    var XMLHttp = new XMLHttpRequest();
    XMLHttp.open('GET', url, true);
    XMLHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    XMLHttp.send();
    if(XMLHttp.status == 200) {
        resolve();
    }
    else {
        reject();
    }
    /*
    //mandaPHP.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (XMLHttp.status == 200) {
        // Resolve the promise with the response text
        resolve(XMLHttp.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(XMLHttp.statusText));
      }
    //};

    // Handle network errors
    XMLHttp.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request

    //XMLHttp.send();
  });
}

// Use it!

function recuperoUltimoNumeroCoda(targetElement) {
    aggiornaCodaDB(targetElement).then(function(response) {
        console.log("Success!", response);
    }, function(error) {
        console.error("Failed!", error);
    });
}
*/














/*


'use strict';
var promiseCount = 0;

function testPromise() {
    var thisPromiseCount = ++promiseCount;

    var log = document.getElementById('log');
    log.insertAdjacentHTML('beforeend', thisPromiseCount +
        ') Started (<small>Sync code started</small>)<br/>');

    // We make a new promise: we promise a numeric count of this promise, starting from 1 (after waiting 3s)
    var p1 = new Promise(
        // The resolver function is called with the ability to resolve or
        // reject the promise
        function(resolve, reject) {
            log.insertAdjacentHTML('beforeend', thisPromiseCount +
                ') Promise started (<small>Async code started</small>)<br/>');
            // This is only an example to create asynchronism
            window.setTimeout(
                function() {
                    // We fulfill the promise !
                    resolve(thisPromiseCount);
                }, Math.random() * 2000 + 1000);
        }
    );

    // We define what to do when the promise is resolved/fulfilled with the then() call,
    // and the catch() method defines what to do if the promise is rejected.
    p1.then(
        // Log the fulfillment value
        function(val) {
            log.insertAdjacentHTML('beforeend', val +
                ') Promise fulfilled (<small>Async code terminated</small>)<br/>');
        })
    .catch(
        // Log the rejection reason
        function(reason) {
            console.log('Handle rejected promise ('+reason+') here.');
        });

    log.insertAdjacentHTML('beforeend', thisPromiseCount +
        ') Promise made (<small>Sync code terminated</small>)<br/>');
}






*/





//toggle function for buttons
function toogle(targetElement) {		
    //trovo la colonna, l'indice della colonna e lo metto in T come numero intero
    colonna = targetElement.parentNode;
    colonnaId = colonna.getAttribute("id");
    t = colonnaId.slice(-2);
    t = parseInt(t);		
    /****************  PERCHE' NON POSSO USARE THIS? ***************************************/
    //trovo l'id del pulsante e lo metto in I
    i = targetElement.getAttribute("data-value");
    i = parseInt(i);		
    controlloSeLaClasseEUnchecked(targetElement);	
    //creo l'array delle note nella colonna
    noteColonna = colonna.children;
    //se la classe è unchecked
    if (classePulsante == "unchecked") {
        //vedo se c'è già qualche elemento checked e lo metto unchecked
        prevChecked = document.getElementById(colonnaId).getElementsByClassName("checked")[0];	
		if (prevChecked != null) {
            //se c'è un elemento che prima era checked inverto le classi css
            prevChecked.classList.remove("checked");
            prevChecked.classList.add("unchecked");
		}	
        targetElement.classList.remove("unchecked");
        targetElement.classList.add("checked");	
        //do alla nota il valore del pulsante e lo metto nell'array nella posizione T
        valoreNota = i;
        arrayCanzone[t] = valoreNota;
		//console.log(arrayCanzone);			
        //se la classe è checked la metto unchecked e ripristino la classe nota che mi serve per il css
    } else {
        targetElement.className = "unchecked nota" + i;			
        //do alla nota il valore 0=pausa e lo metto nell'array nella posizione T
        valoreNota = 0;
        arrayCanzone[t] = valoreNota;
        //controlloSeLaPosizioneArrayEOccupata();
    }
}