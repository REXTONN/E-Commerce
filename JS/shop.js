$(document).ready(function () {
    $.ajax({
        type: "POST", url: "https://sport-shop-project-php.000webhostapp.com/server/addcart.php", dataType: 'json', success: function ($result) {
            console.log($result)
            if ($result["success"]) {
                for (var i = 0; i < parseInt($result["items"]); i++) {
                   addElements($result,i)
                }
            }
            else {
                alert("No Items added to database");
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
});

function addElements($result,i)
{
    $('#itemscontainer').append(
        `
            <div class="card card-layout" style="width: 18rem;">
            <img class="card-img-top" src="image/`+$result["fields"][i]["image"]+`" alt="Card image cap">
            <div class="card-body" style="height:400px;">
            <h5 class="card-title">`+$result["fields"][i]["name"]+`</h5>
            <p class="card-text"><b>Desc: </b>`+$result["fields"][i]["information"]+`</p>
            <p class="card-text"><b>Price: </b>`+$result["fields"][i]["price"]+`</p>
            <p class="card-text"><b>Quantity: </b>`+$result["fields"][i]["quantity"]+`</p>
            <a href="#" id=`+$result["fields"][i]["id"]+` class="addcart btn btn-primary" style="position: absolute;
    bottom: 1%;" onclick=additem(this)>AddCart</a>
            </div>
             </div>
            `
    );
}

function additem(e) { 
    $.ajax({
        type: "POST", url: "https://sport-shop-project-php.000webhostapp.com/server/addtocart.php", 
        dataType: 'json',
        data:{id:$(e).attr("id")}, 
        success: function ($result) {
            console.log($result)
            if($result["success"])
            {
                alert('Successfully Added')
            }
            else
            {
                alert($result["msg"])

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