const swapiApi = (async function () {
  // IIFE STARTLINE

  const baseUrl = "https://swapi.dev/api/"; // Opret en konstant, der indeholder URL'en til API'et
  const navbar = document.getElementById("navbar"); // Opret en variabel, der indeholder menuBar-elementet
  const cardContainer = document.getElementById("cardContainer"); // Opret en variabel, der indeholder main-elementet

  try {
    const response = await fetch(baseUrl);
    const menuData = await response.json();

    for (let menuItem in menuData) {
      let navA = document.createElement("a");
      navA.addEventListener("click", navClick);
      navA.className = "a";
      navA.innerHTML = menuItem;
      navA.href = menuData[menuItem];
      navbar.appendChild(navA);
    }
  } catch (error) {
    console.log(error);
  }

  async function navClick(e) {
    e.preventDefault();
    let data = await getData(this.href);
    navA = document.querySelector(".active")?.classList.remove("active");
    this.classList.add("active");

    cardContainer.innerHTML = "";

    data.results.forEach(async(dataItem) => {
      let card = document.createElement("div");
      card.className = "card";
      for (let [key, value] of Object.entries(dataItem)) {
        let keyName = key.replace("_", " ");
        if (value instanceof Array) {
          // Hvis værdien er en instans af Array
          console.log(value); // Udskriv værdien i konsollen
          let len = value.length; // Opret en variabel, der indeholder længden af værdien
          card.insertAdjacentHTML(
            "beforeend",
            `<span class="key">${keyName}: </span><span class="key">${len}</span><br>`
          ); // Indsæt en ny linje i card-elementet med key og længden af værdien
        } else if (key === "homeworld") {
          // Hvis key er lig med "homeworld"
          let homeworld = await getData(value); // Opret en variabel, der indeholder svaret fra getData-funktionen
          card.insertAdjacentHTML(
            "beforeend", // Indsæt en ny linje i card-elementet med key og navnet på homeworld
            `<span class="key">${keyName}: </span><span class="value">${homeworld.name}</span><br>`
          );
        } else {
          card.insertAdjacentHTML(
            // Indsæt en ny linje i card-elementet med key og værdien
            "beforeend",
            `<span class="key">${keyName}: </span><span class="value">${value}</span><br>`
          );
        }
      }
      cardContainer.appendChild(card); // Tilføj card-elementet som et barn til main-elementet
    });
  }

  async function getData(url) {
    // Opret en asynkron funktion, der tager en URL som argument
    try {
      const response = await fetch(url); // Udfør en asynkron fetch-anmodning til URL'en
      return await response.json(); // Konverter svaret til JSON-format
    } catch (error) {
      console.log(error); // Håndter eventuelle fejl ved at udskrive dem i konsollen
    }
  }
})(); // IIFE ENDLINE
