let login = document.getElementById('login')
let failure=document.getElementById('failure');

login.addEventListener("click",(e)=>{
    var data = {};
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value
    if (username.length != "" && password.length != ""){
        data.username = username
        data.password = password
        $.ajax({
            url: "/login/",
            method : 'POST',
            data: data,
            success: function(resp){
                if (resp === 'success'){
                    window.location.href = "/home/"
                }
                else{
                    failure.style.display = "block"
                    setTimeout(() => {
                        failure.style.display = "none"  
                    }, 4000);
                }
            }
        });
    }
    else{
        failure.style.display = "block"
        setTimeout(() => {
            failure.style.display = "none"  
        }, 4000);
    }
    e.preventDefault();
})

let close = document.getElementById('close')
close.addEventListener('click',()=>{
    failure.style.display = "none"   
})



