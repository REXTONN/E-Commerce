<?php
    header('Access-Control-Allow-Origin: *');
    session_start();
    $response["status"] = false;
    $response["msg"]="";
    if(isset($_POST["login"]))
    {
        if(isset($_SESSION['name']) && !empty($_SESSION['name']))
        {
            $response["status"] = true;
            $response["msg"] = $_SESSION["name"];
        }
    }
    elseif (isset($_POST["logout"])) {
        if(session_destroy())
        {
            $response["status"] = true;
            $response["msg"] = $_SESSION["name"];
        }
    }
    echo json_encode($response);
?>