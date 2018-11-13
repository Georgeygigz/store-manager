/**Login function **/
function login() {
    let data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };
    const login_url = "https://storemanagerv2.herokuapp.com/api/v2/auth/login";

/**Post login credentials**/
    fetch(login_url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        let message = data.message;
        let user = data.User
        let role = data.Role
        if (message === "Login succesful") {
            token = data.token
            localStorage.setItem("token", token);
            localStorage.setItem("user", user);
            document.getElementById("message").innerHTML = message + " Welcome " + user;
            document.getElementById("message").style.color = "green";
            if (role === "admin") {
                setTimeout(() => {
                     window.location.href = '../templates/products.html';}, 1500);
            } else {
                setTimeout(() => {
                    window.location.href = '../templates/addtocart.html';
                 }, 1500);
            }
        }
        else {
            document.getElementById("message").innerHTML = message;
            document.getElementById("message").style.color = "red";
        }
    })
        /**Handle errors**/
        .catch(error => console.log(error));

}

/** Signup function**/
function signup() {
    const token = localStorage.getItem("token");
    const signup_url = "https://storemanagerv2.herokuapp.com/api/v2/auth/register";
    let data = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        role:document.getElementById("role").value
    }
/**Check whether password match**/
    password=data.password
    cpassword=document.getElementById("c_password").value
    if (password !==cpassword){
        document.getElementById("message").innerHTML = "Password doesnt match";
        document.getElementById("message").style.color = "red";
        setTimeout(() => {
             document.getElementById("message").innerHTML = "";}, 6000);
    }else{

 /**Save new user details**/  
        fetch( signup_url, {
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
            if (message === "Account created successfuly") {
                document.getElementById("message").innerHTML = message;
                document.getElementById("message").style.color = "green";
                setTimeout(() => {
                     window.location.href = '../templates/signup.html'; }, 1500);
            }
            else if (message === "invalid password") {
                document.getElementById("message").innerHTML = message +" sample password(GH@$_kf12)";
                document.getElementById("message").style.color = "red";
                setTimeout(() => {
                     document.getElementById("message").innerHTML = "";}, 9000);
            }else{
                document.getElementById("message").innerHTML = message;
                document.getElementById("message").style.color = "red";
                setTimeout(() => {
                     document.getElementById("message").innerHTML = "";}, 6000);
            }
        })
            /**Handle errors**/
            .catch(error => console.log(error));
    }
}

/**Display all users**/
function displayUser(){
    const users_url="https://storemanagerv2.herokuapp.com/api/v2/auth/register"
    const token = localStorage.getItem("token");
    fetch(users_url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }).then(function(response){
          return response.json()
      }).then(function(data){
          let result=data.message
          if (result==="No available users"){

          }else{

    userdata='<table  style="margin:5px; padding:5px; width:100%;float:left;">'+
    '<tr><th>User Name</th><th>Email</th><th>User Role</th><th>Action</th></tr>';
    for (i=0; i<result.length; i++){
    userdata+="<tr><td>"+result[i].username+"</td><td>"+result[i].email+"</td><td>"+
    result[i].role+"</td><td><button onClick='deleteUserAccount("+result[i].user_id+")' "+
    "style='background:#FF6B33;margin:5px; padding:5px; width:40%;'>Delete</button>"+
    "<button onClick='updateUserRole("+result[i].user_id+")'style='background:green;margin:5px; padding:5px;"+
    "width:40%;'>Edit</button></td></tr>";
 }
 userdata +=''+'</tr></table>';
 document.getElementById('view_user').innerHTML=userdata;
}
})  .catch(error => console.log(error));
}
 //document.write(displayUser());
 if (window.attachEvent) {window.attachEvent('onload', displayUser);}
else if (window.addEventListener) {window.addEventListener('load', displayUser, false);}
else {document.addEventListener('load', displayUser, false);}


 
/**Delete user account**/
function deleteUserAccount(user_id){
    var confirm_delete = confirm("Do you want to delete user");
    if (confirm_delete==true){
    var product_url = `https://storemanagerv2.herokuapp.com/api/v2/auth/user/${user_id}`;
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
      if (result === "User Deleted Successfuly"){
        document.getElementById("message").innerHTML = result;
        document.getElementById("message").style.color = "green";
        setTimeout(() => {
            window.location.href = '../templates/signup.html';},3000);
      }
      else{
        document.getElementById("message").innerHTML = result;
        document.getElementById("message").style.color = "red";
      }
    })
    .catch(error => console.log(error));
    }else{}
}


/**Update user role**/
function updateUserRole(user_id){
    var confirm_delete = confirm("Do update user role");
    if (confirm_delete==true){
    var product_url = `https://storemanagerv2.herokuapp.com/api/v2/auth/user/${user_id}`;
    var token = localStorage.getItem("token");
    var select_box=document.getElementById("category");
    let data = {
        role:document.getElementById("role").value
    }
    fetch(product_url,{
      method: "PUT",
      body: JSON.stringify(data),
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
      if (result === "Updated Successfuly"){
        document.getElementById("message").innerHTML = result;
        document.getElementById("message").style.color = "green";
        setTimeout(() => {
            window.location.href = '../templates/signup.html';},3000);
      }
      else{
        document.getElementById("message").innerHTML = result;
        document.getElementById("message").style.color = "red";
      }
    })
    .catch(error => console.log(error));
}
}
