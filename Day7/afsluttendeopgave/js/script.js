import { ignor } from "./modules/filter.js"; // import ignor array fra filter.js

const swapiApi = (async function () {
  // IIFE STARTLINE

  const baseUrl = "https://swapi.dev/api/"; // base url til swapi api
  const navbar = document.getElementById("navbar");
  const btnContainer = document.getElementById("btnContainer");
  const cardContainer = document.getElementById("cardContainer");
  let ignorIsSet = true; // ignorIsSet er en bool som bruges til at ignorere nogle keys i dataen
  let currentUrl;

  try {
    const data = await fetch(baseUrl); // henter data fra swapi api
    const menuData = await data.json(); // laver data om til json
    CreateNavMenu(menuData, navClick, navbar); // kalder CreateNavMenu funktionen
    document.querySelectorAll(".a")[0].click(); // klikker på det første element i navbaren
  } catch (error) {
    // error handling hvis der sker en fejl i try
    console.log(error);
  }

  function CreateNavMenu(menuData, navClick, navbar) {
    // funktion til at lave navbaren
    for (let menuItem in menuData) {
      // for hvert element i menuData
      let navA = document.createElement("a"); // lav et a tag
      navA.addEventListener("click", navClick); // tilføj en eventlistener til a tagget
      navA.className = "a"; // tilføj en class til a tagget
      navA.innerHTML = menuItem; // tilføj innerHTML til a tagget
      navA.href = menuData[menuItem]; // tilføj href til a tagget
      navbar.appendChild(navA); // tilføj a tagget til navbaren
    }
  }

  async function navClick(e) {
    // funktion til at håndtere klik på navbaren
    e.preventDefault(); // forhindre default handling af klik
    let data = await getData(this.href); // hent data fra href
    let navA = document.querySelector(".active"); // find det element i navbaren som har classen active
    navA?.classList.remove("active"); // fjern classen active fra det element
    this.classList.add("active"); // tilføj classen active til det element som er blevet klikket på
    currentUrl = this.href; // sæt currentUrl til href
    ShowData(data); // kald funktionen ShowData
  }

  async function cardClick(data) {
    // funktion til at håndtere klik på et card
    let cardData = await getData(this.href);
    ShowCard(cardData);
  }

  async function ShowCard(data) {
    ignorIsSet = false; // ignorIsSet sættes til false så alle keys i dataen bliver vist
    cardContainer.className = "singleCardContainer"; // tilføj classen singleCardContainer til cardContainer
    btnContainer.innerHTML = ""; // fjern alt indhold fra btnContainer
    cardContainer.innerHTML = ""; // fjern alt indhold fra cardContainer

    let card = document.createElement("div"); // lav et div tag
    card.className = "singleCard"; // tilføj classen singleCard til div tagget
    card.innerHTML = (await generateCardContent(data)).toString(); // tilføj innerHTML til div tagget
    cardContainer.appendChild(card); // tilføj div tagget til cardContainer

    let backBtn = document.createElement("button"); // lav et button tag
    backBtn.innerHTML = "Back"; // tilføj innerHTML til button tagget
    backBtn.addEventListener("click", backclick); // tilføj en eventlistener til button tagget
    btnContainer.appendChild(backBtn); // tilføj button tagget til btnContainer    
  }

 

  async function ShowData(data) {
    ignorIsSet = true;
    cardContainer.className = "cardContainer";
    btnContainer.innerHTML = ""; 

    CreateButtons(data);
    cardContainer.innerHTML = ""; 
    for (let dataItem of data.results) {  // for hvert element i data.results 
      let card = document.createElement("div"); // lav et div tag
      card.className = "card"; // tilføj classen card til div tagget
      card.innerHTML = (await generateCardContent(dataItem)).toString(); // tilføj innerHTML til div tagget
      card.href = dataItem.url; // tilføj href til div tagget
      card.addEventListener("click", cardClick); // tilføj en eventlistener til div tagget
      cardContainer.appendChild(card); // tilføj div tagget til cardContainer
    }
  }

  async function generateCardContent(dataItem) { 
    let content = "";  // lav en tom string
    for (let [key, value] of Object.entries(dataItem)) {  
      let keyName = key.replace("_", " ");   // erstat _ med mellemrum i key
      keyName = keyName.charAt(0).toUpperCase() + keyName.slice(1); // Første bogstav i keyname bliver gjort til uppercase og resten af keyname bliver tilføjet til det
      if (ignor.includes(key) && ignorIsSet) { continue; } // Hvis key er i ignor arrayet og ignorIsSet er true, så fortsæt til næste iteration af loopet
      
      if (key == "homeworld" && value != null) // Hvis key er homeworld og value ikke er null, hent data fra url og udskriv navnet på homeworld
      {    
        let homeworld = await getData(value);  
        content += `<span class="key">${keyName}:&nbsp;&nbsp;</span><span class="value">${homeworld.name}</span><br><hr>`; 
      } 

      else if (Array.isArray(value)) //Hvis value er et array, udskriv keyname 1 gang og alle values i arrayet med et <li> tag
      { 
        content += `<span class="key">${keyName}:&nbsp;&nbsp;</span><br>`;
        for (let item of value) {
          content += `<li class="value">${item}</li>`;
        }
        content += `<hr>`;
      } 

      else if (key == "homeworld" && value == null) // Hvis key er homeworld og value er null, udskriv keyname og n/a
      {
        content += `<span class="key">${keyName}:&nbsp;&nbsp;</span><span class="value">n/a</span><br><hr>`;
      } 

      else // Ellers udskriv keyname og value
      {
        content += `<span class="key">${keyName}:&nbsp;&nbsp;</span><span class="value">${value}</span><br><hr>`;
      }

    }
    return content;
  }


  async function getData(url) {
    try {
      const response = await fetch(url); // Hent data fra url
      return await response.json(); // Returner data som json
    } catch (error) {
      console.log(error);
    }
  }

  async function CreateButtons(data) { 
    if (data.previous) {  // Hvis data.previous er true, lav en previous knap og tilføj en eventlistener til den
      const previous = document.createElement("button");
      previous.innerHTML = "Previous";
      previous.addEventListener("click", async () => {
        let previousData = await getData(data.previous);
        currentUrl = data.previous;
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
        currentUrl = data.next;
        ShowData(nextData);
      });
      cardContainer.innerHTML = "";
      btnContainer.appendChild(next);
    }
  }

  function backclick() {
    getData(currentUrl).then((data) => ShowData(data)); // Hent data fra currentUrl og kald funktionen ShowData
  }
})(); // IIFE ENDLINE
