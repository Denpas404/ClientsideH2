const baseUrl = "https://swapi.dev/api/";

const menuBar = document.getElementById("navbar");

fetch(baseUrl)
  .then((response) => {
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
    /*  Old code
        for (let menuItem in menuData) {
            let li = document.createElement("li");
            li.innerHTML = `<a href="#">${menuItem}</a>`;
            menuBar.appendChild(li);
        }
        */
  });

async function navClick(e) {
  e.preventDefault();
  const data = await getData(this.href);
  console.log(data);
  // alert(this.href)
  const main = document.getElementById("main");

  for (let item in data.results) {
    let attributes = data.results[item];
    for (let attr in attributes) {
      let p = document.createElement("p");
      let strong = document.createElement("strong");
      strong.innerText = attr;
      p.appendChild(strong);
      p.innerHTML += `: ${attributes[attr]}`;
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
