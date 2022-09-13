$(function() {
    $.ajax({
        type: 'GET',
        url: "/pendingOrderJs/",
        // data: phone,
        success: function(resp){
            for (const date in resp) {
                document.getElementById('data').innerHTML +=
                `<div id=${date}><button style="width: 1208px; margin: 0 0 0 30px; height: 54px; font-size: 20px; color: antiquewhite; background: #1A94A0; font-weight: 500;">${date}</button>
                <br>
                <br></div>
                <div class="container" id="allCustomerContainer">
                <div id="CustomerCards${date}" class="profile-container" style="margin-bottom: -302px;"></div>
                </div>
                <br>`
                
                cnt= 0
                for (const customer of resp[date]) {
                    cnt+=1
                    if (cnt > 3){
                        document.getElementById('CustomerCards'+date).style = ""
                    }
                    if (cnt > 6){
                        document.getElementById('CustomerCards'+date).style = "height: 1100px;"
                    }
                    document.getElementById('CustomerCards'+date).innerHTML += 
                    `<div class="profile-card" style="background: #4A009C">
                    <div class="profile-name" style="margin-top:-7px; text-align: -webkit-center; width: 207px;">${customer.user.userName}
                    </div>
                    <img src=http://127.0.0.1:8000/static/fashon/img/dress.png alt="image1" class="profile-icon" />
                    <div class="profile-position" style="margin:15px 0 0 10px">Mob: ${customer.user.userPhone}</div>
                    <div class="profile-position" style="margin-bottom:-15px">Priority: ${customer.priority}</div>
                    <div style="display: flex;">
                    <button class="button" onclick="detailsID(this.id)" id="${customer.priority}">Add to Delivery</button>
                    <button class="button" onclick="detailsID(this.id)" id="${customer.priority}">Cancel</button>
                    </div>
                  </div>`
                }
            }

        }
    });
});
