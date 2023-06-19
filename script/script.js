//##################################*********************User Login system**************************************8#################################
//######################################################################################################################################################

let arrayDataApi = [];
let statusUser = null;
let userUsername = null;
document.getElementById("btnlogout").style.display = "none";
const timeSlot = [{ nineam: "9:00 am", eleam: "11:00 am", onepm: "01:00 pm", threepm: "3:00 pm", fivepm: "5:00 pm", sevpm: "7:00 pm", ninepm: "9:00pm" }];

//**************************************************************Check is there any user already login or not*************************************************************

window.onload = () => {

    getData()
    // showTickets()
    const userArrayData = JSON.parse(localStorage.getItem('userData'));
    const userNameCheck = localStorage.getItem('myIndex');
    if (userArrayData != null) {
        for (let m = 0; m < userArrayData.length; m++) {
            statusUser = userArrayData[m].status;
            if (statusUser == "active") {
                if (m == userNameCheck) {
                    // document.getElementById('nameData').innerHTML = "Welcome Back "+ userArrayData[userNameCheck].name;
                    document.getElementById("btnlogout").innerHTML = `<button type="button" class="btn btn-danger btn-rounded" onclick="logout('${userArrayData[userNameCheck].username}')">
                                    log out 
                                </button>`;
                    document.getElementById("signup_Link").style.display = "none";
                    document.getElementById("btnlogout").style.display = "block";
                }
            }
        }
    }
}
//**************************************************************user Data validations************************************************************************* */
function userValidData() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (localStorage.getItem('userData') == null) {
        localStorage.setItem('userData', '[]');
    }
    const userArrayData = JSON.parse(localStorage.getItem('userData'));

    // ********************************************************email and username array creation******************************************************** 
    let usernameArray = userArrayData.map((value, index) => {
        return value.username
    })
    let emailArray = userArrayData.map((value, index) => {
        return value.email
    })
    console.log(emailArray);

    // ********************************************************email and username already exist or not***************************************

    if (name == "" || username == "" || password == "" || email == "") {
        alert("enter full details")
    }
    else {
        if (!usernameArray.includes(username)) {
            if (emailArray.includes(email)) {
                alert("email already exist.....");
            }
            else {
                accountCreation(name, email, username, password)
            }
        }
        else {
            alert("username already exist.....");
        }
    }
}
//**************************************************************Account Creation function*************************************************************************

function accountCreation(name, email, username, password) {
    document.getElementById("signup_Link").style.display = "none";
    let value = { name: name, email: email, username: username, password: password, status: "active", ticket: [] };
    let localUserData = JSON.parse(localStorage.getItem('userData'));
    localUserData.push(value);
    localStorage.setItem('userData', JSON.stringify(localUserData));


    //*************************************************************adding index number in localstorage for check the data************************************************************************ 
    let forIndexData = JSON.parse(localStorage.getItem('userData'));
    for (let d = 0; d < forIndexData.length; d++) {
        if (forIndexData[d].name == name && forIndexData[d].username == username && forIndexData[d].password && forIndexData[d].password && forIndexData[d].status)
            localStorage.setItem("myIndex", d);
    }
    location.reload(true);
}

//**************************************************************log out function*************************************************************************

function logout(m) {
    console.log(m);
    const userArrayData = JSON.parse(localStorage.getItem('userData'));
    for (let i = 0; i < userArrayData.length; i++) {
        if (userArrayData[i].username == m) {
            userArrayData[i].status = "Disconnect";
            console.log(userArrayData[i].status);
            localStorage.setItem('userData', JSON.stringify(userArrayData));
        }

    }
    location.reload(true);
}

//##################################*********************Ticket Booking system**************************************8#################################
//######################################################################################################################################################

const api = "https://www.omdbapi.com/?i=tt3896198&apikey=68ae6362&s=%22avengers%22";
const api2 = "https://www.omdbapi.com/?i=tt3896198&apikey=68ae6362&s=%22harry%22";


//###########################*********************Api Data Push to localstorage**************************************8#################################
async function getData() {
    let resData2 = await fetch(api2);
    let data2 = await resData2.text();
    let k2 = JSON.parse(data2).Search;
    console.log(k2);
    for (let i = 0; i < k2.length; i++) {
        arrayDataApi.push({ poster: k2[i].Poster, title: k2[i].Title, year: k2[i].Year, type: k2[i].Type })
    }

    let resData = await fetch(api);
    let data = await resData.text();
    let k = JSON.parse(data).Search;
    const apiData = k;
    for (let i = 0; i < apiData.length; i++) {
        arrayDataApi.push({ poster: apiData[i].Poster, title: apiData[i].Title, year: apiData[i].Year, type: apiData[i].Type })
    }
    for (let dd = 0; dd < arrayDataApi.length; dd++) {
        document.getElementById('movie_show').innerHTML += `
        <div class="col-lg-3 col-md-4 col-sm-6">
        <div class=" mt-2 mx-0 women" style="width: 15rem; height:550px; display:inline-block">
            <img src="${arrayDataApi[dd].poster}" class="card-img-top mt-2 p-2 shadow-sm bg-#353839 rounded" alt="img">
            <div class="card-body">
              <h5 class="card-title">${arrayDataApi[dd].title}</h5>
              <h6 class="card-text">Year: ${arrayDataApi[dd].year}<h6>
              <div class="d-grid gap-2 col-12 mx-auto">
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalSecond" onclick="bookTicket('${dd}')">Book Show </button>
                         </div>
          </div>
          </div>
          </div>`;
    }

    //##################*********************Ticket Creation**************************###########################################################

    if (localStorage.getItem('arrayTicketIndex') == null) {
        localStorage.setItem('arrayTicketIndex', '[]');
        let tickets = JSON.parse(localStorage.getItem('arrayTicketIndex'));
        let totalLength = apiData.length + k2.length;
        if (tickets.length != totalLength) {
            for (let n = 0; n < k2.length; n++) {
                let tick = k2[n].Title
                tickets.push({ name: tick, nineam: "10", eleam: "10", onepm: "10", threepm: "10", fivepm: "10", sevpm: "10", ninepm: "10" });
            }
            for (let m = 0; m < apiData.length; m++) {
                let tick = apiData[m].Title
                tickets.push({ name: tick, nineam: 10, eleam: 10, onepm: 10, threepm: 10, fivepm: 10, sevpm: 10, ninepm: 10 });
            }
            console.log(tickets);
            localStorage.setItem('arrayTicketIndex', JSON.stringify(tickets));
        }
    }
}
//###########################*********************Book Tickets Here*************************************8############################################################################3
function bookTicket(m) {
    const userArrayData = JSON.parse(localStorage.getItem('userData'));
    const userNameCheck = localStorage.getItem('myIndex');
    // console.log(m);
    statusUser = userArrayData[userNameCheck].status;
    if (statusUser == "active") {
        document.getElementById('detailType').innerHTML = `
                <div class="modal-header">
                <h1 class="modal-title">${arrayDataApi[m].title}</h1>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            <div class="row" style="overflow-y: scroll;">
                <div class="col-md-4 m-4 p-5" ><img src="${arrayDataApi[m].poster}" class="card-img-top mt-2 shadow-lg p-3 mb-5 bg-body rounded" alt="immg" width:30% height:500px;></div>
                <div class="col-md-6 m-4 p-5">
                <h3>${arrayDataApi[m].title}</h3>
                <hr>
                <h5 class="mt-2">Information :</h5>
                <table class="table align-middle mb-2 bg-dark">
            <tbody>
                <tr>
                <td>
                        <p style="color:white">Name </p>
                        <p style="color:white">Year of Realise </p>
                        <p style="color:white">Type </p>
                        <p style="color:white">Price</p>
                </td>
                <td>
                <p style="color:white">${arrayDataApi[m].title}</p>
                <p style="color:white">${arrayDataApi[m].year}</p>
                <p style="color:white">${arrayDataApi[m].type}</p>
                <p style="color:white">$5</p>
                </td>
                </tr>
            </tbody>
            </table>
            <div>
                <h5>Buy Tickets</h5>
                <h6 style="color:red">Select Time</h6>
                <h5 id="notification" style="color:red"></h5>
                <select class="form-select mt-1 col-6" onclick="ticketShowAvail('${m}')" id="showTime" aria-label="Default select example">
                    <option Selected>Select Time</option>
                    <option value="nineam">9:00am</option>
                    <option value="eleam">11:00am</option>
                    <option value="onepm">1:00pm</option>
                    <option value="threepm">3:00pm</option>
                    <option value="fivepm">5:00 pm</option>
                    <option value="sevpm">7:00 pm</option>
                    <option value="ninepm">9:00 pm</option>
                </select>
                <hr>
                
                <div id="ticketsAvailable">
                
                </div>
                
                <div id="billRecipt"></div>
            </div>
            <div class="d-grid gap-2 col-12 mt-3 mx-auto">
                    <button class="btn btn-primary" id="bookNowButton" type="button" onclick="ticketBooking('${m}')">Book Now</button></div>
                </div>
                
            </div>
            `;
    }
    else {
        document.getElementById('detailType').innerHTML = `
        <div class="modal-header">
        <h1 class="modal-title">${arrayDataApi[m].title}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="row" >
        <div class="col-md-4 m-4 p-5" ><img src="${arrayDataApi[m].poster}" class="card-img-top mt-2 shadow-lg p-3 mb-5 bg-body rounded" alt="immg" width:30% height:500px;></div>
        <div class="col-md-6 p-5">
        <h3>${arrayDataApi[m].title}</h3>
        <hr>
        <h4 class="mt-5">Information :</h3>
        <table class="table align-middle mb-4 bg-dark">
    <tbody>
        <tr>
        <td>
            <div class="ms-3">
                <p class="fw-bold" style="color:white">Name </p>
                <p class="fw-bold" style="color:white">Year of Realise </p>
                <p class="fw-bold" style="color:white">Type </p>
                <p class="fw-bold" style="color:white">Price</p>
            </div>
        </td>
        <td>
        <p class="fw-bold" style="color:white">${arrayDataApi[m].title}</p>
        <p class="fw-bold" style="color:white">${arrayDataApi[m].year}</p>
        <p class="fw-bold" style="color:white">${arrayDataApi[m].type}</p>
        <p class="fw-bold" style="color:white">$5</p>
        </td>
        </tr>
    </tbody>
    </table>
            <div>
                <h3 style="color:red">You need to Sign up before creating Buying Ticket !!</h3>
            </div>
                </div>
                
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            `;
    }

}

//###########################*********************Ticket Book Here*************************************8####################################

function ticketBooking(kk) {
    let m = document.getElementById("tickets").value;
    const time = document.getElementById("showTime").value;
    let tickets = JSON.parse(localStorage.getItem('arrayTicketIndex'));
    let userDataArray = JSON.parse(localStorage.getItem('userData'));
    let myIndexValue = localStorage.getItem('myIndex');
    // console.log(time);
    console.log(userDataArray[myIndexValue].ticket);
    let x = Math.random() * 1000000;
    let uniqueTicket = Math.floor(x)
    userDataArray[myIndexValue].ticket.push({ name: arrayDataApi[kk].title, poster: arrayDataApi[kk].poster, numberTicket: m, time: time, ticketId: uniqueTicket });

    localStorage.setItem('userData', JSON.stringify(userDataArray));
    for (let i = 0; i < tickets.length; i++) {
        if (arrayDataApi[kk].title == tickets[i].name) {
            let der = tickets[i][time];
            tickets[i][time] = tickets[i][time] - m
            localStorage.setItem('arrayTicketIndex', JSON.stringify(tickets))
        }
    }
    alert("You have successfully buy tickets");
    location.reload(true);
}

//###########################*********************Here you see the tickets*************************************8####################################
function showTickets() {
    let getTicketBooking = JSON.parse(localStorage.getItem('userData'));
    let myIndexTicket = JSON.parse(localStorage.getItem('myIndex'));
    let ticketsHere = getTicketBooking[myIndexTicket].ticket;
    if (getTicketBooking[myIndexTicket].status == "active") {
        if (ticketsHere.length == 0) {
            document.getElementById('myBookingData').innerHTML = `
            <h3 style="color:red; text-align:center; margin-bottom:40%;">Nothing Here </h3>
        `;
        }
        else {
            for (let i = 0; i < ticketsHere.length; i++) {
                // console.log(timeSlot);
                let timekey = ticketsHere[i].time;

                document.getElementById('myBookingData').innerHTML += `
        <div class="col-md-4 m-4 p-5"><img src="${ticketsHere[i].poster}" class="card-img-top mt-2"
                            alt="immg" width:30% height:500px;></div>
                    <div class="col-md-6 m-4 p-5">
                        <h3>Time : ${timeSlot[0][timekey]}</h3>
                        <hr>
                        <h3>id :${ticketsHere[i].ticketId}</h3>
                        <hr>
                        <h4 class="mt-5">
                            </h3>
                            <table class="table align-middle mb-4 bg-dark mt-3">
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="ms-3">
                                            <h5 class="fw-bold mb-4" style="color:white">Id </h5>
                                                <h5 class="fw-bold mb-4" style="color:white">Name </h5>
                                                <h5 class="fw-bold mb-4" style="color:white">Total Number of Tickets </h5>
                                                <h5 class="fw-bold mb-4" style="color:white">Titme </h5>
                                                <h5 class="fw-bold mb-4" style="color:white">Price</h5>
                                            </div>
                                        </td>
                                        <td>
                                            <h5 class="fw-bold mb-4" style="color:white">${ticketsHere[i].ticketId}</h5>
                                            <h5 class="fw-bold mb-4" style="color:white">${ticketsHere[i].name}</h5>
                                            <h5 class="fw-bold mb-4" style="color:white">${ticketsHere[i].numberTicket}</h5>
                                            <h5 class="fw-bold mb-4" style="color:white">${ticketsHere[i].time}</h5>
                                            <h5 class="fw-bold mb-4" style="color:white">$${5 * ticketsHere[i].numberTicket}</h5>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                    </div>
        `;
            }
        }
    }
    else {
        alert("You need to Signup First");
        document.getElementById("modalThird").style.display = "none";
        location.reload(true);
    }
}

function ticketShowAvail(name) {

    let ticketData = JSON.parse(localStorage.getItem('arrayTicketIndex'));
    // let userArray = JSON.parse(localStorage.getItem(''));
    let time = document.getElementById('showTime').value;
    let ticketPending = ticketData[name][time]


    document.getElementById('ticketsAvailable').innerHTML = `
    
    <h6 class="mt-3">Select Number of Tickets:</h6>
    <select class="form-select  col-6" onclick="billShow()" id="tickets" aria-label="Default select example">
    <option>Select Tickets</option>
                </select><hr>`
    if (ticketPending > 0) {
        document.getElementById('notification').innerHTML = "Hurry up only " + ticketPending + " Seats left";
        for (let i = 1; i <= ticketPending; i++) {
            document.getElementById('tickets').innerHTML += `
                    <option value="${i}">${i}</option>
                    `
        }

        document.getElementById('bookNowButton').style.display = 'block';

    }
    else {
        document.getElementById('notification').innerHTML = "All seats are reserved Please choose an another time slote !";
        document.getElementById('tickets').innerHTML = "<option selected>Nothing Here my friend</option>";
        document.getElementById('bookNowButton').style.display = 'none';
    }
}

function billShow() {
    let ticketsNumber = document.getElementById('tickets').value;
    document.getElementById('billRecipt').innerHTML = `<h6 color="red">Your bill is : $${ticketsNumber * 5}</h6>`;
}

function modalClose() {
    location.reload(true);
}



//owl carousel
$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 1500,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        1000: {
            items: 5
        }
    }
})


