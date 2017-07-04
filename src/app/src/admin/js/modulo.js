$(document).ready(function()
{
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

        var nome=$("#nome-modulo-new").val();
        var funzione=$("#funzione-modulo-new").val();
        var costo=$('#costo-modulo-new').val();

        $.ajax({

            type : 'POST',
            url  : '../admin/insert_modulo.php',
            data: {nome: nome, funzione: funzione, costo: costo},
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


        var id=$('#id-modulo').val();
        var nome=$("#nome-modulo").val();
        var funzione=$("#funzione-modulo").val();
        var costo=$('#costo-modulo').val();


        $.ajax({

            type : 'POST',
            url  : '../admin/update_modulo.php',
            data: {id: id, nome: nome, funzione: funzione, costo: costo},
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
