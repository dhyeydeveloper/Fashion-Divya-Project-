// Function for date Formating
function dateFormat(inputDate, format) {
    //parse the input date
    const date = new Date(inputDate);

    //extract the parts of the date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();    

    //replace the month
    format = format.replace("MM", month.toString().padStart(2,"0"));        

    //replace the year
    if (format.indexOf("yyyy") > -1) {
        format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
        format = format.replace("yy", year.toString().substr(2,2));
    }

    //replace the day
    format = format.replace("dd", day.toString().padStart(2,"0"));

    return format;
}



// FOR SAVING DATA IN MODEL
function postitem(button) {
// INITIALIZING EMPTY DATA FOR ASSORTING
    let userData = {};
    let topData = {};
    let bottomData = {};

    $('input').each(function(index){ 
        let key = $(this)[0].id;

        if (key.includes('user')){
            let userValue = $(this).val();
            // CONDITION FOR USERDELIVERY
            if (key == 'userDeliveryDate'){
                if (userValue.length == ''){
                    delete userData.userDeliveryDate;
                    alert('Please Enter a delivery date for convenience')
                }
                else{
                    userValue = dateFormat(userValue, 'yyyy-MM-dd')
                    userData[key] = userValue;
                }
            }

            // CONDITION FOR USERPHONE
            else if (key == 'userPhone'){
                if (userValue.length != 10){
                    delete userData.userPhone;
                    alert('Please Enter a valid 10-digit phoneNumber')
                }
                else{
                    userData[key] = userValue;
                }
            }

            // CONDITION FOR USERADVANCE
            else if (key == 'userAdvance'){
                if (userValue == ''){
                    userValue = 0;
                    userData[key] = userValue;
                }
                else{
                    userData[key] = userValue;
                }
            }
            
            else{
                userData[key] = userValue;
            }
        }
            
        // Saving Top Details
        else if (key.includes('top')){
            let topValue = $(this).val();
            if (topValue == ''){
                topValue = 0;
                topData[key] = topValue;
            }
            else{
                topData[key] = topValue;
            }
        }

        // Saving Bottom Details
        else if (key.includes('bottom')){
            let bottomValue = $(this).val();
            if (bottomValue == ''){
                bottomValue = 0;
                bottomData[key] = bottomValue;
            }
            else{
                bottomData[key] = bottomValue;
            }
        }

    if (Object.keys(userData).length == 4 && Object.keys(topData).length == 25 && Object.keys(bottomData).length == 10){
        $.ajax({
            url: "/create/",
            method : 'POST',
            data:  JSON.stringify({'userData':userData, 'topData':topData,'bottomData':bottomData,'button':button}),
            success: function(resp){
                if (resp === "exists"){
                    alert("The Customer already exists. Please check in My Customer")
                }
                else{
                    if (button != 'print'){
                        window.location.href = ("/details/"+resp)
                    }
                    else if(button == "print"){
                        window.location.href = ("/details/"+'p/'+resp)
                    }
                }
            },
    
        });
    }
    });
}