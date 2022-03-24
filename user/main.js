// javascript for hide/display sidebar
function changeContent(type, element){
    // console.log(element);
    let tabs = document.querySelectorAll('.sidebar_option');
    for ( var i = 0; i < tabs.length; i++ ){
        tabs[i].style.background = '#f1f1f1';
    }
    element.style.background = '#ccc';

    switch ( type ){
        case 'honePage':
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

//hide/display sidebar 


//map

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}