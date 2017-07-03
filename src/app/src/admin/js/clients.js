$(document).ready(function()
{
    var layout_table;

    var client_table= $('#client-table').DataTable({
                                    "processing": true,
                                    //"serverSide": true,
                                    "bDestroy": true,
                                   // "bJQueryUI": true,
                                    "sAjaxSource": "clients_search.php",
                                    "bFilter ": true,
                                    "responsive": true,
                                    "aoColumns": [

                                        {"mData": "Codice"},
                                        {"mData": "Codice_fiscale"},
                                        {"mData": "Citta"},
                                        {"mData": "Indirizzo"},
                                        {"mData": "Telefono"},
                                        {"mData": "N_siti"},
                                        {"mData": "Spesa"},
                                        {"defaultContent":
                                        '<button id="update" data-toggle="modal">Aggiorna</button>' +
                                        '<button id="delete">Elimina</button>' +
                                        '<button id="add-website">Aggiungi Sito Web</button>'},
                                    ],

                                });

    var load_layout_table=function(){
                                          var table=$('#layout-show-table').DataTable({
                                              "pageLength": 5,
                                                "processing": true,
                                                //"serverSide": true,
                                                "bDestroy": true,
                                                // "bJQueryUI": true,
                                                "sAjaxSource": "layout_search.php",
                                                "bFilter ": true,
                                                "responsive": true,
                                                "aoColumns": [

                                                    {"mData": "ID"},
                                                    {"mData": "Costo Totale"},
                                                    {"mData": "Sviluppatore"},
                                                    {"mData": "Numero Moduli"},
                                                    {"defaultContent":
                                                    '<button id="add-layout">Aggiungi</button>'+
                                                    '<button id="show-modulo">Visualizza Moduli</button>'
                                                    },

                                                ],

                                            });
                                            return table;
    };

    $('#client-table tbody').on( 'click', '#update', function () {
        event.preventDefault();
        var rowData = client_table.rows($(this).parents('tr')).data();
        var current_data=Object.values(rowData[0]); //devo convertire l'oggetto in array prima di accedere
        $('#codice').val(current_data[0]);
        $("#c_f").val(current_data[1]);
        $("#city").val(current_data[2]);
        $("#address").val(current_data[3]);
        $("#tel_number").val(current_data[4]);
        $("#update-modal").modal('show');

    });


    $('#client-table tbody').on( 'click', '#delete', function () {
        event.preventDefault();
        var rowData = client_table.rows($(this).parents('tr')).data();
        var current_data=Object.values(rowData[0]); //devo convertire l'oggetto in array prima di accedere
        var codice=current_data[0];
        $.ajax({

            type : 'POST',
            url  : '../admin/delete_cliente.php',
            data: {codice: codice},
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

    $('#client-table tbody').on( 'click', '#add-website', function () {
        var rowData = client_table.rows($(this).parents('tr')).data();
        var current_data=Object.values(rowData[0]); //devo convertire l'oggetto in array prima di accedere
        var codice=current_data[0];
         layout_table=load_layout_table();
         $('#codice_cliente').val(current_data[0]);
       $("#sito_web_modal").modal('show');
    });

    $('#layout-show-table tbody').on('click', '#add-layout', function(){
        console.log("add-layout event-triggerd");
        var rowData= layout_table.rows($(this).parents('tr')).data();
        var current_data=Object.values(rowData[0]);
        $('#id_layout').val(current_data[0]);
    });

    $('#add_sito_web_button').click(function(){
        var url= $('#url_input').val();
        var data= $('#date_input').val();
        var codice= $('#codice_cliente').val();
        var id_layout=$('#id_layout').val();

        $.ajax({

            type : 'POST',
            url  : '../admin/add_sito_web.php',
            data: {url: url, data: data, codice: codice, id_layout: id_layout},
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


    $('#search-field').keyup(function () {
        client_table.search($('#search-field').val()).draw();

    });

    $('#new_client_save').click(function(){

        var c_f=$("#c_f_new").val();
        var city=$("#city_new").val();
        var address=$("#address_new").val();
        var tel_number=$("#tel_number_new").val();

        $.ajax({

            type : 'POST',
            url  : '../admin/insert_cliente.php',
            data: {c_f: c_f, city: city, address: address, tel_number: tel_number},
            dataType: "json", // type of returned data

            success :  function(data)
            {
                console.log("try");
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

        var codice=$('#codice').val();
        var city=$("#city").val();
        var address=$("#address").val();
        var tel_number=$("#tel_number").val();
        $.ajax({

            type : 'POST',
            url  : '../admin/update_cliente.php',
            data: {codice: codice, city: city, address: address, tel_number: tel_number},
            dataType: "json", // type of returned data

            success :  function(data)
            {
                console.log("try");
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
