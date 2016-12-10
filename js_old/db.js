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


function Prod_add_data(obj)
{
console.log(obj); 


database.transaction(function(tx) {
    tx.executeSql('INSERT INTO products(code,desc,unit,price) VALUES (?,?,?,?)', [obj.code,obj.desc,obj.unit,obj.price]);
  }, function(error) {
    console.log('Transaction ERROR: ' + error.message);
  }, function() {
    console.log('Data added');
	redirect('product');
  });
  
  
  
}

function Prod_select()
{
	console.log("kkk");
	database.transaction(function(tx) {
    tx.executeSql('SELECT * FROM products', [], function(tx, rs) {
      var len = rs.rows.length, i;
	//$("#rowCount").append(len);
	for (i = 0; i < len; i++){
		
	//$("#prod_list_view").append('<li data-icon="check"><a href="">'+rs.rows.item(i).desc+'</a></li>');
	$('ul#prod_list_view').append($('<li/>', {    //here appending `<li>`
		'data-icon': "check"
	}).append($('<a/>', {    //here appending `<a>` into `<li>`
		'href': '#',
		//'data-transition': 'slide',
		'text': rs.rows.item(i).desc
	})));
	} 
	$('ul#prod_list_view').listview('refresh');
    }, function(tx, error) {
      console.log('SELECT error: ' + error.message);
    });
  });
}