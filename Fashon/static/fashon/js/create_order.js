function postitem(index) {
// INITIALIZING EMPTY DATA FOR ASSORTING
    let userData = {};
    let topData = {};
    let bottomData = {};

    $('input').each(function(index){ 
        let key = $(this)[0].id;
        if (key.includes('user')){
            let userValue = $(this).val();
            userData[key] = userValue;
            if (key == 'userPhone'){
                if (userValue.length != 10){
                    alert('Please enter a valid Phonenumber of 10-digits')
                }
            }
        }
        else if (key.includes('top')){
            let topValue = $(this).val();
            topData[key] = topValue;
        }

        else if (key.includes('bottom')){
            let bottomValue = $(this).val();
            bottomData[key] = bottomValue;
        }

    });
}