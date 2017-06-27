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
}

$c_f= mysqli_real_escape_string($db_conn,$_POST['c_f']);

if(isset($c_f)) {

  $return_value = mysqli_query($db_conn, "DELETE FROM CLIENTE WHERE CODICE_FISCALE = '$c_f' ") or die(mysqli_error($db_conn));

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