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

$id_layout= (int)($_POST['id_layout']);
$id_modulo=(int)($_POST['id_modulo']);


if(isset($id_layout) && isset($id_modulo)) {


    $return_value = mysqli_query($db_conn, "INSERT INTO COMPONENTE(ID_LAYOUT, ID_MODULO) VALUES ('$id_layout', '$id_modulo')");


   if($return_value){

       $ret['response'] = 0;
   }

   else{
       $ret['response'] = $return_value;
   }


}

else{
    $ret['response'] = 2;
}

echo json_encode($ret);