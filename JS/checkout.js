total=0;
items=0;
$(document).ready(function () {
    $.ajax({
        type: "POST", url: "https://sport-shop-project-php.000webhostapp.com/server/getcart.php", dataType: 'json', success: function ($result) {
            console.log($result)
            if ($result["success"]) {
                items = $result["items"];
                addLayout();
                for (var i = 0; i < parseInt(items); i++) {
                    addElements($result,i)
                }
                totalLayout();
            }
            else {
                alert("No Items");
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
function addLayout()
{
    $('.col-25').append(`
    <div class="container">
            <h4>Cart<span class="price" style="color:black"><i class="fa fa-shopping-cart"></i> <span class="items"><b>`+items+`</b></span></span></h4>
    </div>    `
    );
}
function addElements($result,i)
{
    $('.col-25 .container').append(
        `
            <p><a >`+($result["fields"][i]["name"]).toUpperCase()+` x (`+$result["fields"][i]["quantity"]+`)</a> <span class="price">`+$result["fields"][i]["price"]+`</span></p>
        </div>
            `
    );
    total += parseInt($result["fields"][i]["quantity"])*parseInt($result["fields"][i]["price"])
    console.log(total)
/*

*/
}
function totalLayout() { 
$(".col-25 .container").append(
    `<hr>
    <p>Total <span class="price" style="color:black"><b>`+total+`</b></span></p>`
)
$(".total").attr("value",total);

}
function submitdata()
{
    $.ajax({
        type: "POST", url: "https://sport-shop-project-php.000webhostapp.com/server/addcheckout.php", 
        dataType: 'json',
        data:$("form input").serialize(),
        success: function ($result) {
            if($result["success"])
            {
                alert($result["msg"])
                $("form input").not(':button, :submit, :reset, :hidden').val('');
                window.close();
                window.open('./invoice.html')
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
    return false;
}
console.log($(".container .items").text())