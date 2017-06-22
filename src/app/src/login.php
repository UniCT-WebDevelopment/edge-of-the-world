<?php

$db_host = "db:3306";
$db_name = "sito_web";
$db_user = "root";
$db_pass = "toor";


$db_conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

if( mysqli_connect_error()){
    die("Database connection failed: ".mysqli_connect_error());
}

    session_start();

$username = htmlspecialchars($_GET['username'],ENT_QUOTES);
$password = $_GET['password'];


$result = mysqli_query($db_conn, "SELECT * FROM UTENTE WHERE username = '".$_GET['username']."'")or die(mysqli_error());


if( mysqli_num_rows($result) != 0){

    $row= mysqli_fetch_row($result);

    if(strcmp($row[2], $password) == 0){
        $_SESSION['username'] = $row[0];
        $ret['response'] = 1;
        $ret['url'] = 'admin/dashboard.php';
    }
    else{
        $ret['response'] = 0;
        $ret['error'] = 'Login incorrect';
    }
    echo json_encode($ret);

}

else{
    echo "Nessun utente trovato. Controlla username e password. sono il backend";
}


?>