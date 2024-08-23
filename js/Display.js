class Display {
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

        /* Mapa */
        this.signos = {
            sumar: '+',
            restar: '-',
            multiplicar: 'x',
            dividir: '/'
        }
    }

    borrar(){
        this.valorActual = this.valorActual.toString().slice(0,-1);
        this.imprimirValores();
    }

    borrarTodo(){
        this.valorActual = '';
        this.valorAnterior = '';
        this.tipoOperacion = undefined;

        this.imprimirValores();
    }

    agregarNumero(numero){
        if(numero === '.' && this.valorActual.includes('.')) return;
        this.valorActual = this.valorActual.toString() + numero.toString();
        this.imprimirValores();
    }

    imprimirValores(){
        this.displayValorActual.textContent = this.valorActual;
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
    }

    computar(tipo){
        this.tipoOperacion !== 'igual' && this.calcular();
        this.tipoOperacion = tipo;
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual = '';

        this.imprimirValores();        
    }

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