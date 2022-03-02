<?php
    header('Access-Control-Allow-Origin: *');
    require('config.php');
    session_start();

    $servername = DBHOST;
    $username = DBUSER;
    $password = DBPWD;
    $dbname = DBNAME;

    $tbname =$_SESSION["mobile"];


    $conn = new mysqli($servername, $username, $password, $dbname);
    $results = array(
        "success"=>false,
        "items" =>0,
        "fields"=>array()
    );
    if($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error);   
    }
    else
    {
        $fields = &$results['fields'];
        $mysql = "SELECT * from `$tbname`";
        $result = $conn->query($mysql);
        if($result)
        {
            if($result->num_rows>0)
            {
                $results["items"] = $result->num_rows;
                $results['success']=true;
                while($row = $result->fetch_assoc()) {
                    $fields[] = array(
                    "id"=>$row["id"],
                     "name"=>$row["name"],
                     "image"=>$row["image"],
                     "price"=>$row["price"],
                     "quantity"=>$row["quantity"],
                     "information"=>$row["information"],
                    );
                }
                unset($fields);
            }
            else
            {
                $results['success']=false;
            }   
        }
        else
            {
                $results['success']=false;
            }   
    }
    echo json_encode($results);
?>