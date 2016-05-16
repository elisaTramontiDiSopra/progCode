    
function aggiornoNumeroCodaEStampa(targetElement) {
    //var datetime = getDataOdierna()
    var datetime = '05052016';
    var ambulatorio = targetElement.getAttribute("data-value");
    console.log ('datetime: ', datetime, ' ambulatorio: ', ambulatorio);
    var url = "php/updateCoda.php?ambulatorio="+ambulatorio+"&data"+datetime;
    fetch(url).then(function(response) {
        if (response.status !== 200) {  
            console.log('Problema: ', response.status);  
            return;  
        } else {
            console.log('prima funzione');
            return response.json();
        };
    }).then(function(risposta) {
        var numeroDaStampare = risposta.ultimoNumeroPrenotato;
        console.log(numeroDaStampare);
        inviaNumeroInStampa(numeroDaStampare);
        //console.log(data.json());
    }).catch(function(err) {
        console.log ('ERRORE ', err);
    })
} 


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

function getDataOdierna() {
    var currentdate = new Date();
    var datetime = currentdate.getDate().toString() +(currentdate.getMonth()+1).toString() + currentdate.getFullYear().toString();
    return datetime;
}


function inviaNumeroInStampa() {
    console.log('stampa');
    var ticketTemplate = document.getElementById('ticketTemplate');
    var tuttaLaPagina = document.body.innerHTML;
    document.body.innerHTML = ticketTemplate;
    window.print();
    document.body.innerHTML = tuttaLaPagina;
}