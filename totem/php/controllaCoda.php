<?php
   require_once "connection.php";   
   //$studio = $_GET['studio'];
   $studio = 'studio01';
   $data = '05052016';

   $sql = "UPDATE ".$studio." SET ultimoNumeroPrenotato=ultimoNumeroPrenotato+1 WHERE data='".$data."'";    
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
   
   $selectNumeroDaStampare = "SELECT ultimoNumeroPrenotato FROM ".$studio." WHERE data='".$data."'"; 
   $selezionaUltimoNumero = mysqli_query($conn, $selectNumeroDaStampare);  
   while ($row = $selezionaUltimoNumero->fetch_assoc()) {
        echo $row['ultimoNumeroPrenotato'];
    }    
   
    mysqli_close($conn);

?>
