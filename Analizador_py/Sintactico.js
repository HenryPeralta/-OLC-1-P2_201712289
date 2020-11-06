const {valor_tokens,Tokens} = require('./Tokens');

module.exports = class Analizador_Sintactico{
    constructor(){
        this.numToken = 0;
        this.tokenActual  = null;
        this.listaTokens = [];
        this.listaErrores = [];
        this.listaConsola = [];
        this.existeError = false;
        this.errorSintactico = false;
        this.espacio = "";
        this.sen_for = false;
        this.traduccion = "";
    }

    comparar(tipoDelToken) {
        return this.tokenActual.tipoDelToken == tipoDelToken;
    }

    match(tipoDelToken, auxlex = this.tokenActual.auxlex) {
        var traducido = "";
        if (this.errorSintactico) {
            // Modo Panico
            if (this.numToken < this.listaTokens.length - 1) {
                this.listaConsola.push(`*** Token: ${this.tokenActual.auxlex} Linea: ${this.tokenActual.fila} `);
                this.numToken++;
                this.tokenActual = this.listaTokens[this.numToken];

                if (this.tokenActual.tipoDelToken == valor_tokens.PuntoyComa) {
                    this.errorSintactico = false;
                    this.listaConsola.push(`*** se recupero con ; en la linea ${this.tokenActual.fila}`);
                }
            }
        } else {
            // Metodo Parea
            if (this.comparar(tipoDelToken) && auxlex == this.tokenActual.auxlex) {
                if (this.numToken < this.listaTokens.length - 1) {
                    this.numToken++;
                    this.tokenActual = this.listaTokens[this.numToken];
                    while((this.comparar(valor_tokens.Comentario_Multilinea) || this.comparar(valor_tokens.Comentario_Unilinea)) && this.numToken < this.listaTokens.length - 1) {
                        if (this.comparar(valor_tokens.Comentario_Unilinea)) {
                            traducido += this.tokenActual.auxlex.replace("//","#") + "\n";
                        } else if (this.comparar(valor_tokens.Comentario_Multilinea)) { 
                            traducido += this.tokenActual.auxlex.replace("/*","'''").replace("*/","'''") + "\n\n";
                        }
                        this.numToken++;
                        this.tokenActual = this.listaTokens[this.numToken];
                    }  
                }
            } else {
                this.errorSintact(this.TipoError(tipoDelToken));
            }
        }
        return traducido;
    }

    errorSintact(msg){
        this.listaConsola.push(`-> Error Sintactico: Se encontro ${this.tokenActual.auxlex} y se esperaba ${msg} en la linea ${this.tokenActual.fila}`);
        this.listaErrores.push({
            fila: this.tokenActual.fila,
            columna: this.tokenActual.columna,
            descripcion: `Se encontro ${this.tokenActual.auxlex} y se esperaba ${msg}`
        });
        this.errorSintactico = true;
        this.existeError = true;
    }

    analizar(listaTokens) {
        this.listaTokens = listaTokens;
        this.numToken = 0;
        this.tokenActual = this.listaTokens[this.numToken];

        this.traduccion = this.Inicio();
        console.log(this.traduccion + "------------>");
        console.log(this.listaErrores);

        console.log(this.listaConsola);
        this.listaConsola.push(this.existeError ? "El Analisis Sintactico tiene Errores" : "El Analisis Sintactico fue Exitoso!!!!!");
        console.log(this.existeError ? "El Analisis Sintactico tiene Errores" : "El Analisis Sintactico fue Exitoso!!!!!");
    }

    Inicio() {
        var traducido = "";
        if (this.comparar(valor_tokens.Comentario_Unilinea)) {
            traducido += this.match(valor_tokens.Comentario_Unilinea);
        } 
        else if (this.comparar(valor_tokens.Comentario_Multilinea)) {
            traducido += this.match(valor_tokens.Comentario_Multilinea);
        }
        traducido += this.Lista_Plantillas();
        console.log(traducido);
        return traducido;
    }

    Lista_Plantillas(){
        var traducido = "";

        traducido += this.Plantilla();
        traducido += this.Plantillas2();

        return traducido;
    }

    Plantillas2(){
        var traducido = "";

        if(this.comparar(valor_tokens.Palabra_Reservada)){
            traducido += this.Plantilla();
            traducido += this.Plantillas2();
        }else{
            //Epsilon
        }

        return traducido;
    }

    Plantilla(){
        var traducido = "";

        traducido += this.match(valor_tokens.Palabra_Reservada, "public");
        traducido += this.tipo_public() + "\n";

        return traducido;
    }

    tipo_public(){
        var traducido = "";

        if(this.tokenActual.auxlex == "class"){
            traducido += this.espacio + this.tokenActual.auxlex + " ";
            traducido += this.match(valor_tokens.Palabra_Reservada, "class");
            traducido += this.tokenActual.auxlex + ":"+ "\n";
            traducido += this.match(valor_tokens.Identificador);
            traducido += this.match(valor_tokens.Llave_Abierta);
            this.espacio += "   ";
            traducido += this.Instrucciones_class();
            this.espacio += this.espacio.slice(3);
            traducido += "\n";
            traducido += this.match(valor_tokens.Llave_Cerrada);
        }
        else if(this.tokenActual.auxlex == "interface"){
            traducido += this.espacio + "class ";
            traducido += this.match(valor_tokens.Palabra_Reservada, "interface");
            traducido += this.tokenActual.auxlex + ":" + "\n";
            traducido += this.match(valor_tokens.Identificador);
            traducido += this.match(valor_tokens.Llave_Abierta);
            this.espacio += "   ";
            traducido += this.Instrucciones_funciones(),
            this.espacio = this.espacio.slice(3);
            traducido += "\n";
            traducido += this.match(valor_tokens.Llave_Cerrada);
        }
        else{
            this.errorSintact();
            traducido = "";
        }
        console.log(traducido);
        return traducido;
    }

    Instrucciones_funciones(){
        var traducido = "";
        if(this.comparar(valor_tokens.Palabra_Reservada)){
            traducido += this.funciones();
            traducido += this.Instrucciones_funciones2();
        }else{
            //Epsilon
        }

        return traducido;
    }

    Instrucciones_funciones2(){
        var traducido = "";
        if(this.comparar(valor_tokens.Palabra_Reservada)){
            traducido += this.funciones();
            traducido += this.Instrucciones_funciones2();
        }else{
            //Epsilon
        }

        return traducido;
    }

    funciones(){
        var traducido = "";

        traducido += this.espacio + "def ";
        traducido += this.match(valor_tokens.Palabra_Reservada, "public");
        traducido += this.tipo_metodo();
        traducido += this.tokenActual.auxlex;
        traducido += this.match(valor_tokens.Identificador);
        traducido += this.tokenActual.auxlex;
        traducido += this.match(valor_tokens.Parentesis_Abierto);
        traducido += this.parametros();
        traducido += this.tokenActual.auxlex + ":";
        traducido += this.match(valor_tokens.Parentesis_Cerrado);
        traducido += "\n";
        traducido += this.match(valor_tokens.PuntoyComa);

        console.log(traducido);
        return traducido;
    }

    Instrucciones_class(){
        var traducido = "";

        if(this.tokenActual.auxlex == "public"){
            traducido += this.metodos();
            traducido += this.Instrucciones_class();
        }        
        else if(this.comparar(valor_tokens.Tipo_De_Dato)){
            traducido += this.declaracion_variables();
            traducido += this.Instrucciones_class();           
        }
        else if(this.comparar(valor_tokens.Identificador)){
            traducido += this.Llamada();
            traducido += this.Instrucciones_class();
        }
        else{
            traducido += this.Instrucciones();
        }

        return traducido;
    }

    metodos(){
        var traducido = "";

        traducido += this.match(valor_tokens.Palabra_Reservada, "public");
        traducido += this.metodos2();

        return traducido;
    }

    metodos2(){
        var traducido = "";

        if(this.comparar(valor_tokens.Tipo_De_Dato) || this.tokenActual.auxlex == "void"){
            this.tipo_metodo();
            traducido += this.espacio + "def " + this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Identificador);
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Parentesis_Abierto);
            traducido += this.parametros();
            traducido += this.tokenActual.auxlex + ":" + "\n";
            traducido += this.match(valor_tokens.Parentesis_Cerrado);
            traducido += this.match(valor_tokens.Llave_Abierta);

            this.espacio += "   ";
            var regla = this.Instrucciones();
            if(regla){
                traducido += regla;
            }
            else{
                traducido += this.espacio + "pass" + "\n";
            }
            this.espacio = this.espacio.slice(3);
            traducido += "\n";

            traducido += this.match(valor_tokens.Llave_Cerrada);
        }
        else if(this.tokenActual.auxlex == "static"){
            traducido += this.match(valor_tokens.Palabra_Reservada, "static");
            traducido += this.match(valor_tokens.Palabra_Reservada, "void");
            traducido += this.espacio + this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Palabra_Reservada, "main");
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Parentesis_Abierto);
            traducido += this.match(valor_tokens.Tipo_De_Dato, "String");
            traducido += this.match(valor_tokens.Corchete_Abierto);
            traducido += this.match(valor_tokens.Corchete_Cerrado);
            traducido += this.match(valor_tokens.Palabra_Reservada, "args");
            traducido += this.tokenActual.auxlex + ":" + "\n";
            traducido += this.match(valor_tokens.Parentesis_Cerrado);
            traducido += this.match(valor_tokens.Llave_Abierta);
            
            this.espacio += "   ";
            var regla = this.Instrucciones();
            if(regla){
                traducido += regla;
            }
            else{
                traducido += this.espacio + "pass" + "\n";
            }
            this.espacio = this.espacio.slice(3);
            traducido += "\n";

            traducido += this.match(valor_tokens.Llave_Cerrada);
        }
        else{
            this.errorSintact();
            traducido = "";
        }
        console.log(traducido);
        return traducido;
    }

    tipo_metodo(){
        var traducido = "";

        if(this.comparar(valor_tokens.Tipo_De_Dato)){
            traducido += this.match(valor_tokens.Tipo_De_Dato);
        }
        else if(this.tokenActual.auxlex == "void"){
            traducido += this.match(valor_tokens.Palabra_Reservada, "void");
        }
        else{
            this.errorSintact();
        }
        return traducido;
    }

    Llamada(){
        var traducido = "";

        if(this.comparar(valor_tokens.Identificador)){
            traducido += this.espacio + this.tokenActual.auxlex + " ";
            traducido += this.match(valor_tokens.Identificador);
            traducido += this.opcion_car();
        }
        else{
            //Epsilon
        }

        return traducido;
    }

    opcion_car(){
        var traducido = "";

        if(this.comparar(valor_tokens.Signo_Igual)){
            traducido += this.tokenActual.auxlex + " ";
            traducido += this.match(valor_tokens.Signo_Igual);
            traducido += this.expresion();
            traducido += "\n\n"
            traducido += this.match(valor_tokens.PuntoyComa);
        }
        else if(this.comparar(valor_tokens.Parentesis_Abierto)){
            traducido += this.tokenActual;
            traducido += this.match(valor_tokens.Parentesis_Abierto);
            traducido += this.lista_expresiones();
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Parentesis_Cerrado);
            traducido += "\n\n";
            traducido += this.match(valor_tokens.PuntoyComa);
        }
        else if(this.comparar(valor_tokens.Mas_Mas)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Mas_Mas);
            traducido += "\n\n";
            traducido += this.match(valor_tokens.PuntoyComa);
        }
        else if(this.comparar(valor_tokens.Menos_Menos)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Menos_Menos);
            traducido += "\n\n";
            traducido += this.match(valor_tokens.PuntoyComa);
        }
        else{
            this.errorSintact();
        }

        return traducido;
    }

    Instrucciones(){
        var traducido = "";

        if(this.comparar(valor_tokens.Tipo_De_Dato)){
            traducido += this.declaracion_variables(),
            traducido += this.Instrucciones();
        }
        else if(this.tokenActual.auxlex == "public"){
            traducido += this.metodos();
            traducido += this.Instrucciones();
        }
        else if(this.tokenActual.auxlex == "for"){
            traducido += this.sentencia_for();
            traducido += this.Instrucciones();
        }
        else if(this.tokenActual.auxlex == "while"){
            traducido += this.sentencia_while();
            traducido += this.Instrucciones();
        }
        else if(this.tokenActual.auxlex == "do"){
            traducido += this.sentencia_do();
            traducido += this.Instrucciones();
        }
        else if(this.tokenActual.auxlex == "if"){
            traducido += this.sentencia_if();
            traducido += this.Instrucciones();
        }
        else if(this.tokenActual.auxlex == "System"){
            traducido += this.imprimir();
            traducido += this.Instrucciones();
        }
        else if(this.tokenActual.auxlex == "return"){
            traducido += this.espacio + this.tokenActual.auxlex + " ";
            traducido += this.match(valor_tokens.Palabra_Reservada, "return");
            traducido += this.expresion();

            traducido += "\n";
            traducido += this.match(valor_tokens.PuntoyComa);
        }
        else if(this.tokenActual.auxlex == "continue"){
            traducido += this.espacio + this.tokenActual.auxlex + "\n";
            traducido += this.match(valor_tokens.Palabra_Reservada, "continue");
            traducido += this.match(valor_tokens.PuntoyComa);
        }
        else if(this.tokenActual.auxlex == "break"){
            traducido += this.espacio + this.tokenActual.auxlex + "\n";
            traducido += this.match(valor_tokens.Palabra_Reservada, "break");
            traducido += this.match(valor_tokens.PuntoyComa);
        }
        else if(this.comparar(valor_tokens.Identificador)){
            traducido += this.Llamada();
            traducido += this.Instrucciones();
        }
        else{
            //Epsilon
        }

        return traducido;
    }

    declaracion_variables(){
        var traducido = "";

        if(!this.sen_for){
            traducido += this.espacio + "var ";
        }

        this.tipo_dato();
        traducido += this.tokenActual.auxlex;
        traducido += this.match(valor_tokens.Identificador);
        traducido += this.asignacion();
        traducido += this.opcion_variable();

        if(!this.sen_for){
            traducido += "\n";
            traducido += this.match(valor_tokens.PuntoyComa);
        }

        return traducido;
    }

    asignacion(){
        var traducido  ="";

        if(this.comparar(valor_tokens.Signo_Igual)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Signo_Igual);
            traducido += this.expresion();
        }
        else{
            //Epsilon
        }

        return traducido;
    }

    opcion_variable(){
        var traducido = "";

        if(this.comparar(valor_tokens.Coma)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Coma);
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Identificador);
            traducido += this.asignacion();
            traducido += this.opcion_variable();
        }
        else{
            //Epsilon
        }

        return traducido;
    }

    parametros(){
        var traducido = "";

        if(this.comparar(valor_tokens.Tipo_De_Dato)){
            traducido += this.parametro1();
            traducido += this.parametros2();
        }
        else{
            //Epsilon
        }

        return traducido;
    }

    parametro1(){
        var traducido = "";

        this.tipo_dato();
        traducido += this.tokenActual.auxlex;
        traducido += this.match(valor_tokens.Identificador);

        return traducido;
    }

    parametros2(){
        var traducido = "";

        if(this.comparar(valor_tokens.Coma)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Coma);
            traducido += this.parametro1();
            traducido += this.parametros2();
        }
        else{
            //Epsilon
        }
        return  traducido; 
    }

    tipo_dato(){
        var traducido = "";
        if(this.comparar(valor_tokens.Tipo_De_Dato)){
            traducido += this.match(valor_tokens.Tipo_De_Dato);
        }
        else{
            this.errorSintact();
        }
        return traducido;
    }

    sentencia_for(){
        var traducido = "";
        this.for = true;

        traducido += this.espacio + this.tokenActual.auxlex;
        traducido += this.match(valor_tokens.Ciclos, "for");
        traducido += this.match(valor_tokens.Parentesis_Abierto);
        
        var p = this.declaracion_variables().replace(/ var/g, "");
        p = p.split("=");
        traducido += `${p[0]}`

        traducido += `in range (${p[1].trim()},`
        //traducido += this.match(valor_tokens.PuntoyComa);
        //this.sen_for = false;

        //this.for = true;
        traducido += this.expresion();
        this.for = false;

        traducido += this.match(valor_tokens.PuntoyComa);
        traducido += this.match(valor_tokens.Identificador);
        this.mas_mas();
        traducido += this.match(valor_tokens.Parentesis_Cerrado);
        traducido += "):" + "\n";
        traducido += this.match(valor_tokens.Llave_Abierta);

        this.espacio += "   ";
        var ins = this.Instrucciones();
        if(ins){
            traducido += ins;
        }
        else{
            traducido += this.espacio + "pass" + "\n";
        }
        this.espacio = this.espacio.slice(3);
        traducido += this.match(valor_tokens.Llave_Cerrada);

        traducido += "\n";

        return traducido;
    }

    mas_mas(){
        var traducido = "";
        
        if(this.comparar(valor_tokens.Mas_Mas)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Mas_Mas);
        }
        else if(this.comparar(valor_tokens.Menos_Menos)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Menos_Menos);
        }
        else{
            this.errorSintact();
        }
        return traducido;
    }

    sentencia_while(){
        var traducido = "";

        traducido += this.espacio + this.tokenActual.auxlex + " ";
        traducido += this.match(valor_tokens.Ciclos, "while");
        traducido += this.match(valor_tokens.Parentesis_Abierto);
        traducido += this.expresion();
        traducido += ":" + "\n";
        traducido += this.match(valor_tokens.Parentesis_Cerrado);
        traducido += this.match(valor_tokens.Llave_Abierta);
        this.espacio += "   ";
        var ins = this.Instrucciones();
        if(ins){
            traducido += ins;
        }
        else{
            traducido += this.espacio + "pass" + "\n";
        }
        this.espacio = this.espacio.slice(3);
        traducido += this.match(valor_tokens.Llave_Cerrada);

        traducido += "\n";

        return traducido;
    }

    sentencia_do(){
        var traducido = "";

        traducido += this.match(valor_tokens.Ciclos, "do");
        traducido += this.match(valor_tokens.Llave_Abierta);
        
        this.espacio += "   ";
        var ins = this.Instrucciones();
        if(ins){
            traducido += ins;
        }
        else{
            traducido += this.espacio + "pass" + "\n";
        }
        this.espacio = this.espacio.slice(3);

        traducido += this.match(valor_tokens.Llave_Cerrada);
        traducido += this.espacio + this.tokenActual.auxlex + " ";
        traducido += this.match(valor_tokens.Ciclos, "while");
        traducido += this.match(valor_tokens.Parentesis_Abierto);
        traducido += this.expresion();
        traducido += ":" + "\n";
        traducido += this.match(valor_tokens.Parentesis_Cerrado);
        traducido += this.match(valor_tokens.PuntoyComa);

        return traducido;
    }

    sentencia_if(){
        var traducido = "";

        traducido += this.espacio + this.tokenActual.auxlex + " ";
        traducido += this.match(valor_tokens.Sentencias, "if");
        traducido += this.match(valor_tokens.Parentesis_Abierto);
        traducido += this.expresion();
        traducido += ":" + "\n";
        traducido += this.match(valor_tokens.Parentesis_Cerrado);
        traducido += this.match(valor_tokens.Llave_Abierta);
        
        this.espacio += "   ";
        var ins = this.Instrucciones();
        if(ins){
            traducido += ins;
        }
        else{
            traducido += this.espacio + "pass" + "\n";
        }
        this.espacio = this.espacio.slice(3);
        
        traducido += this.match(valor_tokens.Llave_Cerrada);
        traducido += this.else();

        return traducido.split(`else${this.espeacio}if`).join("elif");
    }

    else(){
        var traducido = "";

        if(this.tokenActual.auxlex == "else"){
            traducido += this.espacio + this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Sentencias, "else");
            traducido += this.opcion_if();
        }
        else{
            //Epsilon
        }
        return traducido;
    }

    opcion_if(){
        var traducido = "";

        if(this.tokenActual.auxlex == "if"){
            traducido += this.sentencia_if();
        }
        else if(this.comparar(valor_tokens.Llave_Abierta)){
            traducido += ":" + "\n";
            traducido += this.match(valor_tokens.Llave_Abierta);

            this.espacio += "   ";
            var ins = this.Instrucciones();
            if(ins){
                traducido += ins;
            }
            else{
                traducido += this.espacio + "pass" + "\n";
            }
            this.espacio = this.espacio.slice(3);

            traducido += "\n";
            traducido += this.match(valor_tokens.Llave_Cerrada);
        }
        else{
            this.errorSintact();
            traducido = "";
        }

        return traducido;
    }

    imprimir(){
        var traducido = "";

        traducido += this.match(valor_tokens.Palabra_Reservada, "System");
        traducido += this.match(valor_tokens.Punto);
        traducido += this.match(valor_tokens.Palabra_Reservada, "out");
        traducido += this.match(valor_tokens.Punto);
        if(this.tokenActual.auxlex  == "print"){
            traducido += this.espacio + this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Palabra_Reservada, "print");
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Parentesis_Abierto);
            traducido += this.expresion();
            traducido += " , end=" + '""';
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Parentesis_Cerrado);
            traducido += "\n";
            traducido += this.match(valor_tokens.PuntoyComa);
        }else if(this.tokenActual.auxlex == "println"){
            traducido += this.espacio + "print";
            traducido += this.match(valor_tokens.Palabra_Reservada, "println");
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Parentesis_Abierto);
            traducido += this.expresion();
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Parentesis_Cerrado);
            traducido += "\n";
            traducido += this.match(valor_tokens.PuntoyComa);
        }

        return traducido;
    }

    expresion(){
        var traducido = "";

        traducido += this.E();
        traducido += this.logico();

        return traducido;
    }

    logico(){
        var traducido = "";

        if(this.comparar(valor_tokens.And)){
            traducido += "and";
            traducido += this.match(valor_tokens.And);
            traducido += this.expresion();
        }
        else if(this.comparar(valor_tokens.Or)){
            traducido += "or";
            traducido += this.match(valor_tokens.Or);
            traducido += this.expresion();
        }
        else if(this.comparar(valor_tokens.Not)){
            traducido += "not";
            traducido += this.match(valor_tokens.Not);
            traducido += this.expresion();
        }
        else if(this.comparar(valor_tokens.Xor)){
            traducido += "xor";
            traducido += this.match(valor_tokens.Xor);
            traducido += this.expresion();
        }
        else if(this.comparar(valor_tokens.Mayor_Que)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Mayor_Que);
            traducido += this.expresion();
        }
        else if(this.comparar(valor_tokens.Menor_Que)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Menor_Que);
            traducido += this.expresion();
        }
        else if(this.comparar(valor_tokens.Mayor_Igual_Que)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Mayor_Igual_Que);
            traducido += this.expresion();
        }
        else if(this.comparar(valor_tokens.Menor_Igual_Que)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Menor_Igual_Que);
            traducido += this.expresion();
        }
        else if(this.comparar(valor_tokens.Igual_Igual)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Igual_Igual);
            traducido += this.expresion();
        }
        else if(this.comparar(valor_tokens.Diferente)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Diferente);
            traducido += this.expresion();
        }
        else{
            //Epsilon
        }
        return traducido;
    }

    E(){
        var traducido = "";

        traducido += this.T();
        traducido += this.EP();

        return traducido;
    }

    EP(){
        var traducido = "";

        if (this.comparar(valor_tokens.Signo_Mas)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Signo_Mas);
            traducido += this.T();
            traducido += this.EP();
        }
        else if(this.comparar(valor_tokens.Signo_Menos)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Signo_Menos);
            traducido += this.T();
            traducido += this.EP();
        }
        else{
            //Epsilon
        }

        return traducido;
    }

    T(){
        var traducido = "";

        traducido += this.F();
        traducido += this.TP();

        return traducido;
    }

    TP(){
        var traducido = "";

        if(this.comparar(valor_tokens.Signo_Por)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Signo_Por);
            traducido += this.F();
            traducido += this.TP();
        }
        else if(this.comparar(valor_tokens.Diagonal)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Diagonal);
            traducido += this.F();
            traducido += this.TP();
        }
        else{
            //Epsilon
        }

        return traducido;
    }

    F(){
        var traducido = "";

        if(this.comparar(valor_tokens.Numero_Entero)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Numero_Entero);
        }
        else if(this.comparar(valor_tokens.Numero_Decimal)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Numero_Decimal);
        }
        else if(this.comparar(valor_tokens.Cadena)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Cadena);
        }
        else if(this.tokenActual.auxlex == "true"){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Palabra_Reservada, "true");
        }
        else if(this.tokenActual.auxlex == "false"){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Palabra_Reservada, "false");
        }
        else if(this.comparar(valor_tokens.Signo_Menos)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Signo_Menos);
            traducido += this.expresion();
        }
        else if(this.comparar(valor_tokens.Not)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Not);
            traducido += this.expresion();
        }
        else if(this.comparar(valor_tokens.Parentesis_Abierto)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Parentesis_Abierto);
            traducido += this.expresion();
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Parentesis_Cerrado);
        }
        else if(this.comparar(valor_tokens.Identificador)){
            traducido += this.valor();
        }
        else{
            this.errorSintact();
            traducido = "";
        }

        return traducido;
    }

    valor(){
        var traducido = "";

        traducido += this.tokenActual.auxlex;
        traducido += this.match(valor_tokens.Identificador);
        traducido += this.valor2();

        return  traducido;
    }

    valor2(){
        var traducido = "";

        if(this.comparar(valor_tokens.Parentesis_Abierto)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Parentesis_Abierto);
            traducido += this.lista_expresiones();
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Parentesis_Cerrado);
        }
        else if(this.comparar(valor_tokens.Mas_Mas)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Mas_Mas);
        }
        else if(this.comparar(valor_tokens.Menos_Menos)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Menos_Menos);
        }
        else{
            //Epsilon
        }

        return traducido;
    }

    lista_expresiones(){
        var traducido = "";

        if(this.comparar(valor_tokens.Identificador) || this.comparar(valor_tokens.Numero_Entero) || this.comparar(valor_tokens.Numero_Decimal) || this.tokenActual == "true" || this.tokenActual == "false" || this.comparar(valor_tokens.Parentesis_Abierto)){
            traducido += this.expresion();
            traducido += this.lista_expresiones2();
        }
        else{
            //Epsilon
        }

        return traducido;
    }

    lista_expresiones2(){
        var traducido = "";

        if(this.comparar(valor_tokens.Coma)){
            traducido += this.tokenActual.auxlex;
            traducido += this.match(valor_tokens.Coma);
            traducido += this.expresion();
            traducido += this.lista_expresiones2();
        }
        else{
            //Epsilon
        }

        return traducido;
    }

    TipoError(tipoDelToken){
        switch(tipoDelToken){
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

