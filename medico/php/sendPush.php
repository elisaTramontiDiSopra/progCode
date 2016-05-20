<?php
    require_once "../connection.php";  
    $url = 'https://android.googleapis.com/gcm/send';
    $apiKey = 'AIzaSyARMQ8ZuX6_gZibPeUmXIljb2XQ1Azxng8';
    //$message = array('body' => '1', 'title' => '2'); //sono possibili solo certe voci quindi BODY = STUDIO e TITLE = NUMERO SERVITO

    $message = array(
        'message' => 'messaggio di prova', 
        'title' => 'titolo di prova',
        'campoPersonalizzato' => 'numeroCorrente'  
    );  
    
    $registatoin_ids = array();
    $selezione = "SELECT * FROM schermi";  
    $update = mysqli_query($conn, $selezione);   
    while ($row = $update->fetch_assoc()) {
        array_push($registatoin_ids, $row["gcm_id"]);
        echo($row["gcm_id"]);
    }

    $fields = array(
             'registration_ids' => $registatoin_ids,
             'data' => $message
         );
         
              
    $test = json_encode($fields['data']);
    echo($test);
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

echo $result;
?>