
$('document').ready(function()
{

    $.ajax({

        type : 'POST',
        url  : 'get_user_data.php',
        data: {},
        dataType: "json", // type of returned data

        success :  function(data)
        {
            $('#user-name').text(" Benvenuto " + data.nome);
        }
    });


    /* validation */
    $("#submit-button").click(function()
    {
        var i=0;

        var username = $("#username").val();
        var password = $("#password").val();


        if(username===''){
            $('#username').css("border", "1px solid red");
            return false;
        }
        else{
            $('#username').css("border", "");
            i++;
        }
        if(password===''){
            $('#password').css("border", "1px solid red");
            return false;
        }
        else {
            $('#password').css("border", "");
            i++;
        }
        if (i ===2){
            password = sha512(password);

            $.ajax({


                type: 'GET',
                url: '../login.php',
                data: {username: username, password: password},
                dataType: "json", // type of returned data

                success: function (data) {
                    console.log("try");
                    if (data.response === 1) {
                        window.location.replace(data.url);
                    }
                    else {
                        $('#username').css("border", "1px solid red");
                        $('#password').css("border", "1px solid red");
                        console.log("login incorrect");
                        alert("Username o Password Errati");
                    }
                }
            });
        }
        else{
            return false;
        }
        return false;
    });



});


