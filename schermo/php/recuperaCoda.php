<?php
   require_once "connection.php";
   
   $sel = "SELECT numeroServito, medico FROM studio01 WHERE data='05052016'";
   $selezioneResult = mysqli_query($conn, $sel); 
   $arrayJSON = array();
   $i = 1; 
   while ($row = $selezioneResult->fetch_assoc()) {
       $titoloNodo = 'studio0'+ $i;
       $i++;
       $arrayJSON [$titoloNodo] = $row;       
    }
    $jsondata = json_encode($arrayJSON, JSON_PRETTY_PRINT);
    mysqli_close($conn);

    $situazioneCodeFile = "situazioneCode.json";
    //write json data into data.json file
	if(file_put_contents($situazioneCodeFile, $jsondata)) {
        echo 'Dati salvati';
	}
	else {
        echo "error";
    }
?>