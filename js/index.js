var database=null;
var bluetooth_prnt_var=null;
(function ($) {
    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery); 


function redirect(page)
{
switch(page)
{
	case "product":
	$.mobile.navigate( "#product" );
	break;
	
}	
}

function save_prod(obj)
{
	console.log(obj);
	Prod_add_data(obj); 
}	

$( document ).ready(function() {
document.addEventListener("deviceready",onDeviceReady,false);

$("#add_prod_form").validate({
		errorPlacement: function (error, element) {
        error.appendTo(element.parent().prev());
    },
	submitHandler: function (form) {
		var $this = $(form);		
		save_prod($this.serializeFormJSON());
        return false;	
	}	  
});

$("#product").on("pageshow" , function() {
  Prod_select();
});

function BTlist()
{
	BTPrinter.list(function(data){
		$("#bluetooth_list").html('');
        console.log("Success");
        console.log(data); //list of printer in data array
$("#bluetooth_list").append('<legend>Bluetooth Devices</legend>');
		 for(var k=0;k < data.length;k++)
		 {
			 console.log(k);
		  $("#bluetooth_list").append('<input type="radio" name="bluetooth_list" id="bluetooth_list_'+k+'" value="'+data[k]+'" ><label for="bluetooth_list_'+k+'">'+data[k]+'</label>');
		 }
		$("#printer_list_div").trigger('create');
		
		 $("input[name='bluetooth_list']").on("change", function() {
		  var index = $('input:radio[name=bluetooth_list]').index(this);
		  window.localStorage.setItem("selected_printer_value", $("input[name='bluetooth_list']:checked").val());
		  window.localStorage.setItem("selected_printer_index", $('input:radio[name=bluetooth_list]').index(this));
		  console.log(localStorage.getItem("selected_printer_value"));
		});
		
		$('input[type="radio"][name=bluetooth_list][value="'+localStorage.getItem("selected_printer_value")+'"]').attr("checked", "checked");
		$("input[type='radio'][name=bluetooth_list]").checkboxradio("refresh");

    },function(err){
        console.log("Error");
        console.log(err);
		$("#print_error").html(err);
    })
}
$("#printer_config").on("pageshow" , function() {
  
   var btlist = BTlist();
  $("#bluetooth_list").append('<legend>Bluetooth Devices</legend>');
 
});
$(document).on('click', '#printer_refresh', function(e){
    BTlist();


});
});


function onDeviceReady() 
{
	console.log("device ready");
database=window.openDatabase("myappdb","1.0","Application Database",200000);
database.transaction(PopulateDatabase,errorDB,successDB); 

console.log(window);
console.log(navigator);
console.log(Camera);
if (typeof window.BTPrinter !== 'undefined') {
	console.log("inside");
	bluetooth_prnt_var = BTPrinter;			
}

if (localStorage.getItem("selected_printer_index") === null) {
    window.localStorage.setItem("selected_printer_index", "");
	window.localStorage.setItem("selected_printer_value", "");
}

}

 $(document).on('submit', '#add_prod_form', function (e) {
	
	
    //cache the form element for use in this function
    var $this = $(this);

    //prevent the default submission of the form
    e.preventDefault();

    //run an AJAX post request to your server-side script, $this.serialize() is the data from your form being added to the request
	
	console.log($this.serialize());
	
}); 


function print_text(txt)
{
	$("div#divLoading").addClass('show');
	 setTimeout(function(){
				BTPrinter.connect(function(data){
						console.log("Success connect");
						//alert("Success connect");
						console.log(data);
				BTPrinter.printText(function(data){
				console.log("Success Print");
				//alert("Success Print");
				console.log(data);
				setTimeout(function(){
				BTPrinter.disconnect();	
				$("div#divLoading").removeClass('show');
				}, 2000)
				},function(err){
				$("div#divLoading").removeClass('show');
				console.log("Error Print!");
				//alert("Error Print!");
				console.log(err)
				//console.log(err.toString());
				}, txt)			
					},function(err){
						$("div#divLoading").removeClass('show');
						console.log("Error");
						//alert("Error2");
						//alert(err.toString());
						alert("Can't able to connect printer , Try again");
						console.log(err)
					}, localStorage.getItem("selected_printer_value"))  
		}, 2000);
	
	
				/*BTPrinter.list(function(data){
					console.log("Success");
					alert("Success list");
					console.log(data); 
					var device_name=data[0];
			  BTPrinter.connect(function(data){
						console.log("Success connect");
						alert("Success connect");
						console.log(data);
				BTPrinter.printText(function(data){
				console.log("Success Print");
				alert("Success Print");
				console.log(data)
				BTPrinter.disconnect(function(data){
				console.log("Success disconnected");
				alert("Success disconnected");
				console.log(data)
				},function(err){
				console.log("Error");
				alert("Error");
				alert(err.toString());				
				console.log(err)
				}, device_name);
				},function(err){
				console.log("Error Print!");
				alert("Error Print!");
				alert(err.toString());
				}, txt)			
					},function(err){
						console.log("Error");
						alert("Error2");
						alert(err.toString());
						console.log(err)
					}, device_name)
			 },function(err){
				 console.log("Error");
				alert("Error 3");
				alert(err.toString());
				 console.log(err);
			 })*/
}