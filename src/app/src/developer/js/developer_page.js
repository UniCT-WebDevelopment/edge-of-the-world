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
                {"defaultContent":
                '<button id="detail-button" class="btn btn-success">Dettagli Layout</button>'},
            ],

        });

    $('#search-field').keyup(function () {
        sito_table.search($('#search-field').val()).draw();

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

    var load_layout_info= function(id_layout){
        $.ajax({

            type : 'POST',
            url  : '../developer/load_layout_info.php',
            data: {id_layout: id_layout},
            dataType: "json", // type of returned data

            success :  function(data)
            {
               $('#id_layout').val(id_layout);
               $('#costo-totale').val(data.costo);
            },
            error: function () {
                alert("Error loading data! Please try again.");
            }
        });


    }

    $('#site-table tbody').on('click', '#detail-button', function(){
        var layoutData = sito_table.rows($(this).parents('tr')).data();
        var current_layout=Object.values(layoutData[0]);
        var id_layout=current_layout[3];
        load_modulo_table(id_layout);
        load_layout_info(id_layout);
        $('#layout-details').modal('show');
    });


});