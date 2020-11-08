/*-----------------------------------Importaciones------------------------------------*/
%{
    const Nodo = require('./nodo_arbol');
    const Tokensjavascript = require('./Tokensjavascript');
    const Erroresjavascript = require('./Erroresjavascript');
    var lista_tokens = [];
    var lista_errores = [];
    var lista_error_sintactico = [];
%}
/*--------------------------------------Lexico----------------------------------------*/
%lex
%options case-sensitive
%%
\s+                                        %{/*omitir espacios en blanco*/ %}
"/""/".*                                   %{ lista_tokens.push(new Tokensjavascript("Comentario", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_comentario';%}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]        %{ lista_tokens.push(new Tokensjavascript("Comentario Multilinea", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_comentario_multilinea'; %}
[\t\r\n\f]+                                %{ /*se ignoran*/ %}
"public"                                   %{ lista_tokens.push(new Tokensjavascript("Palabra Reservada", yytext, yylloc.first_line, yylloc.first_column));return 'tk_public';%}
"static"                                   %{ lista_tokens.push(new Tokensjavascript("Palabra Reservada", yytext, yylloc.first_line, yylloc.first_column));return 'tk_static';%}
"main"                                     %{ lista_tokens.push(new Tokensjavascript("Palabra Reservada", yytext, yylloc.first_line, yylloc.first_column));return 'tk_main';%}
"args"                                     %{ lista_tokens.push(new Tokensjavascript("Palabra Reservada", yytext, yylloc.first_line, yylloc.first_column));return 'tk_args';%}
"class"                                    %{ lista_tokens.push(new Tokensjavascript("Palabra Reservada", yytext, yylloc.first_line, yylloc.first_column));return 'tk_class';%}
"interface"                                %{ lista_tokens.push(new Tokensjavascript("Palabra Reservada", yytext, yylloc.first_line, yylloc.first_column));return 'tk_interface';%}
"void"                                     %{ lista_tokens.push(new Tokensjavascript("Palabra Reservada", yytext, yylloc.first_line, yylloc.first_column));return 'tk_void';%}
"break"                                    %{ lista_tokens.push(new Tokensjavascript("Palabra Reservada", yytext, yylloc.first_line, yylloc.first_column));return 'tk_break';%}
"continue"                                 %{ lista_tokens.push(new Tokensjavascript("Palabra Reservada", yytext, yylloc.first_line, yylloc.first_column));return 'tk_continue';%}
"return"                                   %{ lista_tokens.push(new Tokensjavascript("Palabra Reservada", yytext, yylloc.first_line, yylloc.first_column));return 'tk_return';%}
"true"                                     %{ lista_tokens.push(new Tokensjavascript("Palabra Reservada", yytext, yylloc.first_line, yylloc.first_column));return 'tk_true';%}
"false"                                    %{ lista_tokens.push(new Tokensjavascript("Palabra Reservada", yytext, yylloc.first_line, yylloc.first_column));return 'tk_false';%}
"System"                                   %{ lista_tokens.push(new Tokensjavascript("Palabra Reservada", yytext, yylloc.first_line, yylloc.first_column));return 'tk_System';%}
"out"                                      %{ lista_tokens.push(new Tokensjavascript("Palabra Reservada", yytext, yylloc.first_line, yylloc.first_column));return 'tk_out';%}
"println"                                  %{ lista_tokens.push(new Tokensjavascript("Palabra Reservada", yytext, yylloc.first_line, yylloc.first_column));return 'tk_print';%}
"print"                                    %{ lista_tokens.push(new Tokensjavascript("Palabra Reservada", yytext, yylloc.first_line, yylloc.first_column));return 'tk_print';%}
"println"                                  %{ lista_tokens.push(new Tokensjavascript("Palabra Reservada", yytext, yylloc.first_line, yylloc.first_column));return 'tk_println';%}
"int"                                      %{ lista_tokens.push(new Tokensjavascript("Tipo de Dato", yytext, yylloc.first_line, yylloc.first_column));return 'tk_int';%}
"string"                                   %{ lista_tokens.push(new Tokensjavascript("Tipo de Dato", yytext, yylloc.first_line, yylloc.first_column));return 'tk_string';%}
"boolean"                                  %{ lista_tokens.push(new Tokensjavascript("Tipo de Dato", yytext, yylloc.first_line, yylloc.first_column));return 'tk_boolean';%}
"double"                                   %{ lista_tokens.push(new Tokensjavascript("Tipo de Dato", yytext, yylloc.first_line, yylloc.first_column));return 'tk_double';%}
"String"                                   %{ lista_tokens.push(new Tokensjavascript("Tipo de Dato", yytext, yylloc.first_line, yylloc.first_column));return 'tk_String';%}
"char"                                     %{ lista_tokens.push(new Tokensjavascript("Tipo de Dato", yytext, yylloc.first_line, yylloc.first_column));return 'tk_char';%}
"for"                                      %{ lista_tokens.push(new Tokensjavascript("Ciclo", yytext, yylloc.first_line, yylloc.first_column));return 'tk_for';%}
"while"                                    %{ lista_tokens.push(new Tokensjavascript("Ciclo", yytext, yylloc.first_line, yylloc.first_column));return 'tk_while';%}
"do"                                       %{ lista_tokens.push(new Tokensjavascript("Ciclo", yytext, yylloc.first_line, yylloc.first_column));return 'tk_do';%}
"if"                                       %{ lista_tokens.push(new Tokensjavascript("Sentencia", yytext, yylloc.first_line, yylloc.first_column));return 'tk_if';%}
"else"                                     %{ lista_tokens.push(new Tokensjavascript("Sentencia", yytext, yylloc.first_line, yylloc.first_column));return 'tk_else';%}
[\"][^\\\"]*([\\][\\\"ntr][^\\\"]*)*[\"]   %{ lista_tokens.push(new Tokensjavascript("Cadena", yytext, yylloc.first_line, yylloc.first_column));return 'tk_cadena'; %}
[\'][^\\\']*([\\][\\\'ntr][^\\\']*)*[\']   %{ lista_tokens.push(new Tokensjavascript("Caracter", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_caracter'; %}
","                                        %{ lista_tokens.push(new Tokensjavascript("Coma", yytext, yylloc.first_line, yylloc.first_column));return 'tk_coma';%}
"."                                        %{ lista_tokens.push(new Tokensjavascript("Punto", yytext, yylloc.first_line, yylloc.first_column));return 'tk_punto';%}
";"                                        %{ lista_tokens.push(new Tokensjavascript("Punto y Coma", yytext, yylloc.first_line, yylloc.first_column));return 'tk_punto_y_coma';%}
"("                                        %{ lista_tokens.push(new Tokensjavascript("Parentesis Abierto", yytext, yylloc.first_line, yylloc.first_column));return 'tk_parentesis_abierto';%}
")"                                        %{ lista_tokens.push(new Tokensjavascript("Parentesis Cerrado", yytext, yylloc.first_line, yylloc.first_column));return 'tk_parentesis_cerrado';%}
"{"                                        %{ lista_tokens.push(new Tokensjavascript("Llave Abierta", yytext, yylloc.first_line, yylloc.first_column));return 'tk_llave_abierta';%}
"}"                                        %{ lista_tokens.push(new Tokensjavascript("Llave Cerrada", yytext, yylloc.first_line, yylloc.first_column));return 'tk_llave_cerrada';%}
"++"                                       %{ lista_tokens.push(new Tokensjavascript("Mas Mas", yytext, yylloc.first_line, yylloc.first_column));return 'tk_mas_mas';%}
"--"                                       %{ lista_tokens.push(new Tokensjavascript("Menos Menos", yytext, yylloc.first_line, yylloc.first_column));return 'tk_menos_menos';%}
">="                                       %{ lista_tokens.push(new Tokensjavascript("Mayor Igual Que", yytext, yylloc.first_line, yylloc.first_column));return 'tk_mayor_igual_que';%}
"<="                                       %{ lista_tokens.push(new Tokensjavascript("Menor Igual Que", yytext, yylloc.first_line, yylloc.first_column));return 'tk_menor_igual_que';%}
">"                                        %{ lista_tokens.push(new Tokensjavascript("Mayor Que", yytext, yylloc.first_line, yylloc.first_column));return 'tk_mayor_que';%}
"<"                                        %{ lista_tokens.push(new Tokensjavascript("Menor Que", yytext, yylloc.first_line, yylloc.first_column));return 'tk_menor_que';%}
"&&"                                       %{ lista_tokens.push(new Tokensjavascript("And", yytext, yylloc.first_line, yylloc.first_column));return 'tk_and';%}
"||"                                       %{ lista_tokens.push(new Tokensjavascript("Or", yytext, yylloc.first_line, yylloc.first_column));return 'tk_or';%}
"=="                                       %{ lista_tokens.push(new Tokensjavascript("Igual Igual", yytext, yylloc.first_line, yylloc.first_column));return 'tk_igual_igual';%}
"!="                                       %{ lista_tokens.push(new Tokensjavascript("Diferente", yytext, yylloc.first_line, yylloc.first_column));return 'tk_diferente';%}
"="                                        %{ lista_tokens.push(new Tokensjavascript("Signo Igual", yytext, yylloc.first_line, yylloc.first_column));return 'tk_signo_igual';%}
"+"                                        %{ lista_tokens.push(new Tokensjavascript("Signo Mas", yytext, yylloc.first_line, yylloc.first_column));return 'tk_signo_mas';%}
"-"                                        %{ lista_tokens.push(new Tokensjavascript("Signo Menos", yytext, yylloc.first_line, yylloc.first_column));return 'tk_signo_menos';%}
"*"                                        %{ lista_tokens.push(new Tokensjavascript("Signo Por", yytext, yylloc.first_line, yylloc.first_column));return 'tk_signo_por';%}
"/"                                        %{ lista_tokens.push(new Tokensjavascript("Diagonal", yytext, yylloc.first_line, yylloc.first_column));return 'tk_diagonal';%}
"["                                        %{ lista_tokens.push(new Tokensjavascript("Corchete Abierto", yytext, yylloc.first_line, yylloc.first_column));return 'tk_corchete_abierto';%}
"]"                                        %{ lista_tokens.push(new Tokensjavascript("Corchete Cerrado", yytext, yylloc.first_line, yylloc.first_column));return 'tk_corchete_cerrado';%}
":"                                        %{ lista_tokens.push(new Tokensjavascript("Dos Puntos", yytext, yylloc.first_line, yylloc.first_column));return 'tk_dos_puntos';%}
"_"                                        %{ lista_tokens.push(new Tokensjavascript("Guion Bajo", yytext, yylloc.first_line, yylloc.first_column));return 'tk_guion_bajo';%}
"!"                                        %{ lista_tokens.push(new Tokensjavascript("Not", yytext, yylloc.first_line, yylloc.first_column));return 'tk_not';%}
"^"                                        %{ lista_tokens.push(new Tokensjavascript("Xor", yytext, yylloc.first_line, yylloc.first_column));return 'tk_xor';%}
[0-9]+("."[0-9]+)?\b                       %{ lista_tokens.push(new Tokensjavascript("Numero Entero", yytext, yylloc.first_line, yylloc.first_column));return 'tk_numero_entero';%}
[a-zA-Z]([a-zA-Z0-9_])*                    %{ lista_tokens.push(new Tokensjavascript("Identificador", yytext, yylloc.first_line, yylloc.first_column));return 'tk_identificador';%}

<<EOF>>                                    %{ return 'EOF';%}
.                                          %{ lista_errores.push(new Erroresjavascript("Error Lexico", yytext, yylloc.first_line, yylloc.first_column)); %}
/lex

/*--------------------------------------Sintactico----------------------------------------*/

%left tk_or tk_and tk_xor
%left tk_igual_igual tk_diferente
%left tk_menor_que tk_menor_igual_que tk_mayor_que tk_mayor_igual_que
%left tk_signo_mas tk_signo_menos
%left tk_signo_por tk_diagonal
%left tk_parentesis_abierto tk_parentesis_cerrado
%left UMENOS
%right tk_not
%right tk_mas_mas tk_menos_menos

%start Inicio
%%

Inicio: Lista_Plantillas EOF{

        return{
                lista_tokens: lista_tokens,
                lista_errores: lista_errores,
                lista_error_sintactico
        };

};

Lista_Plantillas: Plantilla Plantillas2
                | tk_comentario Plantillas2
                | tk_comentario_multilinea Plantillas2;

Plantillas2: Plantilla Plantillas2
            | tk_comentario Plantillas2
            | tk_comentario_multilinea Plantillas2
            | ;

Plantilla: tk_public tipo_public;

tipo_public: tk_class tk_identificador tk_llave_abierta Instrucciones_class tk_llave_cerrada
            | tk_interface tk_identificador tk_llave_abierta Instrucciones_funciones tk_llave_cerrada
            | error tk_llave_cerrada
             {   console.log("error sintactico -> fila: " + this._$.first_line);
             lista_error_sintactico.push(new Tokensjavascript("Error Sintactico en la fila: " + this._$.first_line + " y columna: " + this._$.first_column, yytext, this._$.first_line, this._$.first_column)); 
             };

Instrucciones_class: metodos Instrucciones_class
                    | declaracion_variables Instrucciones_class
                    | Llamada Instrucciones_class
                    | Instrucciones Instrucciones_class
                    | tk_comentario Instrucciones_class
                    | tk_comentario_multilinea Instrucciones_class
                    | ;

Instrucciones_funciones: funciones Instrucciones_funciones2
                        | tk_comentario Instrucciones_funciones2
                        | tk_comentario_multilinea Instrucciones_funciones2
                        | ;

Instrucciones_funciones2: funciones Instrucciones_funciones2
                        | tk_comentario Instrucciones_funciones2
                        | tk_comentario_multilinea Instrucciones_funciones2
                        | ;

funciones: tk_public tipo_metodo tk_identificador tk_parentesis_abierto parametros tk_parentesis_cerrado tk_punto_y_coma;

metodos: tk_public metodos2;

metodos2: tipo_metodo tk_identificador tk_parentesis_abierto parametros tk_parentesis_cerrado tk_llave_abierta Instrucciones tk_llave_cerrada
        | tk_static tk_void tk_main tk_parentesis_abierto tk_String tk_corchete_abierto tk_corchete_cerrado tk_args tk_parentesis_cerrado tk_llave_abierta Instrucciones tk_llave_cerrada;

tipo_metodo: tk_String
            | tk_string
            | tk_int
            | tk_char
            | tk_double
            | tk_boolean
            | tk_void;

parametros: parametro1 parametros2
            | ;

parametro1: tipo_dato tk_identificador;

parametros2: tk_coma parametro1 parametros2
            | ;

tipo_dato: tk_String
            | tk_string
            | tk_int
            | tk_char
            | tk_double
            | tk_double
            | tk_boolean;

Instrucciones: declaracion_variables Instrucciones
                | Instrucciones_funciones Instrucciones
                | metodos Instrucciones
                | sentencia_for Instrucciones
                | sentencia_while Instrucciones
                | sentencia_do Instrucciones
                | sentencia_if Instrucciones
                | imprimir Instrucciones
                | return Instrucciones
                | asig Instrucciones
                | Llamada Instrucciones
                | tk_continue tk_punto_y_coma
                | tk_break tk_punto_y_coma
                | tk_comentario Instrucciones
                | tk_comentario_multilinea Instrucciones
                | ;

Llamada: tk_identificador tk_parentesis_abierto lista_expresiones tk_parentesis_cerrado tk_punto_y_coma
        |   error tk_punto_y_coma
                {   console.log("error sintactico -> LINEA: " + this._$.first_line);
                lista_error_sintactico.push(new Tokensjavascript("Error Sintactico en la fila: " + this._$.first_line + " y columna: " + this._$.first_column, yytext, this._$.first_line, this._$.first_column));
                };

sentencia_for: tk_for tk_parentesis_abierto declaracion_variables expresion tk_punto_y_coma tk_identificador mas_mas tk_parentesis_cerrado tk_llave_abierta Instrucciones tk_llave_cerrada
                | error tk_llave_cerrada
                {   console.log("error sintactico -> LINEA: " + this._$.first_line);
                lista_error_sintactico.push(new Tokensjavascript("Error Sintactico en la fila: " + this._$.first_line + " y columna: " + this._$.first_column, yytext, this._$.first_line, this._$.first_column));
                };

mas_mas: tk_mas_mas
        | tk_menos_menos;

sentencia_while: tk_while tk_parentesis_abierto expresion tk_parentesis_cerrado tk_llave_abierta Instrucciones tk_llave_cerrada;

sentencia_do: tk_do tk_llave_abierta Instrucciones tk_llave_cerrada tk_while tk_parentesis_abierto expresion tk_parentesis_cerrado tk_punto_y_coma;

sentencia_if: tk_if tk_parentesis_abierto expresion tk_parentesis_cerrado tk_llave_abierta Instrucciones tk_llave_cerrada else;

else: tk_else opcion_if
    | ;

opcion_if: sentencia_if
            | tk_llave_abierta Instrucciones tk_llave_cerrada;

return: tk_return expresion tk_punto_y_coma
        | tk_return tk_punto_y_coma;

imprimir: tk_System tk_punto tk_out tk_punto tk_print tk_parentesis_abierto expresion tk_parentesis_cerrado tk_punto_y_coma
        | error tk_punto_y_coma
        {   console.log("error sintactico -> LINEA: " + this._$.first_line);
        lista_error_sintactico.push(new Tokensjavascript("Error Sintactico en la fila: " + this._$.first_line + " y columna: " + this._$.first_column, yytext, this._$.first_line, this._$.first_column));
        };

declaracion_variables: tipo_dato tk_identificador asignacion opcion_variable tk_punto_y_coma
                |   error tk_punto_y_coma
                {   console.log("error sintactico -> LINEA: " + this._$.first_line);
                lista_error_sintactico.push(new Tokensjavascript("Error Sintactico en la fila: " + this._$.first_line + " y columna: " + this._$.first_column, yytext, this._$.first_line, this._$.first_column));
                };

asignacion: tk_signo_igual expresion
            | ;

opcion_variable: tk_coma tk_identificador asignacion opcion_variable
                | ;

asig: tk_identificador asig2;

asig2: tk_signo_igual expresion tk_punto_y_coma
    | tk_mas_mas tk_punto_y_coma
    | tk_menos_menos tk_punto_y_coma;

expresion: expresion tk_and expresion
            | expresion tk_or expresion
            | tk_not expresion
            | tk_signo_menos expresion %prec UMENOS
            | expresion tk_xor expresion
            | expresion tk_mayor_que expresion
            | expresion tk_menor_que expresion
            | expresion tk_mayor_igual_que expresion
            | expresion tk_menor_igual_que expresion
            | expresion tk_igual_igual expresion
            | expresion tk_diferente expresion
            | expresion tk_signo_mas expresion
            | expresion tk_signo_menos expresion
            | expresion tk_signo_por expresion
            | expresion tk_diagonal expresion
            | tk_numero_entero
            | tk_cadena
            | tk_true
            | tk_false
            | tk_caracter
            | valor
            | tk_parentesis_abierto expresion tk_parentesis_cerrado;

valor: tk_identificador valor2; /*{

}*/

valor2: tk_parentesis_abierto lista_expresiones tk_parentesis_cerrado /*{
                                                                        $$.agregarHijo($2.nodo)
                                                                     }*/
        | tk_mas_mas/*{
                $$ = new Nodo("Mas Mas","Mas Mas");
                $$.agregarHijo(new Nodo("mas_mas", $1));
                $$ = {nodo: $$};
        }*/
        | tk_menos_menos/*{
                $$ = new Nodo("Menos Menos","Menos Menos");
                $$.agregarHijo(new Nodo("menos_menos", $1));
                $$ = {nodo: $$};
        }*/
        | ;

lista_expresiones: expresion lista_expresiones2 /*{
                                                        $$ = new Nodo("Lista_expresiones", "Lista_expresiones");
                                                        $$.agregarHijo($1.nodo);
                                                        if($2){
                                                                $$.agregarHijo($2.nodo);
                                                        }

                                                        $$ = {nodo: $$}
                                                }*/
                    | ;

lista_expresiones2: tk_coma expresion lista_expresiones2 {
                                                          $$ = new Nodo("Lista_expresiones", "Lista_expresiones");
                                                          $$.agregarHijo($2.nodo);
                                                          if($3){
                                                                $$.agregarHijo($3.nodo);
                                                          }
                                                          console.log($1)
                                                        }
                    | ;
