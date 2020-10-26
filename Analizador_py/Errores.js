const errores = {
    Desconocido: 1
}

module.exports = class Error{

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
            case tipoDelToken.Desconocido:
                return "Desconocido";
            default:
                return "Desconocido";    
        }
    }
}