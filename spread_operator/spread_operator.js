//object
const product = {
    id: 1,
    name: "Iphone 12"
}

function addKey(object_ref, key, value) {
    object_ref[key] = value;
}
//ways to add a new key to the object
const x = 'price'

//by enclosing key within the square brackets like we do in arrays
product['price'] = 100;
console.log(product);

//using dot operator
product.price = 200;
console.log(product);

//by enclosing a variable, which contains the key, within the square brackets 
product[x] = 1000;
console.log(product);

//function to add a new key to the object
addKey(product, 'price', 70000);

console.log(product);

//Till this point the object got mutated i.e since it is passed by reference the actual content of the object got modified each time the function is called
//Instead we can use spread operator to create a copy and make changes to that copy alone and preserve the orginal one
const product_copy = { ...product, 'id': 101 };
addKey(product_copy, 'category', 'mobile');
addKey(product_copy, 'brand', 'Apple');
console.log("Duplicate",product_copy);
console.log("Orginal",product);

//using spread operator in arrays
//just like objects...arrays are also mutated
//so we create copies using the spread operator

const products=['mobiles','earphones'];

console.log(products);

//ways to add items/values into the array
products.push("charger");
console.log(products);

//updating the values using index
products[2]=("chargers");

console.log(products);

//creating copy using spread operator

const product_arr_copy=[...products,"batteries","ipad"]
product_arr_copy.push("ipod");

//noticing the difference
console.log("Copy",product_arr_copy);
console.log("Orginal",products);