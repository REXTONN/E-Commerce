<?php
    header('Access-Control-Allow-Origin: *');
    require('config.php');

    $servername = DBHOST;
    $username = DBUSER;
    $password = DBPWD;
    $dbname = DBNAME;

    $trantb = TRANSTATUS;

    session_start();

   
    $conn = new mysqli($servername, $username, $password, $dbname);

    $results["success"] = true;
    $results["msg"]="";


    if($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error);   
    }
    else
    {
        $mysql = "select * from `$trantb` LIMIT 1";
        if(!$conn->query($mysql))
        {
            
            $mysql = "CREATE TABLE `$trantb` (
                id INT(100) NOT NULL AUTO_INCREMENT UNIQUE KEY,
                name VARCHAR(100) NOT NULL,
                address VARCHAR(800) NOT NULL,
                phonenum VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                total VARCHAR(100) NOT NULL,
                transactionid VARCHAR(100) NOT NULL UNIQUE KEY,
                reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )";
                
                if ($conn->query($mysql)) {
                    $results["success"]=true;
                    $results["msg"]="Created Successfully";
                } else {
                    $results["success"] = false;
                    $results["msg"]=$trantb;
                }       
        }
        if(isset($_POST["fullname"]) && isset($_SESSION["mobile"]))
        {
            
                $tbname = $_SESSION["mobile"];
                $name = $_POST["fullname"];
                $email = $_POST["email"];
                $address = $_POST["address"]." .".$_POST["city"]." .".$_POST["state"]." .".$_POST["zip"];
                $total = $_POST["total"];
                $tranid = generatetran($conn,$trantb);
                $mysql = "INSERT INTO `$trantb` (`name`,`address`,`phonenum`,`email`,`total`,`transactionid`) VALUES ('$name','$address','$tbname','$email','$total','$tranid')";
                if ($conn->query($mysql)) {
                    $mysql = "ALTER TABLE `$tbname` RENAME TO `$tranid`";
                    if ($conn->query($mysql)) {
                        $results["success"] = true;
                        $results["msg"] = "Added Successfully";
                    }
                    else
                {
                    $results["success"] = false;
                    $results["msg"] = "Unable to  Added";
                }
                }
                
        }
    }   
        function generatetran($conn,$trantb)
            {
                while(true)
                {
                    $myuid = uniqid('tran');
                    $mysql = "select * from `$trantb` where transactionid='$myuid'";
                    $result = $conn->query($mysql);
                    if($result->num_rows<=0)
                    {
                        return $myuid;
                    }
                }
            }

    echo json_encode($results);
?>
