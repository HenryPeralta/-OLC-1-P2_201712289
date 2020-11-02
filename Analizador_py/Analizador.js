const {valor_error, Error} = require('./Errores');
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
        this.indiceError = 0;
        this.palabra_reservada = ["public", "static", "main", "args", "class", "interface", "void", "break", "continue", "return", "true", "false", "System", "out", "println", "print"];
        this.tipo = ["int", "string", "boolean", "double", "String", "char"];
        this.ciclos = ["for", "while", "do"];
        this.sentencias = ["if", "else"];
    }

    agregarToken(tipoDelToken){
        var token = new Tokens(tipoDelToken, this.auxlex, this.fila, this.columna, this.indice);
        this.lista_de_tokens.push(token);
        this.auxlex ="";
        this.estado = 0;
    }

    agregarError(tipoDelToken){
        var error = new Error(tipoDelToken, this.auxlex, this.fila, this.columna, this.indiceError);
        this.lista_de_errores.push(error);
        this.auxlex ="";
        this.estado = 0;
    }

    isAlpha(letra){
        return letra.match(/[a-zA-Z]/i);
    }

    isDigit(numero){
        return numero.match(/[0-9]/i);
    }

    analizador(entrada){
        var cadena = entrada + "#";
        var contador = 0;
        while (contador <= cadena.length -1){
            var actual = cadena[contador];
            this.columna += 1;
            if (this.estado==0){
                if(this.isAlpha(actual)){
                    this.auxlex += actual;
                    this.estado = 1;
                }
                else if (this.isDigit(actual)){
                    this.auxlex += actual;
                    this.estado = 2;
                }
                else if (actual == '"'){
                    this.auxlex += actual;
                    this.estado = 5;
                }
                else if (actual == "'"){
                    this.auxlex += actual;
                    this.estado = 7;
                }
                else if (actual == "\n"){
                    this.columna = 0;
                    this.fila += 1;
                    this.estado = 0;
                }
                else if (actual == "\t"){
                    this.columna += 1;
                    this.estado = 0;
                }
                else if (actual == " "){
                    this.estado = 0;
                }
                else if (actual == ","){
                    this.auxlex += actual;
                    this.indice += 1;
                    this.agregarToken(valor_tokens.Coma)
                }
                else if (actual == "."){
                    this.auxlex += actual;
                    this.indice += 1;
                    this.agregarToken(valor_tokens.Punto)
                }
                else if (actual == ";"){
                    this.auxlex += actual;
                    this.indice += 1;
                    this.agregarToken(valor_tokens.PuntoyComa)
                }
                else if (actual == "("){
                    this.auxlex += actual;
                    this.indice += 1;
                    this.agregarToken(valor_tokens.Parentesis_Abierto)
                }
                else if (actual == ")"){
                    this.auxlex += actual;
                    this.indice += 1;
                    this.agregarToken(valor_tokens.Parentesis_Cerrado)
                }
                else if (actual == "{"){
                    this.auxlex += actual;
                    this.indice += 1;
                    this.agregarToken(valor_tokens.Llave_Abierta)
                }
                else if (actual == "}"){
                    this.auxlex += actual;
                    this.indice += 1;
                    this.agregarToken(valor_tokens.Llave_Cerrada)
                }
                else if (actual == ">"){
                    this.auxlex += actual;
                    this.estado = 9;
                }
                else if (actual == "<"){
                    this.auxlex += actual;
                    this.estado = 11;
                }
                else if (actual == "+"){
                    this.auxlex += actual;
                    this.estado = 13;
                }
                else if (actual == "-"){
                    this.auxlex += actual;
                    this.estado = 15;
                }
                else if (actual == "*"){
                    this.auxlex += actual;
                    this.indice += 1;
                    this.agregarToken(valor_tokens.Signo_Por)
                }
                else if (actual == "["){
                    this.auxlex += actual;
                    this.indice += 1;
                    this.agregarToken(valor_tokens.Corchete_Abierto)
                }
                else if (actual == "]"){
                    this.auxlex += actual;
                    this.indice += 1;
                    this.agregarToken(valor_tokens.Corchete_Cerrado)
                }
                else if (actual == ":"){
                    this.auxlex += actual;
                    this.indice += 1;
                    this.agregarToken(valor_tokens.Dos_Puntos)
                }
                else if (actual == "&"){
                    this.auxlex += actual;
                    this.estado = 17;
                }
                else if (actual == "|"){
                    this.auxlex += actual;
                    this.estado = 19;
                }
                else if (actual == "="){
                    this.auxlex += actual;
                    this.estado = 21;
                }
                else if (actual == "!"){
                    this.auxlex += actual;
                    this.estado = 23;
                }
                else if (actual == "_"){
                    this.auxlex += actual;
                    this.estado = 1;
                }
                else if (actual == "^"){
                    this.auxlex += actual;
                    this.indice += 1;
                    this.agregarToken(valor_tokens.Xor)
                }
                else if (actual == "/"){
                    this.auxlex += actual;
                    this.estado = 25;
                }
                else {
                    if (actual=="#" && contador==cadena.length -1){
                    }
                    else{
                        this.auxlex += actual
                        this.estado = -99
                    }
                }
            }

            else if(this.estado==1){
                if(this.isAlpha(actual) || this.isDigit(actual) || actual=="_"){
                    this.auxlex += actual;
                    this.estado = 1;
                }
                else{
                    if(this.palabra_reservada.includes(this.auxlex,0)){
                        this.columna -= 1;
                        this.indice += 1;
                        this.agregarToken(valor_tokens.Palabra_Reservada);
                        this.auxlex = "";
                        contador -= 1;
                    }
                    else if(this.tipo.includes(this.auxlex,0)){
                        this.columna -= 1;
                        this.indice += 1;
                        this.agregarToken(valor_tokens.Tipo_De_Dato);
                        this.auxlex = "";
                        contador -= 1;
                    }
                    else if(this.ciclos.includes(this.auxlex,0)){
                        this.columna -= 1;
                        this.indice += 1;
                        this.agregarToken(valor_tokens.Ciclos);
                        this.auxlex = "";
                        contador -= 1;
                    }
                    else if(this.sentencias.includes(this.auxlex,0)){
                        this.columna -= 1;
                        this.indice += 1;
                        this.agregarToken(valor_tokens.Sentencias);
                        this.auxlex = "";
                        contador -= 1;
                    }
                    else{
                        this.columna -= 1;
                        this.indice += 1;
                        this.agregarToken(valor_tokens.Identificador);
                        this.auxlex = "";
                        contador -= 1;
                    }
                }
            }

            else if(this.estado==2){
                if(this.isDigit(actual)){
                    this.auxlex += actual;
                    this.estado = 2;
                }
                else if(actual == "."){
                    this.auxlex += actual;
                    this.estado = 3;
                }
                else{
                    this.columna -= 1;
                    this.indice += 1;
                    this.agregarToken(valor_tokens.Numero_Entero);
                    this.auxlex = "";
                    contador -= 1;
                }
            }

            else if(this.estado==3){
                if(this.isDigit(actual)){
                    this.auxlex += actual;
                    this.estado = 4;
                }
                else if(actual=="\n"){
                    this.columna = 0
                    this.fila += 1
                    this.estado = -99
                }
                else{
                    this.auxlex += actual
                    this.estado = -99
                }
            }

            else if(this.estado==4){
                if(this.isDigit(actual)){
                    this.auxlex += actual;
                    this.estado = 4;
                }
                else{
                    this.columna -= 1;
                    this.indice += 1;
                    this.agregarToken(valor_tokens.Numero_Decimal);
                    this.auxlex = "";
                    contador -= 1;
                }
            }

            else if(this.estado == 5){
                if(actual != '"'){
                    this.auxlex += actual;
                    this.estado = 5;
                    if(actual == "\n"){
                        this.columna = 0;
                        this.fila += 1;
                        this.estado = 5;
                    }
                }
                else{
                    this.auxlex += actual;
                    this.estado = 6;
                }
            }

            else if(this.estado == 6){
                this.columna -= 1;
                this.indice += 1;
                this.agregarToken(valor_tokens.Cadena);
                this.auxlex = "";
                contador -= 1;
            }

            else if(this.estado == 7){
                if(actual != "'"){
                    this.auxlex += actual;
                    this.estado = 7;
                    if(actual == "\n"){
                        this.columna = 0;
                        this.fila += 1;
                        this.estado = 7;
                    }
                }
                else{
                    this.auxlex += actual;
                    this.estado = 8;
                }
            }

            else if(this.estado == 8){
                this.columna -= 1;
                this.indice += 1;
                this.agregarToken(valor_tokens.Caracter);
                this.auxlex = "";
                contador -= 1;
            }

            else if(this.estado == 9){
                if(actual == "="){
                    this.auxlex += actual;
                    this.estado = 10;
                }
                else{
                    this.columna -= 1;
                    this.indice += 1;
                    this.agregarToken(valor_tokens.Mayor_Que);
                    this.auxlex = "";
                    contador -= 1;
                }
            }

            else if(this.estado == 10){
                this.columna -= 1;
                this.indice += 1;
                this.agregarToken(valor_tokens.Mayor_Igual_Que);
                this.auxlex = "";
                contador -= 1;
            }

            else if(this.estado == 11){
                if(actual == "="){
                    this.auxlex += actual;
                    this.estado = 12;
                }
                else{
                    this.columna -= 1;
                    this.indice += 1;
                    this.agregarToken(valor_tokens.Menor_Que);
                    this.auxlex = "";
                    contador -= 1;
                }
            }

            else if(this.estado == 12){
                this.columna -= 1;
                this.indice += 1;
                this.agregarToken(valor_tokens.Menor_Igual_Que);
                this.auxlex = "";
                contador -= 1;
            }

            else if(this.estado == 13){
                if(actual == "+"){
                    this.auxlex += actual;
                    this.estado = 14;
                }
                else{
                    this.columna -= 1;
                    this.indice += 1;
                    this.agregarToken(valor_tokens.Signo_Mas);
                    this.auxlex = "";
                    contador -= 1;
                }
            }

            else if(this.estado == 14){
                this.columna -= 1;
                this.indice += 1;
                this.agregarToken(valor_tokens.Mas_Mas);
                this.auxlex = "";
                contador -= 1;
            }

            else if(this.estado == 15){
                if(actual == "-"){
                    this.auxlex += actual;
                    this.estado = 16;
                }
                else{
                    this.columna -= 1;
                    this.indice += 1;
                    this.agregarToken(valor_tokens.Signo_Menos);
                    this.auxlex = "";
                    contador -= 1;
                }
            }

            else if(this.estado == 16){
                this.columna -= 1;
                this.indice += 1;
                this.agregarToken(valor_tokens.Menos_Menos);
                this.auxlex = "";
                contador -= 1;
            }

            else if(this.estado==17){
                if(actual == "&"){
                    this.auxlex += actual;
                    this.estado = 18;
                }
                else if(actual=="\n"){
                    this.columna = 0
                    this.fila += 1
                    this.estado = -99
                }
                else{
                    this.auxlex += actual
                    this.estado = -99
                }
            }

            else if(this.estado == 18){
                this.columna -= 1;
                this.indice += 1;
                this.agregarToken(valor_tokens.And);
                this.auxlex = "";
                contador -= 1;
            }

            else if(this.estado == 19){
                if(actual == "|"){
                    this.auxlex += actual;
                    this.estado = 20;
                }
                else if(actual=="\n"){
                    this.columna = 0
                    this.fila += 1
                    this.estado = -99
                }
                else{
                    this.auxlex += actual
                    this.estado = -99
                }
            }

            else if(this.estado == 20){
                this.columna -= 1;
                this.indice += 1;
                this.agregarToken(valor_tokens.Or);
                this.auxlex = "";
                contador -= 1;
            }

            else if(this.estado == 21){
                if(actual == "="){
                    this.auxlex += actual;
                    this.estado = 22;
                }
                else{
                    this.columna -= 1;
                    this.indice += 1;
                    this.agregarToken(valor_tokens.Signo_Igual);
                    this.auxlex = "";
                    contador -= 1;
                }
            }

            else if(this.estado == 22){
                this.columna -= 1;
                this.indice += 1;
                this.agregarToken(valor_tokens.Igual_Igual);
                this.auxlex = "";
                contador -= 1;
            }

            else if(this.estado == 23){
                if(actual == "="){
                    this.auxlex += actual;
                    this.estado = 24;
                }
                else{
                    this.columna -= 1;
                    this.indice += 1;
                    this.agregarToken(valor_tokens.Not);
                    this.auxlex = "";
                    contador -= 1;
                }
            }

            else if(this.estado == 24){
                this.columna -= 1;
                this.indice += 1;
                this.agregarToken(valor_tokens.Diferente);
                this.auxlex = "";
                contador -= 1;
            }

            else if(this.estado==25){
                if(actual == "/"){
                    this.auxlex += actual;
                    this.estado = 26;
                }
                else if(actual == "*"){
                    this.auxlex += actual;
                    this.estado = 28;
                }
                else{
                    this.columna -= 1;
                    this.indice += 1;
                    this.agregarToken(valor_tokens.Diagonal);
                    this.auxlex = "";
                    contador -= 1;
                }
            }

            else if(this.estado == 26){
                if(actual != "\n"){
                    this.auxlex += actual;
                    this.estado = 26;
                }
                else{
                    this.auxlex += actual;
                    this.estado = 27;
                }
            }

            else if(this.estado == 27){
                this.columna = 0;
                this.indice += 1;
                this.fila += 1;
                this.estado = 0;
                this.agregarToken(valor_tokens.Comentario_Unilinea);
                this.auxlex = "";
                contador -= 1;
            }

            else if(this.estado == 28){
                if(actual != "*"){
                    this.auxlex += actual;
                    this.estado = 28;
                    if(actual == "\n"){
                        this.columna = 0;
                        this.fila +=1;
                        this.estado = 28;
                    }
                }
                else{
                    this.auxlex += actual;
                    this.estado = 29;
                }
            }

            else if(this.estado == 29){
                if(actual == "/"){
                    this.auxlex += actual;
                    this.estado = 30;
                }
                else if(actual != "*"){
                    this.estado  = 28;
                    this.auxlex += actual;
                    if(actual == "\n"){
                        this.columna = 0;
                        this.fila += 1;
                        this.estado = 28;
                    }
                }
                else{
                    actual == "*";
                    this.estado = 29;
                    this.auxlex += actual;
                }
            }

            else if(this.estado == 30){
                this.columna -= 1;
                this.indice += 1;
                this.agregarToken(valor_tokens.Comentario_Multilinea);
                this.auxlex = "";
                this.estado = 0;
                contador -= 1;
            }

            else if(this.estado == -99){
                this.columna -=1;
                this.indiceError += 1;
                this.agregarError(valor_error.Desconocido);
                this.auxlex = "";
                contador -= 1;
            }

            contador += 1;
        }
        //console.log(this.lista_de_tokens);
        console.log(this.lista_de_errores);
    }
}