function check_role() {
    if (document.getElementById('role').value == 'Store Attedant') {
        return window.open('attedantpage.html');
    } else if (document.getElementById('role').value == 'Admin'){
        return window.open('products.html');
    }else{
        alert.apply('Please Select the role')
    }
}