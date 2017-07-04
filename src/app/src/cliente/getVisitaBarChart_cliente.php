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

$type=mysqli_real_escape_string($db_conn, $_POST['type']);
$id_cliente=(int)($_POST['id_cliente']);
$begin=mysqli_real_escape_string($db_conn, $_POST['begin']);
$end=mysqli_real_escape_string($db_conn, $_POST['end']);


if(isset($type) && isset($id_cliente)){
    if(strcmp($type, "month")==0){

                    $result= mysqli_query($db_conn, "SELECT CODICE, URL, count(*) as NUMERO_VISITE_PER_SITO 
                                                            FROM SITO_WEB join VISITA
                                                            ON (SITO_WEB.CODICE=VISITA.SITO)
                                                            WHERE YEAR(VISITA.DATA) = YEAR(CURRENT_DATE - INTERVAL 1 MONTH)
                                                            AND MONTH(VISITA.DATA) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH)
                                                            AND SITO_WEB.CLIENTE='$id_cliente'
                                                            GROUP BY SITO_WEB.CODICE");

                    $num_rows = mysqli_num_rows($result);

                    $res = array();

                    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
                    {
                        $res[] = array(
                            'url' => $row['URL'],
                            'n_visite' => (int)($row['NUMERO_VISITE_PER_SITO']),
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

    else if(strcmp($type, "general")==0){

                    $result = mysqli_query($db_conn, "SELECT CODICE, URL, count(*) as NUMERO_VISITE_PER_SITO 
                                                            FROM SITO_WEB join VISITA
                                                            ON (SITO_WEB.CODICE=VISITA.SITO)
                                                            WHERE SITO_WEB.CLIENTE='$id_cliente'
                                                            GROUP BY SITO_WEB.CODICE");

                    $num_rows = mysqli_num_rows($result);

                    $res = array();

                    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                        $res[] = array(
                            'url' => $row['URL'],
                            'n_visite' => (int)($row['NUMERO_VISITE_PER_SITO']),
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
    else if(strcmp($type, "year")==0){
        $result= mysqli_query($db_conn, "SELECT CODICE, URL, count(*) as NUMERO_VISITE_PER_SITO 
                                                            FROM SITO_WEB join VISITA
                                                            ON (SITO_WEB.CODICE=VISITA.SITO)
                                                            WHERE YEAR(VISITA.DATA) = YEAR(CURRENT_DATE - INTERVAL 1 YEAR)
                                                            AND SITO_WEB.CLIENTE='$id_cliente'
                                                            GROUP BY SITO_WEB.CODICE");

        $num_rows = mysqli_num_rows($result);

        $res = array();

        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
        {
            $res[] = array(
                'url' => $row['URL'],
                'n_visite' => (int)($row['NUMERO_VISITE_PER_SITO']),
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

    else if(strcmp($type, "custom")==0){
                                if(isset($begin) && isset($end)){
                                    $result= mysqli_query($db_conn, "SELECT CODICE, URL, count(*) as NUMERO_VISITE_PER_SITO 
                                                                                    FROM SITO_WEB join VISITA
                                                                                    ON (SITO_WEB.CODICE=VISITA.SITO)
                                                                                    WHERE VISITA.DATA >= '$begin' AND VISITA.DATA<='$end'
                                                                                    AND SITO_WEB.CLIENTE='$id_cliente'
                                                                                    GROUP BY SITO_WEB.CODICE");

                                    $num_rows = mysqli_num_rows($result);

                                    $res = array();

                                    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
                                    {
                                        $res[] = array(
                                            'url' => $row['URL'],
                                            'n_visite' => (int)($row['NUMERO_VISITE_PER_SITO']),
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
                                else{
                                    echo "error";
                                }
    }
    else{
        echo "No parameter passed";
    }
}

