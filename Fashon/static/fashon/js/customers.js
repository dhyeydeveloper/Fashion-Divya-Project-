let searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input',()=>{
    var data = {};
    let inputVal = searchInput.value
    data.value = inputVal
    $.ajax({
        type: 'GET',
        url: "/myCustomers/",
        data: data,
        success: function(data){
            document.getElementById('CustomerCards').innerHTML = ""
            for(customer of data){
                document.getElementById('CustomerCards').innerHTML += `
                <div onclick="detailsID(this.id)" id="${customer.userPhone}" class="profile-card">
                <img src=http://127.0.0.1:8000/static/fashon/img/lady.jpg alt="image1" class="profile-icon" />
                <div class="profile-name">${customer.userName}</div>
                <div class="profile-position">Mob: ${customer.userPhone}</div>
                <button class="button" onclick="deleteID(this.id); event.stopPropagation()" id="${customer.id}">Delete</button>
              </div>`
            }
        }
    });

})

function detailsID(customer){
    $.ajax({
        type: 'GET',
        url: "/check/",
        data: customer,
        success: function(resp){
            if (resp != 'fail'){
                window.location.href = '/details/'+ resp
            }
        }
    });
}

function deleteID(customer){
    $.ajax({
        type: 'GET',
        url: "/delete/",
        data: customer,
        success: function(response){
            document.getElementById('CustomerCards').innerHTML = ""
            for(customer of response){
                document.getElementById('CustomerCards').innerHTML += `
                <div onclick="detailsID(this.id)" id="${customer.userPhone}" class="profile-card">
                <img src=http://127.0.0.1:8000/static/fashon/img/lady.jpg alt="image1" class="profile-icon" />
                <div class="profile-name">${customer.userName}</div>
                <div class="profile-position">Mob: ${customer.userPhone}</div>
                <button class="button" onclick="deleteID(this.id); event.stopPropagation()" id="${customer.id}">Delete</button>
              </div>`
            }
        }
    });
}
