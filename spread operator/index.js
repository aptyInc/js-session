/*Spread Operator on Object*/
const student = {
	name: "Apty Student",
	class: 4,
	age: 9,
};

const studentDuplicate = { ...student }; //Creates Duplicate Object
studentDuplicate["friend"] = "excers"; //Modify Duplicate Object
console.log(student); //Original Object Not Modified
console.log(studentDuplicate); //Duplicate Object Modified

/*Spread Operator on Array*/
const arr = [1, 2, 3, 4];
const arrDuplicate = [...arr]; //Creates Duplicate Array

arr.push(5); //Modify Original Array
console.log(arr); //Original Array Modified
console.log(arrDuplicate); //Duplicate Array Not Modified
