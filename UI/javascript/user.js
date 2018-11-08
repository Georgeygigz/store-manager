user_name=['George','Mary','Hellen','Elizaa','Mose'];
full_name=["George Gigz","Rose Mary","Hellen K","Elizaa Queen","Mose Will"];
email=["george@gmail","mary@gmail","hellen@gmail","elizaa@gmail","mose@gmail"];
user_role=['Store attedant','Store attedant','Store attedant','Store attedant','Store attedant'];

function add_user(){
alert('Added a new user')
}
function displayUser(){
   cartdata='<table  style="margin:5px; padding:5px; width:100%;float:left;"><tr><th>User Name</th><th>Full Names</th><th>Email</th><th>User Role</th><th>Action</th></tr>';
   for (i=0; i<user_name.length; i++){
   cartdata+="<tr><td>"+user_name[i]+"</td><td>"+
   full_name[i]+"</td><td>"+email[i]+"</td><td>"+
   user_role[i]+"</td><td><button onClick='deleteUser("+i+")'  style='background:green;margin:5px; padding:5px; width:40%;'>Delete</button><button onClick='editUser()'  style='background:#f3965d;margin:5px; padding:5px; width:40%;'>Edit</button></td></tr>";
}
cartdata +=''+'</tr></table>';
document.getElementById('view_user').innerHTML=cartdata;

}
function deleteUser(a){
    user_name.splice(a,1);
   displayUser();
}
function editUser(){
   alert('Update user')
}
document.write(displayUser());