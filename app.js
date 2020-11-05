const express = require('express');
const Analizador = require('./Analizador_py/Analizador')
const Sintactico = require('./Analizador_py/Sintactico')
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());

var tarea = {
    Name: "",
    Content: "",
    Type: ""
}

app.get('/node', (req, res) =>{
    res.json(tarea)
});

//const ip   = process.env.NODEIP || "192.168.1.17";
//const port = process.env.NODEPORT || 3000;

app.post('/node/', function (req, res) {
    console.log("Entro una peticion REST Ejemplo 9");
    console.log(req.body.Content);
    const analizadorLexico = new Analizador();
    analizadorLexico.analizador(req.body.Content);
    console.log(analizadorLexico.lista_de_tokens);
    console.log(analizadorLexico.lista_de_errores);

    const analizadorSintactico = new Sintactico();
    analizadorSintactico.analizar(analizadorLexico.lista_de_tokens);
    console.log(analizadorSintactico.listaErrores);

    res.json( {...req.body,Tokens: analizadorLexico.lista_de_tokens, Error: analizadorLexico.lista_de_errores} );
});

//app.listen(port,ip, async () => {
//    console.log('IP: %s PORT: %d', ip, port);
//});

app.listen(3000, () => console.log('server on port 3000'));