<?php
    header('Access-Control-Allow-Origin: *');
    require('config.php');
    $servername = DBHOST;
    $username = DBUSER;
    $password = DBPWD;
    $dbname = DBNAME;
    $tbname = ITEMTBNAME;
    $conn = new mysqli($servername, $username, $password, $dbname);
    $response["success"] = false;
    $response["msg"] = "";
    if($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error);   
    }
    else
    {
        if(isset($_POST["itemsubmit"]))
        {
            $name = $_POST["itemname"];
            $filename = $_POST["imagename"];
            $price = $_POST["price"];
            $inform = $_POST["info"];
            $quantity = $_POST["quantity"];
            $mysql = "INSERT INTO $tbname (`name`, `information`, `image`,`price`,`quantity`) VALUES ('$name','$inform','$filename','$price','$quantity')";
            if($conn->query($mysql))
            {
                $response["success"]=true;
                $response["msg"]="Item Added Successfully";
            }
            else
            {
                $response["success"]=false;
                $response["msg"]="Item not added Successfully";
            }
        }
    }
    echo json_encode($response);
?>