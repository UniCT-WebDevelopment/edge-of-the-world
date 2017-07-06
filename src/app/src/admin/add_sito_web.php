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

$url=mysqli_real_escape_string($db_conn, $_POST['url']);
$data=mysqli_real_escape_string($db_conn, $_POST['data']);
$codice=(int)($_POST['codice']);
$id_layout=(int)($_POST['id_layout']);


if(isset($url) && isset($data) && isset($codice) &&  isset($id_layout)) {

    $return_value = mysqli_query($db_conn, "INSERT INTO SITO_WEB(URL, DATA_PUBBLICAZIONE, CLIENTE, LAYOUT) VALUES('$url', '$data', '$codice', '$id_layout') ");

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