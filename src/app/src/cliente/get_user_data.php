<?php
require('db.php');

session_start();

if($_SESSION['type']!= "cliente")
{
    die("Acceso negato");
}

$db_conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
$username= $_SESSION['username'];

if( mysqli_connect_error()){
    die("Database connection failed: ".mysqli_connect_error());
    echo "error";
}

$result = mysqli_query($db_conn, "SELECT * FROM UTENTE WHERE UTENTE.USERNAME= '$username'");

$num_rows = mysqli_num_rows($result);

$res = array();

while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
{
    $res['nome']= $row['NOME'];
    $res['cognome']= $row['COGNOME'];
}


$json = json_encode($res);
echo $json;