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

$result = mysqli_query($db_conn, "SELECT * FROM LAYOUT");

$num_rows = mysqli_num_rows($result);

$res = array();

while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
{
    $id_layout=$row['ID'];
    $numero_moduli_query=mysqli_query($db_conn, "SELECT count(*) FROM COMPONENTE WHERE ID_LAYOUT='$id_layout'");
    $numero_moduli_array=mysqli_fetch_array($numero_moduli_query, MYSQLI_ASSOC);
    $numero_moduli=$numero_moduli_array['count(*)'];
    $res[] = array(
        'ID'=> $id_layout,
        'Costo Totale' => $row['COSTO_TOTALE'],
        'Sviluppatore' => $row['SVILUPPATORE'],
        'Numero Moduli'=> $numero_moduli,
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