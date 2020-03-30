//refer to framework2.js and app2.js

/*
BIG WORD ALERTS

video 28
Namespace: A container for variables and functions. Seperates the variables and functions 
           with same name. Javascript does not have this!

*/

/* 
Video 21

Default values 

Using default values, you can avoid variable overwriting of differenr libraries
*/
window.frameworkname = window.frameworkname || "framework1";

/* 
Video 28

Faking Namespaces

*/

var greet = 'Hello!';
var greet = 'Konnichiwa!'; //instead of doing this...

console.log(greet);

var english = {
    greet: 'Hello!'
}

var japanese = {
    greet: 'Konnichiwa!' //do these.
}

console.log(japanese);

