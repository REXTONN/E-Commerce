$(document).ready(function(){
  $("#additem").click(function(){
      $.ajax({type:"POST",url: "http://localhost/server/additemdatabase.php",datatype:JSON,data:{itemname:$('#itemname').val(),imagename:$('#imagefile').val().replace("C:\\fakepath\\",""),info:$('#iteminfo').val(),price:$('#itemprice').val(),quantity:$('#itemquan').val(),itemsubmit:"123"}, success: function(result){
        console.log(result)
    },error:function(jqXHR, exception){
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
    console.log(exception)}
  });
    });
  });