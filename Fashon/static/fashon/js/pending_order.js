var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

function loadData(){
    $.ajax({
        type: 'GET',
        url: "/pendingOrderJs/",
        success: function(resp){
            // console.log()
            if (Object.keys(resp).length > 0){
                for (const date in resp) {
                    
                    let day = date.slice(0,2)
                    let month = date.slice(3,5)
                    let year = date.slice(6,10)

                    user_date = year + "-" + month + "-" + day
                    today_date = yyyy + "-" + mm + "-" + dd
                    if (user_date < today_date){
                        document.getElementById('data').innerHTML +=
                        `<div id=${date}><button style="width: 1208px; margin: 0 0 0 30px; height: 54px; font-size: 20px; color: antiquewhite; background: crimson; font-weight: 500;">${date}</button>
                        <br>
                        <br></div>
                        <div class="container" id="allCustomerContainer">
                        <div id="CustomerCards${date}" class="profile-container" style="margin-bottom: -302px;"></div>
                        </div>
                        <br>`
                    }
                    else if (user_date == today_date){
                        document.getElementById('data').innerHTML +=
                        `<div id=${date}><button style="width: 1208px; margin: 0 0 0 30px; height: 54px; font-size: 20px; color: antiquewhite; background: #F95700; font-weight: 500;">${date}</button>
                        <br>
                        <br></div>
                        <div class="container" id="allCustomerContainer">
                        <div id="CustomerCards${date}" class="profile-container" style="margin-bottom: -302px;"></div>
                        </div>
                        <br>`
                    }
                    else{
                        document.getElementById('data').innerHTML +=
                        `<div id=${date}><button style="width: 1208px; margin: 0 0 0 30px; height: 54px; font-size: 20px; color: antiquewhite; background: #006666; font-weight: 500;">${date}</button>
                        <br>
                        <br></div>
                        <div class="container" id="allCustomerContainer">
                        <div id="CustomerCards${date}" class="profile-container" style="margin-bottom: -302px;"></div>
                        </div>
                        <br>`
                    }
                    
                    cnt= 0
                    for (const customer of resp[date]) {
                        cnt+=1
                        if (cnt > 3){
                            document.getElementById('CustomerCards'+date).style = "height: 780px;"
                        }
                        if (cnt > 6){
                            document.getElementById('CustomerCards'+date).style = "height: 1170px;"
                        }
                        document.getElementById('CustomerCards'+date).innerHTML += 
                        `<div onclick="detailsID(this.id)" id="${customer.user.userPhone}" class="profile-card" style="background: linear-gradient(129.96deg, #FF2F2F 10.43%, #000460 92.78%), radial-gradient(100% 246.94% at 100% 0%, #FFFFFF 0%, #020063 100%), linear-gradient(58.72deg, #2200F2 0%, #530000 100%), linear-gradient(154.03deg, #B70000 0%, #FF003D 74.04%), linear-gradient(341.1deg, #FF0000 7.52%, #0038FF 77.98%), linear-gradient(136.23deg, #00C2FF 11.12%, #FF0000 86.47%), radial-gradient(57.37% 100% at 50% 0%, #B50000 0%, #0034BB 100%);
                    background-blend-mode: overlay, color-burn, screen, overlay, difference, difference, normal;">
                        <div class="profile-name" style="margin-top:-7px; text-align: -webkit-center; width: 207px;">${customer.user.userName}
                        </div>
                        <img src=http://127.0.0.1:8000/static/fashon/img/dress.png alt="image1" class="profile-icon" />
                        <div class="profile-position" style="margin:15px 0 0 10px">Mob: ${customer.user.userPhone}</div>
                        <div class="profile-position" style="margin-bottom:-15px">Priority: ${customer.priority}</div>
                        <button class="button" onclick="orderDeliveryCreate(this.id); event.stopPropagation()" id="${customer.id}">Add to Delivery</button>
                        <button style="margin-top: 7px; background: crimson;" class="button" onclick="orderCancel(this.id); event.stopPropagation()" id="${customer.id}">Cancel</button>
                        </div>`
                    }
                }
            }
            else{
                document.getElementById('data').innerHTML = `<h1 style="margin: 270px 0 0 283px; font-style: italic; font-family: 'Alegreya Sans SC';">Sorry, Found no order to show.....</h1>`
            }
        }
    });
}


// search input starts here
let searchInput = document.getElementById('orderSearchInput');
searchInput.addEventListener('input',()=>{
    var data = {};
    let inputVal = searchInput.value
    if (inputVal.length > 0){
        searchDate.value = ""
    }
    data.value = inputVal
    $.ajax({
        type: 'GET',
        url: "/pendingOrderJs/",
        data: data,
        success: function(response){
            document.getElementById('data').innerHTML = ""
            if (Object.keys(response).length > 0){
                for (const date in response) {
                
                    let day = date.slice(0,2)
                    let month = date.slice(3,5)
                    let year = date.slice(6,10)
    
                    user_date = year + "-" + month + "-" + day
                    today_date = yyyy + "-" + mm + "-" + dd
                    if (user_date < today_date){
                        document.getElementById('data').innerHTML +=
                        `<div id=${date}><button style="width: 1208px; margin: 0 0 0 30px; height: 54px; font-size: 20px; color: antiquewhite; background: crimson; font-weight: 500;">${date}</button>
                        <br>
                        <br></div>
                        <div class="container" id="allCustomerContainer">
                        <div id="CustomerCards${date}" class="profile-container" style="margin-bottom: -302px;"></div>
                        </div>
                        <br>`
                    }
                    else if (user_date == today_date){
                        document.getElementById('data').innerHTML +=
                        `<div id=${date}><button style="width: 1208px; margin: 0 0 0 30px; height: 54px; font-size: 20px; color: antiquewhite; background: #F95700; font-weight: 500;">${date}</button>
                        <br>
                        <br></div>
                        <div class="container" id="allCustomerContainer">
                        <div id="CustomerCards${date}" class="profile-container" style="margin-bottom: -302px;"></div>
                        </div>
                        <br>`
                    }
                    else{
                        document.getElementById('data').innerHTML +=
                        `<div id=${date}><button style="width: 1208px; margin: 0 0 0 30px; height: 54px; font-size: 20px; color: antiquewhite; background: #006666; font-weight: 500;">${date}</button>
                        <br>
                        <br></div>
                        <div class="container" id="allCustomerContainer">
                        <div id="CustomerCards${date}" class="profile-container" style="margin-bottom: -302px;"></div>
                        </div>
                        <br>`
                    }
                    
                    cnt= 0
                    for (const customer of response[date]) {
                        cnt+=1
                        if (cnt > 3){
                            document.getElementById('CustomerCards'+date).style = ""
                        }
                        if (cnt > 6){
                            document.getElementById('CustomerCards'+date).style = "height: 1170px;"
                        }
                        document.getElementById('CustomerCards'+date).innerHTML += 
                        `<div onclick="detailsID(this.id)" id="${customer.user.userPhone}" class="profile-card" style="background: linear-gradient(129.96deg, #FF2F2F 10.43%, #000460 92.78%), radial-gradient(100% 246.94% at 100% 0%, #FFFFFF 0%, #020063 100%), linear-gradient(58.72deg, #2200F2 0%, #530000 100%), linear-gradient(154.03deg, #B70000 0%, #FF003D 74.04%), linear-gradient(341.1deg, #FF0000 7.52%, #0038FF 77.98%), linear-gradient(136.23deg, #00C2FF 11.12%, #FF0000 86.47%), radial-gradient(57.37% 100% at 50% 0%, #B50000 0%, #0034BB 100%);
                        background-blend-mode: overlay, color-burn, screen, overlay, difference, difference, normal;">
                        <div class="profile-name" style="margin-top:-7px; text-align: -webkit-center; width: 207px;">${customer.user.userName}
                        </div>
                        <img src=http://127.0.0.1:8000/static/fashon/img/dress.png alt="image1" class="profile-icon" />
                        <div class="profile-position" style="margin:15px 0 0 10px">Mob: ${customer.user.userPhone}</div>
                        <div class="profile-position" style="margin-bottom:-15px">Priority: ${customer.priority}</div>
                        <button class="button" onclick="orderDeliveryCreate(this.id); event.stopPropagation()" id="${customer.id}">Add to Delivery</button>
                        <button style="margin-top: 7px; background: crimson;" class="button" onclick="orderCancel(this.id); event.stopPropagation()" id="${customer.id}">Cancel</button>
                        </div>`
                    }
                }
            }
            else{
                document.getElementById('data').innerHTML = `<h1 style="margin: 270px 0 0 283px; font-style: italic; font-family: 'Alegreya Sans SC';">Sorry, Found no order for this search.....</h1>`
            }
        }
    });
})


// Redirecting to user details
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

// Deleting Order data
function orderCancel(id){
    $.ajax({
        type: 'GET',
        url: "/deleteOrder/",
        data: {'id':id},
        success: function(response){
            document.getElementById('data').innerHTML = ""
            if (Object.keys(response).length > 0){
                for (const date in response) {
                
                    let day = date.slice(0,2)
                    let month = date.slice(3,5)
                    let year = date.slice(6,10)
    
                    user_date = year + "-" + month + "-" + day
                    today_date = yyyy + "-" + mm + "-" + dd
                    if (user_date < today_date){
                        document.getElementById('data').innerHTML +=
                        `<div id=${date}><button style="width: 1208px; margin: 0 0 0 30px; height: 54px; font-size: 20px; color: antiquewhite; background: crimson; font-weight: 500;">${date}</button>
                        <br>
                        <br></div>
                        <div class="container" id="allCustomerContainer">
                        <div id="CustomerCards${date}" class="profile-container" style="margin-bottom: -302px;"></div>
                        </div>
                        <br>`
                    }
                    else if (user_date == today_date){
                        document.getElementById('data').innerHTML +=
                        `<div id=${date}><button style="width: 1208px; margin: 0 0 0 30px; height: 54px; font-size: 20px; color: antiquewhite; background: #F95700; font-weight: 500;">${date}</button>
                        <br>
                        <br></div>
                        <div class="container" id="allCustomerContainer">
                        <div id="CustomerCards${date}" class="profile-container" style="margin-bottom: -302px;"></div>
                        </div>
                        <br>`
                    }
                    else{
                        document.getElementById('data').innerHTML +=
                        `<div id=${date}><button style="width: 1208px; margin: 0 0 0 30px; height: 54px; font-size: 20px; color: antiquewhite; background: #006666; font-weight: 500;">${date}</button>
                        <br>
                        <br></div>
                        <div class="container" id="allCustomerContainer">
                        <div id="CustomerCards${date}" class="profile-container" style="margin-bottom: -302px;"></div>
                        </div>
                        <br>`
                    }
                    
                    cnt= 0
                    for (const customer of response[date]) {
                        cnt+=1
                        if (cnt > 3){
                            document.getElementById('CustomerCards'+date).style = ""
                        }
                        if (cnt > 6){
                            document.getElementById('CustomerCards'+date).style = "height: 1170px;"
                        }
                        document.getElementById('CustomerCards'+date).innerHTML += 
                        `<div onclick="detailsID(this.id)" id="${customer.user.userPhone}" class="profile-card" style="background: linear-gradient(129.96deg, #FF2F2F 10.43%, #000460 92.78%), radial-gradient(100% 246.94% at 100% 0%, #FFFFFF 0%, #020063 100%), linear-gradient(58.72deg, #2200F2 0%, #530000 100%), linear-gradient(154.03deg, #B70000 0%, #FF003D 74.04%), linear-gradient(341.1deg, #FF0000 7.52%, #0038FF 77.98%), linear-gradient(136.23deg, #00C2FF 11.12%, #FF0000 86.47%), radial-gradient(57.37% 100% at 50% 0%, #B50000 0%, #0034BB 100%);
                        background-blend-mode: overlay, color-burn, screen, overlay, difference, difference, normal;">
                        <div class="profile-name" style="margin-top:-7px; text-align: -webkit-center; width: 207px;">${customer.user.userName}
                        </div>
                        <img src=http://127.0.0.1:8000/static/fashon/img/dress.png alt="image1" class="profile-icon" />
                        <div class="profile-position" style="margin:15px 0 0 10px">Mob: ${customer.user.userPhone}</div>
                        <div class="profile-position" style="margin-bottom:-15px">Priority: ${customer.priority}</div>
                        <button class="button" onclick="orderDeliveryCreate(this.id); event.stopPropagation()" id="${customer.id}">Add to Delivery</button>
                        <button style="margin-top: 7px; background: crimson;" class="button" onclick="orderCancel(this.id); event.stopPropagation()" id="${customer.id}">Cancel</button>
                        </div>`
                    }
                }
            }
            else{
                document.getElementById('data').innerHTML = `<h1 style="margin: 270px 0 0 283px; font-style: italic; font-family: 'Alegreya Sans SC';">Sorry, Found no order to show.....</h1>`
            }
        }
    });
}

// Getting Date field data
let searchDate = document.getElementById('searchDate')
searchDate.addEventListener('click',()=>{
    let prev = document.getElementsByClassName('ui-datepicker-prev')[0]
    let next = document.getElementsByClassName('ui-datepicker-next')[0]
    prev.addEventListener('click',()=>{
        getDate()
    })
    next.addEventListener('click',()=>{
        getDate()
    })
    getDate()
})

function getDate(){
    let tables = document.getElementsByTagName("td")
    for (var i = 0; i < tables.length; i++) {
        tables[i].addEventListener('click',()=>{
            givenDate = searchDate.value
            if (givenDate.length > 0){
                searchInput.value = ""
            }
            date = dateFormat(givenDate, 'yyyy-MM-dd')
            $.ajax({
                type: 'GET',
                url: "/pendingOrderJs/",
                data: {'date':date},
                success: function(response){
                    document.getElementById('data').innerHTML = ""
                    if (Object.keys(response).length > 0){
                        for (const date in response) {
                
                            let day = date.slice(0,2)
                            let month = date.slice(3,5)
                            let year = date.slice(6,10)
            
                            user_date = year + "-" + month + "-" + day
                            today_date = yyyy + "-" + mm + "-" + dd
                            if (user_date < today_date){
                                document.getElementById('data').innerHTML +=
                                `<div id=${date}><button style="width: 1208px; margin: 0 0 0 30px; height: 54px; font-size: 20px; color: antiquewhite; background: crimson; font-weight: 500;">${date}</button>
                                <br>
                                <br></div>
                                <div class="container" id="allCustomerContainer">
                                <div id="CustomerCards${date}" class="profile-container" style="margin-bottom: -302px;"></div>
                                </div>
                                <br>`
                            }
                            else if (user_date == today_date){
                                document.getElementById('data').innerHTML +=
                                `<div id=${date}><button style="width: 1208px; margin: 0 0 0 30px; height: 54px; font-size: 20px; color: antiquewhite; background: #F95700; font-weight: 500;">${date}</button>
                                <br>
                                <br></div>
                                <div class="container" id="allCustomerContainer">
                                <div id="CustomerCards${date}" class="profile-container" style="margin-bottom: -302px;"></div>
                                </div>
                                <br>`
                            }
                            else{
                                document.getElementById('data').innerHTML +=
                                `<div id=${date}><button style="width: 1208px; margin: 0 0 0 30px; height: 54px; font-size: 20px; color: antiquewhite; background: #006666; font-weight: 500;">${date}</button>
                                <br>
                                <br></div>
                                <div class="container" id="allCustomerContainer">
                                <div id="CustomerCards${date}" class="profile-container" style="margin-bottom: -302px;"></div>
                                </div>
                                <br>`
                            }
                            
                            cnt= 0
                            for (const customer of response[date]) {
                                cnt+=1
                                if (cnt > 3){
                                    document.getElementById('CustomerCards'+date).style = ""
                                }
                                if (cnt > 6){
                                    document.getElementById('CustomerCards'+date).style = "height: 1170px;"
                                }
                                document.getElementById('CustomerCards'+date).innerHTML += 
                                `<div onclick="detailsID(this.id)" id="${customer.user.userPhone}" class="profile-card" style="background: linear-gradient(129.96deg, #FF2F2F 10.43%, #000460 92.78%), radial-gradient(100% 246.94% at 100% 0%, #FFFFFF 0%, #020063 100%), linear-gradient(58.72deg, #2200F2 0%, #530000 100%), linear-gradient(154.03deg, #B70000 0%, #FF003D 74.04%), linear-gradient(341.1deg, #FF0000 7.52%, #0038FF 77.98%), linear-gradient(136.23deg, #00C2FF 11.12%, #FF0000 86.47%), radial-gradient(57.37% 100% at 50% 0%, #B50000 0%, #0034BB 100%);
                                background-blend-mode: overlay, color-burn, screen, overlay, difference, difference, normal;">
                                <div class="profile-name" style="margin-top:-7px; text-align: -webkit-center; width: 207px;">${customer.user.userName}
                                </div>
                                <img src=http://127.0.0.1:8000/static/fashon/img/dress.png alt="image1" class="profile-icon" />
                                <div class="profile-position" style="margin:15px 0 0 10px">Mob: ${customer.user.userPhone}</div>
                                <div class="profile-position" style="margin-bottom:-15px">Priority: ${customer.priority}</div>
                                <button class="button" onclick="orderDeliveryCreate(this.id); event.stopPropagation()" id="${customer.id}">Add to Delivery</button>
                                <button style="margin-top: 7px; background: crimson;" class="button" onclick="orderCancel(this.id); event.stopPropagation()" id="${customer.id}">Cancel</button>
                                </div>`
                            }
                        }
                    }
                    else{
                        document.getElementById('data').innerHTML = `<h1 style="margin: 270px 0 0 283px; font-style: italic; font-family: 'Alegreya Sans SC';">Sorry, Found no order for given Date.....</h1>`
                    }
                }
            });
        })
    }
}

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

function orderDeliveryCreate(id){
    $.ajax({
        type: 'POST',
        url: "/pendingDeliveryCreate/",
        data: {'id':id},
        success: function(response){
            orderCancel(id)
        }
    });
} 


window.onload = function() {
    loadData();
};


