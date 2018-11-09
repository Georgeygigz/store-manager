
/** Add new product function**/
function addProduct() {
    const token = localStorage.getItem("token");
    const products_url = "http://127.0.0.1:5000/api/v2/products";
    var select_box=document.getElementById("category");
    let data = {
        product_name: (document.getElementById("item_name").value).toLowerCase(),
        category_id:  select_box.selectedIndex,
        stock_amount: parseInt(document.getElementById("quantity").value),
        price:parseInt(document.getElementById("item_price").value)
    }
 /**Save new product details**/  
        fetch( products_url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            let message = data.message;
            if ((message === "Product saved successfully") || (message === "Product updated successfully")) {
                document.getElementById("message").innerHTML = message;
                document.getElementById("message").style.color = "green";
                setTimeout(() => { window.location.href = '../templates/addproducts.html'; }, 1500);
            }else{
                document.getElementById("message").innerHTML = message;
                document.getElementById("message").style.color = "red";
                setTimeout(() => { document.getElementById("message").innerHTML = ""; }, 6000);
            }
        })
            /**Handle errors**/
            .catch(error => console.log(error));
}

/**Get all available products**/
function getProducts(){
    const product_url="http://127.0.0.1:5000/api/v2/products"
    const token = localStorage.getItem("token");
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

    products=`<table id="tbl_products" style="margin:5px; padding:5px; width:100%;float:left;">
    <tr>
    <th>Product Name</th>
    <th>Price</th>
    <th>Stock Amount</th>
    <th>Category Id</th>
    <th>Action</th></tr>`;
    for (i=0; i<result.length; i++){
        products+="<tr><td>"+result[i].product_name+"</td><td>"+
        result[i].price+"</td><td>"+
        result[i].stock_amount+"</td><td>"+
        result[i].category_id+"</td><td><button onClick='deleteProduct("+result[i].product_id+")'"+
        "style='background:#FF6B33;margin:5px; padding:5px; width:40%;'>Delete</button>"+
        "<button onClick='editProduct()'  style='background:green;margin:5px; padding:5px;"+
        " width:40%;'>Edit</button></td></tr>";
 }
 products +=''+'</tr></table>';
 document.getElementById('view_products').innerHTML=products;
 document.getElementById('ttl').innerHTML=result.length;
}
})  .catch(error => console.log(error));

}
 document.write(getProducts());

/**Display all available products**/
function allProducts(){
    const product_url="http://127.0.0.1:5000/api/v2/products"
    const token = localStorage.getItem("token");
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
         <li>
         <img src="../static/img/img.png" style="width:100px; height:100px">
         <h3>${result[i].product_name}</h3>
         <p><b>Price:</b> ${result[i].price}</p>
         <p><b>Stock Amount:</b>${result[i].stock_amount}</p>
         </li>`
 }
 product+=`</ul>`
 document.getElementById('all_products').innerHTML=product;
}
 
})  .catch(error => console.log(error));
}
document.write(allProducts());

/**Populate categories to select box**/
function productCategories(){
    const product_url="http://127.0.0.1:5000/api/v2/category"
    const token = localStorage.getItem("token");
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
    if (result==="No Available products categories"){

    }else{
    var select_box=document.getElementById('category');
    for (i=0; i<result.length; i++){ 
        var option = document.createElement('option');
        option.text = option.value = result[i].category_name;
        select_box.add(option, i);
     } 
}
})  .catch(error => console.log(error));

}
document.write(productCategories());

/**Delete product**/
function deleteProduct(product_id){
    var confirm_delete = confirm("Do you want to delete this product");
    if (confirm_delete==true){
    var product_url = `http://127.0.0.1:5000/api/v2/products/${product_id}`;
    var token = localStorage.getItem("token");
    fetch(product_url,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(function(response){
      return response.json()
    })
    .then(function(data){
      let result = data.message
      if (result === "Deleted Successfuly"){
        document.getElementById("message").innerHTML = result;
        document.getElementById("message").style.color = "green";
        setTimeout(() => {window.location.href = '../templates/addproducts.html';},3000);
      }
      else{
        document.getElementById("message").innerHTML = result;
        document.getElementById("message").style.color = "red";
      }
    })
    .catch(error => console.log(error));
    }else{}
}