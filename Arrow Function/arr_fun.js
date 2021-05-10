// ANONYMOUS FUNCTION
//  Anonymous Function is a function which doesnt have any identity or name.
// but below syntax gives error, js will not suppot this kind of syntax.
/*function (){
    console.log("hello");
}*/
// so we need to assign a anonymous function to a variable.
let a = function () {
    console.log("hello");
};
a();
// In js function can be passed as arguments i.e first class citizens. Passing an anonymous function as arg
setTimeout(function () {
    console.log("Anonymous with setTimeout");
}, 1000);
// call an anonymous function immediately without any variable
(function () {
    console.log("calling anonymous function")
})();
// If want to pass argument in above example
(function (alpha) {
    console.log(alpha);
})("alpha");

//ARROW FUNCTIONS
// Using arrow functions we can write less code with anonymous function
// writing a arrow function for above example a
let b = () => {
    console.log("arrow function");
};
b();
// optimizing the arrow function
let c = () => console.log("implicit return ");
c();
// passing arguments in arrow function
let d = (par) => console.log(par);
d("passing value into arrow function");

// HIGHER OREDER FUNCTIONS : Functions are values.We can pass and return function as like values.
// FILTER : It is a function on the array that accepts another function as it argument which it will use to return a new filtered array.
// This function will iterate through array and filter the array by taking a call back function.
const numbers = ['1','10','51','34','11','78'];
const less_num = numbers.filter((num) => num<50);
console.log(less_num);
// MAP : It is a higher order function which goes thorugh array and transform the elements in the array.
// Map will include all items in the array
const mul_num = numbers.map((num) => num*2);
console.log(mul_num);