$(document).ready(function()
{
    var modulo_table;
    var componente_table;
    var developer_table;
    var assigned_developer;

    var client_table= $('#layout-table').DataTable({
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
                                        '<button id="add-developer">Aggiungi Sviluppatore</button>'+
                                        '<button id="show_module">Visualizza Moduli</button>' +
                                        '<button id="delete">Elimina</button>'},

                                    ],

                                });

    var load_modulo_table = function(){
                                           var table= $('#modulo-table').DataTable({
                                               "pageLength": 5,
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
                                                        '<button id="add-button">Aggiungi</button>' },

                                                ],
                                            });

                                            return table;
    };


    var load_componente_table= function(id_layout){
                                                        var table= $('#componente-table').DataTable({
                                                            "pageLength": 5,
                                                            "processing": true,
                                                            //"serverSide": true,
                                                            "bDestroy": true,
                                                            // "bJQueryUI": true,
                                                            "sAjaxSource": "load_componente.php?id_layout=" + id_layout,
                                                            "bFilter ": true,
                                                            "responsive": true,
                                                            "aoColumns": [
                                                                {"mData": "ID"},
                                                                {"mData": "Nome"},
                                                                {"mData": "Funzione"},
                                                                {"mData": "Costo"},
                                                                {"defaultContent":
                                                                '<button id="elimina-button">Elimina</button>' },
                                                            ],
                                                        });
                                                        return table;
    };

    var load_developer_table=function() {
                                            var table = $('#developer-table').DataTable({
                                                "pageLength": 5,
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
                                                    {
                                                        "defaultContent": '<button id="add-developer">Aggiungi</button>'
                                                    },
                                                ],
                                            });
                                            return table;

    };

        var load_developer_assigned_table=function(id_layout){
                                                                var table= $('#developer-assigned-table').DataTable({
                                                                    "pageLength": 5,
                                                                    "processing": true,
                                                                    //"serverSide": true,
                                                                    "bDestroy": true,
                                                                    // "bJQueryUI": true,
                                                                    "sAjaxSource": "developer-assigned-search.php?id_layout=" + id_layout,
                                                                    "bFilter ": true,
                                                                    "responsive": true,
                                                                    "aoColumns": [
                                                                        {"mData": "P_IVA"},
                                                                        {"mData": "Nome"},
                                                                        {"mData": "Cognome"},
                                                                        {"mData": "Telefono"},
                                                                        {"defaultContent":
                                                                            '<button id="delete-developer">Elimina</button>' },
                                                                    ],
                                                                });
                                                                return table;
    };

    $('#layout-table tbody').on( 'click', '#show_module', function () {
        var layoutData = client_table.rows($(this).parents('tr')).data();
        var current_layout=Object.values(layoutData[0]);
        $('#id_layout').val(current_layout[0]);
        var id_layout=current_layout[0];

        componente_table=load_componente_table(id_layout);
        modulo_table = load_modulo_table();
        $("#modulo-modal").modal('show');

    });

    $("#componente-table tbody").on('click', '#elimina-button', function(){

        var rowData = componente_table.rows($(this).parents('tr')).data();
        var current_data=Object.values(rowData[0]); //devo convertire l'oggetto in array prima di accedere
        var id_modulo=current_data[0];
        var id_layout=$('#id_layout').val();


        $.ajax({



            type : 'POST',
            url  : '../admin/delete_componente.php',
            data: {id_layout: id_layout, id_modulo: id_modulo},
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
        componente_table.ajax.reload();
        client_table.ajax.reload();
    });

    $('#modulo-table tbody').on('click', '#add-button', function(){
        var rowData = modulo_table.rows($(this).parents('tr')).data();
        var current_data=Object.values(rowData[0]); //devo convertire l'oggetto in array prima di accedere
        var id_modulo=current_data[0];
        var id_layout=$('#id_layout').val();

        $.ajax({

            type : 'POST',
            url  : '../admin/insert_componente.php',
            data: {id_layout: id_layout, id_modulo: id_modulo},
            dataType: "json", // type of returned data

            success :  function(data)
            {
                if(data.response === 0 ){

                    console.log("Success insert");

                }
                else if(data.response === 1){
                    console.log("Failed insert");

                }

                else if(data.response ===false){
                    alert("Modulo già presente");
                }
                else{
                    console.log("POST problem");
                }
            }
        });
        componente_table.ajax.reload();
        client_table.ajax.reload();

    });


    $('#modulo-new').click(function(){
        $.ajax({

            type : 'POST',
            url  : '../admin/insert_layout.php',
            data: {costo_totale: "0"},
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

    $('#layout-table tbody').on( 'click', '#delete', function () {
        event.preventDefault();
        var rowData = client_table.rows($(this).parents('tr')).data();
        var current_data=Object.values(rowData[0]); //devo convertire l'oggetto in array prima di accedere
        var id=current_data[0];

        $.ajax({

            type : 'POST',
            url  : '../admin/delete_layout.php',
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

    $('#layout-table').on('click', '#add-developer', function(){
        event.preventDefault();
        var rowData = client_table.rows($(this).parents('tr')).data();
        var current_data=Object.values(rowData[0]); //devo convertire l'oggetto in array prima di accedere
        var id_layout=current_data[0];
        $('#id_layout_developer').val(id_layout);
        developer_table=load_developer_table();
        assigned_developer=load_developer_assigned_table(id_layout);
        $('#developer-modal').modal('show');
    });

    $('#developer-table tbody').on('click', '#add-developer', function(){

        var developerData = developer_table.rows($(this).parents('tr')).data();
        var developer_data=Object.values(developerData[0]); //devo convertire l'oggetto in array prima di accedere
        var p_iva=developer_data[0];
        var id_layout=$('#id_layout_developer').val();


        $.ajax({

            type : 'POST',
            url  : '../admin/assign_developer.php',
            data: {id_layout: id_layout ,p_iva: p_iva},
            dataType: "json", // type of returned data

            success :  function(data)
            {
                if(data.response === 0 ){

                    console.log("Success add");

                }
                else if(data.response === false){
                    alert("Sviluppatore già assegnato per questo Layout");
                }
                else{
                    console.log("POST problem");
                }
            }
        });
        assigned_developer.ajax.reload();
        client_table.ajax.reload();

    });

    $('#developer-assigned-table tbody').on('click', '#delete-developer', function(){

        var developerData = assigned_developer.rows($(this).parents('tr')).data();
        var developer_data=Object.values(developerData[0]); //devo convertire l'oggetto in array prima di accedere
        var p_iva=developer_data[0];
        var id_layout=$('#id_layout_developer').val();

        $.ajax({

            type : 'POST',
            url  : '../admin/delete_assigned_developer.php',
            data: {id_layout: id_layout ,p_iva: p_iva},
            dataType: "json", // type of returned data

            success :  function(data)
            {
                if(data.response === 0 ){

                    console.log("Success delete");

                }
                else if(data.response === 1){
                    console.log("failed delete");
                }
                else{
                    console.log("POST problem");
                }
            }
        });

        assigned_developer.ajax.reload();
        client_table.ajax.reload();
    });


});
