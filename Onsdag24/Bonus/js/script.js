const baseUrl = "https://swapi.dev/api/";

const menuBar = document.getElementById("navbar");

fetch(baseUrl)
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((menuData) => {
    for (let menuItem in menuData) {
      let navItem = document.createElement("a");
      navItem.addEventListener("click", navClick);
      navItem.className = "nav-bar";
      navItem.innerText = menuItem;
      navItem.href = menuData[menuItem];
      menuBar.appendChild(navItem);
    }
  });

async function navClick(e) {
  e.preventDefault();
  const data = await getData(this.href);
  console.log(data);
  const main = document.getElementById("main");
  main.innerHTML = "";

  for (let item in data.results) {
    console.log(item);
    let attributes = data.results[item];
    for (let attr in attributes) {
      let p = document.createElement("p");      
      let strong = document.createElement("strong");
      let attributeName = attr.replace("_", " ");
      strong.innerText = attributeName;
      p.appendChild(strong);
      if (attr === "homeworld") {
        const homeworld = await getData(attributes[attr]);
        p.innerHTML += `: ${homeworld.name}`;
      }
      else if (attr === "films") {        
        for (let film in attributes[attr]) {
            let li = document.createElement("li");
            const filmData = await getData(attributes[attr][film]);
            li.innerHTML = `${filmData.title}`;
            p.appendChild(li);
        }
        }
      else{
        p.innerHTML += `: ${attributes[attr]}`;
      }
      main.appendChild(p);
    }
    main.appendChild(document.createElement("hr"));
  }
}

async function getData(Url) {
  try {
    const response = await fetch(Url);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
