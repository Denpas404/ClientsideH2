
const swapiApi = (async function () { // IIFE STARTLINE

const baseUrl = "https://swapi.dev/api/";
const navbar = document.getElementById("navbar");
const cardContainer = document.getElementById("cardContainer");


try {
    const response = await fetch(baseUrl);
    const menuData = await response.json();
    CreateNavMenu(menuData, navClick, navbar);
    document.querySelectorAll(".a")[0].click();
    
} 
catch (error) {
    console.log(error);
}


})() // IIFE ENDLINE
