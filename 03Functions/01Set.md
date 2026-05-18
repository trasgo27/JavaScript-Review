// Create a new Set
const mySet = new Set();

// Add values
mySet.add(1);
mySet.add(2);
mySet.add(2); // Duplicate, will be ignored
mySet.add("Hello");
mySet.add({ name: "John" });

// Check size
console.log(mySet.size); // 4

// Check if a value exists
console.log(mySet.has(1)); // true
console.log(mySet.has(3)); // false

// Delete a value
mySet.delete(2);

// Iterate over a Set
for (let value of mySet) {
    console.log(value);
}

// Clear all values
mySet.clear();
console.log(mySet.size); // 0
