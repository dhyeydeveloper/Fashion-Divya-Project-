let logout = document.getElementById('logout');

logout.addEventListener('click',(e)=>{
    // let response = alert("Do you really want to Log out?")
    // console.log(response);
    let response = confirm('Do you really want to logout?')    
    if (response == true) {
        $.ajax({
            type: 'GET',
            url: "/logout/",
            success: function(resp){
                if (resp === 'success'){
                    window.location.href = "/login/"
                }
            }
        });

    }
})