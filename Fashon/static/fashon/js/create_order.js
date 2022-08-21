// Hiding Customer Details Starts
let userArrow = document.getElementById('userArrow');
let userDetails = document.getElementById('userDetails');

let topArrow = document.getElementById('topArrow');
let topGrandParent = document.getElementById('topGrandParent');

function showHideUser(){
    if (userArrow.className.includes('active') == false){
        userDetails.style.display = "none"
    }
    else if (userArrow.className.includes('active') == true){
        userDetails.style.display = "block"
        topArrow.classList.remove('active')
        topGrandParent.style.display = "none"
    }
}
// Hiding Customer Details Ends


// Hiding All Top Details Starts
function showHideTop(){

    if (topArrow.className.includes('active') == false){
        topGrandParent.style.display = "none"
    }
    else if (topArrow.className.includes('active') == true){
        topGrandParent.style.display = "block"
        userArrow.classList.remove('active')
        userDetails.style.display = "none"
    }
}

// Toggling Options Insert Starts
function showHideInsert() {
    let insertOption = document.getElementById('insertOption');
    let arrow = document.getElementById('arrow');
    if (arrow.className.includes('active') == false){
        insertOption.style.display = "none"
    }
    else if (arrow.className.includes('active') == true){
        insertOption.style.display = "block"
    }
}
// Toggling Options Insert Ends
// Hiding All Top Details Ends


