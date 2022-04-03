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
            document.querySelector('.honePage').style.display = 'block';
            document.querySelector('.infor').style.display = 'none';
            document.querySelector('.myWallet').style.display = 'none';
            document.querySelector('.buyTicket').style.display = 'none';
            document.querySelector('.myhistory').style.display = 'none';
            document.querySelector('.instruction').style.display = 'none';
            break;
        case 'infor':
            document.querySelector('.honePage').style.display = 'none';
            document.querySelector('.infor').style.display = 'block';
            document.querySelector('.myWallet').style.display = 'none';
            document.querySelector('.buyTicket').style.display = 'none';
            document.querySelector('.myhistory').style.display = 'none';
            document.querySelector('.instruction').style.display = 'none';
            break;
        case 'myWallet':
            document.querySelector('.honePage').style.display = 'none';
            document.querySelector('.infor').style.display = 'none';
            document.querySelector('.myWallet').style.display = 'block';
            document.querySelector('.buyTicket').style.display = 'none';
            document.querySelector('.myhistory').style.display = 'none';
            document.querySelector('.instruction').style.display = 'none';
            break;
        case 'buyTicket':
            document.querySelector('.honePage').style.display = 'none';
            document.querySelector('.infor').style.display = 'none';
            document.querySelector('.myWallet').style.display = 'none';
            document.querySelector('.buyTicket').style.display = 'block';
            document.querySelector('.myhistory').style.display = 'none';
            document.querySelector('.instruction').style.display = 'none';
            break;
        case 'myhistory':
            document.querySelector('.honePage').style.display = 'none';
            document.querySelector('.infor').style.display = 'none';
            document.querySelector('.myWallet').style.display = 'none';
            document.querySelector('.buyTicket').style.display = 'none';
            document.querySelector('.myhistory').style.display = 'block';
            document.querySelector('.instruction').style.display = 'none';
            break;
        case 'instruction':
            document.querySelector('.honePage').style.display = 'none';
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







//map

//let map;

let infoWindow, map;
function initMap() {
    // The location of Uluru
    const uluru = { lat: 21.00706853613633, lng: 105.84312793670026 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: uluru,
    });
    // The marker, positioned at Uluru
    const marker_hust = new google.maps.Marker({
      position: uluru,
      map: map,
      label: 'Trạm 1',
      title: 'Số lượng xe: 2'
    
    });

    
    const marker_ussh = new google.maps.Marker({
        position: {lat: 20.99510606882998, lng: 105.80775573911664},
        map: map,
        label: 'Trạm 2'
        
      });

    
    const marker_ulis = new google.maps.Marker({
        position: {lat: 21.039302467560347, lng: 105.78179263911746},
        map: map,
        label: "Trạm 3"
    });

    // marker_ulis.setIcon('./assset/img/img-buyTicket.webp')

    
    
      //display my position
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
    
              infoWindow.setPosition(pos);
              infoWindow.setContent("Location found.");
            //   infoWindow.Marker.setIcon('./assset/img/img-buyTicket.webp');
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
// logout

function logoutFunc() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    window.location.reload();
}
