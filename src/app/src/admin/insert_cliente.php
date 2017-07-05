<?php
require('db.php');
session_start();


if($_SESSION['type']!= "admin")
{
    die("Acceso negato");
}

$db_conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

if( mysqli_connect_error()){
    die("Database connection failed: ".mysqli_connect_error());
    echo "error";
}

$c_f= mysqli_real_escape_string($db_conn,$_POST['c_f']);
$city=mysqli_real_escape_string($db_conn,$_POST['city']);
$address=mysqli_real_escape_string($db_conn,$_POST['address']);
$tel_number=mysqli_real_escape_string($db_conn,$_POST['tel_number']);

if(isset($c_f) && isset($city) && isset($address) && isset($tel_number)) {

  $return_value = mysqli_query($db_conn, "INSERT INTO CLIENTE (CODICE_FISCALE, CITTA, INDIRIZZO, TELEFONO) VALUES('$c_f', '$city', 
 '$address', '$tel_number')") or die(mysqli_error($db_conn));

   if($return_value){

       $ret['response'] = 0;
   }

   else{
       $ret['response'] = 1;
   }


}

else{
    $ret['response'] = 2;
}

echo json_encode($ret);