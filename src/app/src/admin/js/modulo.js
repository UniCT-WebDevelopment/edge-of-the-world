$(document).ready(function()
{



    $.ajax({

        type : 'POST',
        url  : '../admin/get_user_data.php',
        data: {},
        dataType: "json", // type of returned data

        success :  function(data)
        {
            $('#username').text(" Benvenuto "+ data.nome);
        }
    });


    var client_table= $('#modulo-table').DataTable({
                                    "processing": true,
                                    //"serverSide": true,
                                    "bDestroy": true,
                                   // "bJQueryUI": true,
                                    "sAjaxSource": "modulo_search.php",
                                    "bFilter ": true,
                                    "responsive": true,
                                    "aoColumns": [

                                        {"mData": "ID"},
                                        {"mData": "Nome"},
                                        {"mData": "Funzione"},
                                        {"mData": "Costo"},
                                        {"defaultContent":
                                        '<button id="update" data-toggle="modal" class="btn btn-primary">Aggiorna</button>' +
                                        '<button id="delete" class="btn btn-danger">Elimina</button>'},
                                    ],

                                });




    $('#modulo-table tbody').on( 'click', '#update', function () {
        event.preventDefault();
        var rowData = client_table.rows($(this).parents('tr')).data();
        var current_data=Object.values(rowData[0]); //devo convertire l'oggetto in array prima di accedere
        $('#id-modulo').val(current_data[0]);
        $("#nome-modulo").val(current_data[1]);
        $("#funzione-modulo").val(current_data[2]);
        $("#costo-modulo").val(current_data[3]);
        $("#update-modal").modal('show');
    });


    $('#modulo-table tbody').on( 'click', '#delete', function () {
        event.preventDefault();
        var rowData = client_table.rows($(this).parents('tr')).data();
        var current_data=Object.values(rowData[0]); //devo convertire l'oggetto in array prima di accedere
        var id=current_data[0];

        $.ajax({

            type : 'POST',
            url  : '../admin/delete_modulo.php',
            data: {id: id},
            dataType: "json", // type of returned data

            success :  function(data)
            {
                if(data.response === 0 ){

                    console.log("Success delete");

                }
                else if(data.response === 1){
                    console.log("Failed delete");
                }
                else{
                    console.log("POST problem");
                }
            }
        });
        client_table.ajax.reload();
    });




    $('#search-field-modulo').keyup(function () {
        client_table.search($('#search-field-modulo').val()).draw();

    });

    $('#new_modulo_save').click(function(){

        var i=0;

        var nome=$("#nome-modulo-new").val();
        var funzione=$("#funzione-modulo-new").val();
        var costo=$('#costo-modulo-new').val();


        if(nome===""){
            $('#nome-modulo-new').css("border", "1px solid red");
            return false;
        }
        else{
            $('#nome-modulo-new').css("border", "");
            i++;
        }
        if(funzione==="") {
            $('#funzione-modulo-new').css("border", "1px solid red");
            return false;
        }
        else {
            $('#funzione-modulo-new').css("border", "");
            i++;
        }
        if(costo===""){
            $('#costo-modulo-new').css("border", "1px solid red");
            return false;
        }
        else {
            $('#costo-modulo-new').css("border", "");
            i++;
        }
        if(i===3){
            $.ajax({

                type: 'POST',
                url: '../admin/insert_modulo.php',
                data: {nome: nome, funzione: funzione, costo: costo},
                dataType: "json", // type of returned data

                success: function (data) {

                    if (data.response === 0) {
                        $('#nome-modulo-new').val("");
                        $('#funzione-modulo-new').val("");
                        $('#costo-modulo-new').val("");
                        console.log("Success insert");
                    }
                    else if (data.response === 1) {
                        console.log("Failed insert");
                    }
                    else {
                        console.log("POST problem");
                    }
                }
            });
        }
        else{
            return false;
        }
        client_table.ajax.reload();
        return false;

    });

    $('#update-modal-save').click(function(){

        var i=0;

        var id=$('#id-modulo').val();
        var nome=$("#nome-modulo").val();
        var funzione=$("#funzione-modulo").val();
        var costo=$('#costo-modulo').val();


        if(nome===""){
            $('#nome-modulo').css("border", "1px solid red");
            return false;
        }
        else{
            $('#nome-modulo').css("border", "");
            i++;
        }
        if(funzione==="") {
            $('#funzione-modulo').css("border", "1px solid red");
            return false;
        }
        else {
            $('#funzione-modulo').css("border", "");
            i++;
        }
        if(costo===""){
            $('#costo-modulo').css("border", "1px solid red");
            return false;
        }
        else {
            $('#costo-modulo').css("border", "");
            i++;
        }
        if (i === 3){
            $.ajax({

                type: 'POST',
                url: '../admin/update_modulo.php',
                data: {id: id, nome: nome, funzione: funzione, costo: costo},
                dataType: "json", // type of returned data

                success: function (data) {

                    if (data.response === 0) {
                        $('#update-modal').modal('hide');
                        console.log("Success update");
                    }
                    else if (data.response === 1) {
                        console.log("Failed update");
                    }
                    else {
                        console.log("POST problem");
                    }
                }
            });
        }
        else{
            return false;
        }
        client_table.ajax.reload();
        return false;
    });




});
