// javascript for hide/display sidebar
function changeContent(type, element){
  // console.log(element);
  let tabs = document.querySelectorAll('.sidebar_option');
  for ( var i = 0; i < tabs.length; i++ ){
      tabs[i].style.background = '#f1f1f1';
  }
  element.style.background = '#ccc';

  switch ( type ){
      case 'homePage':
          document.querySelector('.homePage').style.display = 'block';
          document.querySelector('.infor').style.display = 'none';
          document.querySelector('.myWallet').style.display = 'none';
          document.querySelector('.buyTicket').style.display = 'none';
          document.querySelector('.myhistory').style.display = 'none';
          document.querySelector('.instruction').style.display = 'none';
          break;
      case 'infor':
          document.querySelector('.homePage').style.display = 'none';
          document.querySelector('.infor').style.display = 'block';
          document.querySelector('.myWallet').style.display = 'none';
          document.querySelector('.buyTicket').style.display = 'none';
          document.querySelector('.myhistory').style.display = 'none';
          document.querySelector('.instruction').style.display = 'none';
          break;
      case 'myWallet':
          document.querySelector('.homePage').style.display = 'none';
          document.querySelector('.infor').style.display = 'none';
          document.querySelector('.myWallet').style.display = 'block';
          document.querySelector('.buyTicket').style.display = 'none';
          document.querySelector('.myhistory').style.display = 'none';
          document.querySelector('.instruction').style.display = 'none';
          break;
      case 'buyTicket':
          document.querySelector('.homePage').style.display = 'none';
          document.querySelector('.infor').style.display = 'none';
          document.querySelector('.myWallet').style.display = 'none';
          document.querySelector('.buyTicket').style.display = 'block';
          document.querySelector('.myhistory').style.display = 'none';
          document.querySelector('.instruction').style.display = 'none';
          break;
      case 'myhistory':
          document.querySelector('.homePage').style.display = 'none';
          document.querySelector('.infor').style.display = 'none';
          document.querySelector('.myWallet').style.display = 'none';
          document.querySelector('.buyTicket').style.display = 'none';
          document.querySelector('.myhistory').style.display = 'block';
          document.querySelector('.instruction').style.display = 'none';
          break;
      case 'instruction':
          document.querySelector('.homePage').style.display = 'none';
          document.querySelector('.infor').style.display = 'none';
          document.querySelector('.myWallet').style.display = 'none';
          document.querySelector('.buyTicket').style.display = 'none';
          document.querySelector('.myhistory').style.display = 'none';
          document.querySelector('.instruction').style.display = 'block';
          break;
      
  }

}

//javascript for hide/display updateInfor
function openUpdateInfor(){
  document.querySelector('.update_infor').style.display = 'flex';
}

//close unpdateInfor
function closeUpdateInfor(){
  document.querySelector('.update_infor').style.display = 'none';
}


//javascript for hide/display buy ticker history
function openBuyTicketHistory(){
  document.querySelector('.buyTicket_history').style.display = 'flex';
}

//close buy ticker history
function closeBuyTicketHistory(){
  document.querySelector('.buyTicket_history').style.display = 'none';
}

//open/close option station 
function openOption(){
  document.querySelector('.homepage_inputEnd_option').style.display = 'block';
}

function closeOption(){
  document.querySelector('.homepage_inputEnd_option').style.display = 'none';
  direction();
}



// fetch user's information
var userAPI = 'http://localhost:3000/user';
var historyPathApi = 'http://localhost:3000/HistoryPath';
var contractApi = 'http://localhost:3000/contract';
var stationAPI  = 'http://localhost:3000/Station'

/**-----------------map-------------------- */

let infoWindow, map;
var coordinate;

function initMap() {
  var infoWindow3 = new google.maps.InfoWindow();
  //display station's position
  getApi(stationAPI)
    //get api
    .then(function (response){
      return response.json();
    })
    //get data of stations
    .then(function(stations){
      //display station 
      var listStation = stations.map(function(station){
        return `
          <li class="${station.stationID}">
            ${station.stationName} <br> Số xe:${station.avalibleBike}
          </li>
        `
      })
      document.querySelector('.homepage_inputEnd_option').innerHTML = listStation.join('');
      
      //get station position
      var stationPosition = stations.map(function (station){
        return station.stationPosition;
      })
      
      const addMarkers = stationPosition.map(function (position){
        //add markers
        new google.maps.Marker({
          position: position[0],
          map: map,
          animation: google.maps.Animation.BOUNCE,
          icon: {
            url: './assset/img/img-buyTicket.webp',
            scaledSize:{width: 30, height: 30}
          }
        })
      })
      
    })
    
    

  // The location of Uluru
  const uluru = { lat: 21.00706853613633, lng: 105.84312793670026 };
  
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: uluru,
  });
  
  
  //--------------------------display my position----------------------
  function displayMyPosition(){

    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "Vị trí của tôi";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // console.log(pos)
          
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
   });
  }
  displayMyPosition();


 /**------------------direction--------------------- */

 
 //get destination
function getdestination(){
  // google.maps.event.trigger(map, 'resize');
  return getApi(stationAPI)
    .then(function(response){
      return response.json();
    })
    .then(function(stations){
      var stationList = document.querySelector('.homepage_inputEnd_option');
      
      return new Promise(function(resolve){
        stationList.addEventListener('click', function(e){
          var stationIDGetAfterClick = Number(e.target.className);
          
            var destination = stations.find(function(station){
              return station.stationID === stationIDGetAfterClick;
            })
            var coordinate = destination.stationPosition[0];
            resolve(coordinate);
          })
      })

    })
}


//get my position
function getMyPosition(){
  return new Promise(function(resolve){
    let pos;
    navigator.geolocation.getCurrentPosition(
    (position) => {
       pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      resolve(pos);
    },
      );
    })
}

var directionDistance = new google.maps.DistanceMatrixService()

/**function direction */
function direction(){
  getMyPosition()
    .then(function (myPosition){
      getdestination()
        .then(function (destination){
          const directionsService = new google.maps.DirectionsService();
          directionsService.route(
            {
              origin: myPosition,
              destination: destination,
              travelMode: google.maps.TravelMode.DRIVING
            },
            function(DirectionsResult, DirectionsStatus){
              if(DirectionsStatus == 'OK'){
                directionsRenderer = new google.maps.DirectionsRenderer({
                  directions: DirectionsResult,
                  map: map
                })
                //calculate distance
                var m = Math.ceil((DirectionsResult.routes[0].overview_path.length)/2);
                middle = DirectionsResult.routes[0].overview_path[m];
                directionDistance.getDistanceMatrix(
                  {
                    origins:[myPosition],
                    destinations:[destination],
                    travelMode: google.maps.TravelMode.DRIVING
                  },
                  function(DirectionsResult, status){
                    if ( status === 'OK'){
                      var originList = DirectionsResult.originAddresses;
                      var destinationList = DirectionsResult.destinationAddresses;
                      for ( var i = 0; i < originList.length; i++){
                        var results = DirectionsResult.rows[i].elements;
                        for ( var j = 0; j < destinationList.length; j++){
                          var element = results[j];
                          var dt = element.distance.text;
                          var dr = element.duration.text;
                        }
                      }
                      var content =  dt + dr;
                      console.log(content);
                      infoWindow3.setContent(content);
                      infoWindow3.setPosition(middle);
                      infoWindow3.open(map);
                    }
                  }
                )

              }

            }
          )
        })
    })
    
}
//run direction function

document.querySelector('.homePage_search_btn').addEventListener('click',function() {
  // map.panBy(0, 0);

  direction();

})
 
}  


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);

    }

// logout

function logoutFunc() {
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  window.location.reload();
}


/**------------------fetch------------------------ */


//user's information and contract
var loginID = 'lahph_';




//display all about user's information
function displayUserInfo(){
fetch(userAPI)
.then(function(response) {
  return response.json(); 
})
.then(function(users) {
  return user = users.find(function(user) {
    return user.UserName == loginID;
  })
})
.then(function(user){

  //get user's information
  var displayUserName = `<p>${user.UserFullName}</p>`;
  document.querySelector('.infor_list_userName').innerHTML = displayUserName;
  document.querySelector('.sidebar_UserName').innerHTML = displayUserName;
  // document.getElementById('userInfo').innerHTML = `<p>pham Hoang lan</p>`;
  
  //get user's phone number
  var displayUserPhone = `<p>${user.UserPhone}</p>`;
  document.querySelector('.infor_list_phone').innerHTML = displayUserPhone;
  

  //get user's mail address//get user's information
  var displayUserMail = `<p>${user.UserEmail}</p>`;
  document.querySelector('.infor_list_mail').innerHTML = displayUserMail;

  //get user's mail address//get user's information
  var displayUseridentifyCard = `<p>${user.UserIdentifyCard}</p>`;
  document.querySelector('.infor_list_identify').innerHTML = displayUseridentifyCard;

  //get user's mail address//get user's information
  var displayUserAddress = `<p>${user.UserAddress}</p>`;
  document.querySelector('.infor_list_address').innerHTML = displayUserAddress;

})
}
displayUserInfo();

//display contract and history path
function displaySequential(){
getApi(userAPI)
  .then(function(response){
    return response.json();
  })
  .then(function(users){
    return user = users.find(function(user){
      return user.UserName == loginID;
    })
    
  })
  .then(function(user){
    getApi(contractApi)
      .then (function(response){
        return response.json();
      })
      .then(function(contructs){
        return userconstract = contructs.filter(function(construct){
          return construct.User_ID == user.id;
        })
      })
      .then(function(contructs){
        //display user's name
        var username = `<p>Người dùng: ${user.UserFullName}</p><b> ID:${user.id}`;
        document.querySelector('.userInfo').innerHTML = username;
        //display table's content
        var tableContract = `<tr>
                        <td>Số hợp đồng</td>
                        <td>Ngày giao dịch</td>
                        <td>VAT</td>
                        <td>Thanh toán (VND)</td>
                        <td>ID xe</td>
                        <td>Phương thức thanh toán</td>
                        
                   </tr>`;
        //get contract's data  
        var htmlConstract = contructs.map(function(contruct){
          return `<tr>
                    <td>${contruct.number}</td>
                    <td>${contruct.contractDate}</td>
                    <td>${contruct.VAT}</td>
                    <td>${contruct.money}</td>
                    <td>${contruct.Bike_ID}</td>
                    <td>${contruct.paymentMethod}</td>
                  </tr>`
        })
        //display contruct
        document.querySelector('.contract_table').innerHTML = tableContract + ' ' + htmlConstract.join('');

        getApi(historyPathApi)
          .then(function (response){
            return response.json();
          })
          .then(function (histories){
            return userHistories = histories.filter(function (history){
              return history.id == contructs[0].User_ID;
            })
            
          })
          .then(function (userHistories){
            var userName = `<p>Người dùng: ${user.UserFullName} <b> ID:${user.id}`;
            document.querySelector('.buyTicket_history_username').innerHTML = userName;
            var tableTitle = `<tr>
              <td>Ngày thuê</td>
              <td>Thời gian thuê (giờ)</td>
              <td>Quãng đường</td>
              <td>Trạm đầu</td>
              <td>Trạm cuối</td>
            </tr>`

      
          var html = ' ';
          var tableHistoryPath;
          for ( var i = 0; i < userHistories.length; i++){
            tableHistoryPath = `<tr>
              <td>${contructs[i].contractDate}</td>
              <td>${userHistories[i].time}</td>
              <td>${userHistories[i].distance}</td>
              <td>${userHistories[i].StationStart}</td>
              <td>${userHistories[i].StationEnd}</td>
            </tr>`
            html += tableHistoryPath + ' ';
          }
          //display history path's data
          document.querySelector('.historyPath_table').innerHTML = tableTitle + ' ' + html;
                
      })
    })
  })

}
displaySequential();


//use fetch vvvvvvvvvvvbv to get fake api
function getApi(api){
  return fetch(api)
}
  
  
//call api to get userID 
getApi(userAPI)
.then(function(response){
  return response.json();
})
.then(function(users){
  return user = users.find(function(user){
    return user.UserName == loginID;
  })
})
.then(function(user){
  getUpdateInfoFromInput(user)
})

//get data from input (input update)

function getUpdateInfoFromInput(user){
return new Promise(function(resolve){
  var data = {
    id: user.id,
    UserName: user.UserName,
    UserPassword: user.UserPassword,
    UserFullName: user.UserFullName,
    UserPhone:user.UserPhone,
    UserIdentifyCard:user.UserIdentifyCard,
    UserEmail:user.UserEmail,
    UserCredit:user.UserCredit,
    UserAddress:user.UserAddress
  };

  var updateInfo_cfElement = document.querySelector('.cfUpdateInfor_btn');
  updateInfo_cfElement.onclick = function(){
    data.UserFullName = document.querySelector('.updateName').value;
    data.UserPhone = document.querySelector('.updatePhone').value;
    data.UserEmail = document.querySelector('.updateEmail').value;
    data.UserAddress = document.querySelector('.updateAddress').value;

    upDateUserInfo(data, user);
  }
  
})
  
}


//update user's information
function upDateUserInfo(data, user){
//POST request with body equal on data in JSON format
fetch(userAPI + '/' + user.id, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then((response) => response.json())
//Then with the data from the response in JSON...
.then((data) => {
  // console.log('Success:', data);
  alert('Cập nhật thành công!')
  displayUserInfo();
})
//Then with the error genereted...
.catch((error) => {
  alert("Đã xảy ra lỗi, vui lòng thử lại")
});


}



