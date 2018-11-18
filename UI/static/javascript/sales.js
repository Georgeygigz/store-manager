const product_url="https://storemanagerv2.herokuapp.com/api/v2/products";
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
document.getElementById("current_user").innerHTML=user;
let c_product;
fetch(product_url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }).then(function(response){
      return response.json()
  }).then(function(data){
      let result=data.message
      c_product=result
      if (result==="No Available products"){

    }else{
     }

})  .catch(error => console.log(error));

function newSaleRecord(id){
    localStorage.setItem("item_name",c_product[id-1].product_name);
    localStorage.setItem("price",c_product[id-1].price);
    window.location.href = '../templates/cart.html';
    
}

/**Get All products**/
function allProducts(){
    const product_url="https://storemanagerv2.herokuapp.com/api/v2/products"
    const token = localStorage.getItem("token");
    document.getElementById("current_user").innerHTML=user;
    fetch(product_url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }).then(function(response){
          return response.json()
      }).then(function(data){
          let result=data.message
          if (result==="No Available products"){

        }else{
     product=`<ul id="single_product">`
     img=['<img src="../static/img/orange.jpg" style="width:100px; height:100px">']
     for (i=0; i<result.length; i++){
         product +=`
         <li id="list">
         <img src="../static/img/${result[i].image}" style="width:100px; height:100px">
         <h3>${result[i].product_name}</h3>
         <p><b>Price:</b> ${result[i].price}</p>
         <p><b>Stock Amount:</b>${result[i].stock_amount}</p>
        <button onclick=(newSaleRecord(${result[i].product_id})) style="border: 1px solid #6b6a69;
        border-radius: 4px; padding:5px; background:#f88934">ADD TO CART</button>
         </li>`
 }
 product+=`</ul>`
 document.getElementById('all_products').innerHTML=product;
}
 
})  .catch(error => console.log(error));
}
if (window.attachEvent) {window.attachEvent('onload', allProducts);}
else if (window.addEventListener) {window.addEventListener('load', allProducts, false);}
else {document.addEventListener('load', allProducts, false);}


/**Display sales records for specific user**/
function displaySales(username){
    const sales_url=`https://storemanagerv2.herokuapp.com/api/v2/sales/${username}`
    const token = localStorage.getItem("token");
    fetch(sales_url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }).then(function(response){
          return response.json()
      }).then(function(data){
          let result=data.message
          if (result==="Sale Not Found"){
            document.getElementById("sales_records").innerHTML=0;
            document.getElementById("products_sold").innerHTML=0;
          }else{
            document.getElementById("sales_records").innerHTML=result.length;
            cartdata='<table class="sales_records"  style="margin:5px; padding:5px; width:100%;float:left;">'+
            '<tr><th>Customer Name</th><th>Product Name</th><th>Quantity</th><th>Total Price</th>'+
            '<th>Date Sold</th></tr>';
            all_products=0
            total=0;
            for (i=0; i<result.length; i++){
            all_products+=result[i].quantity
            total+=result[i].product_price*result[i].quantity
            cartdata+="<tr><td>"+result[i].customer_name+"</td><td>"+
            result[i].product_name+"</td><td>"+result[i].quantity+"</td><td>"+
            result[i].product_price*result[i].quantity+"</td><td>"+result[i].date_sold+"</td></tr>";
         }
         cartdata +='<tr></tr></table>';
         document.getElementById('view_sale').innerHTML=cartdata;
         document.getElementById("products_sold").innerHTML=all_products;
}
})  .catch(error => console.log(error));
}
//document.write(displaySales(user));
if (window.attachEvent) {window.attachEvent('onload', displaySales(user));}
else if (window.addEventListener) {window.addEventListener('load',  displaySales(user), false);}
else {document.addEventListener('load',  displaySales(user), false);}


/**Search product**/
function searchProduct() {
    var input = document.getElementById('search');
    var search = input.value.toUpperCase();
    var ul = document.getElementById("single_product");
    var list = ul.getElementsByTagName('li');

    for (i = 0; i < list.length; i++) {
        a = list[i].getElementsByTagName("h3")[0];
        if (a.innerHTML.toUpperCase().indexOf(search) > -1) {
            list[i].style.display = "";
        } else {
            list[i].style.display = "none";
        }
    }
}
