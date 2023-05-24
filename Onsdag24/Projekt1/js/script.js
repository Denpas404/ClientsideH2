const url = "https://dog.ceo/api/breeds/image/randomm";
const randomBtn = document.getElementById("randomDog");

const obj = [
  {
    firstname: ["Jack", "John", "James"],
    middleName: "The",
    lastname: "Ripper",
    profession: "Surgeon",
  },
  {
    firstname: "Ted",
    middleName: "",
    lastname: "Bundy",
    profession: "Law Student",
  },
];

for (let key in obj) {
  console.log(key + ": " + obj[key]);
}
console.log("--------------------------------------------------");
for (let [key, value] of Object.entries(obj)) {
  console.log(`${key}: ${value}`);
}
console.log("--------------------------------------------------");
console.log(typeof obj);
for (let i = 0; i < obj.length; i++) {
  console.log(obj[i]);
}
console.log("--------------------------------------------------");
console.log(Array.isArray(obj));

async function getImg() {
  try {
    // Sender en HTTP-anmodning til den specificerede URL og venter på at anmodningen afsluttes
    const respons = await fetch(url);

    // Konverterer svaret fra serveren til JSON-format og venter på, at konverteringen er færdig
    const json = await respons.json();

    // Returnerer det parsede JSON-dataobjekt
    return json;
  } catch (error) {
    // Hvis der opstår en fejl under hentning eller konvertering af data, fanges fejlen her
    console.log(error);
  }
}

randomBtn.addEventListener("click", async () => {
  const data = await getImg();
  const img = document.createElement("img");
  img.src = data.message;
  const div = document.querySelector("#pictContainer");
  if (div.hasChildNodes()) {
    div.removeChild(div.childNodes[0]);
  }
  div.appendChild(img);
  // console.log(data);
});

//////////////////////////////////////////////////////////////////////////

//function getImg() {
// fetch(url)
//     .then(function (response) {
//       console.log(response);

//       if (response.status == 200) {
//         document.getElementById("errMsg").style.display = "none";

//         return response.json();
//       }
//       document.getElementById("errMsg").style.display = "block";
//     })

//     .then(function (json) {
//       console.log(json);
//       const img = document.createElement("img");
//       const div = document.querySelector("#pictContainer");
//       img.src = json.message;
//       if (div.hasChildNodes()) {
//         div.removeChild(div.childNodes[0]);
//       }
//       div.appendChild(img);
//     });
//}

//////////////////////////////////////////////////////////////////////////

// fetch(url)
//     .then((respons) => respons.json())
//     .then((data) => {
//         console.log(data);
//         if (data.status == "success")
//             document.getElementById("dogs").src = data.message;
//     }
//     );
