$(document).ready(function()
{
    var client_table= $('#client-table').DataTable({
                                    "processing": true,
                                    //"serverSide": true,
                                    "bDestroy": true,
                                   // "bJQueryUI": true,
                                    "sAjaxSource": "clients_search.php",
                                    "bFilter ": true,
                                    "responsive": true,
                                    "aoColumns": [

                                        {"mData": "Codice_fiscale"},
                                        {"mData": "Citta"},
                                        {"mData": "Indirizzo"},
                                        {"mData": "Telefono"},
                                        {"mData": "N_siti"},
                                        {"mData": "Spesa"},
                                        {"defaultContent":
                                        '<button id="update" data-toggle="modal">Aggiorna</button>' +
                                        '<button id="delete">Elimina</button>'},
                                    ],

                                });




    $('#client-table tbody').on( 'click', '#update', function () {
        event.preventDefault();
        var data = client_table.rows($(this).parents('tr')).data();
        var data2=Object.values(data[0]); //devo convertire l'oggetto in array prima di accedere
        $("#c_f").val(data2[0]);
        console.log(data2[0]);

        $("#update-modal").modal('show');
    } );


    $('#search-field').keyup(function () {
        client_table.search($('#search-field').val()).draw();

    });

});
