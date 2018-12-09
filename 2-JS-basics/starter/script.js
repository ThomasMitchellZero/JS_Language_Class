

/*
 
  var markMass = 95
var markHeight = 2.01

var johnMass = 50
var johnHeight = 1.4

var markBMI = markMass / (markHeight * markHeight);
var johnBMI = johnMass / (johnHeight * johnHeight);

var fatness = markBMI > johnBMI

console.log("Is Mark fatter than John? " + fatness);
 
 */

 var john = {name:"John", height:2.1, weight: 95,};
 var mark = {name:"Mark", height:1.4, weight:50,}

 var bmi = function(name){
     var result = name.weight / (name.height * name.height);
     return result;
 }

 var fattestFuck = function(a,b){
     console.log(`is ${a.name} fatter than ${b.name}? It's ${bmi(a) > bmi(b)}!`);
 }

 fattestFuck(john, mark);