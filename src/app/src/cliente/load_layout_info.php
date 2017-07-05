<?php
require('db.php');

session_start();

if($_SESSION['type']!= "cliente")
{
    die("Acceso negato");
}

$db_conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

if( mysqli_connect_error()){
    die("Database connection failed: ".mysqli_connect_error());
    echo "error";
}


$id_layout=(int)($_POST['id_layout']);

if(isset($id_layout)){
$result= mysqli_query($db_conn, "SELECT COSTO_TOTALE FROM LAYOUT WHERE ID= '$id_layout'");


$num_rows = mysqli_num_rows($result);


$row = mysqli_fetch_array($result, MYSQLI_ASSOC);

$res['costo']=$row['COSTO_TOTALE'];


echo json_encode($res);

}