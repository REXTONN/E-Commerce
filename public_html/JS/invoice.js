total=0;
items=0;
$(document).ready(function () {
    $.ajax({
        type: "POST", url: "https://sport-shop-project-php.000webhostapp.com/server/invoice.php", dataType: 'json', success: function ($result) {
            console.log($result)
            if ($result["success"]) {
                items = $result["items"];
                addElements($result);
                for(i=0;i<$result["items"];i++)
                {
                    addItems($result,i)
                }
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
function addElements($result)
{
    add = $result["address"].split(" .");
    $('.custname').append($result["name"])
    add.forEach((element,index) => {
        $('.custaddress').append(element)
        if(index%2!=0)
        {
            $(".custaddress").append('<br>')
        }
    });
    $(".custphno").append('Ph No:'+$result["phonenum"])
    $(".transaction_id").append($result["transactionid"]);
    $(".date").append($result["date"].split(" ")[0])
    $(".amount").append($result["total"])
}
function addItems($result,i) 
{
    $(".inventory tbody").append(
        `<tr>
        <td><span class="itemname">`+$result["fields"][i]["itemname"]+`</span></td>
        <td><span class="iteminfo">`+$result["fields"][i]["iteminfo"]+`</span></td>
        <td><span class="itemprice">Rs.</span><span contenteditable>`+$result["fields"][i]["itemprice"]+`</span></td>
        <td><span class="itemquantity">`+$result["fields"][i]["itemquan"]+`</span></td>
        <td><span class="itemtotal">Rs.</span><span>`+(parseInt($result["fields"][i]["itemprice"]))*(parseInt($result["fields"][i]["itemquan"]))+`</span></td>
    </tr>`
    )
}