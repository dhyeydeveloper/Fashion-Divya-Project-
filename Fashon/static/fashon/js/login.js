let login = document.getElementById('login')

login.addEventListener("click",(e)=>{
    var data = {};
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value
    if (username.length !== null && password.length !== null){
        data.username = username
        data.password = password
        $.ajax({
            url: "{% url 'loginUrl' %}",
            method : 'POST',
            data: data,
            success: function(resp){
                if (resp === 'success'){
                    window.location.href = "/home/"
                }
                else{
                    let failure=document.getElementById('failure');
                    // success.classList.remove('show');
                    failure.classList.add('show');
                    $('#failure').show();
                }
            }
        });
    }
    else{
        let failure=document.getElementById('failure');
        // success.classList.remove('show');
        failure.classList.add('show');
        $('#failure').show();
    }
    e.preventDefault();
})


