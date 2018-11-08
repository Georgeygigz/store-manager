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
                setTimeout(() => { window.location.href = '../templates/products.html'; }, 1500);
            } else {
                setTimeout(() => { window.location.href = '../templates/attedantpage.html'; }, 1500);
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
        setTimeout(() => { document.getElementById("message").innerHTML = ""; }, 6000);
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
                setTimeout(() => { window.location.href = '../templates/signup.html'; }, 1500);
            }
            else if (message === "invalid password") {
                document.getElementById("message").innerHTML = message +" sample password(GH@$_kf12)";
                document.getElementById("message").style.color = "red";
                setTimeout(() => { document.getElementById("message").innerHTML = ""; }, 9000);
            }else{
                document.getElementById("message").innerHTML = message;
                document.getElementById("message").style.color = "red";
                setTimeout(() => { document.getElementById("message").innerHTML = ""; }, 6000);
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

    userdata='<table  style="margin:5px; padding:5px; width:100%;float:left;"><tr><th>User Name</th><th>Email</th><th>User Role</th><th>Action</th></tr>';
    for (i=0; i<result.length; i++){
    userdata+="<tr><td>"+result[i].username+"</td><td>"+result[i].email+"</td><td>"+
    result[i].role+"</td><td><button onClick='deleteUser("+i+")'  style='background:#FF6B33;margin:5px; padding:5px; width:40%;'>Delete</button><button onClick='editUser()'  style='background:green;margin:5px; padding:5px; width:40%;'>Edit</button></td></tr>";
 }
 userdata +=''+'</tr></table>';
 document.getElementById('view_user').innerHTML=userdata;
})  .catch(error => console.log(error));
}
 document.write(displayUser());
