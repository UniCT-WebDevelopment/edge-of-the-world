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
            url  : '../admin/delete_assigned_developer.php',
            data: {piva: piva},
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




    $('#search-field-developer').keyup(function () {
        client_table.search($('#search-field-developer').val()).draw();

    });

    $('#new_developer_save').click(function(){

        var piva=$('#id-developer-new').val();
        var nome=$("#nome-developer-new").val();
        var cognome=$("#cognome-developer-new").val();
        var telefono=$('#tel-developer-new').val();

        console.log(piva);
        console.log(nome);
        console.log(cognome);
        console.log(telefono);

        $.ajax({

            type : 'POST',
            url  : '../admin/insert_developer.php',
            data: {piva: piva, nome: nome, cognome: cognome, telefono: telefono},
            dataType: "json", // type of returned data

            success :  function(data)
            {
                if(data.response === 0 ){

                    //TODO controllare i form di inserimento e resettarli dopo il corretto inserimento
                 console.log("Success insert");
                }
                else if(data.response === 1){
                    console.log("Failed insert");
                }
                else{
                    console.log("POST problem");
                }
            }
        });
        client_table.ajax.reload();
        return false;

    });

    $('#update-modal-save').click(function(){


        var piva=$('#id-developer').val();
        var nome=$("#nome-developer").val();
        var cognome=$("#cognome-developer").val();
        var telefono=$('#tel-developer').val();


        $.ajax({

            type : 'POST',
            url  : '../admin/update_developer.php',
            data: {piva: piva, nome: nome, cognome: cognome, telefono: telefono},
            dataType: "json", // type of returned data

            success :  function(data)
            {

                if(data.response === 0 ){

                    console.log("Success update");
                }
                else if(data.response === 1){
                    console.log("Failed update");
                }
                else{
                    console.log("POST problem");
                }
            }
        });
        client_table.ajax.reload();
        return false;
    });




});
