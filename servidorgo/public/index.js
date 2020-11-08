var contador=0;
function get_cont(){
    return contador++;
}

var vent_focus="pestana1";
function get_vent(){
    return vent_focus;
}

function set_vent(vent){
    vent_focus=vent;
}

var lista=new Array();
function linkedlist(pestana,nombre) {
    var obj=new Object();
    obj.pestana=pestana;
    obj.nombre=nombre;
    lista.push(obj);
}

function deletepes(pestana){
    for(var i=0;i<lista.length;i++){
        if(lista[i].pestana==pestana){
            delete lista[i];
        }
    }
}

/*let plox = document.getElementById("contenidopestanas")
let ta=document.createElement("textarea");
ta.setAttribute('id','textarea');
ta.setAttribute('name','textarea');
ta.setAttribute('class','ta');
ta.cols=25;
ta.rows=25;
plox.appendChild(ta)

let lista = document.getElementById("lista")
let li = document.createElement("li")
li.innerHTML = "Opcion 4"
lista.appendChild(li)*/

/*--------------------------------------Funcion Al Cambiar Ventana---------------------------------------*/
function index(pestanias, pestania) {
    var id=pestania.replace('pestana','');
    set_vent('textarea'+id);

    var pestanna1 = document.getElementById(pestania);
    var listaPestannas = document.getElementById(pestanias);
    var cpestanna = document.getElementById('c'+pestania);
    var listacPestannas = document.getElementById('contenido'+pestanias);

    var i=0;
    while (typeof listacPestannas.getElementsByTagName('div')[i] != 'undefined'){
        $(document).ready(function(){
            $(listacPestannas.getElementsByTagName('div')[i]).css('display','none');
            $(listaPestannas.getElementsByTagName('li')[i]).css('background','');
            $(listaPestannas.getElementsByTagName('li')[i]).css('padding-bottom','');
        });
        i += 1;
    }

    $(document).ready(function(){
        $(cpestanna).css('display','');
        $(pestanna1).css('background','dimgray');
        $(pestanna1).css('padding-bottom','2px');
    });

    try {
        var act=document.getElementById('cpestana'+id);
        var tact=document.getElementById('textarea'+id);

        while (act.firstChild) {
            act.removeChild(act.firstChild);
        }

        act.appendChild(tact);
        var editor=CodeMirror(act, {
            lineNumbers: true,
            value: tact.value,
            matchBrackets: true,
            styleActiveLine: true,
            theme: "eclipse",
            mode: "text/x-java"
        }).on('change', editor => {
            tact.value=editor.getValue();
        });

    }catch(error) {}
}

/*---------------------------------------Funcion Agregar Pestania----------------------------------------*/
function agregar() {
    var x=get_cont();
    var lu=document.getElementById("lista");
    var li=document.createElement("li");
    li.setAttribute('id','pestana'+x);
    var a=document.createElement("a");
    a.setAttribute('id','a'+x);
    a.setAttribute('href', 'javascript:index("pestanas","pestana'+x+'")');
    a.text='pestana'+x;
    li.appendChild(a);
    lu.appendChild(li);
    index("pestanas","pestana"+x);

    var contenido=document.getElementById("contenidopestanas");
    var divp=document.createElement("div");
    divp.setAttribute('id','cpestana'+x);
    var ta=document.createElement("textarea");
    ta.setAttribute('id','textarea'+x);
    ta.setAttribute('name','textarea'+x);
    ta.setAttribute('class','ta');
    ta.setAttribute('style','display:none');
    ta.cols=123;
    ta.rows=30;
    divp.appendChild(ta);
    contenido.appendChild(divp);

    var act=document.getElementById('cpestana'+x);
    var tact=document.getElementById('textarea'+x);
    var editor=CodeMirror(act, {
        lineNumbers: true,
        value: tact.value,
        matchBrackets: true,
        styleActiveLine: true,
        theme: "eclipse",
        mode: "text/x-java"
    }).on('change', editor => {
        tact.value=editor.getValue();
    });
}

function quitar(){
    try{
        var lu=document.getElementById("lista");
        lu.removeChild(document.getElementById(get_vent().replace("textarea","pestana")));
        var contenido=document.getElementById("contenidopestanas");
        contenido.removeChild(document.getElementById(get_vent().replace("textarea","cpestana")));
        deletepes(get_vent());
    }catch(error){}
}

/*-----------------------------------------------File---------------------------------------------------*/
function AbrirArchivo(files){
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var act=document.getElementById(get_vent().replace("textarea","cpestana"));
        var tact=document.getElementById(get_vent());
        tact.value = e.target.result;

        while (act.firstChild) {
            act.removeChild(act.firstChild);
        }

        act.appendChild(tact);
        var editor=CodeMirror(act, {
            lineNumbers: true,
            value: tact.value,
            matchBrackets: true,
            styleActiveLine: true,
            theme: "eclipse",
            mode: "text/x-java"
        }).on('change', editor => {
            tact.value=editor.getValue();
        });
    };
    reader.readAsText(file);
    file.clear;

    var a=document.getElementById(get_vent().replace("textarea","a"));
    a.text=file.name;
    linkedlist(get_vent(),file.name);

    var file_input=document.getElementById("fileInput");
    document.getElementById('fileInput').value="";
}

function DescargarArchivo(){
    var ta=document.getElementById(get_vent());
    var contenido=ta.value;//texto de vent actual

    //formato para guardar el archivo
    var hoy=new Date();
    var dd=hoy.getDate();
    var mm=hoy.getMonth()+1;
    var yyyy=hoy.getFullYear();
    var HH=hoy.getHours();
    var MM=hoy.getMinutes();
    var formato=get_vent().replace("textarea","")+"_"+dd+"_"+mm+"_"+yyyy+"_"+HH+"_"+MM;

    var nombre="Archivo"+formato+".java";//nombre del archivo
    var file=new Blob([contenido], {type: 'text/plain'});

    if(window.navigator.msSaveOrOpenBlob){
        window.navigator.msSaveOrOpenBlob(file, nombre);
    }else{
        var a=document.createElement("a"),url=URL.createObjectURL(file);
        a.href=url;
        a.download=nombre;
        document.body.appendChild(a);
        a.click();
        setTimeout(function(){
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        },0); 
    }
}

function obtenerTexto(){
    var ta=document.getElementById(get_vent());
    var contenido=ta.value;//texto de vent actual

    var newpost ={
        Name:"Archivo Python",
        Content: contenido,
        Type:"Python"
    }

    /*fetch('http://localhost:8080/task', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newpost)
    })*/

    fetch('http://localhost:8080/tasks', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newpost)
    })
    .then(response => response.json())
    //.then(response => response.json())
    .then(data=>{
        console.log(data);

        var consola_py = document.getElementById("consola_python");
        var str = "---------------------Analisis Lexico---------------------\n\n";

        data.Tokens.forEach(token =>{
                str += `No:${token.indice}  Tokens: ${token.valor}  Auxlex: ${token.auxlex}  Fila: ${token.fila}  Columna: ${token.columna}\n\n`;
        });

        consola_py.innerHTML = str + "\n\n";

        data.Error.forEach(errores =>{
            consola_py.innerHTML += "Error Lexico:  "
            consola_py.innerHTML += `No:${errores.indice}  Tokens: ${errores.valor}  Auxlex: ${errores.auxlex}  Fila: ${errores.fila}  Columna: ${errores.columna}\n\n`;
        });

        consola_py.innerHTML += "\n---------------------Analisis Sintactico---------------------\n\n";

        data.Respuesta.forEach(respuesta => {
            consola_py.innerHTML += respuesta + "\n";
        })

    })


    //.then(response => view(response));
/*-----------------------------------------------------------------*/    
    /*var button = document.getElementById('botonpython')
    button.addEventListener('click', () =>{
        var newpost ={
            Name:"main.java",
            Content:"kfkfkfkf"
        }

        fetch("../tasks",{
            method: "POST",
            body: JSON.stringify(newpost),
            header:{
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => console.log(data))
    })*/
}

function DescargarArchivoPython(){

    fetch('http://localhost:8080/tasks')
    .then(response => response.json())
    .then(data=>{
        console.log(data);

        var nombre="Traduccion_Python.py";//nombre del archivo
        var file=new Blob([data.Traduccion], {type: 'text/plain'});

        if(window.navigator.msSaveOrOpenBlob){
        window.navigator.msSaveOrOpenBlob(file, nombre);
        }else{
            var a=document.createElement("a"),url=URL.createObjectURL(file);
            a.href=url;
            a.download=nombre;
            document.body.appendChild(a);
            a.click();
            setTimeout(function(){
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
            },0); 
        }
    })
}

/*function obtenerSaludo(){
    var curso = document.getElementById("curso").value;

    fetch('../getInfo', {
        method: 'POST',
        body: JSON.stringify({"Nombre":curso}),
        headers:{
          'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => view(response));
}*/

function mandartextojison(){
    var ta=document.getElementById(get_vent());
    var contenido=ta.value;//texto de vent actual

    var newpost ={
        Name:"Archivo JavaScript",
        Content: contenido,
        Type:"JavaScript"
    }

    fetch('http://localhost:8080/jison', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newpost)
    })
    .then(response => response.json())
    //.then(response => response.json())
    .then(data=>{
        console.log(data);

        var consola_js = document.getElementById("consola_javascript");
        var str = "---------------------Analisis Lexico---------------------\n\n";

        data.Tokens.forEach(token =>{
                str += `Tokens: ${token.tipoDelToken}  Auxlex: ${token.auxlex}  Fila: ${token.fila}  Columna: ${token.columna}\n\n`;
        });

        consola_js.innerHTML = str + "\n\n";

        /*data.Error.forEach(errores =>{
            consola_py.innerHTML += "Error Lexico:  "
            consola_py.innerHTML += `No:${errores.indice}  Tokens: ${errores.valor}  Auxlex: ${errores.auxlex}  Fila: ${errores.fila}  Columna: ${errores.columna}\n\n`;
        });*/

        /*consola_py.innerHTML += "\n---------------------Analisis Sintactico---------------------\n\n";

        data.Respuesta.forEach(respuesta => {
            consola_py.innerHTML += respuesta + "\n";
        })*/

    })
}