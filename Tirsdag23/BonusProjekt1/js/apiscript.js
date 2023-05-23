//Array med brugere

// const users = [];

// fetch('https://reqres.in/api/users')
//   .then((response) => response.json())
//   .then((data) => {
//     data.data.forEach((user) => {
//       users.push(user.first_name, user.last_name, user.email);
//     });

//     users.forEach((user) => {
//       console.log(user);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

//   fetch("https://jsonplaceholder.typicode.com/users")
//     .then((response) => response.json())
//     .then((data) => {
//         data.forEach((user) => {
//             users.push(user.name, user.username, user.email);
//         });
//         users.forEach((user) => {
//             console.log(user);
//         });
//     })

////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Map med brugere
const usersMap = new Map();

fetch("https://reqres.in/api/users")
  .then((response) => response.json()) // Konverterer responsen til JSON-format
  .then((data) => {
    data.data.forEach((user) => { // Gennemløber  hvert brugerobjekt i data
      usersMap.set(user.id, { // Gemmer brugerdata i usersMap med brugerens id som nøgle
        firstName: user.first_name, // Gemmer brugerens fornavn
        lastName: user.last_name, // Gemmer brugerens efternavn
        email: user.email, // Gemmer brugerens email
      });
    });


    usersMap.forEach((user, index) => { // For hvert brugerobjekt i dataMap
        let btn = document.createElement("button"); // Opret et button-element
  
        btn.innerHTML = user.firstName + " " + user.lastName; // Indstil indholdet af knappen til brugerens navn
  
        btn.addEventListener("click", () => { // Tilføj en klikhændelse til knappen
          const userDataString = JSON.stringify(user, null, 2); // Konverter brugerdata til en streng
          alert(userDataString); // Vis brugerdataen i en popup
        });
  
        userContainer.appendChild(btn); // Tilføj knappen til brugerContainer
        // userContainer.appendChild(document.createElement("br")); // Tilføj et linjeskift
      });
  })
  .catch((error) => {
    console.log(error); // Hvis der opstår en fejl, så log den i konsollen
  });

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((user) => {
      usersMap.set(user.id, {
        firstName: user.name,
        lastName: user.username,
        email: user.email,
      });
    });

    usersMap.forEach((user, index) => {
      // For hvert brugerobjekt i dataMap
      let btn = document.createElement("button"); // Opret et button-element

      btn.innerHTML = user.firstName; // Indstil indholdet af knappen til brugerens navn

      btn.addEventListener("click", () => {
        // Tilføj en klikhændelse til knappen
        const userDataString = `Firstname: ${user.firstName}\nLastname: ${user.lastName}\nEmail: ${user.email}`;
        alert(userDataString);
      });

      userContainer.appendChild(btn); // Tilføj knappen til brugerContainer
      // userContainer.appendChild(document.createElement("br")); // Tilføj et linjeskift
    });   
  })
  .catch((error) => {
    console.log(error);
  });

////////////////////////////////////////////////////////////////////////////////////////////////////////////

// fetch("https://jsonplaceholder.typicode.com/users")
//     .then((response) => response.json())
//     .then((data) => {
//         console.log(data);
//         // console.log(data.length);
//         // data.forEach((user) => {
//         //     Object.keys(user).forEach((key) => {
//         //         console.log(`${key}: ${user[key]}`);
//         //     });
//         //     console.log('-----'); // Separator between users
//         // });
//     });

////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const userContainer = document.getElementById("userContainer");
// const dataMap = new Map();

// fetch("https://jsonplaceholder.typicode.com/users")
//     .then((response) => response.json()) // Henter JSON-data fra svaret
//     .then((data) => { // Når JSON-dataen er klar gør følgende:
//         data.forEach((element, index) => { // For hvert element i dataen
//             dataMap.set(index, element); // Tilføj elementet til dataMap
//         });
//     })
//     .then(() => { // Når dataMap er klar gør følgende:
//         dataMap.forEach((user, index) => { // For hvert brugerobjekt i dataMap
//             let btn = document.createElement("button"); // Opret et button-element

//             btn.innerHTML = user.name; // Indstil indholdet af knappen til brugerens navn

//             btn.addEventListener("click", () => { // Tilføj en klikhændelse til knappen
//                 const userDataString = JSON.stringify(user, null, 2); // Konverter brugerdata til en streng
//                 alert(userDataString); // Vis brugerdataen i en popup
//             });

//             userContainer.appendChild(btn); // Tilføj knappen til brugerContainer
//             // userContainer.appendChild(document.createElement("br")); // Tilføj et linjeskift
//         });
//     });
