// DON'T CHANGE THIS LINE
window.myBadAssGarage = 'pablos-cave';
if (myBadAssGarage)
  document.querySelector('#garage-name').innerText = myBadAssGarage.replace(
    /-/g,
    ' ',
  );
// //////////////////////

const url = `https://wagon-garage-api.herokuapp.com/${myBadAssGarage}/cars`;

// Get all the cars
const getCars = () => {
  // 1. Select elements (cars-list)
  const carsList = document.querySelector('.cars-list');
  // 2. No event to listen
  // 3. Fetch the Wagon Garage, get the cars
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // 4. Change the DOM (display on the cars-list)
      carsList.innerHTML = '';
      data.forEach((carInfo) => {
        carsList.insertAdjacentHTML(
          'afterbegin',
          `<div class="car">
        <div class="car-image">
          <img src="http://loremflickr.com/280/280/${carInfo.brand},${carInfo.model}" />
        </div>
        <div class="car-info">
          <h4>${carInfo.brand} ${carInfo.model}</h4>
          <p><strong>Owner:</strong> ${carInfo.owner}</p>
          <p><strong>Plate:</strong> ${carInfo.plate}</p>
        </div>
      </div>`,
        );
      });
    });
};

getCars();

// 1. Select elements
const brandInput = document.querySelector("#brand");
const modelInput = document.querySelector("#model");
const plateInput = document.querySelector("#plate");
const ownerInput = document.querySelector("#owner");
const addCarBtn = document.querySelector("#submit-btn");
// 2. Listen to click on "add a car"
addCarBtn.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(event);
  // 3. Fetch API (POST)
  const newCar = {
    brand: brandInput.value,
    model: modelInput.value,
    owner: ownerInput.value,
    plate: plateInput.value
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCar)
  };

  fetch(url, options)
    .then(response => {response.json()})
    .then((data) => {
      console.log(data);
      // 4. Change the DOM -> getCars();
      getCars();
    })
});