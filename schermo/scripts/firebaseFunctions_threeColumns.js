databaseLink = "https://eliminacode.firebaseio.com";		//db su firebase
var myFirebaseRef = new Firebase(databaseLink)

// GET DATA STAMP AND CHANGE THE URL TO READ DATA FROM THE RIGHT DAY
dataCorrente = '12042016';
urlDBCurrentData = databaseLink + '/' + dataCorrente + '/numeroServito';
var firebaseLinkCurrentData = new Firebase (urlDBCurrentData);

firebaseLinkCurrentData.on('value', function(snapshot) {
    var numeroServitoDB = snapshot.val();
    var numeroServitoHTML = document.getElementById("servitoStudioUno");
    numeroServitoHTML.textContent = numeroServitoDB
    console.log(numeroServito);
});