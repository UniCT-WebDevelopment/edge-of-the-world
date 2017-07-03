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


$id_cliente=(int)($_GET['id_cliente']);

if(isset($id_cliente)){
$result= mysqli_query($db_conn, "SELECT * FROM SITO_WEB WHERE CLIENTE='$id_cliente'");


$num_rows = mysqli_num_rows($result);

$res = array();

while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
{
     $res[] = array(
        'Codice'=> $row['CODICE'],
        'Url' => $row['URL'],
        'Data Pubblicazione' => $row['DATA_PUBBLICAZIONE'],
        'Layout' =>$row['LAYOUT'],

    );
}

$json_data = array(
    "draw"            => 1,
    "recordsTotal"    => $num_rows,
    "recordsFiltered" => $num_rows,
    "data"            => $res
);
$json = json_encode($json_data);
echo $json;
}