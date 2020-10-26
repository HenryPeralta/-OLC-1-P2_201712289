const Errores = require('./Errores');
const {valor_tokens,Tokens} = require('./Tokens');

module.exports = class Analizador_Lexico{

    constructor(){
        this.lista_de_tokens = [];
        this.lista_de_errores = [];
        this.estado = 0;
        this.auxlex = "";
        this.columna = 0;
        this.fila = 1;
        this.indice = 0;
    }

    agregarToken(tipoDelToken){
        var token = new Tokens(tipoDelToken, this.auxlex, this.fila, this.columna, this.indice);
        this.lista_de_tokens.push(token);
        this.auxlex ="";
        this.estado = 0;
    }

    agregarError(tipoDelToken){
        var error = new Errores(tipoDelToken, this.auxlex, this.fila, this.columna, this.indice);
        this.lista_de_errores.push(error);
        this.auxlex ="";
        this.estado = 0;
    }

    analizador(entrada){
        var cadena = entrada + "#";
        var contador = 0;
        while (contador <= cadena.length -1){
            var actual = cadena[contador];
            this.columna += 1;
            if (this.estado==0){
                if (actual == ";"){
                    this.auxlex += actual;
                    this.indice += 1;
                    this.agregarToken(valor_tokens.PuntoyComa)
                }
            }
            else {
                if (actual=="#" && contador==cadena.length -1){

                }
            }

            contador += 1;
        }
        console.log(this.lista_de_tokens)
    }
}