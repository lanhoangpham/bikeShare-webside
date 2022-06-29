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




// fetch user's information
var userAPI = 'http://localhost:3000/user';
var userAPI = 'http://192.168.0.175:8080/api/auth/signin';
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
          <li id="${station.id}">
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

  //function to display my position
  function displayMyPosition(){
    infoWindow = new google.maps.InfoWindow();

    //creat button
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
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);

  }
  //run function
  displayMyPosition();


 /**------------------direction--------------------- */

 
  //get destination
  function getdestination(){
    //return promise
    return getApi(stationAPI)
      //get data from API
      .then(function(response){
        return response.json();
      })

      .then(function(stations){
        var stationList = document.querySelector('.homepage_inputEnd_option');
        
        return new Promise(function(resolve){
            //click on the station list
            stationList.addEventListener('click', function(e){
              //get Id of this station on click
              var stationIDGetAfterClick = Number(e.target.id);
              
              //find the station that onclick
              var destination = stations.find(function(station){
                return station.id === stationIDGetAfterClick;
              })

              //display station in input box
              var stationName = destination.stationName;
              
              //display station name in input box
              document.querySelector('.homepage_inputEnd').value = stationName;

              //get coordinates of this station
              var coordinate = destination.stationPosition[0];
              
              //resolve coordinates
              resolve(coordinate);
              
            })
        })

      })
  }


  //get my position
  function getMyPosition(){
    document.querySelector('.homepage_inputBegin').addEventListener('click', function(){
    
    })

    //position begin is current position
    if (document.querySelector('.homepage_inputBegin').value  == ''){
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
    //my choice
    
  }
  getMyPosition();


  /**function direction */
  function direction(){

    getMyPosition()
      .then(function (myPosition){
      
          getdestination()
          .then(function (destination){
            return destination;
          })
          .then(function (destination){
            
            var searchElement = document.querySelector('.homePage_search_btn');
            //click on the searchbtn
            searchElement.addEventListener('click', function(){
              
            const directionsService = new google.maps.DirectionsService();
            
            document.querySelector('.homepage_inputEnd_option').style.display = 'none';
                      
              directionsService.route(
              {
                origin: myPosition,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
              },
              function(DirectionsResult, DirectionsStatus){
                if(DirectionsStatus == 'OK'){
                  new google.maps.DirectionsRenderer({
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
                        var content =  dt + ' ' + dr;

                        console.log(dt);

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
        
        
      })
      
  }
  //run direction function
  direction()
  
  /**-----------------------distance----------------------- */
  var directionDistance = new google.maps.DistanceMatrixService()
  // function getDistance between two points
  function distance(){
    getMyPosition()
      .then(function(origin){
        getApi(stationAPI)
          .then(function(response){
            return response.json();
          })
          .then(function(stations){
            var coordinates = stations.forEach(function(station){

              const directionsService = new google.maps.DirectionsService();

              directionsService.route(
                {
                  origin: origin,
                  destination: station.stationPosition[0],
                  travelMode: google.maps.TravelMode.DRIVING
                },
                function(DirectionsResult, DirectionsStatus){
                  if(DirectionsStatus == 'OK'){
                    var m = Math.ceil((DirectionsResult.routes[0].overview_path.length)/2);
                    middle = DirectionsResult.routes[0].overview_path[m];
                    directionDistance.getDistanceMatrix(
                      {
                        origins:[origin],
                        destinations:[station.stationPosition[0]],
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
                          var content =  dt + ' ' + dr;
                          
                          var displayDistanceInStationOption = `Khoảng cách: ${dt}`;
                          const node = document.createElement("p");
                          const textnode = document.createTextNode(`${displayDistanceInStationOption}`);
                          node.appendChild(textnode);
                          document.getElementById(`${station.id}`).appendChild(node);
                          
                        }
                      }
                    )
                  }
                }
              )
            })
            
          })
      })
  }
  //run function
  distance();
}  

// login
function login(){
  var UserName = document.querySelector('.login_userName').value;
  var password = document.querySelector('.login_password').value;
  console.log(UserName);
  displayUserInfo(UserName,password);
  displaySequential(UserName,password);
  indetifyUser(UserName,password)
}

// logout


/**------------------fetch------------------------ */


//user's information and contract
// var loginID = 'tuanvd';




//display all about user's information
function displayUserInfo(UserName,password){
  console.log(UserName)
fetch(userAPI)
.then(function(response) {
  return response.json(); 
})
.then(function(users) {
  return user = users.find(function(user) {
    return (user.UserName == UserName && user.UserPassword == password);
  })
})
.then(function(user){
  console.log(user );
  if(user == undefined){
    alert('sai, đăng nhập lại')
  }
  else{
    document.querySelector('.main').style.display = 'block';
    // document.querySelector('.footer').style.display = 'block';
    document.querySelector('.logIn').style.display = 'none';

  }
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
// displayUserInfo();

//display contract and history path
function displaySequential(UserName,password){
getApi(userAPI)
  .then(function(response){
    return response.json();
  })
  .then(function(users){
    return user = users.find(function(user){
      return (user.UserName == UserName && user.UserPassword == password);
    })
    
  })
  .then(function(user){
    console.log(user );
    getApi(contractApi)
      .then (function(response){
        return response.json();
      })
      .then(function(contracts){
        return usercontract = contracts.filter(function(contract){
          return contract.User_ID == user.id;
        })
      })
      .then(function(contructs){
        console.log(contructs );
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
                    <td>${contruct.id}</td>
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
            // var i = 0;
            // var userHistories = histories.filter(function (history){
                
            //   if ( i <= contructs.length) i ++;
            //   else i = 0;
            //   return history.contractNumber == contructs[i].id;
                
            //   })
            var userHistories = [];
            var value;
            for ( var i = 0; i < contructs.length; i++){
              value = histories.filter(function (history){
                
                
                return history.contractNumber == contructs[i].id;
              })
              userHistories[i] = ( value);
            }
           
           
            console.log(userHistories)
            return userHistories;
          })
          .then(function (userHistories){
            console.log(userHistories[1][0].time)
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
              <td>${userHistories[i][0].time}</td>
              <td>${userHistories[i][0].distance}</td>
              <td>${userHistories[i][0].StationStart}</td>
              <td>${userHistories[i][0].StationEnd}</td>
            </tr>`
            html += tableHistoryPath + ' ';
          }
          //display history path's data
          document.querySelector('.historyPath_table').innerHTML = tableTitle + ' ' + html;
                
      })
    })
  })

}


function findContract(contracts, i) {
  
  return contracts[i];
}
//use fetch to get fake api
function getApi(api){
  return fetch(api)
}
  
  


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
    data.UserIdentifyCard = document.querySelector('.updateIdentyfy').value;
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


//register
function onclickRegister(){
  document.querySelector('.logIn').style.display = 'none';
  document.querySelector('.register').style.display = 'flex';
}
function register() {
  var userName = document.querySelector('.username').value;
  var name = document.querySelector('.name').value;
  var gmail = document.querySelector('.userGmail').value;
  var password = document.querySelector('.password').value;
  console.log(data)
  var data = {
      UserName: userName,
      UserPassword: password,
      UserFullName: name,
      UserPhone: "",
      UserIdentifyCar: "",
      UserEmail: gmail,
      UserCredit: "",
      UserAddress: ""
  }
  registerUser(userAPI, data);
  
}

function registerUser(userAPI, data) {
  //POST request with body equal on data in JSON format
fetch(userAPI, {
  method: 'POST',
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
    document.querySelector('.register').style.display = 'none';
    document.querySelector('.logIn').style.display = 'block';
  })
  //Then with the error genereted...
  .catch((error) => {
    alert("Đã xảy ra lỗi, vui lòng thử lại")
  });

}