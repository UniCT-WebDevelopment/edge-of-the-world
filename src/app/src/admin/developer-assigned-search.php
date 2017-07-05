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

$id_layout= (int)($_GET['id_layout']);


if(isset($id_layout)) {


    $result= mysqli_query($db_conn, "SELECT PIVA, NOME, COGNOME, TELEFONO FROM LAYOUT JOIN SVILUPPATORE ON(LAYOUT.SVILUPPATORE=SVILUPPATORE.PIVA) WHERE LAYOUT.ID= '$id_layout'");

    $num_rows = mysqli_num_rows($result);

    $res = array();

    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
    {
        $res[] = array(
            'P_IVA'=> $row['PIVA'],
            'Nome' => $row['NOME'],
            'Cognome' => $row['COGNOME'],
            'Telefono' =>$row['TELEFONO'],
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
