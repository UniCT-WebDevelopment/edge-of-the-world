<?php
require ('db.php');

$db_conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

if( mysqli_connect_error()){
    die("Database connection failed: ".mysqli_connect_error());
}

    session_start();

$username = htmlspecialchars($_GET['username'],ENT_QUOTES);
$password = $_GET['password'];


$result = mysqli_query($db_conn, "SELECT * FROM UTENTE WHERE USERNAME = '".$_GET['username']."'")or die(mysqli_error($db_conn));


if( mysqli_num_rows($result) != 0){

    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

    if(strcmp($row['PASSWORD'], $password) == 0){
        $_SESSION['username'] = $row['USERNAME'];
        $_SESSION['type'] = $row['TYPE'];
        $ret['response'] = 1;

        if(strcmp($row['TYPE'], "admin")==0){
            $ret['url'] = 'admin/riepilogo.php';
        }
        else if(strcmp($row['TYPE'], "developer")==0){
            $ret['url'] = 'developer/developer_page.php';
        }
        else{
            $ret['url'] = 'cliente/cliente_page.php';
        }
        $ret['nome'] = $row['NOME'];
        $ret['cognome'] = $row['COGNOME'];
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