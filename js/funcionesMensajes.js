//GET, POST, PUT Y DELETE

function getMensajes(){
    $.ajax({
        url:"http://192.9.142.116:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }

    });

}

function postMensajes(){
    let cajas ={
        messageText:$("#messageText").val(),
        car:{idCar: +$("#select-car").val()},
        client:{idClient: +$("#select-client").val()},
        
    };
    console.log(cajas);

    $.ajax({
        url:"http://192.9.142.116:8080/api/Message/save",
        type:"POST",
        datatype:"JSON",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente el mensaje")
            window.location.reload();
        }

        
        
    });

}

function putMensajes(idBotonActualizar){
    //console.log(idBotonActualizar);
    
    if ($("#messageText").val().length==0){
        alert("Campo Obligatorio");
    }else{

    let cajas = {
        idMessage:idBotonActualizar,
        messageText:$("#messageText").val()   
    };
    
    $.ajax({
        url:"http://192.9.142.116:8080/api/Message/update",
        type:"PUT",
        datatype:"JSON",
        contentType: "application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se actualizo correctamente el mensaje");
            window.location.reload();
        }
    });
}

}

function deleteMensajes(idBoton){
    
    let myData={
        id:idBoton
    };
    $.ajax({
        url:"http://192.9.142.116:8080/api/Message/"+idBoton,
        type:"DELETE",
        datatype:"JSON",
        data:JSON.stringify(myData),
        contentType: "application/json",
        success:function(respuesta){
            alert("se ha borrado correctamente el mensaje")
            window.location.reload();
        }

    });

}

///////////////////////////////////
function getMensajes_Car(){
    $.ajax({
        url:"http://192.9.142.116:8080/api/Car/all",
        type:"GET",
        datatype:"JSON",
        success: function (respuesta) {
            let $select =$("#select-car")
            $.each(respuesta, function (id,name){
                $select.append('<option value='+name.idCar+'>'+name.name+'</option');
                //console.log(name);
            });
                
        }

    });


}

function getMensajes_Client() {
    $.ajax({
        url:"http://192.9.142.116:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success: function (respuesta) {
            let $select =$("#select-client")
            $.each(respuesta, function (id,name){
                $select.append('<option value='+name.idClient+'>'+name.name+'</option');
                //console.log(name);
            });
                
        }

    });


}

/////////////////////////////////////////////////
function pintarRespuesta(items){
    let myTable="<table>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].messageText+"</td>";
        myTable+="<td>"+items[i].car.name+"</td>";
        myTable+="<td>"+items[i].client.name+"</td>";
        myTable+="<td> <button onclick='deleteMensajes("+items[i].idMessage+")'>Borrar</button>";
        myTable+="<td> <button onclick='putMensajes("+items[i].idMessage+")'>Actualizar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    
    $("#resultado1").append(myTable);
}
