<?php
    header('Access-Control-Allow-Origin: *');
    require('config.php');

    $servername = DBHOST;
    $username = DBUSER;
    $password = DBPWD;
    $dbname = DBNAME;

    $itemtb = ITEMTBNAME;

    session_start();

    $price = 0;
    $name = "";
    $image = "";

    $tbname = $_SESSION["mobile"];

    $id = $_POST["id"];
    
    $conn = new mysqli($servername, $username, $password, $dbname);

    $response["price"] = "";
    $results["success"] = true;
    $results["msg"]="";
    $infom = "";


    if($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error);   
    }
    else
    {
        $mysql = "select * from `$itemtb` where id=$id";
        $result = $conn->query($mysql);
        if($result->num_rows>0)
        {
            while($row = $result->fetch_assoc()) {
                $price = $row["price"];
                $image = $row["image"];
                $name = $row["name"];
                $infom = $row["information"];
            }
        }
        $mysql = "select * from `$tbname` LIMIT 1";
        if(!$conn->query($mysql))
        {
            
            $mysql = "CREATE TABLE `$tbname` (
                id INT(100) NOT NULL ,
                name VARCHAR(100) NOT NULL,
                information VARCHAR(500) NOT NULL,
                quantity VARCHAR(100) NULL DEFAULT '1',
                image VARCHAR(100) NOT NULL,
                price VARCHAR(50) NOT NULL
                )";
                
                if ($conn->query($mysql)==TRUE) {
                    $mysql = "INSERT INTO `$tbname` (`id`,`name`,`information`,`quantity`,`image`, `price`) VALUES ($id,'$name','$infom','1','$image','$price')";
                    if ($conn->query($mysql)==TRUE) {
                        $results["success"] = true;
                    }
                    else
                    {
                        $results["success"] = false;

                    }
                } else {
                    $results["success"] = false;
                }       
        }
        else
        {
            $mysql = "select * from `$tbname` where id=$id";
            $result = $conn->query($mysql);
            if($result->num_rows<=0)
            {
                $mysql = "INSERT INTO `$tbname` (`id`,`name`,`information`,`quantity`,`image`, `price`) VALUES ($id,'$name','$infom','1','$image','$price')";
                if ($conn->query($mysql)) {
                    $results["success"] = true;
                }
                else
                {
                    $results["success"] = false;
                    $results["msg"] = "Unable to  Added";
                }
            }
            else
            {
                $results["success"] = false;
                $results["msg"] = "Already Added";
            }

        }
    }   
    echo json_encode($results);
?>