const util = require("util");

// Custom Error 1
const CustomError1 = function(message) {
    Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
};
util.inherits(CustomError1, Error);

// Custom Error 2
const CustomError2 = function(message) {
    Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
};
util.inherits(CustomError2, Error);

// Tests
let e = new CustomError1("Foo");
console.log("instanceof error: ", e instanceof Error);  // true
console.log("instanceof own class: ", e instanceof CustomError1);  // true
console.log("instanceof other error class: ", e instanceof CustomError2);  // false
