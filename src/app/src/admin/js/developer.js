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


    var client_table= $('#developer-table').DataTable({
                                    "processing": true,
                                    //"serverSide": true,
                                    "bDestroy": true,
                                   // "bJQueryUI": true,
                                    "sAjaxSource": "developer_search.php",
                                    "bFilter ": true,
                                    "responsive": true,
                                    "aoColumns": [

                                        {"mData": "P_IVA"},
                                        {"mData": "Nome"},
                                        {"mData": "Cognome"},
                                        {"mData": "Telefono"},
                                        {"defaultContent":
                                        '<button id="update" data-toggle="modal" class="btn btn-warning">Aggiorna</button>' +
                                        '<button id="delete" class="btn btn-danger">Elimina</button>'},
                                    ],

                                });




    $('#developer-table tbody').on( 'click', '#update', function () {
        event.preventDefault();
        var rowData = client_table.rows($(this).parents('tr')).data();
        var current_data=Object.values(rowData[0]); //devo convertire l'oggetto in array prima di accedere
        $('#id-developer').val(current_data[0]);
        $("#nome-developer").val(current_data[1]);
        $("#cognome-developer").val(current_data[2]);
        $("#tel-developer").val(current_data[3]);
        $("#update-modal").modal('show');
    });


    $('#developer-table tbody').on( 'click', '#delete', function () {
        event.preventDefault();
        var rowData = client_table.rows($(this).parents('tr')).data();
        var current_data=Object.values(rowData[0]); //devo convertire l'oggetto in array prima di accedere
        var piva=current_data[0];

        $.ajax({

            type : 'POST',
            url  : '../admin/delete_developer.php',
            data: {piva: piva},
            dataType: "json", // type of returned data

            success :  function(data)
            {
                if(data.response === 0 ){
                    client_table.ajax.reload();
                    console.log("Success delete");

                }
                else if(data.response === 1){
                    alert("Impossibile cancellare uno sviluppatore a cui sono stati assegnati layout. Elimina prima lo sviluppatore dai layout");
                    console.log("Failed delete");
                }
                else{
                    console.log("POST problem");
                }
            }
        });

    });




    $('#search-field-developer').keyup(function () {
        client_table.search($('#search-field-developer').val()).draw();

    });

    $('#new_developer_save').click(function(){

        var i=0;

        var piva=$('#id-developer-new').val();
        var nome=$("#nome-developer-new").val();
        var cognome=$("#cognome-developer-new").val();
        var telefono=$('#tel-developer-new').val();

        if(piva==="" ) {
            $('#id-developer-new').css("border", "1px solid red");
            return false;
        }
        else{
            $('#id-developer-new').css("border", "");
            i++;
        }
        if(nome===""){
            $('#nome-developer-new').css("border", "1px solid red");
            return false;
        }
        else{
            $('#nome-developer-new').css("border", "");
            i++;
        }
        if(cognome==="") {
            $('#cognome-developer-new').css("border", "1px solid red");
            return false;
        }
        else {
            $('#cognome-developer-new').css("border", "");
            i++;
        }
        if(telefono ===""){
            $('#tel-developer-new').css("border", "1px solid red");
            return false;
        }
        else {
            $('#tel-developer-new').css("border", "");
            i++;
        }
        if (i === 4){
            $.ajax({

                type: 'POST',
                url: '../admin/insert_developer.php',
                data: {piva: piva, nome: nome, cognome: cognome, telefono: telefono},
                dataType: "json", // type of returned data

                success: function (data) {
                    if (data.response === 0) {
                        $('#id-developer-new').val("");
                        $('#nome-developer-new').val("");
                        $('#cognome-developer-new').val("");
                        $('#tel-developer-new').val("");
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


        var piva=$('#id-developer').val();
        var nome=$("#nome-developer").val();
        var cognome=$("#cognome-developer").val();
        var telefono=$('#tel-developer').val();

        if(nome===""){
            $('#nome-developer').css("border", "1px solid red");
            return false;
        }
        else{
            $('#nome-developer').css("border", "");
            i++;
        }
        if(cognome==="") {
            $('#cognome-developer').css("border", "1px solid red");
            return fals;
        }
        else {
            $('#cognome-developer').css("border", "");
            i++;
        }
        if(telefono ===""){
            $('#tel-developer').css("border", "1px solid red");
            return false;
        }
        else {
            $('#tel-developer').css("border", "");
            i++;
        }
        if( i===3){
            $.ajax({

                type: 'POST',
                url: '../admin/update_developer.php',
                data: {piva: piva, nome: nome, cognome: cognome, telefono: telefono},
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
