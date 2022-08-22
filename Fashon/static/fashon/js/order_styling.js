let userArrow = document.getElementById('userArrow');
let userDetails = document.getElementById('userDetails');

let topArrow = document.getElementById('topArrow');
let topGrandParent = document.getElementById('topGrandParent');

let bottomArrow = document.getElementById('bottomArrow');
let bottomGrandParent = document.getElementById('bottomGrandParent');


// Hiding Customer Details Starts
function showHideUser(){
    if (userArrow.className.includes('active') == false){
        userDetails.style.display = "none"
    }
    else if (userArrow.className.includes('active') == true){
        userDetails.style.display = "block"
        topArrow.classList.remove('active')
        topGrandParent.style.display = "none"
        bottomGrandParent.style.display = "none"
        bottomArrow.classList.remove('active')
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
        bottomGrandParent.style.display = "none"
        bottomArrow.classList.remove('active')
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



// Hiding All Top Details Starts
function showHideBottom(){

    if (bottomArrow.className.includes('active') == false){
        bottomGrandParent.style.display = "none"
    }
    else if (bottomArrow.className.includes('active') == true){
        bottomGrandParent.style.display = "block"
        userArrow.classList.remove('active')
        userDetails.style.display = "none"
        topArrow.classList.remove('active')
        topGrandParent.style.display = "none"
    }
}

// Toggling Options Insert Starts
function showHideBottomInsert() {
    let insertBottomOption = document.getElementById('insertBottomOption');
    let bottomInsertArrow = document.getElementById('bottomInsertArrow');
    if (bottomInsertArrow.className.includes('active') == false){
        insertBottomOption.style.display = "none"
    }
    else if (bottomInsertArrow.className.includes('active') == true){
        insertBottomOption.style.display = "block"
    }
}
// Toggling Options Insert Ends
// Hiding All Top Details Ends


