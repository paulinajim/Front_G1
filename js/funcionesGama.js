//GET, POST, PUT Y DELETE

function getGama(){

    $.ajax({
        url:"http://192.9.142.116:8080/api/Gama/all",
        type:"GET",
        datatype:"JSON",
        success: function (respuesta) {
            //console.log(respuesta);
            pintarRespuesta(respuesta);
            
        }

    });

}

function postGama(){
    if ($("#name").val().length==0 || $("#description").val().length==0){
        alert("Todos los campos son obligatorios");

    }else {

    let cajas ={
        name:$("#name").val(),
        description:$("#description").val()
    };

    $.ajax({
        url:"http://192.9.142.116:8080/api/Gama/save",
        type:"POST",
        datatype:"JSON",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente la gama")
            window.location.reload();
        }

        
        
    });
    }

}

function putGama(idBotonActualizar){
    console.log(idBotonActualizar);
    if ($("#name").val().length==0 || $("#description").val().length==0){
        alert("Todos los campos son obligatorios para actualizar los datos");

    }else {

    let cajas ={
        idGama: idBotonActualizar,
        name:$("#name").val(),
        description:$("#description").val()
    };

    $.ajax({
        url:"http://192.9.142.116:8080/api/Gama/update",
        type:"PUT",
        datatype:"JSON",
        contentType: "application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se actualizó correctamente la gama")
            window.location.reload();
        }
        
    });
    }

}
function deleteGama(idBoton){
    Swal.fire({
        title: 'Estás seguro de borrar la Gama?',
        text: "Si lo aceptas, se borrará definitivamente!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Borrado!',
            'Your file has been deleted.',
            'success'
          )
          let myData={
            id:idBoton
        };
        $.ajax({
            url:"http://192.9.142.116:8080/api/Gama/"+idBoton,
            type:"DELETE",
            datatype:"JSON",
            data:JSON.stringify(myData),
            contentType: "application/json",
            success:function(respuesta){
                //alert("se ha borrado correctamente la gama")
                window.location.reload();
            }
    
        });

        }
      })
}

/////////////////////////////////////////////////
function pintarRespuesta(items){
    let myTable='<table class="table-auto w-full text-left whitespace-no-wrap">';
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].idGama+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].description+"</td>";
        myTable+="<td> <button onclick='putGama("+items[i].idGama+")'class='flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg'>Actualizar </button>";
        myTable+="<td> <button onclick='deleteGama("+items[i].idGama+")'class='flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg'>Borrar </button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    
    $("#resultado1").append(myTable);
}

