import { ignor } from "./modules/filter.js";

const swapiApi = (async function () {
  // IIFE STARTLINE

  const baseUrl = "https://swapi.dev/api/";
  const navbar = document.getElementById("navbar");
  const btnContainer = document.getElementById("btnContainer");
  const cardContainer = document.getElementById("cardContainer");

  try {
    const data = await fetch(baseUrl);
    const menuData = await data.json();
    CreateNavMenu(menuData, navClick, navbar);
    document.querySelectorAll(".a")[0].click();
  } catch (error) {
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
    ShowData(data);
  }

  async function ShowData(data) {
    btnContainer.innerHTML = "";
    CreateButtons(data);
    cardContainer.innerHTML = "";
    for (let dataItem of data.results) {
      let card = document.createElement("div");
      card.className = "card";
      card.innerHTML = (await generateCardContent(dataItem)).toString();
      cardContainer.appendChild(card);
    }
  }
  
  async function generateCardContent(dataItem) {
    let content = "";
    
    for (let [key, value] of Object.entries(dataItem)) {
      let keyName = key.replace("_", " ");
      keyName = keyName.charAt(0).toUpperCase() + keyName.slice(1);
      if (ignor.includes(key)) {
        continue;
      }
      if (key == "homeworld" && value != null) {
        let homeworld = await getData(value);        
        content += `<span class="key">${keyName}:&nbsp;&nbsp;</span><span class="value">${homeworld.name}</span><br><hr>`;
      } else if (key == "homeworld" && value == null) {
        content += `<span class="key">${keyName}:&nbsp;&nbsp;</span><span class="value">n/a</span><br><hr>`;
      } else {
        content += `<span class="key">${keyName}:&nbsp;&nbsp;</span><span class="value">${value}</span><br><hr>`;
      }
    }
    return content;
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

  async function CreateButtons(data){
    
    if (data.previous) {
      const previous = document.createElement("button");
      previous.innerHTML = "Previous";
      previous.addEventListener("click", async () => {
        let previousData = await getData(data.previous);
        ShowData(previousData);
      });
      cardContainer.innerHTML = "";
      btnContainer.appendChild(previous);
    }
    if (data.next) {      
      const next = document.createElement("button");
      next.innerHTML = "Next";
      next.addEventListener("click", async () => {
        let nextData = await getData(data.next);
        ShowData(nextData);
      });
      cardContainer.innerHTML = "";
      btnContainer.appendChild(next);
    }
  }
})(); // IIFE ENDLINE
