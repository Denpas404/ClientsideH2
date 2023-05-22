const btnOn = document.getElementById('btnOn');
const btnOff = document.getElementById('btnOff');
const imgBulb = document.getElementById('imgBulb');

btnOn.addEventListener('click', function(e){
    // let kontakt = confirm('Are you sure you want to turn on the light?');
    // if(!kontakt){
    //     return;
    // }
    imgBulb.src = '../img/pic_bulbon.gif';
    imgBulb.className = 'tiltDown';
})

btnOff.addEventListener('click', function(e){
    imgBulb.src = '../img/pic_bulboff.gif';
    imgBulb.className = 'tiltUp';

    // confirm('Are you sure you want to turn off the light?');


})