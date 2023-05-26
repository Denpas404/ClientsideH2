import { ignor } from "./modules/filter.js";

const swapiApi = (async function () {
  // IIFE STARTLINE

  const baseUrl = "https://swapi.dev/api/";
  const navbar = document.getElementById("navbar");
  const cardContainer = document.getElementById("cardContainer");

  try {
    const data = await fetch(baseUrl);
    const menuData = await data.json();
    CreateNavMenu(menuData, navClick, navbar);
    document.querySelectorAll(".a")[0].click();
  } 
  catch (error) {
    console.log(error);
  }

  function CreateNavMenu(menuData, navClick, navbar) {
    for (let menuItem in menuData) {
      let navA = document.createElement("a");
      navA.addEventListener("click", navClick);
      navA.className = "a";
      navA.innerHTML = menuItem;
      navA.href = menuData[menuItem];
      navbar.appendChild(navA);
    }
  }

  async function navClick(e) {
    e.preventDefault();
    let data = await getData(this.href);
    let navA = document.querySelector(".active");
    navA?.classList.remove("active");
    this.classList.add("active");

    cardContainer.innerHTML = "";

    ShowData(data);
  }

  async function ShowData(data) {
    
    for (let dataItem of data.results) {
      let card = document.createElement("div");
      card.className = "card";
      for (let [key, value] of Object.entries(dataItem)) {
        let keyName = key.replace("_", " ");
        keyName = keyName.charAt(0).toUpperCase() + keyName.slice(1);
        if (!ignor.includes(key)) {
          if (key == "homeworld" && value != null) {
            let homeworld = await getData(value);            
            card.insertAdjacentHTML(
              "beforeend",
              `<span class="key">${keyName}: </span><span class="value">${homeworld.name}</span><br>`
            );            
          } 
          else if (value == null) {
            card.insertAdjacentHTML(
              "beforeend",
              `<span class="key">${keyName}: </span><span class="value">n/a</span><br>`
            );
          }
          else {
            card.insertAdjacentHTML(
              "beforeend",
              `<span class="key">${keyName}: </span><span class="value">${value}</span><br>`
            );
          }
        }
      }
      cardContainer.appendChild(card);
    }
  }

  async function getData(url) {
    try {
     // console.log(url);
      const response = await fetch(url);

      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }


})(); // IIFE ENDLINE



