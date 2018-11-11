const user_name = localStorage.getItem("user");
const product_name=localStorage.getItem("item_name");
document.getElementById("current_user").innerHTML=user_name;
document.getElementById("product_name").value=product_name;

/**Add to cart**/
function addTocart() {
    const token = localStorage.getItem("token");
    const sale_url = "https://storemanagerv2.herokuapp.com/api/v2/sales";
    var select_box=document.getElementById("category");
    let data = {
        product_name: document.getElementById("product_name").value,
        customer_name: document.getElementById("customer_name").value,
        quantity: parseInt(document.getElementById("quantity").value),
    }
        fetch( sale_url, {
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
            if (message === "Item added successfuly")  {
                document.getElementById("message").innerHTML = message;
                document.getElementById("message").style.color = "green";
                setTimeout(() => { window.location.href = '../templates/cart.html'; }, 1500);
            }else{
                document.getElementById("message").innerHTML = message;
                document.getElementById("message").style.color = "red";
                setTimeout(() => { document.getElementById("message").innerHTML = ""; }, 6000);
            }
        })
            /**Handle errors**/
            .catch(error => console.log(error));
}

/**Display all items in cart**/
function displayCart(){
    const cart_url="https://storemanagerv2.herokuapp.com/api/v2/sales"
    const token = localStorage.getItem("token");
    fetch(cart_url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }).then(function(response){
          return response.json()
      }).then(function(data){
          let result=data.message
          if (result==="No Available sales records"){

          }else{
            cartdata='<table  style="margin:5px; padding:5px; width:100%;float:left;">'+
            '<tr><th>Item Name</th><th>Price</th><th>Quantity</th><th>Total Price</th>'+
            '<th>Date Sold</th><th>Action</th></tr>';
            total=0;
            for (i=0; i<result.length; i++){
            total+=result[i].product_price*result[i].quantity
            cartdata+="<tr><td>"+result[i].product_name+"</td><td>"+
            result[i].product_price+"</td><td>"+result[i].quantity+"</td><td>"+
            result[i].product_price*result[i].quantity+"</td><td>"+result[i].date_sold+"</td>"+
            "<td><button onClick='deleteSale("+result[i].sale_id+")'style='background:#f3965d;margin:5px; padding:5px;"+
            " width:40%;'>Delete</button><button onClick='editItem()'style='background:green;margin:5px;"+
            " padding:5px; width:40%;'>Edit</button></td></tr>";
         }
         cartdata +='<tr><td></td><td></td><td></td><td>'+total+'</td><td></td><td></td></tr></table>';
         document.getElementById('view_cart').innerHTML=cartdata;
}
})  .catch(error => console.log(error));
}
document.write(displayCart());

/**Delete items from cart**/
function deleteSale(sale_id){
    var confirm_delete = confirm("Do you want to remove item from cart");
    if (confirm_delete==true){
    var product_url = `https://storemanagerv2.herokuapp.com/api/v2/sales/${sale_id}`;
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
        setTimeout(() => {window.location.href = '../templates/cart.html';},3000);
      }
      else{
        document.getElementById("message").innerHTML = result;
        document.getElementById("message").style.color = "red";
      }
    })
    .catch(error => console.log(error));
    }else{}
}

