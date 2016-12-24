var database=null;
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
	//window.location="index.html#product";
	$.mobile.navigate( "#bar" );
	break;
	
}	
}
$( document ).ready(function() {
	
document.addEventListener("deviceready",onDeviceReady,false);
function save_prod(obj)
{
	console.log(obj);
	Prod_add_data(obj);
}	
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
});

function onDeviceReady() 
{
	console.log("device ready");
database=window.openDatabase("myappdb","1.0","Application Database",200000);
database.transaction(PopulateDatabase,errorDB,successDB); 

}

/* $(document).on('submit', '#add_prod_form', function (e) {
	
	
    //cache the form element for use in this function
    var $this = $(this);

    //prevent the default submission of the form
    e.preventDefault();

    //run an AJAX post request to your server-side script, $this.serialize() is the data from your form being added to the request
	
	console.log($this.serialize());
	
}); */
