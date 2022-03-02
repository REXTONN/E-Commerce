<?php
    header('Access-Control-Allow-Origin: *');
    require('config.php');
    $servername = DBHOST;
    $username = DBUSER;
    $password = DBPWD;
    $dbname = DBNAME;

    session_start();

    $tbname = $_SESSION["mobile"];
    $id = $_POST["id"];
    $quan = $_POST["quan"];
    
    $conn = new mysqli($servername, $username, $password, $dbname);

    $results["success"] = true;
    $results["msg"]="";

    if($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error);   
    }
    else
    {
        $mysql = "UPDATE `$tbname` SET quantity='$quan' where id=$id";
        if($conn->query($mysql))
        {
            $results["success"] = true;
            $results["msg"]="Updated Successfully";
        }
        else
        {
            $results["success"] = false;
            $results["msg"]="Not Deleted";
        }
    }
    echo json_encode($results);
?>