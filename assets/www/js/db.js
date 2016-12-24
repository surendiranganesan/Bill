/// Database Table creation script /////

function PopulateDatabase(tx)
{
tx.executeSql("Create Table IF NOT EXISTS products(p_id INTEGER PRIMARY KEY AUTOINCREMENT,code text,desc text,unit int,price REAL)");
//tx.executeSql("Insert into product values(1,'P1','Produt1',2,12.5)");
//tx.executeSql("Insert into product values(2,'P2','Produt2',4,'12.5')");
}

function errorDB(error)
{
alert("Error on Database Creation: "+ error.message);
}

function successDB(error)
{
//alert("Databse created succ");
}

/// Database Table creation script ends/////

function edit(form,id)
{
	
	console.log("#####"+form+"#####"+id);
 	database.transaction(function(tx) {
    tx.executeSql('SELECT * FROM products where p_id=?', [id], function(tx, result) {
    $.each(result.rows,function(index){
    var row = result.rows.item(index);
	document.getElementById("p_id").value=row['p_id'];
	document.getElementById("code").value=row['code'];
	document.getElementById("desc").value=row['desc'];
	document.getElementById("unit").value=row['unit'];
	document.getElementById("price").value=row['price'];
	console.log(row);
	$.mobile.navigate( "#addproduct" );

	});
	}, function(tx, error) {
      console.log('SELECT error: ' + error.message);
    });
	}); 
}


function Prod_add_data(obj)
{
console.log(obj); 

database.transaction(function(tx) {
	if(obj.p_id === undefined ||  obj.p_id === null ||  obj.p_id === '')
    tx.executeSql('INSERT INTO products(code,desc,unit,price) VALUES (?,?,?,?)', [obj.code,obj.desc,obj.unit,obj.price]);
	else
    tx.executeSql('update products set code=?, desc=?, unit=?, price=? where p_id=?', [obj.code,obj.desc,obj.unit,obj.price,obj.p_id]);
  }, function(error) {
    console.log('Transaction ERROR: ' + error.message);
	$("#status_msg").html('<span id="error_message" class="error">Transaction ERROR:<b>' + error.message+'</b></span>');
  }, function() {
	  $(".status_msg").fadeIn().html('<span id="success_message" class="success"><b>Data saved successfully</b></span>');
				setTimeout(function() {
					$('.status_msg').fadeOut("slow");
				}, 2000 );
	 $('#add_prod_form').trigger("reset");
	 $('form#add_prod_form input[type=hidden]').val('');
	 if(obj.p_id !== undefined &&  obj.p_id !== null &&  obj.p_id !== '')
	 $.mobile.navigate( "#product" );

  }); 
}

function Prod_select()
{
	//console.log("kkk");
	database.transaction(function(tx) {
    tx.executeSql('SELECT * FROM products', [], function(tx, result) {
	//	$('ul#prod_list_view').empty();
		$('ul#prod_list_view').html('<li data-role="list-divider">Product</li>');
        $.each(result.rows,function(index){
            var row = result.rows.item(index);
            $('ul#prod_list_view').append('<li><a href="#" onclick="edit(\'product\','+row['p_id']+');"><h3 class="ui-li-heading">'+row['desc']+'</h3><p class="ui-li-desc">Code: '+row['code']+'      '+'Unit: '+row['unit']+'      '+'Price: '+row['price']+'</p></a></li>');
        });
 
        $('ul#prod_list_view').listview('refresh');
    }, function(tx, error) {
      console.log('SELECT error: ' + error.message);
    });
  });
}				