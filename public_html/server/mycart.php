<?php
    header('Access-Control-Allow-Origin: *');
    require('config.php');
    $servername = DBHOST;
    $username = DBUSER;
    $password = DBPWD;
    $dbname = DBNAME;
    session_start();
    
?>