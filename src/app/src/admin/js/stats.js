$(document).ready(function () {


       $.ajax({

        type : 'POST',
        url  : '../admin/getModuloDonutChart.php',
        data: {},
        dataType: "json", // type of returned data

        success :  function(data)
        {
            Morris.Donut({
                element: 'modulo-donut-chart',
                data: data.data,
                resize: true
            });
        },
           error: function () {
               alert("Error loading data! Please try again.");
           }
    });

    $.ajax({

        type : 'POST',
        url  : '../admin/getLayoutDonutChart.php',
        data: {},
        dataType: "json", // type of returned data

        success :  function(data)
        {
            Morris.Donut({
                element: 'layout-donut-chart',
                data: data.data,
                colors:['red'],
                resize: true
            });
        },
        error: function () {
            alert("Error loading data! Please try again.");
        }
    });

    var load_general_visita_chart=function() {
        $.ajax({

            type: 'POST',
            url: '../admin/getVisitaBarChart.php',
            data: {type: 'general'},
            dataType: "json", // type of returned data

            success: function (data) {
                Morris.Bar({
                    element: 'visita-bar-chart',
                    data: data.data,
                    xkey: 'url',
                    ykeys: ['n_visite'],
                    labels: ['Numero Visite'],
                    barColors: function (row, series, type) {
                        if (row.y < 4 && row.y > 2) return ['yellow'];
                        else if (row.y <= 2) return ['red'];
                        else return ['green'];

                    },

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
            url  : '../admin/getVisitaBarChart.php',
            data: {type: 'month'},
            dataType: "json", // type of returned data

            success :  function(data)
            {
                Morris.Bar({
                    element: 'visita-bar-chart',
                    data: data.data,
                    xkey:'url',
                    ykeys:['n_visite'],
                    labels:['Numero Visite'],
                    barColors:  function(row, series, type) {
                        if(row.y < 4 && row.y >2) return ['yellow'];
                        else if(row.y <= 2) return ['red'];
                        else return['green'];

                    },
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
            url  : '../admin/getVisitaBarChart.php',
            data: {type: 'year'},
            dataType: "json", // type of returned data

            success :  function(data)
            {
                Morris.Bar({
                    element: 'visita-bar-chart',
                    data: data.data,
                    xkey:'url',
                    ykeys:['n_visite'],
                    labels:['Numero Visite'],
                    barColors:  function(row, series, type) {
                        if(row.y < 4 && row.y >2) return ['yellow'];
                        else if(row.y <= 2) return ['red'];
                        else return['green'];

                    },
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
            url  : '../admin/getVisitaBarChart.php',
            data: {type: 'custom', begin: begin, end: end},
            dataType: "json", // type of returned data

            success :  function(data)
            {
                Morris.Bar({
                    element: 'visita-bar-chart',
                    data: data.data,
                    xkey:'url',
                    ykeys:['n_visite'],
                    labels:['Numero Visite'],
                    barColors:  function(row, series, type) {
                        if(row.y < 4 && row.y >2) return ['yellow'];
                        else if(row.y <= 2) return ['red'];
                        else return['green'];

                    },
                });
            },
            error: function () {
                alert("Error loading data! Please try again.");
            }
        });

    });

});
