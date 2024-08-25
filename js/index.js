/*
    Inicializamos las variables que vamos a utilizar en la calculadora.
*/
const displayValorAnterior = document.getElementById('data-operador-1');
const displayValorActual = document.getElementById('data-operador-2');
const numeros = document.querySelectorAll('.btn-numero');
const operadores = document.querySelectorAll('.btn-operador');
const borrar = document.querySelectorAll('.btn-borrar');

const display = new Display(displayValorAnterior, displayValorActual);

/* Agregar un numero y un operador cada que se da click en los respectivos botones */
numeros.forEach(boton => {
    boton.addEventListener('click', () => display.agregarNumero(boton.innerHTML));
})

operadores.forEach(boton => {
    boton.addEventListener('click', () => display.computar(boton.value));
});
