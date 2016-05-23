<?php
   require_once "connection.php";
   
   $subscriptionID = $_GET['subscriptionID'];
   $nome_dispositivo = $_GET['nome_dispositivo'];

   $sql = "UPDATE schermi SET gcm_id='".$subscriptionID."'WHERE nome_dispositivo='".$nome_dispositivo."'";    

   $update = mysqli_query($conn, $sql); 
    /*$result = mysqli_query($conn, $selezione);   
    while ($row = $result->fetch_assoc()) {
        printf ($row["gcm_id"]);
    }*/
    
    if ($update === TRUE) {
        echo "Record updated successfully";
    } 
   
   
    //$selezione = "SELECT * FROM schermi WHERE nome_dispositivo='schermo_01' && gcm_id='dKTa'";   
   
   
    mysqli_close($conn);

?>
