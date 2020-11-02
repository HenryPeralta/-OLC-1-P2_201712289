const valor_error = {
    Desconocido: 1
}

class Error{

    constructor(tipoDelToken, auxlex, fila, columna, indice){
        this.tipoDelToken = tipoDelToken;
        this.auxlex = auxlex;
        this.fila = fila;
        this.columna = columna;
        this.indice = indice;
        this.valor = this.getTipo();
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
            case valor_error.Desconocido:
                return "Desconocido";
            default:
                return "Desconocido";    
        }
    }
}

module.exports = {valor_error, Error}