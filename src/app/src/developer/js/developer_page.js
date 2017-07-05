$(document).ready(function() {

    $.ajax({

        type : 'POST',
        url  : '../developer/get_user_data.php',
        data: {},
        dataType: "json", // type of returned data

        success :  function(data)
        {
            $('#username').text(" Benvenuto "+ data.nome);
        }
    });

    var sito_table = $('#site-table').DataTable({
            "processing": true,
            //"serverSide": true,
            "bDestroy": true,
            // "bJQueryUI": true,
            "sAjaxSource": "developer_sito_search.php",
            "bFilter ": true,
            "responsive": true,
            "aoColumns": [

                {"mData": "Codice"},
                {"mData": "Url"},
                {"mData": "Data Pubblicazione"},
                {"mData": "Layout"},
            ],

        });


    $.ajax({

        type : 'POST',
        url  : '../developer/getModuloDonutChart.php',
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
        url  : '../developer/getLayoutDonutChart.php',
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
});