// Create 3 simple functions where call, bind and apply are used.
//The intention of this exercise isto understand how they work and their differences

// source : https://www.freecodecamp.org/news/understand-call-apply-and-bind-in-javascript-with-examples/
/** Definations
 * Call is a function that helps you change the context of the invoking function. 
 * In layperson's terms, 
 * it helps you replace the value of this inside a function with whatever value you want.

Apply is very similar to the call function. 
The only difference is that in apply you can pass an array as an argument list.

Bind is a function that helps you create another function 
that you can execute later with the new context of this that is provided.
 */

// Call
function Car(type, fuelType) {
  this.type = type;
  this.fuelType = fuelType;
}

function setBrand(brand) {
  Car.call(this, "convertible", "petrol");
  this.brand = brand;
  console.log(`Car details = `, this);
}

function definePrice(price) {
  Car.call(this, "convertible", "diesel");
  this.price = price;
  console.log(`Car details = `, this);
}

const newBrand = new setBrand("Brand1");
const newCarPrice = new definePrice(100000);

console.log(newBrand);
console.log(newCarPrice);

// apply

function Car(type, fuelType) {
  this.type = type;
  this.fuelType = fuelType;
}

function setBrand(brand) {
  Car.apply(this, ["convertible", "petrol"]); //Syntax with array literal
  this.brand = brand;
  console.log(`Car details = `, this);
}

function definePrice(price) {
  Car.apply(this, new Array("convertible", "diesel")); //Syntax with array object construction
  this.price = price;
  console.log(`Car details = `, this);
}

const newBrandApp = new setBrand("Brand1");
const newCarPriceApp = new definePrice(100000);

console.log(newBrandApp);
console.log(newCarPriceApp);

// how to use argument function :
function addUp() {
  //Using arguments to capture the arbitrary number of inputs
  const args = Array.from(arguments);
  this.x = args.reduce((prev, curr) => prev + curr, 0);
  console.log("this.x = ", this.x);
}

function driverFunc() {
  const obj = {
    inps: [1, 2, 3, 4, 5, 6],
  };
  addUp.apply(obj, obj.inps);
}

driverFunc();


// Bind method : this is used to borrow a method and execute it later.
// bind will return a function which we could call later. 
var car = { 
    registrationNumber: "GA12345",
    brand: "Toyota",

    displayDetails: function(){
        console.log(this.registrationNumber + " " + this.brand);
    }
}
car.displayDetails();
var myCarDetails = car.displayDetails.bind(car); 
myCarDetails(); // GA12345 Toyota