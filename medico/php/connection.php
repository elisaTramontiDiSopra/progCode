<?php 
   $dbhost = 'localhost';
   $dbuser = 'root';
   $dbpass = '';
   $dbname = 'testpushnotifications';
   $conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
    if ($conn->connect_error) {
        //die('Errore di connessione (' . $conn->connect_errno . ') '
        //. $conn->connect_error);
    } else {
        //echo 'Connesso. ' . $conn->host_info . "\n";
    }
?>