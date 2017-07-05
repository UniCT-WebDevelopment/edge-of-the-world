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

}

$costo_totale=(int)($_POST['costo_totale']);

if(isset($costo_totale)) {

  $return_value = mysqli_query($db_conn, "INSERT INTO LAYOUT (COSTO_TOTALE) VALUES('$costo_totale')" )or die(mysqli_error($db_conn));

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