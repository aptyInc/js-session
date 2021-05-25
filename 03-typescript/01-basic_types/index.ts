// var types 
// number, string, interface, array, type, enums, generics

// number interprate type 
let a = 1; // type of a is number
// a = "sasa"; // Type 'string' is not assignable to type 'number'


// defining type explicitly 
let b: number = 1; // fine 
// let b: number = "sasas"; // Type 'string' is not assignable to type 'number'.

// string 
const my_name: string = "saiumesh";
// const wrong_name: string = 1; // Type 'number' is not assignable to type 'string'


// interface 
interface Student {
    name: string;
    location: string;
    age: number;
}

const student: Student = {
    name: 'sasa',
    location: 'sasa',
    age: 1
}

// Form interface example 
interface StudentForm {
    name: string;
    age: number;
    yearOfGraduation: number;
    address?: string; // optional 
}

const studentForm: StudentForm = {
    name: 'sasa',
    age: 11,
    yearOfGraduation: 202,
    address: ''
}

const studentForm2: StudentForm = {
    name: 'sasa',
    age: 11,
    yearOfGraduation: 202
}

// extend my type 
interface Animal {
    poop: boolean;
}

interface Dog extends Animal {
    bark: boolean;
}

interface Cat extends Animal {
    eatsRat: boolean;
}

// array 
const names = ['sai', 'umesh', 'dhanewar']; // interprated
const namesType: string[] = ['sai', 'umesh', 'dhanewar'];
// const namesTypes: Array<string> = ['sai', 'umesh', 'dhanewar']; 

// array + interface
const students: Student[] = [
    {
        name: 'sasa',
        age: 10,
        location: 'sasas'
    },
    {
        age: 1,
        location: 'sasas',
        name: 'sasas'
    }
]