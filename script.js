function dropdown() {
  document.getElementById("dropdown").classList.toggle("show");
}

const countriesContainer = document.getElementById("countries-container");

const baseUrl = "https://restcountries.com/v3.1/independent?status=true"

function searchByWord() {
  console.log("search by word working");
  const nameInput = document.getElementById("search-by-name").value
  const nameUrl = `https://restcountries.com/v3.1/name/${nameInput}`

  fetch(nameUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    countriesContainer.innerHTML = "";

    data.forEach(country => {
      const cardHTML = `
      <div class="country-box">
      <img src=${country.flags.png} alt="flag-img">
      <div class="country-detail">
      <p>${country.name.common}</p>
      <p>Population: ${country.population}</p>
      <p>Region: ${country.region}</p>
      <p>Capital: ${country.capital}</p>
      </div>
      </div>
      `;

      countriesContainer.innerHTML += cardHTML;
    })
  })
}

// display all countries
document.addEventListener("DOMContentLoaded", () => {
  fetch(baseUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)

    data.forEach(country => {
      const cardHTML = `
      <div class="country-box">
      <img src=${country.flags.png} alt="flag-img">
      <div class="country-detail">
      <p>${country.name.common}</p>
      <p>Population: ${country.population}</p>
      <p>Region: ${country.region}</p>
      <p>Capital: ${country.capital}</p>
      </div>
      </div>
      `;

      countriesContainer.innerHTML += cardHTML;
    })
  }
)}
)

// display the result that matches input string
