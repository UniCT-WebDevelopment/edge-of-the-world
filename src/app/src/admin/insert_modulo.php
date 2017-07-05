<?php
require('db.php');
session_start();


if(!$_SESSION['type']!= "admin")
{
    die("Acceso negato");
}

$db_conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

if( mysqli_connect_error()){
    die("Database connection failed: ".mysqli_connect_error());
    echo "error";
}

$nome= mysqli_real_escape_string($db_conn,$_POST['nome']);
$funzione=mysqli_real_escape_string($db_conn,$_POST['funzione']);
$costo=(int)($_POST['costo']);


if(isset($nome) && isset($funzione) && isset($costo)) {

  $return_value = mysqli_query($db_conn, "INSERT INTO MODULO (NOME, FUNZIONE, COSTO) VALUES('$nome', '$funzione', '$costo')") or die(mysqli_error($db_conn));

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