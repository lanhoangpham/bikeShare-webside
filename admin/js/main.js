
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
var contractAPI = 'http://localhost:3000/contract';
var bikeAPI = 'http://localhost:3000/Bike';
// var bikeAPI = 'http://192.168.0.175:8080/api/stations/27/bikes';
var userAPI = 'http://localhost:3000/user';

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
        <tr>
          <td>${bike.id}</td>
          <td>${bike.ProductYear}</td>
          <td>${bike.Station_ID}</td>
          <td class="deleteBike" onclick="deleteBike(${bike.id})">Xóa xe</td>

        </tr>
      `
    })

    document.querySelector('.all_Bike_table').innerHTML = tableBikes + " " + bike.join('');
  })
//add bike
function putDataOfAddBike(){
  
  var data  = {
    Station_ID: document.querySelector('.stationCurrent').value,
    ProductYear: document.querySelector('.addBikeProductYear').value
  };
  postBike(data);
}


function postBike(data,callback) {
  fetch(bikeAPI,{
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJPYW5oIiwiaWF0IjoxNjU2NDk1Njg2LCJleHAiOjE2NTY0OTkyODZ9.DYoLdb9anMigOuy2guVOvbUlXI23zzTJmLNwnIyTL_SZVctEzv7yboSaM50Y5RDiLs0rIxndKxJl5GnumVdMVA'
    },
    body: JSON.stringify(data),

  })
  .then(callback)
  .then(function (){
    alert("Thêm thành công!");
    location.reload();
  })
  .catch(function (err) {
    alert("Có lỗi! Hãy thử lại!")
  })
  
}

//get data to display all user 

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
                <td class="deleteUser" onclick="deleteUser(${user.id})">Xóa người dùng</td>
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
getApi(stationAPI)
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
  .then(function (){
    alert("Thêm thành công!");
    location.reload();
  })
  .catch(function (err) {
    alert("Có lỗi! Hãy thử lại!")
  })
  
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
    location.reload();
  })
  .catch(function(err){
    alert("Có lỗi, vui lòng thử lại")
  })

}
  



// hiển thị thông tin các trạm xe hiện tại cho phần edit staiton
fetch(stationAPI)
  .then(function (response){
    return response.json();
  })
  .then(function(station){
    var divElementForEditStation = station.map(function(station){
      return `
      <div class="li">
        
        
          <button class="edit_stationList" onclick="openInforStation(${station.id})" >${station.stationName}</button>
        
      </div> 
      `
    })
//  </a>
    document.querySelector('.EditStation-body').innerHTML = divElementForEditStation.join('');

  })



//hiển thị mục editEachStation khi click vào trạm cần chỉnh sửa
function openInforStation(type){
  //đóng thẻ editstation
  document.querySelector('.EditStation').style.display = 'none';
  //mở thẻ editEachStation
  document.querySelector('.EditEachStation').style.display = 'flex';

  //lấy dữ liệu trạm từ api
  fetch(stationAPI)
    .then(function(response){
      return response.json();
    })
    .then(function(stations){

      //lấy thông tin của trạm xe mà admin lựa chọn
      var stationsNeedEdit = stations.find(function(staion){
        return staion.id == type;
      })
      //hiển thị header cho mục (hiển thị tên trạm đang chỉnh sửa)
      var headerForEditEachStation = `Chỉnh sửa ${stationsNeedEdit.stationName}`
      document.querySelector('.stationNameEdit').innerHTML = headerForEditEachStation;

      //hiển thị tên hiện tại của trạm xe
      var stationName = `Tên trạm: ${stationsNeedEdit.stationName}`
      document.querySelector('.editEachStation_stationName').innerHTML = stationName;

      //hiển thị số chỗ để xa khả dụng
      var slotQuantity = `Số lượng chỗ giữ xe khả dụng: ${stationsNeedEdit.slotQuantity}`
      document.querySelector('.editEachStation_slotQuantity').innerHTML = slotQuantity;

      //hiển thị số lượng xe hiện thoại
      var avalibleBike = `Số lượng xe hiện tại ở trạm: ${stationsNeedEdit.avalibleBike}`
      document.querySelector('.editEachStation_avalibleBike').innerHTML = avalibleBike;

      //hiển thị kinh độ hiện tại
      var currentLat = `Kinh độ hiện tại của trạm xe: ${stationsNeedEdit.stationPosition[0].lat}`
      document.querySelector('.editEachStation_lat').innerHTML = currentLat;

      //hiện thị vĩ độ hiện tại của trạm xe 
      var currentLng = `Vĩ độ hiện tại của trạm xe: ${stationsNeedEdit.stationPosition[0].lng}`;
      document.querySelector('.editEachStation_lng') .innerHTML = currentLng;
      
      return  stationsNeedEdit;
    })
    .then(function (station) {
      getDataFromEditEachStation(station)
        .then(function (data){

          var editEachStationCfBTN = document.querySelector('.EditEachStation_cfBtn');  
          editEachStationCfBTN.onclick = function(){
            //đọc và xử lý dữ liệu từ input
            if(document.querySelector('.newStationName').value != '') 
              {
                data.stationName = document.querySelector('.newStationName').value;
              }
            
            if(document.querySelector('.newSlotQuantity').value != '') 
              {
                data.slotQuantity = document.querySelector('.newSlotQuantity').value;
              }
            if(document.querySelector('.newAvalibleBike').value != '') 
              {
                data.avalibleBike = document.querySelector('.newAvalibleBike').value;
              }
            if(document.querySelector('.newPositionLat').value != '') 
              {
                data.stationPosition[0].lat = document.querySelector('.newPositionLat').value;
              }
            if(document.querySelector('.newPositionLng').value != '') 
              {
                data.stationPosition[0].lng = document.querySelector('.newPositionLng').value;
              }
              pushDataToEditStation(data, station.id);
          }
    
        })

      
    })


  
}

//tạo data từ input nhập từ editEachStaion
function getDataFromEditEachStation(station){
  return new Promise(function(resolve){
    var data ={
      stationName: station.stationName,
      slotQuantity: station.slotQuantity,
      avalibleBike: station.avalibleBike,
      stationPosition:[
        {
          lat: station.stationPosition[0].lat,
          lng: station.stationPosition[0].lng
        }
      ]
    }
    resolve(data);
  })
}

//gửi dữ liệu cần chỉnh sửa
function pushDataToEditStation(data, stationID){
  fetch(stationAPI + '/' + stationID, {
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
    location.reload();
  })
  //Then with the error genereted...
  .catch((error) => {
    alert("Đã xảy ra lỗi, vui lòng thử lại")
  });
}


//tìm kiếm hợp đồng bằng id - tab managerTicket
function searchContract(){
  var contractID = document.querySelector('.searchContractInput').value;
  document.querySelector('.all_history_buyTicket').style.display = 'none';
  document.querySelector('.contractSearch').style.display = 'flex';
  fetch(contractAPI)
    .then(function (response){
      return response.json();
    })
    .then(function (contracts){
      var contract = contracts.find(function (contract){
        return contract.id == Number(contractID);
      })
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
        var htmlConstract = 
           `<tr>
                    <td>${contract.id}</td>
                    <td>${contract.contractDate}</td>
                    <td>${contract.VAT}</td>
                    <td>${contract.money}</td>
                    <td>${contract.Bike_ID}</td>
                    <td>${contract.paymentMethod}</td>
                    <td>${contract.User_ID}</td>

                  </tr>`
       
        //display contruct
        document.querySelector('.displayContract').innerHTML = tableContract + ' ' + htmlConstract;

      
    })
   
}

//tìm kiếm xe thông qua id - tab manageBike
function searchBike(){
  var bikeId = document.querySelector('.searchBikeInput').value;
  document.querySelector('.all_Bike').style.display = 'none';
  document.querySelector('.searchBikeByID').style.display = 'flex';
  
  fetch(bikeAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (bikes) {
      var bike = bikes.find(function (bike){
        return bike.id == Number(bikeId);
      })
      console.log(bike);
      var tableBike = ` <tr>
          <td>ID xe</td>
          <td>Năm sản xuất</td>
          <td>Trạm hiệm tại của xe</td>
          <td>Chỉnh sửa</td>
           
        </tr>`;
 
     var bikeHtml = `
         <tr>
           <td>${bike.id}</td>
           <td>${bike.ProductYear}</td>
           <td>${bike.Station_ID}</td>
           <td class="deleteBike" onclick="deleteBike(${bike.id})">Xóa xe</td>
 
         </tr>
       `
     
 
    document.querySelector('.searchBikeByIDTable').innerHTML = tableBike + " " + bikeHtml;

    })

}
//xóa xe
function deleteBike(bikeid){
  deleteBikeFromListenOnclick(bikeid);
}
function deleteBikeFromListenOnclick(bikeid) {
  fetch(bikeAPI + '/' + bikeid,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
   
  })
  .then(response => response.json())
  .then(function(){
    alert("Xóa xe thành công!");
    location.reload();
    
  })
  .catch(function(err){
    alert("Có lỗi, vui lòng thử lại")
  })

}

//tìm kiếm người dùng
function searchUser() {
  var userId = document.querySelector('.searchUserInput').value;
  document.querySelector('.all_Users').style.display = 'none';
  document.querySelector('.searchUserById').style.display = 'flex';

  fetch(userAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (users) {
      var user = users.find(function (user){
        return user.id == Number(userId);
      })
      fetch(contractAPI)
        .then(function (response) {
          return response.json();
        })
        .then(function (contracts){
          console.log(contracts);
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

          

            //đếm số lần sử dụng dịch vụ của từng khách hàng
            var contract = contracts.filter(function (contract){
              return user.id === contract.User_ID
            })

            var userhtml = `
              <tr>
                <td>${user.id}</td>
                <td>${user.UserFullName}</td>
                <td>${user.UserPhone}</td>
                <td>${user.UserAddress}</td>
                <td>${user.UserEmail}</td>
                <td>${contract.length}</td>
                <td class="deleteUser" onclick="deleteUser(${user.id})">Xóa người dùng</td>
              </tr>
            `
          
          
          document.querySelector('.searchUserByIdTable').innerHTML = tableUsers + " " + userhtml;
        })
      
  
    })
}



//delete user
function deleteUser(userId){
  deleteUserFromListenOnclick(userId)
}
function deleteUserFromListenOnclick(userId){
  fetch(userAPI + '/' + userId,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
   
  })
  .then(response => response.json())
  .then(function(){
    alert("Xóa người dùng thành công!");
    location.reload();
    
  })
  .catch(function(err){
    alert("Có lỗi, vui lòng thử lại")
  })
}














































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
function closeEditEachStation(){
  document.querySelector('.EditEachStation').style.display ='none';
}