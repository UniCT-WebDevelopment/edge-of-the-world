$(document).ready(function()
{
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
                                        '<button id="show_module">Visualizza Moduli</button>' +
                                        '<button id="delete">Elimina</button>'},

                                    ],

                                });

    var load_modulo_table = function(){
       var table= $('#modulo-table').DataTable({

            "processing": true,
            //"serverSide": true,
            "bDestroy": true,
            // "bJQueryUI": true,
            "sAjaxSource": "modulo_search.php",
            "bFilter ": true,
            "responsive": true,

            "aoColumns": [
                /*{
                    'sTitle': '<input type="checkbox" id="check-all">',
                    'mData': 'ID',
                    'mRender': function(ID) {

                        return '<input class="check" type="checkbox" id="check['+ID+']"> '+ID+'</input>';
                    },
                    'sWidth': '15px',
                    'bSortable': false
                },
                */
                {"defaultContent": '<input class="check" type="checkbox" id="checkbox">'},
                {"mData": "ID"},
                {"mData": "Nome"},
                {"mData": "Funzione"},
                {"mData": "Costo"},

            ],
        });

        $('#search-field-modulo').keyup(function () {
            table.search($('#search-field-modulo').val()).draw();

        });



        return table;
    };


    $('#check-all').on('change', function() {
        $('#modulo-table').find('.check').prop('checked',this.checked);
    });


    $('#developer-table tbody').on( 'click', '#show_module', function () {
        event.preventDefault();
        var modulo_table = load_modulo_table();
        $("#modulo-modal").modal('show');

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




    $('#layout-table tbody').on( 'click', '#show_module', function () {
         var modulo_table = load_modulo_table();


         $("#modulo-modal").modal('show');


     });

     var set_component=function(id_layout, id_componente, comando){

         $.ajax({

             type : 'POST',
             url  : '../admin/insert_componente.php',
             data: {comando: comando, id_layout: id_layout, id_componente: id_componente},
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

     };



});
