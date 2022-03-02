<?php
    header('Access-Control-Allow-Origin: *');
    require('config.php');
    $servername = DBHOST;
    $username = DBUSER;
    $password = DBPWD;
    $dbname = DBNAME;

    session_start();

    $tbname = $_SESSION["mobile"];
    
    $conn = new mysqli($servername, $username, $password, $dbname);

    $results["success"] = true;
    $results["msg"]="";

    if($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error);   
    }
    else
    {
        if(isset($_POST["id"]))
        {
            $id = $_POST["id"];
            $mysql = "delete from `$tbname` where id=$id";
            if($conn->query($mysql))
            {
                $results["success"] = true;
                $results["msg"]="Deleted Successfully";
            }
            else
            {
                $results["success"] = false;
                $results["msg"]="Not Deleted";
            }
        }
        elseif(isset($_POST["trunc"]))
        {
            $mysql = "TRUNCATE TABLE `$tbname`";
            if($conn->query($mysql))
            {
                $results["success"] = true;
                $results["msg"]="All items deleted Successfully";
            }
            else
            {
                $results["success"] = false;
                $results["msg"]="Not item deleted";
            }
        }
       
    }
    echo json_encode($results);
?>