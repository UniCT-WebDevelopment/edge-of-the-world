$(document).ready(function() {
    var id_cliente=3;

    var sito_table = $('#site-table').DataTable({
            "processing": true,
            //"serverSide": true,
            "bDestroy": true,
            // "bJQueryUI": true,
            "sAjaxSource": "cliente_sito_search.php?id_cliente=" + id_cliente,
            "bFilter ": true,
            "responsive": true,
            "aoColumns": [

                {"mData": "Codice"},
                {"mData": "Url"},
                {"mData": "Data Pubblicazione"},
                {"mData": "Layout"},
            ],

        });

        var load_general_visita_chart=function() {
        $.ajax({

            type: 'POST',
            url: '../cliente/getVisitaBarChart_cliente.php',
            data: {type: 'general', id_cliente: id_cliente},
            dataType: "json", // type of returned data

            success: function (data) {
                Morris.Bar({
                    element: 'visita-bar-chart',
                    data: data.data,
                    xkey: 'url',
                    ykeys: ['n_visite'],
                    labels: ['Numero Visite'],
                    barColors: ['dodgerblue'],

                });
            },
            error: function () {
                alert("Error loading data! Please try again.");
            }
        });

    };

    load_general_visita_chart();

    $('#visite-generali').click(function(){
        $('#visita-bar-chart').empty();
        load_general_visita_chart();
    });

    $('#ultimo-mese').click(function(){

        $('#visita-bar-chart').empty();
        $.ajax({

            type : 'POST',
            url  : '../cliente/getVisitaBarChart_cliente.php',
            data: {type: 'month', id_cliente: id_cliente},
            dataType: "json", // type of returned data

            success :  function(data)
            {
                Morris.Bar({
                    element: 'visita-bar-chart',
                    data: data.data,
                    xkey:'url',
                    ykeys:['n_visite'],
                    labels:['Numero Visite'],
                    barColors:  ['orangered']
                });
            },
            error: function () {
                alert("Error loading data! Please try again.");
            }
        });
    });

    $('#ultimo-anno'). click(function(){
        $('#visita-bar-chart').empty();
        $.ajax({

            type : 'POST',
            url  : '../cliente/getVisitaBarChart_cliente.php',
            data: {type: 'year', id_cliente: id_cliente},
            dataType: "json", // type of returned data

            success :  function(data)
            {
                Morris.Bar({
                    element: 'visita-bar-chart',
                    data: data.data,
                    xkey:'url',
                    ykeys:['n_visite'],
                    labels:['Numero Visite'],
                    barColors: ['forestgreen']
                });
            },
            error: function () {
                alert("Error loading data! Please try again.");
            }
        });

    });

    $('#ricerca-avanzata').click(function(){
        $('#time-interval').modal('show');
    });

    $('#search-interval').click(function(){
        $('#time-interval').modal('hide');
        $('#visita-bar-chart').empty();
        var begin= $('#from').val();
        var end=$('#to').val();

        $.ajax({

            type : 'POST',
            url  : '../cliente/getVisitaBarChart_cliente.php',
            data: {type: 'custom', id_cliente: id_cliente, begin: begin, end: end},
            dataType: "json", // type of returned data

            success :  function(data)
            {
                Morris.Bar({
                    element: 'visita-bar-chart',
                    data: data.data,
                    xkey:'url',
                    ykeys:['n_visite'],
                    labels:['Numero Visite'],
                    barColors: ['yellow']
                });
            },
            error: function () {
                alert("Error loading data! Please try again.");
            }
        });

    });

});