<?php
   require_once "connection.php";   
   //$studio = $_GET['studio'];
   $studio = 'studio01';
   $data = '05052016';
   $ambulatorio = $_GET['ambulatorio'];
   echo 'ambulatorio'.$ambulatorio;  

   $sql = "UPDATE ".$studio." SET ultimoNumeroPrenotato=ultimoNumeroPrenotato+1 WHERE ambulatorio='".$ambulatorio." AND data ='".$data."'";    
   $incrementaCoda = mysqli_query($conn, $sql);  
   
   $selectNumeroDaStampare = "SELECT ultimoNumeroPrenotato FROM ".$studio." WHERE ambulatorio='".$ambulatorio;
   $selezionaUltimoNumero = mysqli_query($conn, $selectNumeroDaStampare);
   if(! $selezionaUltimoNumero ) {
      die('CASINI CON MYSQL: ' . mysql_error());
   }  
    while($row = mysqli_fetch_array($selezionaUltimoNumero, MYSQLI_ASSOC)){
        $arrayJSON[] = $row;
    }
    //header('Content-Type: application/json');
    echo json_encode($arrayJSON, JSON_PRETTY_PRINT); 
    mysqli_close($conn); 
    
    $codaAmbulatorio = "codaAmbulatorio".$ambulatorio.".json";
    //write json data into data.json file
	if(file_put_contents($codaAmbulatorio, $arrayJSON)) {
        //echo 'Dati salvati';
	}
	else {
        echo "error";
    }

?>