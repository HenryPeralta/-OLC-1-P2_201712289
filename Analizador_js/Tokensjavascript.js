class Tokensjavascript{

    constructor(tipoDelToken, auxlex, fila, columna){
        this.tipoDelToken = tipoDelToken;
        this.auxlex = auxlex;
        this.fila = fila;
        this.columna = columna;
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

    getTipoDelToken(){
        return thid.tipoDelToken;
    }

}

module.exports = Tokensjavascript;