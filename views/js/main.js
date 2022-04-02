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



//javascript for hide/display buyticket_option1

function openOption1(){
    document.querySelector('.buyTicket_option1').style.display = 'flex';
}
function closeBuyticket1(){
    document.querySelector('.buyTicket_option1').style.display = 'none';
}
//javascript for hide/display buyticket_option2

function openOption2(){
    document.querySelector('.buyTicket_option2').style.display = 'flex';
}
function closeBuyticket2(){
    document.querySelector('.buyTicket_option2').style.display = 'none';
}

//javascript for hide/display buyticket_option1

function openOption3(){
    document.querySelector('.buyTicket_option3').style.display = 'flex';
}
function closeBuyticket3(){
    document.querySelector('.buyTicket_option3').style.display = 'none';
}







//map

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

// logout

function logoutFunc() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.reload();
}
