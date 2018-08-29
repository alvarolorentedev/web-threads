import ex1 from './example-function'
import ex2 from './example-context'
import ex3 from './example-context-args'
import ex4 from './example-class'
var element1 = document.getElementById("el1")
var element2 = document.getElementById("el2")
var element3 = document.getElementById("el3")
var element4 = document.getElementById("el4")
ex1().then((result) => {
    element1.innerHTML = result;
}).catch(() => {
    element1.innerHTML = "Fail";
});
ex2().then((result) => {
    element2.innerHTML = result;
}).catch(() => {
    element2.innerHTML = "Fail";
});
ex3().then((result) => {
    element3.innerHTML = result;
}).catch(() => {
    element3.innerHTML = "Fail";
});
ex4().then((result) => {
    element4.innerHTML = result;
}).catch(() => {
    element4.innerHTML = "Fail";
});
