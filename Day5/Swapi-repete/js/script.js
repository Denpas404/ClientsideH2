import { ignor } from "./modules/filter.js";

const swapiApp = (async function () {
  
  const SWAPIURL = "https://swapi.dev/api";
  const navBar = document.querySelector("#nav-bar");
  const cardContainer = document.querySelector(".card-container");

  try {
    const response = await fetch(SWAPIURL);
    const jsonData = await response.json();
    for (let key in jsonData) {
      let navItem = document.createElement("a");
      navItem.addEventListener("click", navClick);
      navItem.className = "nav-item";
      navItem.innerText = key;
      navItem.href = jsonData[key];
      navBar.appendChild(navItem);
    }
  } catch (error) {
    console.log(error);
  }

  async function navClick(e) {
    e.preventDefault();
    cardContainer.innerHTML = "";
    document.querySelector(".active")?.classList.remove("active");
    this.classList.add("active");
    let data = await getData(this.href);
    showData(data);

    
    // console.log(data);
  }

  function showData(data) {
    data.results.forEach((dataItem) => {
      let card = document.createElement("div");
      card.className = "card";
      // card.innerText = dataItem.name;
      for (let [k, v] of Object.entries(dataItem)) {
        let keyName = k.replace("_", " ");
        keyName = keyName.charAt(0).toUpperCase() + keyName.slice(1);
        if (!ignor.includes(k)) {
          card.insertAdjacentHTML(
            "beforeend",
            `<span class="key">${keyName}: </span> <span class="val">${v}</span><br>`
          );
        }
      }
      cardContainer.appendChild(card);
    });
  }

  async function getData(url) {
    const response = await fetch(url);
    return await response.json();
  }

  
})();
