fetch('http://localhost:8080/tasks')
.then(response => response.json())
.then(data=>{
    console.log(data);
    var str = "";
    data.Tokens.forEach(token =>{
       str += "<tr><td>" + token.indice + "</td><td>" + token.valor + "</td><td>" + token.auxlex + "</td><td>" + token.fila + "</td><td>" + token.columna + "</td></tr>"; 
    });

    document.getElementById("tabla").innerHTML = str;

})

