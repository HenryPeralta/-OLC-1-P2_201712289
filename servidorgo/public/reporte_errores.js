fetch('http://localhost:8080/tasks')
.then(response => response.json())
.then(data=>{
    console.log(data);
    var err = "";
    data.Error.forEach(errores =>{
       err += "<tr><td>" + errores.indice + "</td><td>" + errores.valor + "</td><td>" + errores.auxlex + "</td><td>" + errores.fila + "</td><td>" + errores.columna + "</td></tr>"; 
    });

    document.getElementById("tabla").innerHTML = err;

    var err_s = "";
    contador = 1;
    data.ErroresSintacticos.forEach(error_sintactico =>{
       err_s += "<tr><td>" +contador + "</td><td>" + error_sintactico.fila + "</td><td>" + error_sintactico.columna + "</td><td>" + error_sintactico.descripcion + "</td></tr>"; 
       contador +=1
    });

    document.getElementById("tabla_sintactico").innerHTML = err_s;

})