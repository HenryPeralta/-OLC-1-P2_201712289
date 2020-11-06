/*-----------------------------------Importaciones------------------------------------*/
%{
    const nodo_arbol = require('./nodo_arbol');
%}
/*--------------------------------------Lexico----------------------------------------*/
%lex
%options case-sensitive
%%
\s+                                        /*omitir espacios en blanco*/
"//"[\n]*                                  %{ yytext.substr(1,yyleng-2); return 'tk_comentario';%}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]        %{ yytext.substr(1,yyleng-2); return 'tk_comentario_multilinea'; %}
[\t\r\n\f]                                 %{ /*se ignoran*/ %}
[0-9]+\b                                   %{ return 'tk_numero_entero';%}
[0-9]+("."[0-9]+)?\b                       %{ return 'tk_numero_decimal';%}
"public"                                   %{ return 'tk_public';%}
"static"                                   %{ return 'tk_static';%}
"main"                                     %{ return 'tk_main';%}
"args"                                     %{ return 'tk_args';%}
"class"                                    %{ return 'tk_class';%}
"interface"                                %{ return 'tk_interface';%}
"void"                                     %{ return 'tk_void';%}
"break"                                    %{ return 'tk_break';%}
"continue"                                 %{ return 'tk_continue';%}
"return"                                   %{ return 'tk_return';%}
"true"                                     %{ return 'tk_true';%}
"false"                                    %{ return 'tk_false';%}
"System"                                   %{ return 'tk_System';%}
"out"                                      %{ return 'tk_out';%}
"print"                                    %{ return 'tk_print';%}
"println"                                  %{ return 'tk_println';%}
"int"                                      %{ return 'tk_int';%}
"string"                                   %{ return 'tk_string';%}
"boolean"                                  %{ return 'tk_boolean';%}
"double"                                   %{ return 'tk_double';%}
"String"                                   %{ return 'tk_String';%}
"char"                                     %{ return 'tk_char';%}
"for"                                      %{ return 'tk_for';%}
"while"                                    %{ return 'tk_while';%}
"do"                                       %{ return 'tk_do';%}
"if"                                       %{ return 'tk_if';%}
"else"                                     %{ return 'tk_else';%}
[\"][^\\\"]*([\\][\\\"ntr][^\\\"]*)*[\"]   %{ yytext.substr(1,yyleng-2); return 'tk_cadena'; %}
[\'][^\\\']*([\\][\\\'ntr][^\\\']*)*[\']   %{ yytext.substr(1,yyleng-2); return 'tk_caracter'; %}
","                                        %{ return 'tk_coma';%}
"."                                        %{ return 'tk_punto';%}
";"                                        %{ return 'tk_punto_y_coma';%}
"("                                        %{ return 'tk_parentesis_abierto';%}
")"                                        %{ return 'tk_parentesis_cerrado';%}
"{"                                        %{ return 'tk_llave_abierta';%}
"}"                                        %{ return 'tk_llave_cerrada';%}
">"                                        %{ return 'tk_mayor_que';%}
"<"                                        %{ return 'tk_menor_que';%}
">="                                       %{ return 'tk_mayor_igual_que';%}
"<="                                       %{ return 'tk_menor_igual_que';%}
"="                                        %{ return 'tk_signo_igual';%}
"+"                                        %{ return 'tk_signo_mas';%}
"-"                                        %{ return 'tk_signo_menos';%}
"*"                                        %{ return 'tk_signo_por';%}
"/"                                        %{ return 'tk_diagonal';%}
"["                                        %{ return 'tk_corchete_abierto';%}
"]"                                        %{ return 'tk_corchete_cerrado';%}
":"                                        %{ return 'tk_dos_puntos';%}
"&&"                                       %{ return 'tk_and';%}
"||"                                       %{ return 'tk_or';%}
"=="                                       %{ return 'tk_igual_igual';%}
"!="                                       %{ return 'tk_diferente';%}
"++"                                       %{ return 'tk_mas_mas';%}
"--"                                       %{ return 'tk_menos_menos';%}
"_"                                        %{ return 'tk_guion_bajo';%}
"!"                                        %{ return 'tk_not';%}
"^"                                        %{ return 'tk_xor';%}
[a-zA-Z]([a-zA-Z0-9_])*                    %{ return 'tk_identificador';%}


<<EOF>>                                    %{ return 'EOF';%}
.
/lex

/*--------------------------------------Sintactico----------------------------------------*/

%left tk_or tk_and tk_xor
%left tk_igual_igual tk_diferente
%left tk_menor_que tk_menor_igual_que tk_mayor_que tk_mayor_igual_que
%left tk_signo_mas tk_signo_menos
%left tk_signo_por tk_diagonal
%left tk_parentesis_abierto tk_parentesis_cerrado
%right tk_not
%right tk_mas_mas tk_menos_menos

%start Inicio
%%

Inicio: Lista_Plantillas EOF

Lista_Plantillas: Plantilla Plantillas2

Plantillas2: Plantilla Plantillas2
            | ;

Plantilla: tk_public tipo_public

tipo_public: tk_class tk_identificador tk_llave_abierta Instrucciones_class tk_llave_cerrada
            | tk_interface tk_identificador tk_llave_cerrada Instrucciones_funciones tk_llave_cerrada

Instrucciones_class: metodos Instrucciones_class
                    | declaracion_variables Instrucciones_class
                    | Llamada Instrucciones_class
                    | Instrucciones Instrucciones_class
                    | ;

Instrucciones_funciones: funciones Instrucciones_funciones2
                        | ;

Instrucciones_funciones2: funciones Instrucciones_funciones2
                        | ;

funciones: tk_public tipo_metodo tk_identificador tk_parentesis_abierto parametros tk_parentesis_cerrado tk_punto_y_coma

metodos: tk_public metodos2

metodos2: tipo_metodo tk_identificador tk_parentesis_abierto parametros tk_parentesis_cerrado tk_llave_abierta Instrucciones tk_llave_cerrada
        | tk_static tk_void tk_main tk_parentesis_abierto tk_String tk_corchete_abierto tk_corchete_cerrado tk_args tk_parentesis_cerrado tk_llave_abierta Instrucciones tk_llave_cerrada

tipo_metodo: tk_String
            | tk_string
            | tk_int
            | tk_char
            | tk_double
            | tk_boolean
            | tk_void

parametros: parametro1 parametros2
            | ;

parametro1: tipo_dato tk_identificador

parametros2: tk_coma parametro1 parametros2
            | ;

tipo_dato: tk_String
            | tk_string
            | tk_int
            | tk_char
            | tk_double
            | tk_double
            | tk_boolean

Instrucciones: declaracion_variables Instrucciones
                | sentencia_for Instrucciones
                | sentencia_while Instrucciones
                | sentencia_do Instrucciones
                | sentencia_if Instrucciones
                | imprimir Instrucciones
                | return Instrucciones
                | asig Instrucciones
                | tk_continue tk_punto_y_coma
                | tk_break tk_punto_y_coma
                | ;

Llamada: tk_identificador tk_parentesis_abierto lista_expresiones tk_parentesis_cerrado

sentencia_for: tk_for tk_parentesis_abierto declaracion_variables expresion tk_punto_y_coma tk_identificador mas_mas tk_parentesis_cerrado tk_llave_cerrada Instrucciones tk_llave_abierta

mas_mas: tk_mas_mas
        | tk_menos_menos

sentencia_while: tk_while tk_parentesis_abierto expresion tk_parentesis_cerrado tk_llave_abierta Instrucciones tk_llave_cerrada

sentencia_do: tk_do tk_llave_abierta Instrucciones tk_llave_cerrada tk_while tk_parentesis_abierto expresion tk_parentesis_cerrado tk_punto_y_coma

sentencia_if: tk_if tk_parentesis_abierto expresion tk_parentesis_cerrado tk_llave_abierta Instrucciones tk_llave_cerrada ELSE

ELSE: tk_else opcion_if
    | ;

opcion_if: sentencia_if
            | tk_llave_abierta Instrucciones tk_llave_cerrada

return: tk_return expresion tk_punto_y_coma
        | tk_return tk_punto_y_coma

imprimir: tk_System tk_punto tk_out tk_print tk_parentesis_abierto expresion tk_parentesis_cerrado tk_punto_y_coma

declaracion_variables: tipo_dato tk_identificador asignacion opcion_variable tk_punto_y_coma

asignacion: tk_signo_igual expresion
            | ;

opcion_variable: tk_coma tk_identificador asignacion opcion_variable
                | ;

asig: tk_identificador tk_signo_igual expresion
    | tk_identificador tk_mas_mas tk_punto_y_coma
    | tk_identificador tk_menos_menos tk_punto_y_coma

expresion: tk_and expresion
            | tk_or expresion
            | tk_not expresion
            | tk_xor expresion
            | tk_mayor_que expresion
            | tk_menor_que expresion
            | tk_mayor_igual_que
            | tk_menor_igual_que
            | tk_igual_igual
            | tk_diferente
            | tk_numero_entero
            | tk_numero_decimal
            | tk_cadena
            | tk_true
            | tk_false
            | tk_caracter
            | valor
            | tk_parentesis_abierto expresion tk_parentesis_cerrado

valor: tk_identificador valor2

valor2: tk_parentesis_abierto lista_expresiones tk_parentesis_cerrado
        | tk_mas_mas
        | tk_menos_menos
        | ;

lista_expresiones: expresion lista_expresiones2
                    | ;

lista_expresiones2: tk_coma expresion lista_expresiones2
                    | ;


