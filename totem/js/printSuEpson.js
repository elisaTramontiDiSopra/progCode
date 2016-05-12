//Creo ePOSDevice
var ePosDev = new epson.ePOSDevice();
function connect() { 
    var ipAddress = '192.168.192.168'; 
    var port = '8008';
    ePosDev.connect(ipAddress, port, callback_connect);
}

function callback_connect(resultConnect){ 
    var deviceId = 'local_printer'; 
    var options = {'crypto' : false, 'buffer' : false};
    if ((resultConnect == 'OK') || (resultConnect == 'SSL_CONNECT_OK')) { 
        //Retrieves the Printer object 
        ePosDev.createDevice(deviceID, ePosDev.DEVICE_TYPE_PRINTER, options, callback_createDevice); 
    } else { 
        //Displays error messages 
    } 
}

var printer = null;
function callback_createDevice(deviceObj, errorCode){ 
    if (deviceObj === null) { 
        //Displays an error message if the system fails to retrieve the Printer object 
        return; 
    } 
    printer = deviceObj;
    //Registers the print complete event 
    printer.onreceive = function(response){ 
        if (response.success) { 
            //Displays the successful print message 
        } else { 
            //Displays error messages 
        } 
    };
}

//Crea i dati da mandare
function createData(datoDaStampare){ 
    printer.addTextAlign(printer.ALIGN_CENTER); 
    printer.addText(datoDaStampare);
}

//Invia i dti alla stampante
function send(){ 
    if (ePosDev.isConnected) { 
        printer.send(); 
    }
}

//Discards the Printer object 
ePosDev.deleteDevice(printer, callback_deleteDevice);
function callback_deleteDevice(errorCode){
    //Terminates connection with device 
    ePosDev.disconnect(); 
}

function inviaNumeroInStampa(numeroDaStampare){
    createData(numeroDaStampare);
    send();
    console.log('Io ho inviato alla stampante, mo vedi te...');
}