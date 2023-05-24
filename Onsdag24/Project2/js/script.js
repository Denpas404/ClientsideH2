const baseUrl = "https://swapi.dev/api/";

async function getData() {
   try {
    const response = await fetch(baseUrl);
    return await response.json();    
   } catch (error) {
         console.log(error);
   }

}
getData();