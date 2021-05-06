// refference :: https://www.freecodecamp.org/news/array-and-object-destructuring-in-javascript/#:~:text=Destructuring%20is%20a%20JavaScript%20expression,and%20assign%20them%20to%20variables.&text=The%20ES6%20destucturing%20assignment%20makes%20it%20easier%20to%20extract%20this%20data.

//Array and Object Destructuring
//   Array
const alphabet = ['A', 'B', 'C', 'D', 'E']
const [a, b] = alphabet // first value stores in first variable
console.log(a, b);
// to skip values
const [, c, , d,] = alphabet
console.log(c, d);
const [s, ...alpha] = alphabet // the rest of the elements in the array stores in alpha
console.log(alpha);

function good() {
    return ['JJ', 'iur', 'wad']
}
const [z, x, f] = good() // it can work with functions
console.log(z);
const [a1 = 'A', b1 = 'B'] = ['aa'];//as there is not value for b1 on rightside so it takes default value
console.log(a1, b1);

//   Object
let person1 = { one: '1', two: '2', three: '3'};
let one, two, three; //let {one,two,three} = person1; for this the varaible and key value should be same
({ one, two, three } = person1); //the varaible name should be same as key value or else it will display as undefine.
console.log(one,two,three);
let { one : o1,two :t2,three :t3} = person1;//here the value of one is assigned to o1 variable
console.log(o1,t2,t3);
let { one :o2 ="the value"} = person1;
console.log(one,o2) //assiging a duplicate for one,o2
let o3  = 'one';// right side string must be the key of the object
let {[o3]:kk} = person1;
console.log(kk);
//Object Destructuring and Functions : used to assign parameters to function

function qw({ first : t1,second : t2} = {}){
    console.log(t1,t2)
}
qw({first :"123",second:"456"});
qw({first :'123'}); // the value are send as parameters and are assigned to another variavle in function 
