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

$result = mysqli_query($db_conn, "SELECT * FROM CLIENTE");

$num_rows = mysqli_num_rows($result);

$res = array();

while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
{
    $res[] = array(
        'Codice' => $row['CODICE'],
        'Codice_fiscale'=> $row['CODICE_FISCALE'],
        'Citta' => $row['CITTA'],
        'Indirizzo' => $row['INDIRIZZO'],
        'Telefono' =>$row['TELEFONO'],
        'N_siti' => $row['N_SITI'],
        'Spesa' => $row['SPESA_TOTALE'],
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