/*
BIG WORDS


Syntax parser: translator programs that compiles, iterprets the code.
               *engines can change our code when translating.

Lexical environment: Where something fits physically in the code
                     you write.

Execution context: Code that is currently running is managed via a wrapper called
                  execution context. They can contain things beyond
                  the code written.

video 11
Single threaded: One command executed at a time.
                 Javascript behave in a single threaded manner.

Synchronous: One at a time, in order.

video 16
Asynchronous: More than one at a time.

video 12
Invocation: Running a function
            In javascript, you invoke the function using paranthesis ()

video 13
Variable environment: Where the variables live.
                      And how they relate to each other in memory.
         
video 15             
Scope: Where a variable is available in your code.

Video 17
Dynamic typing: You don't tell the engine what type of data a variable
                holds. Instead, the engine figures it out by itself.

video 18
Primitive type: A type of data that repsesents a single value (not an object)

video 19
operator: a special function that is syntactically (written) differently.
          Generally, operators take 2 parameters and return 1 result.

video 21: 
Coercion: converting a value from one type to another. Because javascript is dynamicaly
          typed, it happens often.
*/

/*
CONCEPTUAL ASIDE

Name/value pair: Name which maps to a unique value.
                 At any execution context, a name can be
                 defined with one value.

                 Address = '100 Main St.'


Object: Collection of name/value pairs. 
        A simplest definiton when talking about javascript.
        Value can be another name/value pair.

        Address:
            {
                Street: 'Main',
                Number: 100
                Apartment:
                    {
                        Floor:3,
                        Number:301
                    }
            }

Javascript and 'undefined': In javascript, 'not defined' and 'undefined' 
                            is different, which is a misnomer... 
                            
                            'undefined' is a unique 
                            value that shows that the variable doesn't
                            have a defined value.

                            'not defined' means that the memory
                            space associated with the variable
                            name was not found.

                            note: do not set a variable to 'undefined'!
                                  It makes it difficult to tell if the value
                                  was actually never set.

Types and Javascript: Languages like Java and C# use something called static typing.
                      Meaning that you tell the machine beforehand, what is the type of
                      the data you intend to assign to the variable. 
                      
                      Static Typing
                          bool myVar = 'hello'; //gives an error

                      Dynamic Typing*
                          var myVar = true; //
                          myVar = 'hello'; //engine determines the type on the fly
                          myVar = 1; //
                        
                      note: this is a double edged sword!

*/


/*
video 7

When a file is executed, excution context* is created.
The global E.C decides 2 things, 'this' and the global object.

Global object (window) and 'this' is the same thing

note: global means 'not inside a function'
*/

/*
Variables and functions created outside of functions are
attached to the global object.

Global level execution context will contain:
    The global object
    'this'
    Outer environment (null)
    Code that is global
*/
var a = 'Hello world!';

function b() {

}

console.log(a, window.a)
console.log(b, window.b)
console.log('====================')


/*
video 8

Execution context is created in 2 phases.

    Creation phase: Setup global object, 'this', outer environment,
                    Setup memory space for variables and
                    functions (phenomenon called hoisting).

                    Functions are stored as a whole, while variables
                    are innitialy undefined.

    Execution phase: Lines are executed one by one.
                     Assignments are set.

                     Code is run line by line via compiling, interpreting
                     and translating.
*/
console.log(c) // output: undefined
d() // output: Called d!

var c = 'Hello world 2!';

function d() {
    console.log('Called d!')
}
console.log('====================')


/*
video 12

Function Invocation* and execution stack

When below code is executed, global execution context is created by a
syntax parser*. 
'e' and 'f' will be in the memory after creation context.
In an execution phase, when function 'f' is invoked.

A new execution context is created and placed on an execution stack
whenever a function is invoked.
Whichever on the top of the stack is what is currently being run (synchronous!).

Execution Stack:
     |b() Execution Context| <--currently running
     |f() Execution Context| <--Will run after b() EC popped
    |Global Execution Context| <--Will run after f() EC popped
*/

function e() {
    f(); //2
    var ee; //4
}

function f() {
    var ff; //3
}

e(); //1
var g; //5


/*
video 13

Context and Variable Environments*

Whenever a function is invoked, a new execution context is created.
Each execution context has its own variable environment.
For example, the global execution context's variable environment contains variable j as 1.


*/

function i() {
    var j;
    console.log(j);
}

function h() {
    var j = 2;
    console.log(j);
    i();
}

var j = 1;
console.log(j);
h();
console.log(j); //stays as 1
console.log('====================')

/*
Video 14

The scope chain

Every execution context has its own reference to its outer environment.
They are determined from the lexical environment of the function.

When a variable is not found in an execution context, javascript
looks for that variable from the lexical outer environment.

The chain of the links of lexical outer environments is called the 'scope chain'
*/

function l() { //lexical environment on the global level
    console.log(m);
}

function k() {
    var m = 2;
    l();
}

var m = 1;
k()



function k2() {
    
    function l2() { //lexical environment on the k2() level
        console.log(m2);
    }

    var m2 = 2;
    l2();
}

var m2 = 1;
k2()
console.log('====================')

/*
Video 15

Scope and let
*/

for (var i = 0; i < 10; i++){
    //n not available here
    let n = true; //new variable every iteration
    //n available here
}
//n not available here

/*
Video 16

Asynchronous callbacks

Although Javascript is synchronous*, it needs a way to handle callback functions,
such as clicking event, which are asynchronous*.

In parallel with the execution stack, there is another list called the event queue.
When the browser has an event that wants the javascript engine to be
notified of, said event will be placed on the queue.

The event queue will be checked (event loop) by the javascript when the execution stack
becomes empty. If anything is on the event queue, the event gets processed 
and checked if there are any function that needs to be executed. If there is,
a new execution context is created which handles that event.

The browser asynchronously places the events on the EQ, while
Javascript sychronously processes the EQ.
*/

function takesThreeSecondsToFinish() {
    var ms = 3000 + new Date().getTime();
    while (new Date() <= ms){} //waits for 3 sec
    console.log('function finished');
}

document.addEventListener('click', function(){ 
    console.log('clicked');
});

takesThreeSecondsToFinish();
console.log('3 sec done');
console.log('====================')

/*
no matter how hard you click, the event function only runs after 3 sec.
Meaning that a long running function will not let the events to happen.
*/

/*
Video 18

Primitive types*

There are currently 6 primitive types (values)* in javascript.
the 6 types are:
    undefined*: lack of existance, not adviced as explained above.
    null: lack of existance, set this if you want the value to be none.
    boolean: true or false.
    number: only the number type, a floating point number.
    string: sequence of characters '' and '' (unlike c).
    symbol (ES6): not yet...

Other types include:
    bigint: a big number
    object: for more complex data
*/

console.log(typeof undefined, typeof null, typeof true, typeof 0, typeof 'a');
console.log('====================');
/*from YDKJS(?) on typeof(null) returning Object:

    'This is a long-standing bug in JS, but one that is likely never
     going to be fixed. Too much code on the Web relies on the bug 
     and thus fixing it would cause a lot more bugs!'
*/ 


/*
Video 19

Operators*

Let's say you performed 3 + 4. 
Essentially, when the syntax parser sees an operator*, like +,
it is interpreted as a function, which acts just like

function +(a, b){
    return //sum of a and b
}

Instead of having to do +(3, 4), javascript provided an ability to write in infix
notation, where the operators sits in between the two parameters, like 3 + 4.
These operators are pre-written function that the javascript provides.

Keep this in mind when you are working with dynamic typed language, like javascript.
Where you don't necessarily know what type the variable becomes.
*/

var o = 3 + 4;
var o2 = 3 > 4;
console.log(o); //logs 7
console.log(o2); //logs 7
console.log('====================');


/* 
Video 21

Coercion*

In javascript, number and string doesn't look alike in the memory.
For instance, 1 and '1' are completely difference in the memory opposed to 
how it looks as a text.

But javascript engine makes a guess at certain occasions.
For example, it coerces* the number into string when a number and a string was 
added together.

All of these happens under the hood of javascript, without the programmer telling
it to do.

Understanding this is important, because you can track down some bugs.
Also, coersion happens as a process of calling operator functions.
*/

var p = 'hello ' + 'world';
console.log(p); //logs hello world
var p2 = 1 + '2';
console.log(p2); //logs 12, as if 1 was a string.

var p3 = 1, p4 = '2';

//bunch of code

console.log(p3 + p4); //logs 12. This can be very confusing.
console.log('====================');


/* 
Video 22

Comparison operators

From:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence  ,
less than (<) opertator has a left-to-right associativity.
So (3 < 2 < 1) is converted to ((3 < 2) < 1), and into (false < 1).
Javascript coerces boolean to number when comparision like this is given.
false becomes 0, and true becomes 1.
Which turns the term into (0 < 1), in return outputs true. 

The problem is, we cannot always predict what a coerced value becomes:
    Number(undefined) //returns NaN 
    Number(null) //0

    false == 0 //true
    null == 0 //false even though Number(null) is 0
    null < 1 //true

    '' == 0 //true
    '' == false //true
These strangeness is often considered the negative side of the language,
and can make code difficult to anticipate.

Using strict operators (===, !==), the engine stops coercing the parameters.

    false === 0 //false
    null === 0 //false

    '' === 0 //false
    '' === false //false

Generally, use strict equality, unless you intentionally want to coerce the values.

Refer to:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness
*/

console.log(1 < 2 < 3); //logs true. Although it makes sense, it is actually doing 1 < 3.
console.log(3 < 2 < 1); //logs true. Seems very weird to us.
console.log(Number(false)); //logs 0
console.log(Number(true)); //logs 1
console.log('====================');

/* 
Video 23

Existance and booleans.

So how are coercions* and dynamic typing* be useful?

We can check if a value is falsy or not.
Value is falsy when it is:
    false
    0
    -0
    0n
    '', '', ``
    null
    undefined
    NaN
*/

var q = 0;
if (q) { 
    //when q is not a falsy value.
    console.log('q was not falsy. ');
}

/* 
Video 24

Default values

Although in ES6 there is a way to set a default value easily, there is another
method of achieving it on past versions. It in the form:

    myVar = myVar || 'default value';

|| operator works in a neat way. It returns the first operand that 
can be coerced into true. If there are none, it returns the second operand.

    'a' || 'b' will return 'a'
    'a' || null will return 'a'
    null || 'b' will return 'b'
    0 || false will return false
    false || 0 will return 0

note: operators have precedence, whih defines the order of operators being called.
    As || having higher precedence than =, || is called first on:
        myVar = myVar || 'default value'; 
    As typeof having higher precedence than ||, typeof is called first on:
        typeof 0 || false; //returns number

*/

function greet(name) {
    name = name || '<default name>';
    console.log('hello ' + name);
}

greet('John');
greet(''); //careful

/*
Video 26

Object and the Dot

Object can include:
    Primitive (property)
    Object (property)
    Function (method)

Object knows the address of its properties and methods in the memory.
*/

var person = new Object(); //note: there are better ways to do this

person['firstname'] = 'Eleanor'; //[] is an operator (20 precedence)
person['lastname'] = 'Rigby';

console.log(person['firstname']);
console.log(person.firstname); //. is an operator (20 precedence). coerce to string.

person.address = new Object();
person.address.street = '111 Main St.'; //note: . has left-to-right associativity
person.address.city = 'Liverpool';

console.log(person['address']['city']);
console.log(person.address.city);

console.log(person);

// . operator is recommended. Unless using dynamic string 

/* 
Video 27

Object literals

Add on to the "//note: there are better ways to do this" above.


note: Javascript engine does the same thing under the hood either you use object
literal or new Object();\

*/

var Eleanor = { //object literal
    firstname: 'Eleanor',
    lastname: 'Rigby',
    address: {
        street: '111 Main St.',
        city: 'Liverpool'
    }
}; //this is the same as the code above. This code is treated as a single line.
//this is the prefered way.

function greet(person2){
    console.log('Hi ' + person2.firstname);
}

greet(Eleanor);
greet({
    firstname: 'Loretta',
    lastname: 'Martin',
    address: {
        street: '909 Penny Lane.',
        city: 'Arisona'
    }
});

Eleanor.address2 = {
    street: 'graveyard St.'
}