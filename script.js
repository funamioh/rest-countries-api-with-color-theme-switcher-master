function dropdown() {
  document.getElementById("dropdown").classList.toggle("show");
}

const countriesContainer = document.getElementById("countries-container");

const url = "https://restcountries.com/v3.1/independent?status=true"

document.addEventListener("DOMContentLoaded", () => {
  fetch(url)
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
