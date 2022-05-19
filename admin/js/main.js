
//js for map
let map;

//display map 
function initMap() {
  //get API
  var mapApi = 'http://localhost:3000/Station';

  
  fetch(mapApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (stations){
      //get coordinate of each station
      console.log(stations);
      var stationsPosition = stations.map(function (station) {
        return station.stationPosition;
      })

      const addMarkers = stationsPosition.map(function (position){
        new google.maps.Marker({
          position: position[0],
          map: map,
          // animation: google.maps.Animation.BOUNCE,
          icon: {
            url: './assset/img/img-buyTicket.webp',
            scaledSize:{width: 30, height: 30}
          }
        })
      })
     

    })


  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 21.00706853613633, lng: 105.84312793670026 },
    zoom: 12,
  });


}

window.initMap = initMap;

/* fetch API to display informaiton for all function*/

//load api for manager station
var stationAPI = 'http://localhost:3000/Station';
function infoAllStation(){
  fetch(stationAPI)
  .then(function (response){
    return response.json();
  })
  .then(function (stations){

   
    var tableInfoStation = `<tr>
      <td>ID trạm xe</td>
      <td>Tên trạm xe</td>
      <td>Số lượng xe hiện tại</td>
      <td>Số lượng chỗ còn trống</td>
      <td>Chỉnh sửa</td>
     
    
    </tr>`;
    var stationForInfoStation = stations.map(function(station) {
      return`
        <tr class="${station.id}">
          <td>${station.id}</td>
          <td>${station.stationName}</td>
          <td>${station.avalibleBike}</td>
          <td>${station.slotQuantity}</td>
          <td onclick="deleteAStation(${station.id})" class="deleteAStation">Xóa trạm xe</td>

        </tr>
      `
    })

    document.querySelector('.stations_list_forInfo').innerHTML = tableInfoStation + ' ' + stationForInfoStation.join('')
  })

}
infoAllStation();

//get data to display all contract
var contractAPI = 'http://localhost:3000/contract';
fetch(contractAPI)
  .then(function (response) {
    return response.json();
  })
  .then(function (contructs) {
     //display table's content
        var tableContract = `<tr>
                        <td>Số hợp đồng</td>
                        <td>Ngày giao dịch</td>
                        <td>VAT</td>
                        <td>Thanh toán (VND)</td>
                        <td>ID xe</td>
                        <td>Phương thức thanh toán</td>
                        <td>ID người dùng</td>


                        
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
                    <td>${contruct.User_ID}</td>

                  </tr>`
        })
        //display contruct
        document.querySelector('.contract_table').innerHTML = tableContract + ' ' + htmlConstract.join('');

  })
  

//get data to display all bikes 
var bikeAPI = 'http://localhost:3000/Bike';
fetch(bikeAPI)
  .then(function (response){
    return response.json();
  })
  .then(function (bikes){

     var tableBikes = `
     <tr>
      <td>ID xe</td>
      <td>Năm sản xuất</td>
      <td>Trạm hiệm tại của xe</td>
      <td>Chỉnh sửa</td>
          
    </tr>`;

    var bike = bikes.map(function (bike){
      return`
        <tr">
          <td>${bike.id}</td>
          <td>${bike.ProductYear}</td>
          <td>${bike.Station_ID}</td>
          <td class="deleteBike" id="${bike.id}>Xóa xe</td>
        </tr>
      `
    })

    document.querySelector('.all_Bike_table').innerHTML = tableBikes + " " + bike.join('');
  })

//get data to display all user 
var userAPI = 'http://localhost:3000/user';
fetch(userAPI)
  .then(function (response) {
    return response.json();
  })
  .then (function (users){
    
      fetch(contractAPI)
        .then(function (response) {
          return response.json();
        })
        .then(function (contracts){
          var tableUsers = `
          <tr>
           <td>ID người dùng</td>
           <td>Tên người dùng</td>
           <td>Số điện thoại</td>
           <td>Địa chỉ</td>
           <td>Gmail</td>
           <td>Số lượt sử dụng</td>
           <td>Chỉnh sửa</td>
     
           </tr>`;

          var user = users.map(function (user){

            //đếm số lần sử dụng dịch vụ của từng khách hàng
            var contract = contracts.filter(function (contract){
              return user.id === contract.User_ID
            })

            return`
              <tr>
                <td>${user.id}</td>
                <td>${user.UserFullName}</td>
                <td>${user.UserPhone}</td>
                <td>${user.UserAddress}</td>
                <td>${user.UserEmail}</td>
                <td>${contract.length}</td>
                <td class="deleteUser" id="${user.id}">Xóa người dùng</td>
              </tr>
            `
          
          })
          document.querySelector('.all_User_table').innerHTML = tableUsers + " " + user.join('');
          
        })
})


/**fetch API to edit and delete items for all function */


// add a new station
function getApi(api){
  return fetch(api)
}
//call api to get userID 
getApi(userAPI)
.then(function(response){
  return response.json();
})
.then(function(stations){
  addStation(stations)
})

function addStation(stations){
  return new Promise(function(resolve){
    var cfAddStationElement = document.querySelector('.addStation_btn');
    cfAddStationElement.onclick = function(){
      // alert('Cập nhật thành công!')
      var station = {
        stationName: document.querySelector('.addStationName').value,
        id: stations.length + 1,
        slotQuantity: Number(document.querySelector('.maxbike').value),
        avalibleBike: 0,
        stationPosition: [{
          lat: Number(document.querySelector('.AddLatitude').value),
          lng: Number(document.querySelector('.addLongtitude').value)
        }],
        useState:1,
      } 
      console.log(station);
      postData(station);
    }
  })
}

//Add station
function postData(data,callback) {
  fetch(stationAPI,{
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),

  })
  .then(callback)
  
}

   
//delete a station
getApi(userAPI)
.then(function(response){
  return response.json();
})
.then(function(stations){
  DeleteStation(stations)
})

function deleteAStation(id) {
  fetch(stationAPI + '/' + id,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
   
  })
  .then(response => response.json())
  .then(function(){
    alert("Xóa trạm xe thành công!");
    infoAllStation();
  })
  .catch(function(err){
    alert("Có lỗi, vui lòng thử lại")
  })

}
  
//edit stations
function updateStationFromInput(){
  var stationid = document.querySelector('.idOfStation').value;
  console.log(stationid)
  var data = { 
    stationName: document.querySelector('.newStationName').value,
    position:[
      {
        lat: document.querySelector('.newlatitude').value,
        lng: document.querySelector('.newLongitude').value
      }
    ],

  }
  fetch(stationAPI + '/' + stationid,{
    method: 'PUT',
    headers: {
       'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then(function(){
    alert('Chỉnh sửa thành công!')
  })
  .catch(function(){
    alert('Có lỗi, vui lòng thử lại!')
  })
}
updateStationFromInput();













//function for hide/display element
function closeAddStation(){
  document.querySelector('.addStation').style.display = 'none';
}
function openAddStation(){
  document.querySelector('.addStation').style.display = 'flex';
}

function closeEditStation(){
  document.querySelector('.EditStation').style.display = 'none'
}

function openEditStation(){
  document.querySelector('.EditStation').style.display = 'flex';
}
function closeDeleteStation(){
  document.querySelector('.DeleteStation').style.display = 'none';
}
function openDeleteStation(){
  document.querySelector('.DeleteStation').style.display = 'flex'
}

function closeInfoStation(){
  document.querySelector('.InfoStation').style.display = 'none';
}

function openInfoStation(){
  document.querySelector('.InfoStation').style.display = 'flex'
}