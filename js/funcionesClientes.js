//GET, POST, PUT Y DELETE

function getClientes(){

    $.ajax({
        url:"http://192.9.142.116:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success: function (respuesta) {
            //console.log(respuesta);
            pintarRespuesta(respuesta);
            
        }

    });

}

function postClientes(){

    let cajas ={
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val()
    };

    $.ajax({
        url:"http://192.9.142.116:8080/api/Client/save",
        type:"POST",
        datatype:"JSON",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente el cliente");
            window.location.reload();
        }  
    });

}

function putClientes(idBotonActualizar){
    //console.log(idBotonActualizar);

    if ($("#password").val().length==0 || $("#email").val().length==0 || $("#name").val().length==0 || $("#age").val().length==0 ){
        alert("Todos los campos son obligatorios");

    }else {

    let cajas ={
        idClient: idBotonActualizar,
        password:$("#password").val(),
        email:$("#email").val(),
        name:$("#name").val(),
        age:$("#age").val(),
    };

    $.ajax({
        url:"http://192.9.142.116:8080/api/Client/update",
        type:"PUT",
        datatype:"JSON",
        contentType: "application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se actualizó correctamente el Cliente")
            window.location.reload();
        }
        
    });
    }
}

function deleteClientes(idBoton){
    let myData={
        id:idBoton
    };
    $.ajax({
        url:"http://192.9.142.116:8080/api/Client/"+idBoton,
        type:"DELETE",
        datatype:"JSON",
        data:JSON.stringify(myData),
        contentType: "application/json",
        success:function(respuesta){
            alert("se ha borrado correctamente el Cliente")
            window.location.reload();
        }

    });
    
}


/////////////////////////////////////////////////
function pintarRespuesta(items){
    let myTable="<table>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].email+"</td>";
        myTable+="<td>"+items[i].password+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].age+"</td>";
        myTable+="<td> <button onclick='putClientes("+items[i].idClient+")'>Actualizar </button>";
        myTable+="<td> <button onclick='deleteClientes("+items[i].idClient+")'>Borrar </button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").append(myTable);
}

