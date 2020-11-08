const express = require('express');
const Analizadorjs = require('./Analizador_js/analisadorlexico')
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());

var tareajs = {
    Name: "",
    Content: "",
    Type: ""
}

app.get('/nodejs', (req, res) =>{
    res.json(tareajs)
});

//const ip   = process.env.NODEIP || "192.168.1.17";
//const port = process.env.NODEPORT || 3000;

app.post('/nodejs/', function (req, res) {
    console.log("Entro una peticion REST Ejemplo 9");
    console.log(req.body.Content);
    var analisador = Analizadorjs.parse(req.body.Content);
    console.log(analisador.lista_tokens);
    console.log(analisador.lista_errores);
    console.log(analisador.lista_error_sintactico);

    res.json( {...req.body,Tokens: analisador.lista_tokens, Error: analisador.lista_errores , ErroresSintacticos: analisador.lista_error_sintactico} );
});

//app.listen(port,ip, async () => {
//    console.log('IP: %s PORT: %d', ip, port);
//});

app.listen(4000, () => console.log('server on port 4000'));