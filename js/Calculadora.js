/**
 * Clase Calculadora
 */
class Calculadora {

    sumar(num1, num2) {
        return num1 + num2;
    }

    restar(num1, num2) {
        return num1 - num2;
    }

    multiplicar(num1, num2) {
        return num1 * num2;
    }

    dividir(num1, num2) {
        if (num2 === 0) {
            const p = document.createElement('P');
            p.textContent = 'No se puede dividir por cero';
            p.classList.add('error');
            document.body.appendChild(p);

            setTimeout(() => {
                p.remove();
            }, 1500);

            return 'Error';
        }

        return num1 / num2;
    }
}