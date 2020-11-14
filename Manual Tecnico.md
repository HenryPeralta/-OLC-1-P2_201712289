---


---

<h1 id="manual-técnico">Manual Técnico!</h1>
<p>Este es el Manual de Técnico para el uso de la pagina. es muy sencillo de utilizar y con este manual se explicara paso a paso.</p>
<h2 id="introducción">Introducción</h2>
<p>Este es un proyecto realizado con la finalidad de que el alumno aprenda a como utilizar Apis y como utilizar los métodos POST Y GET, tambien a como implementar servidores con Go y Node js. El proyecto es un traductor de Java a Python y Javascript y su objetivo es que el Alumno reconozca los Tokens generados y que realice un Análisis sintáctico y utilice el modo pánico para recuperarse de errores sintácticos.</p>
<h2 id="objetivo-principal">Objetivo Principal</h2>
<ul>
<li>Analizar el lenguaje de programación java y traducirlo a python o javascript y hacerle un análisis léxico y un análisis sintáctico.</li>
</ul>
<h2 id="objetivos">Objetivos</h2>
<ul>
<li>Crear una plantilla que funcionara como pagina principal.</li>
<li>Crear un servidor con Go.</li>
<li>Crear dos servidor con Node js</li>
<li>Realizar un Análisis léxico y Sintáctico</li>
<li>Utilizar el modo pánico para recuperarse de errores</li>
<li>Generar la traducción correspondiente.</li>
</ul>
<h2 id="programas-que-se-utilizaron">Programas que se utilizaron</h2>
<ul>
<li>Html</li>
<li>Css</li>
<li>Javascript</li>
<li>Go</li>
<li>Node js</li>
<li>Jison</li>
</ul>
<h2 id="gramática">Gramática</h2>
<p>Gramatica</p>
<p>Inicio -&gt; List_Plantillas</p>
<p>List_Plantillas -&gt; Plantilla  Plantillas2</p>
<p>Plantillas2 -&gt; Plantilla  Plantillas2<br>
| Epsilon</p>
<p>Plantilla -&gt; public  tipo_public</p>
<p>tipo_public -&gt; class  identificador {  Instrucciones_class  }<br>
| interface  identificador {  Instrucciones_funciones  }</p>
<p>Instrucciones_class -&gt; metodos  Instrucciones_class<br>
| declaracion_variables  Instrucciones_class<br>
| Llamada  Instrucciones_class<br>
| Instrucciones  Instrucciones_class<br>
| Epsilon</p>
<p>Instrucciones_funciones -&gt; funciones  Instrucciones_funciones’<br>
| Epsilon</p>
<p>Instrucciones_funciones’ -&gt; funciones  Instrucciones_funciones’<br>
| Epsilon</p>
<p>funciones -&gt; public  tipo_metodo  identificador (  parametros  ) ;</p>
<p>metodos -&gt; public  metodos2</p>
<p>metodos2 -&gt; tipo_metodo  identificador  (  parametros  ) { Instrucciones }<br>
| static void main ( String [] args ) {  Instrucciones }</p>
<p>tipo_metodo -&gt; String<br>
| string<br>
| int<br>
| char<br>
| double<br>
| boolean<br>
| void</p>
<p>parametros -&gt; parametro1  parametros2<br>
| Epsilon</p>
<p>parametro1 -&gt;  tipo_dato  identificador</p>
<p>parametros2 -&gt; ,  parametro1  parametros2<br>
| Epsilon</p>
<p>tipo_dato -&gt; String<br>
| string<br>
| int<br>
| char<br>
| double<br>
| boolean</p>
<p>Instrucciones -&gt; declaracion_variables   Instrucciones<br>
| sentencia_for  Instucciones<br>
| sentencia_while Instrucciones<br>
| sentencia_do Instrucciones<br>
| sentencia_if Instrucciones<br>
| imprimir Instrucciones<br>
| return instrucciones<br>
| asig Instrucciones<br>
| continue ;<br>
| break ;<br>
| Epsilon</p>
<p>Llamada -&gt; identificador opcion_car<br>
| Epsilon</p>
<p>opcion_car -&gt; = expresion ;<br>
| ( lista_expresiones ) ;<br>
| ++;<br>
| --;</p>
<p>sentencia_for -&gt; for ( declaracion_variable ; expresion ; identificador mas_mas ) { Instrucciones }</p>
<p>mas_mas -&gt; ++<br>
| –</p>
<p>sentencia_while -&gt; while ( expresion ) { Instrucciones }</p>
<p>sentencia_do -&gt; do { Instrucciones } while ( expresion ) ;</p>
<p>sentencia_if -&gt; if ( expresion ) { Instrucciones } else</p>
<p>else -&gt; else  opcion_if<br>
| Epsilon</p>
<p>opcion_if -&gt; sentencia_if<br>
| { Instrucciones }</p>
<p>return -&gt; return  expresion ;<br>
| return ;</p>
<p>imprimir -&gt; System . out . print ln ( expresion ) ;</p>
<p>ln -&gt; ln<br>
| Epsilon</p>
<p>declaracion_variables -&gt; tipo_dato identificador asignacion opcion_variable ;</p>
<p>asignacion -&gt; = expresion<br>
| Epsilon</p>
<p>opcion_variable -&gt; , identificador asignacion  opcion_variable<br>
| Epsilon</p>
<p>asig -&gt; identificador = expresion ;<br>
| identificador ++ ;<br>
| identificador --;</p>
<p>expresion -&gt; E logico</p>
<p>logico -&gt; &amp;&amp; expresion<br>
| || expresion<br>
| ! expresion<br>
| ^ expresion<br>
| &gt; expresion<br>
| &lt; expresion<br>
| &gt;= expresion<br>
| &lt;= expresion<br>
| == expresion<br>
| != expresion<br>
| Epsilon</p>
<p>E -&gt; T  EP</p>
<p>EP -&gt; + T EP<br>
| - T EP<br>
| Epsilon</p>
<p>T -&gt; F TP</p>
<p>TP -&gt; * F TP<br>
| / F TP<br>
| Epsilon</p>
<p>F -&gt; valor<br>
| numero_entero<br>
| numero_decimal<br>
| cadena<br>
| caracter<br>
| true<br>
| false<br>
| - expresion<br>
| ! expresion<br>
| ( expresion)</p>
<p>valor -&gt; identificador valor2</p>
<p>valor2 -&gt; ( lista_expresiones )<br>
| ++<br>
| –<br>
| Epsilon</p>
<p>lista_expresiones -&gt; expresion lista_expresiones2<br>
| Epsilon</p>
<p>lista_expresion2 -&gt; , expresion lista_expresion2<br>
| Epsilon</p>

