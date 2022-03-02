console.log('Hello')
$(document).ready(function()
{
    console.log('Hello')
    $.ajax({
        type: "POST", url: "https://sport-shop-project-php.000webhostapp.com/server/home.php", 
        dataType: 'json',
        data:{login:"login"}, 
        success: function ($result) {
            console.log('Hello')
            if ($result["status"]==true) {
                $("ul").append(` 
                <li class="item"><a class=log-out style="cursor:pointer;" onclick=logout(); target="">Log Out</a></li>
                <a id="log" href="index.html">Hello!!  `+($result["msg"]).toUpperCase()+`</a>`)
                $("nav").append(
                    `
                    <a class=getcart style="cursor:pointer;" href=getcart.html target=""><i class="fas fa-shopping-cart"></i></a>

                    `
                )
            }
            else
            {
                $("ul").append(` <a id="log" href="login.html">Login</a>
                <h3 id="dash">|</h3>
                <a id="sign" href="signup.html">Sign-Up</a>`)
            }
        }, error: function (jqXHR, exception) {
            $msg = '';
            if (jqXHR.status === 0) {
                $msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                $msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                $msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                $msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                $msg = 'Time out error.';
            } else if (exception === 'abort') {
                $msg = 'Ajax request aborted.';
            } else {
                $msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            console.log(exception)
        }
    });
    
})
function logout() {
    $.ajax({
        type: "POST", url: "https://sport-shop-project-php.000webhostapp.com/server/home.php", 
        dataType: 'json',
        data:{logout:"logout"}, 
        success: function ($result) {
            console.log($result)
            if ($result["status"]) {
               alert("Logout Successfully "+$result["msg"]);
               location.reload();
            }
            else
            {
                location.reload();
            }
        }, error: function (jqXHR, exception) {
            $msg = '';
            if (jqXHR.status === 0) {
                $msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                $msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                $msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                $msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                $msg = 'Time out error.';
            } else if (exception === 'abort') {
                $msg = 'Ajax request aborted.';
            } else {
                $msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            console.log(exception)
        }
    });
  }