<?php
    header('Access-Control-Allow-Origin: *');
    require('config.php');
    $servername = DBHOST;
    $username = DBUSER;
    $password = DBPWD;
    $dbname = DBNAME;
    $tbname = ITEMTBNAME;
    $conn = new mysqli($servername, $username, $password, $dbname);
    $results = array(
        "success"=>true,
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
        $mysql = "SELECT * from $tbname";
        $result = $conn->query($mysql);
        if($result->num_rows>0)
        {
            $results["items"] = $result->num_rows;
            while($row = $result->fetch_assoc()) {
                $fields[] = array(
                "id"=>$row["id"],
                 "name"=>$row["name"],
                 "information"=>$row["information"],
                 "image"=>$row["image"],
                 "price"=>$row["price"],
                 "quantity"=>$row["quantity"]
                );
            }
            unset($fields);
        }
        else
        {
            $results['success']=false;
        }   
    }
    echo json_encode($results);
?>