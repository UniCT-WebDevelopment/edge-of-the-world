$(document).ready(function()
{
    var client_datatable= $('#client-table').DataTable({
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

                                    ],

                                });

    $('#search-field').keyup(function () {
        client_datatable.search($('#search-field').val()).draw();

    });
});
