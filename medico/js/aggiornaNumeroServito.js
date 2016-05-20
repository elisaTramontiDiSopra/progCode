function avanzaCodaMedico(targetElement) {
    var studio = 'studio01';
    var ambulatorio = '1';
    var urlAggiornaCoda = 'php/sendPush.php?studio='+studio+'&ambulatorio='+ambulatorio;
    console.log(urlAggiornaCoda);
    fetch(urlAggiornaCoda).then(function(response) {
        if (response.status !== 200) {  
            console.log('Problema: ', response.status);  
            return;  
        } else {
            console.log("Ho chiamato lo script dell'aggiorna coda");
            //return response.json();
        };
    }).catch(function(err) {
        console.log ('ERRORE ', err);
    })
} 
/*

function avanzaCodaMedico(targetElement) {
    var studio = 'studio01';
    var ambulatorio = targetElement.getAttribute("data-value");
    var urlAggiornaCoda = 'php/sendPush.php?studio='+studio+'&ambulatorio='+ambulatorio;
    fetch(urlAggiornaCoda).then(function(response) {
        if (response.status !== 200) {  
            console.log('Problema: ', response.status);  
            return;  
        } else {
            console.log("Ho chiamato lo script dell'aggiorna coda");
            return response.json();
        };
    }).then(function(risposta) {
        var numeroServitoDaVisualizzare = risposta.numeroServito;
        console.log(numeroServitoDaVisualizzare);       
    }).catch(function(err) {
        console.log ('ERRORE ', err);
    })
} */