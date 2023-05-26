
const swapiApi = (async function () {   // IIFE STARTLINE
  const baseUrl = "https://swapi.dev/api/"; // Opret en konstant, der indeholder URL'en til API'et
  const navbar = document.getElementById("navbar"); // Opret en variabel, der indeholder menuBar-elementet

  try { // Opret en try/catch-blok, der håndterer eventuelle fejl
    const response = await fetch(baseUrl);  // Opret en variabel, der indeholder svaret fra fetch-anmodningen
    const menuData = await response.json(); // Opret en variabel, der indeholder svaret fra fetch-anmodningen i JSON-format
    for (let menuItem in menuData) { // Gennemløber gennem hvert menuItem i menuData
      let navItem = document.createElement("a"); // Opret et nyt <a> element
      navItem.addEventListener("click", navClick); // Tilføj en eventListener til <a> elementet, der kalder navClick-funktionen
      navItem.className = "a"; // Tilføj CSS-klassen "a" til <a> elementet
      navItem.innerText = menuItem; // Tilføj teksten fra menuItem til <a> elementet
      navItem.href = menuData[menuItem]; // Tilføj værdien fra menuItem til <a> elementet
      navbar.appendChild(navItem); // Tilføj <a> elementet som et barn til menuBar-elementet  
    
    }
  } catch (error) { // Håndter eventuelle fejl ved at udskrive dem i konsollen
    console.log(error); 
  }
  
  async function navClick(e) { // Opret en asynkron funktion, der tager et event som argument
    e.preventDefault();     // Forhindrer standardadfærden for <a> elementet
    let data = await getData(this.href); // Opret en variabel, der indeholder svaret fra getData-funktionen
    navItem = document.querySelector(".active")?.classList.remove("active"); // Fjerner CSS-klassen "active" fra det element, der har CSS-klassen "active"
    this.classList.add("active"); // Tilføj CSS-klassen "active" til det element, der blev klikket på
    
  
    main.innerHTML = ""; // Tømmer main-elementet for indhold
    data.results.forEach(async(dataItem) => { // Gennemløber gennem hvert dataItem i data.results
      let card = document.createElement("div"); // Opret et nyt <div> element
      card.classList.add("card"); // Tilføj CSS-klassen "card"
      for (let [key, value] of Object.entries(dataItem)) { // Gennemløber gennem hvert key/value-par i dataItem
        let keyName = key.replace("_", " "); // Erstatter "_" med " " i key
        if (value instanceof Array) { // Hvis værdien er en instans af Array
            console.log(value); // Udskriv værdien i konsollen
            let len = value.length; // Opret en variabel, der indeholder længden af værdien
            card.insertAdjacentHTML("beforeend", `<span class="key">${keyName}: </span><span class="key">${len}</span><br>`); // Indsæt en ny linje i card-elementet med key og længden af værdien
        } 
        else if(key === "homeworld"){ // Hvis key er lig med "homeworld"
            let homeworld = await getData(value); // Opret en variabel, der indeholder svaret fra getData-funktionen
            card.insertAdjacentHTML("beforeend", // Indsæt en ny linje i card-elementet med key og navnet på homeworld
            `<span class="key">${keyName}: </span><span class="value">${homeworld.name}</span><br>`); 
        }
        else { 
          card.insertAdjacentHTML( // Indsæt en ny linje i card-elementet med key og værdien
            "beforeend",
            `<span class="key">${keyName}: </span><span class="value">${value}</span><br>` 
          ); 
        }
      }
      main.appendChild(card); // Tilføj card-elementet som et barn til main-elementet  
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

//region min løsning
  
// const swaIapi = (async function () {
//   const baseUrl = "https://swapi.dev/api/";

//   const navbar = document.getElementById("navbar");

//   fetch(baseUrl)
//     .then((response) => {
//       console.log(response);
//       return response.json();
//     })
//     .then((menuData) => {
//       for (let menuItem in menuData) {
//         let navItem = document.createElement("a");
//         navItem.addEventListener("click", navClick);
//         navItem.className = "nav-bar";
//         navItem.innerHTML = menuItem;
//         navItem.href = menuData[menuItem];
//         navbar.appendChild(navItem);
//       }
//     });

//   async function navClick(e) {
//     e.preventDefault();
//     const data = await getData(e.target.href);
//     console.log(data);
//     const main = document.getElementById("main");

//     for (let item in data.results) {
//       let attributes = data.results[item];
//       for (let attr in attributes) {
//         let p = document.createElement("p");
//         let strong = document.createElement("strong");
//         strong.innerText = attr;
//         p.appendChild(strong);
//         p.innerHTML += `: ${attributes[attr]}`;
//         main.appendChild(p);
//       }
//       main.appendChild(document.createElement("hr"));
//     }
//   }

//   async function getData(Url) {
//     try {
//       const response = await fetch(Url);
//       return await response.json();
//     } catch (error) {
//       console.log(error);
//     }
//   }
// })();

//endregion

// Løsning fra underviser


//region old code

// async function navClick(e) { // Opret en asynkron funktion, der tager en begivenhed som argument
  //     e.preventDefault(); // Forhindre standardadfærden for begivenheden (i dette tilfælde at følge linket)
  //     const data = await getData(this.href); // Udfør en asynkron funktion, der henter data fra API'et
  //     console.log(data); // Udskriv data i konsollen
  //     const main = document.getElementById("main"); // Hent main-elementet fra DOM

  //     /*
  //     for (let item in data.results) { // Gennemløber gennem hvert item i data.results
  //         let attributes = data.results[item]; // Opret en variabel, der indeholder attributterne for det aktuelle item
  //         for (let attr in attributes) { // Gennemløb gennem hvert attribut i attributterne
  //             let p = document.createElement("p"); // Opret et nyt <p> element
  //             let strong = document.createElement("strong"); // Opret et nyt <strong> element
  //             strong.innerText = attr; // Indstil teksten af <strong> elementet som attributten
  //             p.appendChild(strong); // Tilføj <strong> elementet som et barn til <p> elementet
  //             p.innerHTML += `: ${attributes[attr]}`; // Indstil HTML-indholdet af <p> elementet som attributten
  //             main.appendChild(p); // Tilføj <p> elementet som et barn til main-elementet
  //         }
  //         main.appendChild(document.createElement("hr")); // Tilføj et <hr> element som et barn til main-elementet
  //     }
  //     */
  //     //#endregion

  //     // For of loop
  //     // for (let [item, attributes] of Object.entries(data.results)) { // Gennemløb gennem hver indgang i data.results ved hjælp af Object.entries
  //     //     for (let [attr, value] of Object.entries(attributes)) { // Gennemløb gennem hver indgang i attributterne ved hjælp af Object.entries
  //     //         let p = document.createElement("p"); // Opret et nyt <p> element
  //     //         let strong = document.createElement("strong"); // Opret et nyt <strong> element
  //     //         strong.innerText = attr; // Indstil teksten af <strong> elementet som attributten
  //     //         p.appendChild(strong); // Tilføj <strong> elementet som et barn til <p> elementet
  //     //         p.innerHTML += `: ${value}`; // Indstil HTML-indholdet af <p> elementet som værdien
  //     //         main.appendChild(p); // Tilføj <p> elementet som et barn til main-elementet
  //     //     }
  //     //     main.appendChild(document.createElement("hr")); // Tilføj et <hr> element som et barn til main-elementet
  //     // }

  //     for (let [item, attributes] of Object.entries(data.results)) {
  //         let p = document.createElement("p");
  //         let strong = document.createElement("strong");

  //         if (this.href.includes("people")) {
  //             strong.innerText = "Name:";
  //             p.appendChild(strong);
  //             p.innerHTML += ` ${attributes.name}`;

  //             strong = document.createElement("strong");
  //             strong.innerText = "Birth year:";
  //             p.appendChild(document.createElement("br"));
  //             p.appendChild(strong);
  //             p.innerHTML += ` ${attributes.birth_year}`;

  //             strong = document.createElement("strong");
  //             strong.innerText = "Gender:";
  //             p.appendChild(document.createElement("br"));
  //             p.appendChild(strong);
  //             p.innerHTML += ` ${attributes.gender}`;

  //             strong = document.createElement("strong");
  //             strong.innerText = "Height:";
  //             p.appendChild(document.createElement("br"));
  //             p.appendChild(strong);
  //             p.innerHTML += ` ${attributes.height}`;
  //         } else if (this.href.includes("planets")) {
  //             strong.innerText = "Name:";
  //             p.appendChild(strong);
  //             p.innerHTML += ` ${attributes.name}`;
  //         }

  //         main.appendChild(p);
  //         main.appendChild(document.createElement("hr"));
  //     }
  // }

  // async function navClick(e) { // Opret en asynkron funktion, der tager en begivenhed som argument
  //     e.preventDefault(); // Forhindre standardadfærden for begivenheden (i dette tilfælde at følge linket)
  //     let data = await getData(this.href); // Udfør en asynkron funktion, der henter data fra API'et
  //     data.results.forEach(dataItem => {
  //         let card = document.createElement("div");
  //         card.classList.add("card");
  //         // card.innerHTML = dataItem.name;
  //         for (let [attr, value] of Object.entries(dataItem)) {
  //             let p = document.createElement("p");
  //             let strong = document.createElement("strong");
  //             strong.innerText = attr;
  //             p.appendChild(strong);
  //             p.innerHTML += `: ${value}`;
  //             card.appendChild(p);
  //         }
  //         main.appendChild(card);
  //         main.appendChild(document.createElement("hr"));
  //     });
  // }

  //endregion