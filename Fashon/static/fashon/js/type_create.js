let new_order = document.getElementById('new_order');

new_order.addEventListener('click',(e)=>{ 
    window.location.href = '/create'
})



let check = document.getElementById('check')
let found = document.getElementById('found')
let notFound = document.getElementById('notFound')
let checkBtn = document.getElementById('checkBtn')

let numb = document.getElementById('numb');
numb.addEventListener('input', (e) => {
    let phone = numb.value;
    if (phone.length == 10){
        $.ajax({
            type: 'GET',
            url: "/check/",
            data: phone,
            success: function(resp){
                if (resp != 'fail'){
                    check.style.display = "none"
                    found.style.display = "block"
                    checkBtn.style.display = ""
                    checkBtn.addEventListener('click', (e)=>{
                        window.location.href = '/details/'+ resp
                    })
                }
                else if (resp == 'fail'){
                    check.style.display = "none"
                    notFound.style.display = "block"
                }
            }
        });
    } 
    if (phone.length != 10){
        check.style.display = "block"
        found.style.display = "none"
        notFound.style.display = "none"
        checkBtn.style.display = "none"
    }
});
