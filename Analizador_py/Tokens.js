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
    Mayor_Que: 14,
    Menor_Que: 15,
    Mayor_Igual_Que: 16,
    Menor_Igual_Que: 17,
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
    Menos_Menos: 31,
    Guion_Bajo: 32,
    Not: 33,
    Xor: 34,
    Comentario_Unilinea: 35,
    Comentario_Multilinea: 36,
    Tipo_De_Dato: 37,
    Ciclos: 38,
    Sentencias: 39
}

class Tokens{

    constructor(tipoDelToken, auxlex, fila, columna, indice){
        this.tipoDelToken = tipoDelToken;
        this.auxlex = auxlex;
        this.fila = fila;
        this.columna = columna;
        this.indice = indice;
        this.valor = this.getTipo()
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
            case valor_tokens.Identificador:
                return "Identificador";
            case valor_tokens.Numero_Entero:
                return  "Numero Entero";
            case valor_tokens.Numero_Decimal:
                return "Numero Decimal";
            case valor_tokens.Cadena:
                return "Cadena";
            case valor_tokens.Caracter:
                return "Caracter";
            case valor_tokens.Palabra_Reservada:
                return "Palabra Reservada";
            case valor_tokens.Coma:
                return "Coma";
            case valor_tokens.Punto:
                return "Punto";
            case valor_tokens.PuntoyComa:
                return "Punto y Coma";
            case valor_tokens.Parentesis_Abierto:
                return "Parentesis Abierto";
            case valor_tokens.Parentesis_Cerrado:
                return "Parentesis Cerrado";
            case valor_tokens.Llave_Abierta:
                return "Llave Abierta";
            case valor_tokens.Llave_Cerrada:
                return "Llave Cerrada";
            case valor_tokens.Mayor_Que:
                return "Mayor Que";
            case valor_tokens.Menor_Que:
                return "Menor Que";
            case valor_tokens.Mayor_Igual_Que:
                return "Mayor Igual Que";
            case valor_tokens.Menor_Igual_Que:
                return "Menor Igual Que";
            case valor_tokens.Signo_Igual:
                return "Signo Igual";
            case valor_tokens.Signo_Mas:
                return "Signo Mas";
            case valor_tokens.Signo_Menos:
                return "Signo Menos";
            case valor_tokens.Signo_Por:
                return "Signo Por";
            case valor_tokens.Diagonal:
                return "Diagonal";
            case valor_tokens.Corchete_Abierto:
                return "Corchete Abierto";
            case valor_tokens.Corchete_Cerrado:
                return "Corchete Cerrado";
            case valor_tokens.Dos_Puntos:
                return "Dos Puntos";
            case valor_tokens.And:
                return "And";
            case valor_tokens.Or:
                return "Or";
            case valor_tokens.Igual_Igual:
                return "Igual Igual";
            case valor_tokens.Diferente:
                return "Diferente";
            case valor_tokens.Mas_Mas:
                return "Mas Mas";
            case valor_tokens.Menos_Menos:
                return "Menos Menos";
            case valor_tokens.Guion_Bajo:
                return "Guion Bajo";
            case valor_tokens.Not:
                return "Not";
            case valor_tokens.Xor:
                return "Xor";
            case valor_tokens.Comentario_Unilinea:
                return "Comentario Unilinea";
            case valor_tokens.Comentario_Multilinea:
                return "Comentario Multilinea";
            case valor_tokens.Tipo_De_Dato:
                return "Tipo de Dato";
            case valor_tokens.Ciclos:
                return "Ciclo";
            case valor_tokens.Sentencias:
                return "Sentencia";
            default:
                return "Desconocido";    
        }
    }
}

module.exports = {valor_tokens, Tokens}