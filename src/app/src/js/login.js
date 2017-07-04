
$('document').ready(function()
{
    /* validation */
    $("#submit-button").click(function()
    {
       
        var username = $("#username").val();
        var password = $("#password").val();
        password=sha512(password);

        $.ajax({


            type : 'GET',
            url  : '../login.php',
            data: {username: username, password: password },
            dataType: "json", // type of returned data

            success :  function(data)
            {
                console.log("try");
                if(data.response === 1 ){
                    window.location.replace(data.url);
                }
                else{
                    console.log("login incorrect");

                }
            }
        });
        return false;
    });
});


