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

$codice=(int)($_POST['codice']);
$id_layout=(int)($_POST['id_layout']);


if(isset($codice) && isset($id_layout)) {


    $return_value = mysqli_query($db_conn, "UPDATE SITO_WEB
                                                  SET LAYOUT = '$id_layout'
                                                  WHERE CODICE='$codice'");
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