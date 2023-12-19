//"Especia" del coctel actual
export var other = ''
export function setOther(num){
    other = num
}
//Refresco del coctel  actual
export var refreshment = ''
export function setRefreshment(name){
    console.log(name)
    refreshment = name
}
//Alcohol del coctel actual 
export var alcohol = ''
export function setAlcohol(name){
    alcohol = name
}

//Customers totales del nivel
export var numCustomers = 0;
//Estrellas totales de cada customer de forma inividual
export var currentCustomerPoints = 0;
//Media de las estrellas totales de cada customer
export var currentCustomersStars = 0;
//Numero de minijuegos del customer
var cantMinigames = 0
//Lista de estrellas totales de cada customer
export var individualTotalStars = [];

//Establece cantidad total de customers
export function setNumCustomers(num){
    numCustomers = num
}

//Despues de calcular la puntuacion de cada minijuago, se agregar a la variable
export function addCustomerPoints(points){
    currentCustomerPoints += points
}
export function addMinigame(){
    cantMinigames++
}

//Hace la media entre la puntuacion de estrellas y los minijuegos que se han jugado
// y lo añade a la lista de estrellas
export function calculateCustomerStarts(){
    currentCustomersStars = currentCustomerPoints / cantMinigames
    addTotalIndivStars(currentCustomerPoints);
}


//En caso de tener distintos customers, 
//tener la puntuacion total de cada uno de ellos de forma individual
//Añade una puntuacion a la lista de puntuaciones
export function addTotalIndivStars(numStars){
    individualTotalStars.push(numStars)
}

//Estrellas que se va a mostrar en pantalla al final del nivel
export var finalStars = 0;
//Calcula la media de estrellas final
export function calculateLevelStars(){
    var rate = 0
    individualTotalStars.forEach(cust => {
        rate += cust
    })
    finalStars = rate / numCustomers;
}

//Info de nivel
export const levels = {
    'level1' : {customerCant: 1},
    'level2' : {customerCant: 2},
    'level3' : {customerCant: 3},
    'level4' : {customerCant: 4}
}


