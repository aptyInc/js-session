//Types in which we define Functions

//1.Named functions

function print_name(name) {
    console.log("Hello", name);
}

//2.Anonymous functions

() => {
    console.log("hello");
}

//3.Functions assigned to a variable

//assigning a named function to a variable
const func1 = function print_name(name = "None") {
    console.log("Hello", name);
}

//assigning an anonymous function to a variable
const func2 = (name) => {
    console.log("Hello", name);
}

//Main: Function Types
console.log("Named function", func1);
console.log("Anonymous function", func2);
//Named function
print_name("Pooja");
//Function assigned to variable
func1("Pooja");
//Anonymous function assigned to a variable
func2("Pooja");

//arrow functions
//in arrow functions, we remove the keyword "function" and place the '=>' symbol after the parenthesis

//example of arrow function which returns the square value of elements in an array
const print_square = (num) => {
    sqr_arr = [];
    for (const i of num) {
        sqr_arr.push(i * i);
    }
    return sqr_arr;
}

//implicit return
//arrow function returning the square of a number implicitly i.e., without return statement
const print_square_impl = (num) => num * num;

//Main 
const arr = [1, 2, 3, 4];
const res1 = print_square(arr);
console.log("Explicitly", res1);
const num = 5;
const res2 = print_square_impl(num);
console.log("Implicitly ", res2);

//Higher order functions
//These functions take another function as an argument

//map
//using map to return array of squares

const numbers = [2, 4, 6, 8];
const arr_square = numbers.map((num) => {
    return num * num;
});
console.log("Array of squares using Map: ", arr_square);

//filter
//using filter to return an array of positive numbers

const numbers_arr = [-2, 4, 6, -8];
const arr_positive = numbers_arr.filter((num) => {
    return num >= 0 ? num : null;
});
console.log("Array of positive integers using filter: ", arr_positive);