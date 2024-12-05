// DON'T CHANGE THIS LINE
window.myBadAssGarage = 'kat-kars';
if (myBadAssGarage)
  document.querySelector('#garage-name').innerText = myBadAssGarage.replace(
    /-/g,
    ' ',
  );

const randomCarImage = () => {
  const cars = [
    'https://t4.ftcdn.net/jpg/05/37/32/57/360_F_537325726_GtgjRiyc37BLPn9OmisBVVZec9frLaL0.jpg',
    'https://static.vecteezy.com/system/resources/previews/023/192/562/non_2x/sport-car-running-on-the-road-in-future-city-created-with-generative-ai-free-photo.jpg',
    'https://media.istockphoto.com/id/468686480/photo/modern-generic-car-on-white-background.jpg?s=612x612&w=0&k=20&c=FOdVZRWrqaBULZlv-kkP6ypfNmILkgu0bsuy8c7LAdg=',
    'https://media.cdn-jaguarlandrover.com/api/v2/images/55880/w/680.jpg',
    'https://carwow-uk-wp-0.imgix.net/18015-MC20BluInfinito-scaled-e1666008987698-600x338.jpg?auto=format&cs=tinysrgb&fit=crop&h=&ixlib=rb-1.1.0&q=60&w=1600',
  ];
  return cars[Math.floor(Math.random() * cars.length)];
};
// //////////////////////

// //////
// I Get all cars
// //////
const url = `https://garage.api.lewagon.com/${myBadAssGarage}/cars`;

const displayCars = () => {
  // 1. Select elements (cars-list)
  const carsList = document.querySelector('.cars-list');

  // 2. Listen to an event (no event to listen to)

  // 2.5 Fetch the Garage API --> maybe array


  fetch(url)
    .then((response) => response.json())
    .then((carsData) => {
      console.log(carsData);
      carsList.innerHTML = '';
      carsData.forEach((carData) => {
        // 3. Change the DOM (insert the car data into our cars-list)
        const cardTemplate = `
        <div class="car">
          <div class="car-image">
            <img src="${randomCarImage()}" />
          </div>
          <div class="car-info">
            <h4>${carData.brand} ${carData.model}</h4>
            <p><strong>Owner:</strong> ${carData.owner}</p>
            <p><strong>Plate:</strong> ${carData.plate}</p>
          </div>
        </div>
      `;
        carsList.insertAdjacentHTML('afterbegin', cardTemplate);
      });
    });
};

displayCars();

// //////
// II Add a car
// //////

// 1. Select the button, 4 inputs
const brand = document.querySelector("#brand");
const plate = document.querySelector("#plate");
const owner = document.querySelector("#owner");
const model = document.querySelector("#model");
const submitBtn = document.querySelector("#submit-btn");

console.log(brand);

// 2. Listen to click on the button (CAREFUL: if <form>, listen to a submit)
submitBtn.addEventListener("click", (event) => {
  console.log(event);
  event.preventDefault();
  // 2.5 Get input.value and do a POST request to the Garage API
  const carData = {
    brand: brand.value,
    owner: owner.value,
    model: model.value,
    plate: plate.value,
  }

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(carData)
  }

  fetch(url, options)
  .then(response => response.json())
  .then((data) => {
    console.log(data)
    // 3. Display the added car --> redo step I
    displayCars();
  })
});

