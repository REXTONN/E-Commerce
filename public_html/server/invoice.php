<?php
header('Access-Control-Allow-Origin: *');
require 'config.php';

$servername = DBHOST;
$username = DBUSER;
$password = DBPWD;
$dbname = DBNAME;

$trantb = TRANSTATUS;

session_start();

$conn = new mysqli($servername, $username, $password, $dbname);

$results = array(
    "success"=>true,
    "fields"=>array()
);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    if (isset($_SESSION["mobile"])) {
        $id = $_SESSION["mobile"];
        $mysql = "SELECT * FROM `$trantb` where phonenum='$id' ORDER BY `$trantb`.`reg_date` DESC LIMIT 1";
        $result = $conn->query($mysql);
        if ($result) {
            if ($result->num_rows > 0) {
                $results["items"] = $result->num_rows;
                $results['success'] = true;
                while ($row = $result->fetch_assoc()) {
                    $results["name"] = $row["name"];
                    $results["address"] = $row["address"];
                    $results["total"] = $row["total"];
                    $results["transactionid"] = $row["transactionid"];
                    $results["date"] = $row["reg_date"];
                    $results["phonenum"] = $row["phonenum"];
                }
            } else {
                $results['success'] = false;
                $results['msg']= "Unable to execute the table";
            }
            if($results['success'])
            {
                $fields = &$results['fields'];
                $mysql = "SELECT * FROM `$results[transactionid]` ORDER BY `$results[transactionid]`.`id` ASC";
                $result = $conn->query($mysql);
                if ($result) {
                    if ($result->num_rows > 0) {
                        $results["items"] = $result->num_rows;
                        $results['success'] = true;
                        while ($row = $result->fetch_assoc()) {
                            $fields[] = array(
                                "itemname"=>$row["name"],
                                 "iteminfo"=>$row["information"],
                                 "itemquan"=>$row["quantity"],
                                 "itemprice"=>$row["price"],
                                 "itemid"=>$row["id"]
                                );
                        }
                        unset($fields);
                    } else {
                        $results['success'] = false;
                        $results['msg']= "Unable to execute the table";
                    }
                } else {
                    $results['success'] = false;
                    $results['msg']= "FETECT the table";
                }
            }
        } else {
            $results['success'] = false;
            $results['msg']= "FETECT the table";
        }
    }
    echo json_encode($results);
}
