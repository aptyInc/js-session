/*Arrow Function Definition*/
const dummyArrowFunction = () => {
	return "I am a dummy arrow function";
};
console.log(dummyArrowFunction());

/*Arrow Function With Implicit Return*/
const implicitReturnFunction = () => "I support implicit returns"; //Returns the string
console.log(implicitReturnFunction());

/*Higher Order Functions */
//Higher Functions take a function as an argument or return a function
//Example functions are map and filter
//Example to demonstrate use of map and filter:
const employee1 = {
	firstName: "Ned",
	lastName: "Stark",
	role: "Developer",
};
const employee2 = {
	firstName: "Jon",
	lastName: "Snow",
	role: "Developer",
};
const employee3 = {
	firstName: "Daenerys",
	lastName: "Targaryen",
	role: "Tester",
};
const employees = [employee1, employee2, employee3];
//Get List Of Employees With FullNames Using Map
const employeesWithFullNames = employees.map((employee) => ({
	...employee,
	fullName: `${employee.firstName} ${employee.lastName}`,
}));
//Get List Of Developers Using Filter
const developers = employeesWithFullNames.filter(
	(employee) => employee.role === "Developer"
);
//Printing Names of Employees At Apty
console.log("Employees at Apty Inc:");
employeesWithFullNames.map((employee) => console.log(employee.fullName));
//Printing Names of Developers At Apty
console.log("Developers at Apty Inc:");
developers.map((employee) => console.log(employee.fullName));
