var link = "";

function signupclick()
{
    $.ajax({
        type: "POST", url: "https://sport-shop-project-php.000webhostapp.com/server/users.php", 
        dataType: 'json',
        data:$("form input").serialize(),
        success: function ($result) {
            console.log($result)
            if($result["status"])
            {
                alert($result["msg"])
                $("form input").not(':button, :submit, :reset, :hidden').val('');
                window.close();
                window.open('./index.html');
            }
            else
            {
                alert($result["msg"])
                $("mobileno").text("");
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
    return false;
}