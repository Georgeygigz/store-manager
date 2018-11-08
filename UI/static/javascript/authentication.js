/**Login function **/
function login() {
    let data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };
    const url = "https://storemanagerv2.herokuapp.com/api/v2/auth/login";

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        let msg = data.message;
        let user = data.User
        let role = data.Role
        if (msg === "Login succesful") {
            token = data.token
            localStorage.setItem("token", token);
            localStorage.setItem("user", user);
            document.getElementById("message").innerHTML = msg + " Welcome " + user;
            document.getElementById("message").style.color = "green";
            if (role === "admin") {
                setTimeout(() => { window.location.href = '../templates/products.html'; }, 1500);
            } else {
                setTimeout(() => { window.location.href = '../templates/attedantpage.html'; }, 1500);
            }
        }
        else {
            document.getElementById("message").innerHTML = msg;
            document.getElementById("message").style.color = "red";
        }
    })
        /**Handle errors**/
        .catch(error => console.log(error));

}

