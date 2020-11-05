fetch('http://localhost:8080/tasks')
.then(response => response.json())
.then(data=>{
    console.log(data);
    var err = "";
    data.Error.forEach(errores =>{
       err += "<tr><td>" + errores.indice + "</td><td>" + errores.valor + "</td><td>" + errores.auxlex + "</td><td>" + errores.fila + "</td><td>" + errores.columna + "</td></tr>"; 
    });

    document.getElementById("tabla").innerHTML = err;

})