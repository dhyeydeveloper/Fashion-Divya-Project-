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
                <div onclick="detailsID(this.id)" id="${customer.userPhone}" style="background: linear-gradient(121deg, #FF0000 0%, #ff0000 100%), linear-gradient(140deg, #ff5454 27%, #223DCB 100%), linear-gradient(140deg, #4E9C51 0%, #001AFF 72%), linear-gradient(64deg, #6e00ff 0%, #0038FF 100%), radial-gradient(52% 101.79% at 50% 50%, #707300 0%, #ff0000 100%), radial-gradient(100% 100% at 70% 0%, #7A3B00 0%, #1DAC92 100%);
                background-blend-mode: overlay, overlay, difference, difference, color-burn, exclusion;" class="profile-card">
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
                <div onclick="detailsID(this.id)" id="${customer.userPhone}" style="background: linear-gradient(121deg, #FF0000 0%, #ff0000 100%), linear-gradient(140deg, #ff5454 27%, #223DCB 100%), linear-gradient(140deg, #4E9C51 0%, #001AFF 72%), linear-gradient(64deg, #6e00ff 0%, #0038FF 100%), radial-gradient(52% 101.79% at 50% 50%, #707300 0%, #ff0000 100%), radial-gradient(100% 100% at 70% 0%, #7A3B00 0%, #1DAC92 100%);
                background-blend-mode: overlay, overlay, difference, difference, color-burn, exclusion;" class="profile-card">
                <img src=http://127.0.0.1:8000/static/fashon/img/lady.jpg alt="image1" class="profile-icon" />
                <div class="profile-name">${customer.userName}</div>
                <div class="profile-position">Mob: ${customer.userPhone}</div>
                <button class="button" onclick="deleteID(this.id); event.stopPropagation()" id="${customer.id}">Delete</button>
              </div>`
            }
        }
    });
}
