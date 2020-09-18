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

$piva=mysqli_real_escape_string($db_conn, $_POST['piva']);
$nome= mysqli_real_escape_string($db_conn,$_POST['nome']);
$cognome=mysqli_real_escape_string($db_conn,$_POST['cognome']);
$telefono=mysqli_real_escape_string($db_conn, $_POST['telefono']);

if(isset($piva) && isset($nome) && isset($cognome) && isset($telefono)) {

  $return_value = mysqli_query($db_conn, "UPDATE SVILUPPATORE
                                                SET NOME = '$nome', COGNOME = '$cognome', TELEFONO = '$telefono'
                                                WHERE PIVA = '$piva'") or die(mysqli_error($db_conn));


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