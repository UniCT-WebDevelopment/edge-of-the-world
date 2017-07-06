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



    var layout_table;
    var site_table;

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
                                        '<button id="update" class="btn btn-warning" data-toggle="modal">Aggiorna</button>' +
                                        '<button id="add-website" class="btn btn-primary">Aggiungi sito web</button>'+
                                        '<button id="show_sites" class="btn btn-success">Visualizza Siti</button>'+
                                        '<button id="delete" class="btn btn-danger">Elimina</button>'},
                                    ],

                                });

    var load_layout_table=function(){
                                          var table=$('#layout-show-table').DataTable({
                                              "pageLength": 5,
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
                                                    '<button id="add-layout" class="btn btn-primary">Aggiungi</button>'+
                                                    '<button id="show-modulo"class="btn btn-success">Visualizza Moduli</button>'
                                                    },

                                                ],

                                            });
                                            return table;
    };

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
                                                        {"defaultContent":
                                                            '<button id="delete-sito" class="btn btn-danger">Elimina</button>'}
                                                    ],

                                                  });
                                                return table;
    };

    $('#client-table tbody').on('click', '#show_sites', function(){
        var rowData = client_table.rows($(this).parents('tr')).data();
        var current_data=Object.values(rowData[0]); //devo convertire l'oggetto in array prima di accedere
        var id_cliente=current_data[0];
        site_table=load_sito_web(id_cliente);
        $('#list-site-modal').modal('show');
    });

    $('#client-table tbody').on( 'click', '#update', function () {
        event.preventDefault();
        var rowData = client_table.rows($(this).parents('tr')).data();
        var current_data=Object.values(rowData[0]); //devo convertire l'oggetto in array prima di accedere
        $('#codice').val(current_data[0]);
        $("#c_f").val(current_data[1]);
        $("#city").val(current_data[2]);
        $("#address").val(current_data[3]);
        $("#tel_number").val(current_data[4]);
        $("#update-modal").modal('show');

    });


    $('#client-table tbody').on( 'click', '#delete', function () {
        event.preventDefault();
        var rowData = client_table.rows($(this).parents('tr')).data();
        var current_data=Object.values(rowData[0]); //devo convertire l'oggetto in array prima di accedere
        var codice=current_data[0];
        $.ajax({

            type : 'POST',
            url  : '../admin/delete_cliente.php',
            data: {codice: codice},
            dataType: "json", // type of returned data

            success :  function(data)
            {
                    if(data.response === 0 ){
                        client_table.ajax.reload();
                        console.log("Success delete");

                    }
                else if(data.response === 1){
                    alert("Impossibile eliminare un utente con siti commissionati. Cancella prima i siti commissionati");
                    console.log("Failed delete");
                }
                else{
                    console.log("POST problem");
                }
            }
        });

    });

    $('#client-table tbody').on( 'click', '#add-website', function () {
        var rowData = client_table.rows($(this).parents('tr')).data();
        var current_data=Object.values(rowData[0]); //devo convertire l'oggetto in array prima di accedere
        var codice=current_data[0];
         layout_table=load_layout_table();
         $('#codice_cliente').val(codice);
       $("#sito_web_modal").modal('show');
    });

    $('#site-table tbody').on('click', '#delete-sito', function(){
        var rowData = site_table.rows($(this).parents('tr')).data();
        var current_data=Object.values(rowData[0]); //devo convertire l'oggetto in array prima di accedere
        var codice=current_data[0];

        $.ajax({

            type : 'POST',
            url  : '../admin/delete_sito_web.php',
            data: {codice: codice},
            dataType: "json", // type of returned data

            success :  function(data)
            {

                if(data.response === 0 ){


                    //TODO controllare i form di inserimento e resettarli dopo il corretto inserimento

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
        site_table.ajax.reload();
        client_table.ajax.reload();
        return false;


    });

    $('#layout-show-table tbody').on('click', '#add-layout', function(){
        var rowData= layout_table.rows($(this).parents('tr')).data();
        var current_data=Object.values(rowData[0]);
        $('#id_layout').val(current_data[0]);
    });

    $('#add_sito_web_button').click(function(){

        var i=0;

        var url= $('#url_input').val();
        var data= $('#date_input').val();
        var codice= $('#codice_cliente').val();
        var id_layout=$('#id_layout').val();


        if(url==="" ) {
            $('#url_input').css("border", "1px solid red");
            return false;
        }
        else{
            $('#url_input').css("border", "");
            i++;
        }
        if(!isValidDate(data)){
            $('#date_input').css("border", "1px solid red");
            return false;
        }
        else{
            $('#date_input').css("border", "");
            i++;
        }
        if(id_layout==="") {
            $('#id_layout').css("border", "1px solid red");
            return false;
        }
        else {
            $('#id_layout').css("border", "");
            i++;
        }
        if(i === 3){
            $.ajax({

                type: 'POST',
                url: '../admin/add_sito_web.php',
                data: {url: url, data: data, codice: codice, id_layout: id_layout},
                dataType: "json", // type of returned data

                success: function (data) {

                    if (data.response === 0) {
                        $('#url_input').val("");
                        $('#date_input').val("");
                        $('#id_layout').val("");
                        $('#sito_web_modal').modal('hide');
                        console.log("Success insert");
                    }
                    else if (data.response === 1) {
                        console.log("Failed insert");
                    }
                    else {
                        console.log("POST problem");
                    }
                }
            });
        }
        else{
            return false;
        }
        client_table.ajax.reload();
        return false;

   });

    $('#layout-show-table tbody').on('click', '#show-modulo', function(){

        var rowData= layout_table.rows($(this).parents('tr')).data();
        var current_data=Object.values(rowData[0]);
        var id_layout=current_data[0];

        $('#modulo-table').DataTable({
            "pageLength": 5,
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
        $('#modulo-modal').modal('show');
    });

    $('#list-modulo').click(function(){
        event.preventDefault();
        $('#modulo-modal').modal('hide');
        event.stopPropagation();
    });

    $('#search-field').keyup(function () {
        client_table.search($('#search-field').val()).draw();

    });

    $('#new_client_save').click(function(){

        var i=0;

        var c_f=$("#c_f_new").val();
        var city=$("#city_new").val();
        var address=$("#address_new").val();
        var tel_number=$("#tel_number_new").val();


        if(c_f==="" ) {
            $('#c_f_new').css("border", "1px solid red");
            return false;
        }
        else{
            $('#c_f_new').css("border", "");
            i++;
        }
        if(city===""){
            $('#city_new').css("border", "1px solid red");
            return false;
        }
        else{
            $('#city_new').css("border", "");
            i++;
        }
        if(address==="") {
                $('#address_new').css("border", "1px solid red");
                return false;
            }
        else{
            $('#address_new').css("border", "");
            i++;
        }
        if(tel_number==="") {
            $('#tel_number_new').css("border", "1px solid red");
            return false;
        }
        else {
            $('#tel_number_new').css("border", "");
            i++;
        }
        if( i === 4){
            $.ajax({

                type: 'POST',
                url: '../admin/insert_cliente.php',
                data: {c_f: c_f, city: city, address: address, tel_number: tel_number},
                dataType: "json", // type of returned data

                success: function (data) {
                    console.log("try");
                    if (data.response === 0) {
                        $('#c_f_new').val("");
                        $('#city_new').val("");
                        $('#address_new').val("");
                        $('#tel_number_new').val("");

                        console.log("Success insert");
                    }
                    else if (data.response === 1) {
                        console.log("Failed insert");
                    }
                    else {
                        console.log("POST problem");
                    }
                }
            });
        }
        else{
            return false;
        }
        client_table.ajax.reload();
        return false;

    });

    $('#update-modal-save').click(function(){

        var i=0;

        var codice=$('#codice').val();
        var city=$("#city").val();
        var address=$("#address").val();
        var tel_number=$("#tel_number").val();


        if(city===""){
            $('#city').css("border", "1px solid red");
            return false;
        }
        else{
            $('#city').css("border", "");
            i++;
        }
        if(address==="") {
            $('#address').css("border", "1px solid red");
            return false;
        }
        else{
            $('#address').css("border", "");
            i++
        }
        if(tel_number==="") {
            $('#tel_number').css("border", "1px solid red");
            return false;
        }
        else {
            $('#tel_number').css("border", "");
            i++
        }
        if(i === 3) {
            $.ajax({

                type: 'POST',
                url: '../admin/update_cliente.php',
                data: {codice: codice, city: city, address: address, tel_number: tel_number},
                dataType: "json", // type of returned data

                success: function (data) {
                    console.log("try");
                    if (data.response === 0) {
                        $('#update-modal').modal('hide');
                        console.log("Success update");
                    }
                    else if (data.response === 1) {
                        console.log("Failed update");
                    }
                    else {
                        console.log("POST problem");
                    }
                }
            });
        }
        else{
            return false;
        }
        client_table.ajax.reload();
        return false;
    });

    function isValidDate(str){
        // STRING FORMAT yyyy-mm-dd
        if(str=="" || str==null){return false;}

        // m[1] is year 'YYYY' * m[2] is month 'MM' * m[3] is day 'DD'
        var m = str.match(/(\d{4})-(\d{2})-(\d{2})/);

        // STR IS NOT FIT m IS NOT OBJECT
        if( m === null || typeof m !== 'object'){return false;}

        // CHECK m TYPE
        if (typeof m !== 'object' && m !== null && m.size!==3){return false;}

        var ret = true; //RETURN VALUE
        var thisYear = new Date().getFullYear(); //YEAR NOW
        var minYear = 1999; //MIN YEAR

        // YEAR CHECK
        if( (m[1].length < 4) || m[1] < minYear || m[1] > thisYear){ret = false;}
        // MONTH CHECK
        if( (m[2].length < 2) || m[2] < 1 || m[2] > 12){ret = false;}
        // DAY CHECK
        if( (m[3].length < 2) || m[3] < 1 || m[3] > 31){ret = false;}

        return ret;
    }

});
