document.getElementById("login-btn").addEventListener("click",function(){

    const username=document.getElementById("username").value;
    const password=document.getElementById("password").value;

    if(username==="admin" && password==="admin123"){
        alert("Login Successful");
    }
    else{
        alert("Wrong Username or Password");
    }

});