function dropdown() {
  document.getElementById("dropdown").classList.toggle("show");
}

const countriesContainer = document.getElementById("countries-container");

// ボツコード
// function searchByRegion(region) {
//   const regionInput = document.querySelectorAll(".region")

//   // 押したボタンのregion名をparameterとして送りたい。Switch?
// }

function searchByWord() {
  console.log("search by word working");
  const searchInput = document
    .getElementById("search-by-name")
    .value.toLowerCase();
  fetchCountries(searchInput, null);
}

function searchByRegion(region) {
  fetchCountries(null, region);
}

function fetchCountries(query, region) {
  let apiUrl;
  if (query) {
    apiUrl = `https://restcountries.com/v3.1/name/${query}`;
  } else if (region) {
    apiUrl = `https://restcountries.com/v3.1/region/${region}`;
  } else {
    apiUrl = "https://restcountries.com/v3.1/independent?status=true";
  }
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayCountries(data);
      console.log(data, "fetched data");
    })
    .catch((error) => console.error("Error fetching countries:", error));
}

const baseUrl = "https://restcountries.com/v3.1/independent?status=true";

function displayCountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    const cardHTML = `
    <div id="country-box" class="country-box" data-country="${country.name.common}">
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
  });

  // as data-country attribute is generated dynamically, the following event should be inside displayCountries function.
  const countryBoxes = document.querySelectorAll(".country-box");
  countryBoxes.forEach((box) => {
    box.addEventListener("click", () => {
      const countryName = box.getAttribute("data-country");
      console.log(countryName, "country name");
      window.location.href = `country-detail.html?country=${encodeURIComponent(
        countryName
      )}`;
      displayCountryDetail(country);
    });
  });
}

// home page loading
document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded");
  fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      displayCountries(data);
    });
});

// countrydetail page loading
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const countryName = urlParams.get("country");
  if (countryName) {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "country detail data");
        if (data && data.length > 0) {
          // displayCountryDetail(data[0])
          displayCountryDetail(data[0]);
        } else {
          console.error("Country data not found or invalid", data);
        }
      })
      .catch((error) => console.error("Error fetching country details", error));
  } else {
    console.error("Country name parameter is missing or invalid:", countryName);
  }
});

function getNativeNames(country) {
  const nativeNames = country.nativeName;
  const keys = Object.keys(nativeNames);

  // single key
  if (keys.length === 1) {
      const key = keys[0];
      return nativeNames[key];
  }

  // multiple key
  const result = {};
  keys.forEach(key => {
      result[key] = nativeNames[key];
  });
  return result;
}

function displayCountryDetail(country) {
  console.log("Hello");
  console.log(country.population, "country population");
  const countryDetailContainer = document.getElementById(
    "country-detail-container"
  );

  //
  //     const nativeNames = Object.values(country.name.nativeName)
  // .map(n => n.official)
  // .join(', ');
  // const nativeNames = Object.keys(country.name.nativeName)
  // .map(key => country.name.nativeName[key].official)
  // .join(', ')

  const nativeNames = getNativeNames(country);

  const currencies = Object.keys(country.currencies).map(
    (key) => country.currencies[key].name
  );

  const languages = Object.values(country.languages).join(", ");

  const borderCountries = Object.values(country.borders).join(", ");

  countryDetailContainer.innerHTML = `
        <div class="flex-container">
        <img src=${country.flags.png} alt="flag-img">
        <div class="country-detail">
        <p>${country.name.common}</p>
        <p>Native Name: ${nativeNames}</p>
        <p>Population: ${country.population}</p>
        <p>Region: ${country.region}</p>
        <p>Sub Region: ${country.subregion}</p>
        <p>Capital: ${country.capital}</p>

        <p>Top Level Domain: ${country.subregion}</p>
        <p>Currencies: ${currencies}</p>
        <p>Languages: ${languages}</p>

        <p>Border Countries: ${borderCountries}</p>
        </div>
        </div>
        `;
}
