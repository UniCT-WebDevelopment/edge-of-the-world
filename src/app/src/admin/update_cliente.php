<?php
require('db.php');
session_start();


if(!isset($_SESSION['username']))
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
$n_siti=(int)$_POST["n_siti"];
$total_cost=(int)$_POST["total_cost"];

if(isset($c_f) && isset($city) && isset($address) && isset($tel_number) && isset($n_siti) && isset($total_cost)) {

  $return_value = mysqli_query($db_conn, "UPDATE CLIENTE
                                                SET CITTA = '$city', INDIRIZZO = '$address', TELEFONO = '$tel_number', N_SITI = '$n_siti', SPESA_TOTALE = '$total_cost'
                                                WHERE CODICE_FISCALE = '$c_f'") or die(mysqli_error($db_conn));

  //TODO il codice fiscale non deve essere modificato in quanto chiave unique per l'update. Le due possibili soluzioni sono:
    //Rendere il codice fiscale non editabile
    //Resistuire anche l'id e usare quello come ricerca


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