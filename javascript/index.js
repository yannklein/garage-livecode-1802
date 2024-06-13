// DON'T CHANGE THIS LINE
window.myBadAssGarage = 'ga-raj';
if (myBadAssGarage) document.querySelector('#garage-name').innerText = myBadAssGarage.replace( /-/g, ' ', );
// //////////////////////

const url = `https://garage.api.lewagon.com/${myBadAssGarage}/cars`;

// //////
// Get all cars
// //////

const getCars = () => {
  // 1. Select cars-list
  const carsList = document.querySelector(".cars-list");

  // 2. No event listener needed

  // 2.5 Fetch Garage API (GET)
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      carsList.innerHTML = "";
      data.forEach((carData) => {
        // 3. Change the DOM: create the car card (with API info) and insert it into cars-list
        const carCard = `
        <div class="car">
          <div class="car-image">
            <img src="http://loremflickr.com/280/280/${carData.brand},${carData.model}" />
          </div>
          <div class="car-info">
            <h4>${carData.brand} ${carData.model}</h4>
            <p><strong>Owner:</strong> ${carData.owner}</p>
            <p><strong>Plate:</strong> ${carData.plate}</p>
          </div>
        </div>`;
        carsList.insertAdjacentHTML("afterbegin", carCard);
      });
    })
};

getCars();

// //////
// Add a car
// //////

// 1. Select form (new-car), 4 inputs
const form = document.querySelector("#new-car");
const brand = document.querySelector("#brand");
const model = document.querySelector("#model");
const plate = document.querySelector("#plate");
const owner = document.querySelector("#owner");

// 2. Listen to a submit on the form (event.preventDefault())
form.addEventListener("submit", (event) => {
  event.preventDefault()
  console.log(event);
  // 2.5 Fetch the Garage API (POST)
  const carData = {
    brand: brand.value,
    model: model.value,
    owner: owner.value,
    plate: plate.value
  }

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(carData)
  };

  fetch(url, options)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      // 3. Get all cars
      getCars();
    })
});
