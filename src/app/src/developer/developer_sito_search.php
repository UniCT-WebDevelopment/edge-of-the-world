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

if(isset($piva)){
    $result= mysqli_query($db_conn, "SELECT * FROM SITO_WEB join LAYOUT
                                            on(SITO_WEB.LAYOUT=LAYOUT.ID)
                                            WHERE LAYOUT.SVILUPPATORE='$piva'");


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