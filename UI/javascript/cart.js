item_name=['Orange','Mangoes','melon','Apple','Pineaple','Bread'];
item_price=[34,56,78,23,78,45];
item_quantity=[12,53,89,7,23,67];
date_sold=['12-2-2018','12-2-2018','12-2-2018','12-2-2018','18-6-2018','13-4-2018'];

function add_cart(){
alert('Added To Cart')
}
function displaycart(){
   cartdata='<table  style="margin:5px; padding:5px; width:100%;float:left;"><tr><th>Item Name</th><th>Price</th><th>Quantity</th><th>Total Price</th><th>Date Sold</th><th>Action</th></tr>';
   total=0;
   for (i=0; i<item_name.length; i++){
   total+=item_price[i]*item_quantity[i]
   cartdata+="<tr><td>"+item_name[i]+"</td><td>"+
   item_price[i]+"</td><td>"+item_quantity[i]+"</td><td>"+
   item_price[i]*item_quantity[i]+"</td><td>"+date_sold[i]+"</td><td><button onClick='deleteItem("+i+")'  style='background:green;margin:5px; padding:5px; width:40%;'>Delete</button><button onClick='editItem()'  style='background:#f3965d;margin:5px; padding:5px; width:40%;'>Edit</button></td></tr>";
}
cartdata +='<tr><td></td><td></td><td></td><td>'+total+'</td><td></td><td></td></tr></table>';
document.getElementById('view_cart').innerHTML=cartdata;

}
function deleteItem(a){
   item_name.splice(a,1);
   item_price.splice(a,1);
   item_quantity.splice(a,1);
   displaycart();
}
function editItem(){
   alert('Update Cart')
}
document.write(displaycart());