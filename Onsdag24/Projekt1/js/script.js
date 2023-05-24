const url = "https://dog.ceo/api/breeds/image/random";
const randomBtn = document.getElementById("randomDog");

randomBtn.addEventListener("click", function () {
  fetch(url)
    .then(function (response) {
      console.log(response);

      if (response.statusText.toUpperCase() === "") {
        document.getElementById("errMsg").style.display = "none";

        return response.json();
      }
      document.getElementById("errMsg").style.display = "block";
    })

    .then(function (json) {
      console.log(json);
      const img = document.createElement("img");
      const div = document.querySelector("#pictContainer");
      img.src = json.message;
      div.appendChild(img);
    });
});

// fetch(url)
//     .then((respons) => respons.json())
//     .then((data) => {
//         console.log(data);
//         if (data.status == "success")
//             document.getElementById("dogs").src = data.message;
//     }
//     );
