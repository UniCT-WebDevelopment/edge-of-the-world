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

    $.ajax({

        type : 'POST',
        url  : '../admin/getVisitaBarChart.php',
        data: {},
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
                resize: true,
            });
        },
        error: function () {
            alert("Error loading data! Please try again.");
        }
    });


});
