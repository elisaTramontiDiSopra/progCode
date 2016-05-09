databaseLink = "https://eliminacode.firebaseio.com";		//db su firebase
var myFirebaseRef = new Firebase(databaseLink)

// GET DATA STAMP AND CHANGE THE URL TO READ DATA FROM THE RIGHT DAY
dataCorrente = '12042016';
urlDBCurrentData = databaseLink + '/' + dataCorrente + '/numeroServito';
var firebaseLinkCurrentData = new Firebase (urlDBCurrentData);

firebaseLinkCurrentData.on('value', function(snapshot) {
    var numeroServitoDB = snapshot.val();
    var numeroServitoHTML = document.getElementById("numeroServito");
    numeroServitoHTML.textContent = numeroServitoDB
    console.log(numeroServito);
});




/*


ref.on("child_changed", function(snapshot) {
  var changedPost = snapshot.val();
  console.log("The updated post title is " + changedPost.title);
});



myFirebaseRef.on('child_added', function(snapshot) {
      var datiCompleti = snapshot.val();

      var msgUsernameElement = document.createElement("b");
      msgUsernameElement.textContent = msg.username;
      
      var msgTextElement = document.createElement("p");
      msgTextElement.textContent = msg.text;

      var msgElement = document.createElement("div");
      msgElement.appendChild(msgUsernameElement);
      msgElement.appendChild(msgTextElement);

      document.getElementById("results").appendChild(msgElement);
    });






function recuperaTitoliCanzoni() {
    //imposto il riferimento al database	
    var myFirebaseRef = new Firebase(databaseLink);
    myFirebaseRef.once('value', function (dataSnapshot) {
        //con .val prendo tutti i dati del mio database che si trovano dentro a datasnapshot e le ottengo come oggetto JS
        var tutteLeCanzoni = dataSnapshot.val();
        dataSnapshot.forEach(function (childSnapshot) {
            //vado a prendermi i valori della canzone singola
            var canzoneSingola = childSnapshot.val();
            var nomeCanzoneSingola = canzoneSingola.nome_canzone;
            var idCanzoneSingola = canzoneSingola.id;
            console.log("nomeCanzoneSingola ", nomeCanzoneSingola);
            console.log("idCanzoneSingola ", idCanzoneSingola);
            creaTastiCanzoni(nomeCanzoneSingola, idCanzoneSingola);
        });
    });
}

//creo i tasti delle canzoni con animazioni
function creaTastiCanzoni(nomeCanzoneSingola, id) {

    var pulsantoni = document.getElementById("pulsanti-grandi");
    pulsantoni.classList.add("animated");
    pulsantoni.classList.add("bounceOutUp");

    //creo i pulsantini per le singole canzoni
    var divCanzone = document.createElement("div");
    divCanzone.setAttribute('class', 'pulsanteCanzone animated fadeIn');
    canzoniRecuperate = document.getElementById("canzoni-recuperate");
    canzoniRecuperate.appendChild(divCanzone);
    //metto il contenuto dentro il divCanzone
    var paragrafo = document.createElement("p");
    divCanzone.appendChild(paragrafo);

    //creo il link
    a = document.createElement('a');
    paragrafo.appendChild(a); //inserisco a in p 
    a.innerHTML = nomeCanzoneSingola
    a.href = "midiSequencerTable.html?id=" + id;
}
*/