/** Add new product function**/
function addCategory() {
    const token = localStorage.getItem("token");
    const products_url = "http://127.0.0.1:5000/api/v2/category";
    let data = {
        category_name: (document.getElementById("category").value).toLowerCase(),
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
            if (message === "Category added successfuly")  {
                document.getElementById("message").innerHTML = message;
                document.getElementById("message").style.color = "green";
                setTimeout(() => { window.location.href = '../templates/category.html'; }, 1500);
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
    products=`<table  style="margin:5px; padding:5px; width:100%;float:left;">
    <tr>
    <th>Category Id Name</th>
    <th>Category Name</th>
    <th>Action</th></tr>`;
    for (i=0; i<result.length; i++){  
        products+="<tr><td>"+result[i].category_id+"</td><td>"+
        result[i].category_name+"</td><td><button onClick='deleteUser("+i+")'  style='background:#FF6B33;margin:5px; padding:5px; width:40%;'>Delete</button><button onClick='editUser()'  style='background:green;margin:5px; padding:5px; width:40%;'>Edit</button></td></tr>";
     }
 products +=''+'</tr></table>';
 document.getElementById('item_category').innerHTML=products;
}
})  .catch(error => console.log(error));

}
document.write(getProducts());
