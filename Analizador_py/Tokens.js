const valor_tokens = {
    Identificador: 1,
    Numero_Entero: 2,
    Numero_Decimal: 3,
    Cadena: 4,
    Caracter: 5,
    Palabra_Reservada: 6,
    Coma : 7,
    Punto: 8,
    PuntoyComa: 9,
    Parentesis_Abierto: 10,
    Parentesis_Cerrado: 11,
    Llave_Abierta: 12,
    Llave_Cerrada: 13,
    Mayor: 14,
    Menor: 15,
    Mayor_Que: 16,
    Menor_Que: 17,
    Signo_Igual: 18,
    Signo_Mas: 19,
    Signo_Menos: 20,
    Signo_Por: 21,
    Diagonal: 22,
    Corchete_Abierto: 23,
    Corchete_Cerrado: 24,
    Dos_Puntos: 25,
    And: 26,
    Or: 27,
    Igual_Igual: 28,
    Diferente: 29,
    Mas_Mas: 30,
    Menos_Menos: 31 
}

class Tokens{

    constructor(tipoDelToken, auxlex, fila, columna, indice){
        this.tipoDelToken = tipoDelToken;
        this.auxlex = auxlex;
        this.fila = fila;
        this.columna = columna;
        this.indice = indice;
    }

    getIndice(){
        return this.indice;
    }

    getFila(){
        return this.fila;
    }

    getColumna(){
        return this.columna;
    }

    getAuxlex(){
        return  this.auxlex;
    }

    getTipo(){
        switch(this.tipoDelToken){
            case tokens.Identificador:
                return "Identificador";
            case tipoDelToken.Numero_Entero:
                return  "Numero Entero";
            case tipoDelToken.Numero_Decimal:
                return "Numero Decimal";
            case tipoDelToken.Cadena:
                return "Cadena";
            case tipoDelToken.Caracter:
                return "Caracter";
            case tipoDelToken.Palabra_Reservada:
                return "Palabra Reservada";
            case tipoDelToken.Coma:
                return "Coma";
            case tipoDelToken.Punto:
                return "Punto";
            case tipoDelToken.PuntoyComa:
                return "Punto y Coma";
            case tipoDelToken.Parentesis_Abierto:
                return "Parentesis Abierto";
            case tipoDelToken.Parentesis_Cerrado:
                return "Parentesis Cerrado";
            case tipoDelToken.Llave_Abierta:
                return "Llave Abierta";
            case tipoDelToken.Llave_Cerrada:
                return "Llave Cerrada";
            case tipoDelToken.Mayor:
                return "Mayor";
            case tipoDelToken.Menor:
                return "Menor";
            case tipoDelToken.Mayor_Que:
                return "Mayor Que";
            case tipoDelToken.Menor_Que:
                return "Menor Que";
            case tipoDelToken.Signo_Igual:
                return "Signo Igual";
            case tipoDelToken.Signo_Mas:
                return "Signo Mas";
            case tipoDelToken.Signo_Menos:
                return "Signo Menos";
            case tipoDelToken.Signo_Por:
                return "Signo Por";
            case tipoDelToken.Diagonal:
                return "Diagonal";
            case tipoDelToken.Corchete_Abierto:
                return "Corchete Abierto";
            case tipoDelToken.Corchete_Cerrado:
                return "Corchete Cerrado";
            case tipoDelToken.Dos_Puntos:
                return "Dos Puntos";
            case tipoDelToken.And:
                return "And";
            case tipoDelToken.Or:
                return "Or";
            case tipoDelToken.Igual_Igual:
                return "Igual Igual";
            case tipoDelToken.Diferente:
                return "Diferente";
            case tipoDelToken.Mas_Mas:
                return "Mas Mas";
            case tipoDelToken.Menos_Menos:
                return "Menos Menos";
            default:
                return "Desconocido";    
        }
    }
}

module.exports = {valor_tokens, Tokens}