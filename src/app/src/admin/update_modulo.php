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

$id= (int)($_POST['id']);
$nome=mysqli_real_escape_string($db_conn,$_POST['nome']);
$funzione=mysqli_real_escape_string($db_conn,$_POST['funzione']);
$costo=(int)($_POST['costo']);
if(isset($id) && isset($nome) && isset($funzione) && isset($costo)) {

  $return_value = mysqli_query($db_conn, "UPDATE MODULO
                                                SET NOME = '$nome', FUNZIONE = '$funzione', COSTO = '$costo'
                                                WHERE ID = '$id'") or die(mysqli_error($db_conn));

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