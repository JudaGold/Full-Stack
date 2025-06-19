"use strict";

const testSection = document.getElementById("test-ajax");

const addHtml = function (dataObj) {
  const temp = `
  <div class="card my-2" style="width: 18rem;">
    <img src="${dataObj.flags.png}" class="card-img-top" alt="..." />
    <div class="card-body ">
      <h5 class="card-title">${dataObj.name.common}</h5>
      <p class="card-text">
        Some quick example text to build on the card title and make up the bulk
        of the card’s content.
      </p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">An item</li>
      <li class="list-group-item">A second item</li>
      <li class="list-group-item">A third item</li>
    </ul>
    <div class="card-body">
      <a href="#" class="card-link">
        Card link
      </a>
      <a href="#" class="card-link">
        Another link
      </a>
    </div>
  </div>
  `;
  testSection.insertAdjacentHTML("afterbegin", temp);
};

const fetchData = function (url, errorMessage = "Error fetching data") {
  return fetch(url).then((response) => {
    console.log(response);
    if (!response.ok) throw new Error(`${errorMessage}: ${response.status}`);
    return response.json();
  });
};

const getData = function (name) {
  const request = fetchData(
    `https://restcountries.com/v3.1/name/${name}`,
    `couldnt load data for country ${name}`
  )
    .then((data) => {
      console.log(data);
      addHtml(data[0]);
      const borders = data[0].borders;
      if (!borders) throw new Error(`No borders found for country ${name}`);
      return fetchData(
        `https://restcountries.com/v3.1/alpha?codes=${borders}`,
        `couldnt load data for borders of country ${name}`
      );
    })
    .then((data) => data.forEach((country) => addHtml(country)))
    .catch((error) => {
      console.log("Error fetching data:", error);
      testSection.insertAdjacentText(
        "beforeend",
        `Error fetching data: ${error}`
      );
    })
    .finally(() => console.log("Data fetching completed."));
};

getData("russia");
