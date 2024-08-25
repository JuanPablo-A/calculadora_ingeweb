class Display {

    /**
     * Constructor de la clase Display.
     * @param {HTMLElement} displayValorAnterior - El elemento que muestra el valor anterior.
     * @param {HTMLElement} displayValorActual - El elemento que muestra el valor actual.
    */
    constructor(displayValorAnterior, displayValorActual){
        /* Elemento que se quiere modificar */
        this.displayValorAnterior = displayValorAnterior;
        this.displayValorActual = displayValorActual;
        
        /* Inicializar la calculadora en el display*/
        this.calculadora = new Calculadora();

        /* Inicializar los valores */
        this.valorActual = '';
        this.valorAnterior = '';
        this.tipoOperacion = undefined;

        /* Mapear las operaciones*/
        this.signos = {
            sumar: '+',
            restar: '-',
            multiplicar: 'x',
            dividir: '/'
        }
    }

    /* Funciones */

    /* Borra el ultimo numero que se coloco */
    borrar(){
        this.valorActual = this.valorActual.toString().slice(0,-1);
        this.imprimirValores();
    }

    /* Limpia completamente el display */
    borrarTodo(){
        this.valorActual = '';
        this.valorAnterior = '';
        this.tipoOperacion = undefined;

        this.imprimirValores();
    }

    /**
     * Muestra el resultado de la operación en el display.
     * @param {int} numero - El numero que se quiere mostrar en el display.
     * Verifica si el numero es un punto y si el display ya contiene un punto antes de agregarlo.
     * Luego, convierte en string concatena el numero al valor actual y llama a `imprimirValores` para actualizar el display.
    */
    agregarNumero(numero){
        if(numero === '.' && this.valorActual.includes('.')) return;
        this.valorActual = this.valorActual.toString() + numero.toString();
        this.imprimirValores();
    }

    /* Imprime los valores en el display */
    imprimirValores(){
        this.displayValorActual.textContent = this.valorActual;
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
    }

    /**
     * Realiza la operación indicada y actualiza los valores del display.
     * @param {string} tipo - El tipo de operación a realizar ('sumar','restar','multiplicar','dividir').
     * Verifica si la operación actual no es 'igual' y, si es así, llama a la función `calcular` para realizar la operación pendiente.
     * Actualiza el tipo de operación, el valor anterior y el valor actual.
    */
    computar(tipo){
        this.tipoOperacion !== 'igual' && this.calcular();
        this.tipoOperacion = tipo;
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual = '';

        this.imprimirValores();        
    }

    /**
     * Realiza la operación pendiente y actualiza el valor actual con el resultado.
    */
    calcular(){
        if(this.valorAnterior === '') return;
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);

        if(isNaN(valorActual) || isNaN(valorAnterior)) return;

        // Asegurarse de que la operación exista en la calculadora antes de invocarla
        const operacion = this.calculadora[this.tipoOperacion];
        if (typeof operacion === 'function') {
            return this.valorActual = this.calculadora[this.tipoOperacion](valorAnterior, valorActual).toString();
        }
    }
}