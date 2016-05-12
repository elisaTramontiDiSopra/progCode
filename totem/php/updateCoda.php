<?php
   require_once "connection.php";   
   //$studio = $_GET['studio'];
   $studio = 'studio01';
   $data = '05052016';
   $ambulatorio = $_GET['ambulatorio'];

   $sql = "UPDATE ".$studio." SET ultimoNumeroPrenotato=ultimoNumeroPrenotato+1 WHERE ambulatorio='".$ambulatorio."'";    
   $incrementaCoda = mysqli_query($conn, $sql);  
   if ($incrementaCoda === TRUE) {
       //echo "Update ultimoNumeroPrenotato OK <br>";
   } 
   /*
   $selectNumeroDaStampare = "SELECT ultimoNumeroPrenotato FROM ".$studio." WHERE data='".$data."'"; 
   $selezionaUltimoNumero = mysqli_query($conn, $selectNumeroDaStampare);  
   while ($row = $selezionaUltimoNumero->fetch_assoc()) {
        echo '<div id=ultimoNumeroPrenotato>'.$row['ultimoNumeroPrenotato']."</div>";
    }  
   */
   
   $selectNumeroDaStampare = "SELECT ultimoNumeroPrenotato FROM ".$studio." WHERE ambulatorio='".$ambulatorio."'";
   $selezionaUltimoNumero = mysqli_query($conn, $selectNumeroDaStampare);  
    while($row = mysqli_fetch_array($selezionaUltimoNumero, MYSQLI_ASSOC)){
        $arrayJSON = $row;
    }
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