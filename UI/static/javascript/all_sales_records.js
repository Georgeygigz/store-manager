
/**Display all sales records**/
function displaySales(){
    const cart_url=`http://127.0.0.1:5000/api/v2/sales`
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
          console.log(result)
          if (result==="No Available sales records"){

          }else{
            cartdata='<table class="sales_records"  style="margin:5px; padding:5px; width:100%;float:left;">'+
            '<tr><th>Attedant Name</th><th>Customer Name</th><th>Product Name</th><th>Quantity</th><th>Total Price</th>'+
            '<th>Date Sold</th></tr>';
            total=0;
            for (i=0; i<result.length; i++){
            total+=result[i].product_price*result[i].quantity
            cartdata+="<tr><td>"+result[i].attedant_name+"</td><td>"+result[i].customer_name+"</td><td>"+
            result[i].product_name+"</td><td>"+result[i].quantity+"</td><td>"+
            result[i].product_price*result[i].quantity+"</td><td>"+result[i].date_sold+"</td></tr>";
         }
         cartdata +='<tr></tr></table>';
         document.getElementById('view_all_sale').innerHTML=cartdata;
}
})  .catch(error => console.log(error));
}
document.write(displaySales());
