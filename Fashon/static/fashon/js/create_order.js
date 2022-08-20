let check = document.getElementById('check');
let user_details = document.getElementById('user_details');
let details_check = 0;

check.addEventListener('click',(e)=>{
    if (details_check == 0){
        check = "off"
        details_check = 1;
    }
    else{
        check = "on"
        details_check = 0;
    }

    if(check === "off"){
        user_details.style.display = "none";
    }
    else if(check === "on")
        user_details.style.display = "block";
    }
)