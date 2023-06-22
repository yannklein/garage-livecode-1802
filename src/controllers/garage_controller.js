// DON'T CHANGE THIS LINE ✅ 
const myBadAssGarage = window.myBadAssGarage;
// //////////////////////


// //////////////////////
// Pseudo-code
// //////////////////////


// ///
// Get all the cars
// ///

// 1. Create the stimulus controller skeleton
// 2. Add data-controller in the HTML and check if connected
// 3. Target the cars-list (to add some cars in it)
// 4. fetch the cars from API in connect()
// 5. Insert the car data in the cars-list (inesrtAdjacentHTML)

// ///
// Add a new car
// ///

// 1. Add data-action on Add a Car button
// 2. Create a new method for this action
// 3. Target the 4 inputs
// 4. do a POST request to our garage API with the data from the input (.value)
// 5. Get all the cars

// //////////////////////
// Code
// //////////////////////
// Tips: use 'sch' shortcut to build the controller
import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = [ 'list' ]

  connect() {
    console.log('Hello from garage_controller.js')
    console.log(this.listTarget)
    this.getCars()
  }

  getCars() {
    const url = `https://wagon-garage-api.herokuapp.com/${myBadAssGarage}/cars`
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        this.listTarget.innerHTML = ""
        data.forEach((car) => {
          this.listTarget.insertAdjacentHTML(
            "beforeend",
            `<div class="car">
              <div class="car-image">
                <img src="http://loremflickr.com/280/280/${car.brand},${car.model}" />
              </div>
              <div class="car-info">
                <h4>${car.brand} ${car.model}</h4>
                <p><strong>Owner:</strong> ${car.owner}</p>
                <p><strong>Plate:</strong> ${car.plate}</p>
              </div>
            </div>`)
        })
    })
  }
}