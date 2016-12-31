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
				BTPrinter.list(function(data){
					console.log("Success");
					console.log(data); 
					var device_name=data[0];
			  BTPrinter.connect(function(data){
						console.log("Success connect");
						console.log(data);
				BTPrinter.printText(function(data){
				console.log("Success Print");
				console.log(data)
				BTPrinter.disconnect(function(data){
				console.log("Success disconnected");
				console.log(data)
				},function(err){
				console.log("Error");
				console.log(err)
				}, device_name);
				},function(err){
				console.log("Error Print!");
				console.log(err);
				}, txt)			
					},function(err){
						console.log("Error");
						console.log(err)
					}, device_name)
			 },function(err){
				 console.log("Error");
				 console.log(err);
			 })
}