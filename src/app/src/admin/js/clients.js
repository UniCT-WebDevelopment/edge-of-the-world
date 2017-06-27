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
        var rowData = client_table.rows($(this).parents('tr')).data();
        var current_data=Object.values(rowData[0]); //devo convertire l'oggetto in array prima di accedere
        $("#c_f").val(current_data[0]);
        $("#city").val(current_data[1]);
        $("#address").val(current_data[2]);
        $("#tel_number").val(current_data[3]);
        $("#n_sites").val(current_data[4]);
        $("#total_cost").val(current_data[5]);
        $("#update-modal").modal('show');
    });


    $('#search-field').keyup(function () {
        client_table.search($('#search-field').val()).draw();

    });

    $('#new_client_save').click(function(){

        var c_f=$("#c_f_new").val();
        var city=$("#city_new").val();
        var address=$("#address_new").val();
        var tel_number=$("#tel_number_new").val();
        var n_siti=$("#n_sites_new").val();
        var total_cost=$("#total_cost_new").val();

        console.log(c_f);


        $.ajax({

            type : 'POST',
            url  : '../admin/insert_cliente.php',
            data: {c_f: c_f, city: city, address: address, tel_number: tel_number, n_siti: n_siti, total_cost: total_cost},
            dataType: "json", // type of returned data

            success :  function(data)
            {
                console.log("try");
                if(data.response === 0 ){

                 console.log("Success insert");
                }
                else if(data.response === 1){
                    console.log("Failed insert");
                }
                else{
                    console.log("POST problem");
                }
            }
        });
        client_table.ajax.reload();
        return false;

    });

});
