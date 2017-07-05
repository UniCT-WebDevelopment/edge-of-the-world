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
        '<button id="show_sites" class="btn btn-success">Visualizza Siti</button>'},
    ],

});

    $('#search-field').keyup(function () {
        client_table.search($('#search-field').val()).draw();

    });


    var load_sito_web=function(id_cliente){
        var table=$('#site-table').DataTable({
            "processing": true,
            //"serverSide": true,
            "bDestroy": true,
            // "bJQueryUI": true,
            "sAjaxSource": "sito_web_search.php?id_cliente=" + id_cliente,
            "bFilter ": true,
            "responsive": true,
            "aoColumns": [

                {"mData": "Codice"},
                {"mData": "Url"},
                {"mData": "Data Pubblicazione"},
                {"mData": "Layout"},
            ],

        });
        return table;
    };


    $('#client-table tbody').on('click', '#show_sites', function(){
        var rowData = client_table.rows($(this).parents('tr')).data();
        var current_data=Object.values(rowData[0]); //devo convertire l'oggetto in array prima di accedere
        var id_cliente=current_data[0];
        load_sito_web(id_cliente);
        $('#list-site-modal').modal('show');
    });

    var developer_table= $('#developer-table').DataTable({
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
            '<button id="show-layout" data-toggle="modal" class="btn btn-success">Visualizza Layout</button>'},
        ],

    });


    var load_layout_developer= function(p_iva){

        var table=$('#layout-table').DataTable({
            "processing": true,
            //"serverSide": true,
            "bDestroy": true,
            // "bJQueryUI": true,
            "sAjaxSource": "layout_web_search.php?p_iva=" + p_iva,
            "bFilter ": true,
            "responsive": true,
            "aoColumns": [

                {"mData": "ID"},
                {"mData": "Costo Totale"},
                {"mData": "Numero Moduli"},
            ],

        });
        return table;


    };

    $('#search-field-developer').keyup(function () {
        developer_table.search($('#search-field-developer').val()).draw();

    });

    $('#developer-table tbody').on('click', '#show-layout', function(){
        var rowData = developer_table.rows($(this).parents('tr')).data();
        var current_data=Object.values(rowData[0]); //devo convertire l'oggetto in array prima di accedere
        var p_iva=current_data[0];
        load_layout_developer(p_iva);
        $('#layout-modal').modal('show');
    });



    var layout_table= $('#layout-table-full').DataTable({
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
            '<button id="show_module" class="btn btn-success">Visualizza Moduli</button>'},

        ],

    });

    var load_modulo_table = function(id_layout){
        var table= $('#modulo-table').DataTable({
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
            ],
        });
        return table;
    };


    $('#search-field-layout').keyup(function () {
        layout_table.search($('#search-field-layout').val()).draw();

    });

    $('#layout-table-full tbody').on( 'click', '#show_module', function () {
        var layoutData = layout_table.rows($(this).parents('tr')).data();
        var current_layout=Object.values(layoutData[0]);
        var id_layout=current_layout[0];
        load_modulo_table(id_layout);
        $("#modulo-modal").modal('show');

    });


});