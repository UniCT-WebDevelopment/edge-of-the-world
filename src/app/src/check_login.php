<?php
session_start();

if(strcmp($_GET['params'], "check")==0) {
    if (!isset($_SESSION['username'])) {
        $ret['response'] = 0;
    }

    else {
        $ret['response'] = 1;
    };
    echo json_encode($ret);
}