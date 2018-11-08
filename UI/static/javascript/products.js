item_category=['Fruits','Beverages','Furniture','Vegetables','Toiletaries'];

function add_product(){
    alert('Product added successfuly')
}
function modify_product(){
    alert('Updated product')
    
}
function delete_product(){
    alert('Deleted product')
    
}
function add_category(){
    alert('Added succesfuly')
}
function displaycategory(){
   cartdata='<table  style="margin:5px; padding:5px; width:100%;float:left;"><tr><th>Item Category</th><th>Action</th></tr>';

   for (i=0; i<item_category.length; i++){
   cartdata+="<tr><td>"+item_category[i]+"</td><td><button onClick='deleteItem("+i+")'  style='background:green;margin:5px; padding:5px; width:40%;'>Delete</button><button onClick='editItem()'  style='background:#f3965d;margin:5px; padding:5px; width:40%;'>Edit</button></td></tr>";
}
cartdata +=''+'</tr></table>';
document.getElementById('item_category').innerHTML=cartdata;

}
function deleteItem(a){
    item_category.splice(a,1);
    displaycategory();
}
function editItem(){
   alert('Updated succesfuly')
}
document.write(displaycategory());