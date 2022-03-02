<?php
    header('Access-Control-Allow-Origin: *');
    require('config.php');
    session_start();
    $servername = DBHOST;
    $username = DBUSER;
    $password = DBPWD;
    $dbname = DBNAME;
    $tbname = logintb;
    $conn = new mysqli($servername, $username, $password, $dbname);
    $response["msg"]="";
    $response["status"]=false;

    if($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error);   
    }
    else
    {
        if(isset($_POST["name"]))
        {
        $mobile = $_POST['mob'];
        $name = $_POST['name'];
        $password = $_POST['password'];
        $cpassword = $_POST['cpassword'];
        if($cpassword == $password)
        {
            $mysql = "select * from `$tbname` where mobile='$mobile'";
            $result = $conn->query($mysql);
            if($result->num_rows<=0)
            {
                $hash = password_hash($password, PASSWORD_DEFAULT);
                $mysql = "INSERT INTO `$tbname` (`FullName`, `mobile`,`password`) VALUES ('$name','$mobile','$hash')";
                if($conn->query($mysql))
                {
                    $response["status"]=true;
                    $response["msg"]="User Added Successfully";
                    $_SESSION["mobile"] = $mobile;
                    $_SESSION["name"] = $name;
                }
                else
                {
                    $response["status"]=false;
                    $response["msg"]="User was not added Successfully";
                }
            }
            else
            {
                $response["msg"]="Phone Number Already registered";
                $response["status"]=false;
            }
        }
        else
            {
                $response["msg"]="Password Not Matched";
                $response["status"]=false;
            }
        }
        elseif (isset($_POST["password"])) {
            $mobile = $_POST['mob'];
            $password = $_POST['password'];
            $dbpassword;
            $name;
            $mysql = "select * from $tbname where mobile='$mobile'";
            $result = $conn->query($mysql);
                if($result->num_rows==1)
                {
                    while($row = $result->fetch_assoc()) {
                        $name = $row["FullName"];
                        $dbpassword = $row["password"];
                    }
                    if(password_verify($password,$dbpassword))
                    {
                        $response["status"]=true;
                        $response["msg"]="User Logged in  Successfully";
                        $_SESSION["mobile"] = $mobile;
                        $_SESSION["name"] = $name;
                    }
                    else
                    {
                        $response["status"]=false;
                        $response["msg"]="Wrong Password";
                    }
                }
                else
                {
                    $response["msg"]="Wrong Username";
                    $response["status"]=false;
                }
            }      
    }

    echo json_encode($response);
    exit();
?>