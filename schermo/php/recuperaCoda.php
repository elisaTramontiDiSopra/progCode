<?php
   require_once "connection.php";
   
   $sel = "SELECT numeroServito FROM studio01";
   $selezioneResult = mysqli_query($conn, $sel); 
 
   if(! $selezioneResult ) {
      die('CASINI CON MYSQL: ' . mysql_error());
   }  
   $arrayJSON = array();
   $i = 1; 
    while($row = mysqli_fetch_array($selezioneResult, MYSQLI_ASSOC)){
       $titoloNodo = 'studio0'+ $i;
       $i++;
       $arrayJSON [$titoloNodo] = $row; 
    }
    //header('Content-Type: application/json');
    echo json_encode($arrayJSON, JSON_PRETTY_PRINT); 
    mysqli_close($conn); 
    
    /*
    $codaAmbulatorio = "codaAmbulatorio".$ambulatorio.".json";
    //write json data into data.json file
	if(file_put_contents($codaAmbulatorio, json_encode($arrayJSON, JSON_PRETTY_PRINT))) {
        //echo 'Dati salvati';
	}
	else {
        echo "error";
    }

?>
*/   
   
   
   
   
   
   /*
   
     $arrayJSON = array();
   $i = 1; 
   
   
   while ($row = $selezioneResult->fetch_assoc()) {
       $titoloNodo = 'studio0'+ $i;
       $i++;
       $arrayJSON [$titoloNodo] = $row;       
    }
    $jsondata = json_encode($arrayJSON, JSON_PRETTY_PRINT);
    echo $jsondata;
    
    mysqli_close($conn);

    $situazioneCodeFile = "situazioneCode.json";
    //write json data into data.json file
	if(file_put_contents($situazioneCodeFile, $jsondata)) {
        echo 'Dati salvati';
	}
	else {
        echo "error";
    }*/
?>