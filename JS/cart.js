var items;
total=0;
$(document).ready(function () {
    $.ajax({
        type: "POST", url: "https://sport-shop-project-php.000webhostapp.com/server/getcart.php", dataType: 'json', success: function ($result) {
            console.log($result)
            if ($result["success"]) {
                items = $result["items"];
                for (var i = 0; i < parseInt(items); i++) {
                    addElements($result,i)
                }
                totalCheckout();
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
function addcount(e)
{
    $id = $(e).parent().parent().attr("id")
    quan = $("#"+$id+" .counter .count");
    quan.html(parseInt(quan.text())+1)
    price = $("#"+$id+" .prices .amount").text();
    total = total + parseInt(price);
    updatequan(e,$id);
    totalCheckout();
    
}
function ncount(e)
{
    $id = $(e).parent().parent().attr("id");
    quan = $("#"+$id+" .counter .count");
    if(quan.text()=="0")
    {
        alert("Quantity cannot be negative")
        return;
    }
    quan.html(parseInt(quan.text())-1)
    price = $("#"+$id+" .prices .amount").text();
    total = total - parseInt(price);
    if(quan.text()=="0")
    {
        removequanitem($id)
    }
    updatequan(e,$id);
    totalCheckout();
}
function addElements($result,i)
{
    $('.CartContainer').append(
        `
        <div class="Cart-Items" id="`+$result["fields"][i]["id"]+`">
        <div class="image-box">
            <img src="./image/`+$result["fields"][i]["image"]+`" style="height:120px"/>
        </div>
        <div class="about">
            <h1 class="title">`+$result["fields"][i]["name"]+`</h1>
            <h3 class="subtitle">`+$result["fields"][i]["information"]+`</h3>
        </div>
        <div class="counter">
            <div class="btn" onclick=addcount(this)>+</div>
            <div class="count">`+$result["fields"][i]["quantity"]+`</div>
            <div class="btn" onclick=ncount(this)>-</div>
        </div>
        <div class="prices">
            <div class="amount">`+$result["fields"][i]["price"]+`</div>
            <div class="remove"><u onclick=removeitem(this)>Remove</u></div>
        </div>
  </div>
            `
    );
    total += parseInt($result["fields"][i]["quantity"])*parseInt($result["fields"][i]["price"])
    console.log(total)

}
function totalCheckout()
{
    if( $("div").hasClass("checkout"))
    {
        $('.items').html('Items:'+items);
        $(".total-amount").html(`Rs.`+total)
    }
    else
    {
        $('.CartContainer').append(
            `
            <div class="checkout">
            <div class="total">
                <div>
                    <div class="Subtotal">Sub-Total</div>
                    <div class="items">Items:`+items+`</div>
                </div>
                <div class="total-amount">Rs.`+total+`</div>
            </div>
            <button class="button" onclick="checkout()">Checkout</button></div>
         </div>
                `
        );
    }
    
}
function removeall() {  
    $.ajax({
        type: "POST", url: "https://sport-shop-project-php.000webhostapp.com/server/removecart.php", 
        dataType: 'json',data:{trunc:"*"},
        success: function ($result) {
            console.log($result)
            if ($result["success"]) {
               alert($result["msg"])
                location.reload()
            }
            else {
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
function updatequan(e,$id)
{
    $quan = $("#"+$id+" .counter .count").text();

    console.log($quan)
    console.log($id)
    $.ajax({
        type: "POST", url: "https://sport-shop-project-php.000webhostapp.com/server/updatequantity.php", 
        dataType: 'json',data:{quan:$quan,id:$id},
        success: function ($result) {
            console.log($result)
            if ($result["success"]) {
                alert($result["msg"])
            }
            else {
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
                $msg = 'Timxe out error.';
            } else if (exception === 'abort') {
                $msg = 'Ajax request aborted.';
            } else {
                $msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            console.log(exception)
        }
    });
}
function removeitem(e)
{
    $id = $(e).parent().parent().parent().attr("id");
    $.ajax({
        type: "POST", url: "https://sport-shop-project-php.000webhostapp.com/server/removecart.php", 
        dataType: 'json',data:{id:$id},
        success: function ($result) {
            console.log($result)
            if ($result["success"]) {
                alert($result["msg"])
                location.reload()
            }
            else {
                
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
function removequanitem($id)
{
    $.ajax({
        type: "POST", url: "https://sport-shop-project-php.000webhostapp.com/server/removecart.php", 
        dataType: 'json',data:{id:$id},
        success: function ($result) {
            console.log($result)
            if ($result["success"]) {
                alert($result["msg"])
                location.reload()
            }
            else {
                
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
function checkout() {  
    window.close();
    window.open('./checkout.html');
}