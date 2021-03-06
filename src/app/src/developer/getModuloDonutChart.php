<?php
require('db.php');

session_start();

if($_SESSION['type']!= "developer")
{
    die("Acceso negato");
}

$db_conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

if( mysqli_connect_error()){
    die("Database connection failed: ".mysqli_connect_error());
    echo "error";
}

$username= $_SESSION['username'];


$result= mysqli_query($db_conn, "SELECT PIVA from UTENTE_SVILUPPATORE join UTENTE
                                           ON(UTENTE_SVILUPPATORE.ID_UTENTE = UTENTE.ID_UTENTE)
                                           WHERE UTENTE.USERNAME= '$username'");

$row = mysqli_fetch_array($result, MYSQLI_ASSOC);

$piva=$row['PIVA'];

$result= mysqli_query($db_conn, "select NOME, count(*) as NUMERO_UTILIZZO
                                            from LAYOUT join COMPONENTE
                                            on (LAYOUT.ID=COMPONENTE.ID_LAYOUT)
                                            join MODULO
                                            on(COMPONENTE.ID_MODULO = MODULO.ID)
                                            where LAYOUT.SVILUPPATORE='$piva'
                                            group by COMPONENTE.ID_MODULO");


$num_rows = mysqli_num_rows($result);

$res = array();

while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
{
     $res[] = array(
        'label' => $row['NOME'],
        'value' => $row['NUMERO_UTILIZZO'],
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