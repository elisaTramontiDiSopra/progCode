<?php

    require_once "../../connection.php"; 
    
    $indirizzoServer = 'C://wamp//www//digitalSigneage//';
    $studio = $_GET['studio']; 
    $ambulatorio = $_GET['ambulatorio']; 
   
    // AGGIORNO IL DATO MYSQL 
    $sql = "UPDATE ".$studio." SET numeroServito=numeroServito+1 WHERE ambulatorio='".$ambulatorio."'";    
    $incrementaCoda = mysqli_query($conn, $sql); 
    
    $selectNuovoNumeroServito = "SELECT numeroServito FROM ".$studio." WHERE ambulatorio='".$ambulatorio."'";
    $selezionaServito = mysqli_query($conn, $selectNuovoNumeroServito);
    if(! $selezionaServito ) {
      die('CASINI CON MYSQL: ' . mysql_error());
    }  
    while($row = mysqli_fetch_array($selezionaServito, MYSQLI_ASSOC)){
        $arrayJSON = $row;
    }
    echo json_encode($arrayJSON, JSON_PRETTY_PRINT);   
    
    $servitoAmbulatorio = $indirizzoServer."json//servitoAmbulatorio".$ambulatorio.".json";
    //write json data into data.json file
	if(file_put_contents($servitoAmbulatorio, json_encode($arrayJSON, JSON_PRETTY_PRINT))) {
        //echo 'Dati salvati';
	}
	else {
        echo "error";
    }
    
    
    
    
     
    // FINE AGGIORNO IL DATO MYSQL 
      


    //require_once "connection.php";
    
    $url = 'https://android.googleapis.com/gcm/send';
    $apiKey = 'AIzaSyARMQ8ZuX6_gZibPeUmXIljb2XQ1Azxng8';
    $message = array('body' => '1', 'title' => '2'); //sono possibili solo certe voci quindi BODY = STUDIO e TITLE = NUMERO SERVITO

    $registatoin_ids = array();
    $selezione = "SELECT * FROM schermi";  
    $update = mysqli_query($conn, $selezione);   
    
       mysqli_close($conn);  
    
    
    while ($row = $update->fetch_assoc()) {
        array_push($registatoin_ids, $row["gcm_id"]);
        //echo($row["gcm_id"]);
    }
   
    $fields = array(
             'registration_ids' => $registatoin_ids,
             'data' => $message,
         );
    $test = json_encode($fields['data']);
    //echo($test);
    $headers = array(   'Authorization: key=' . $apiKey,
                        'Content-Type: application/json'
    );

//curl connection
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true );
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));

$result = curl_exec($ch);

curl_close($ch);

//echo $result;
?>


    