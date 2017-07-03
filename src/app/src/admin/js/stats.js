$(document).ready(function () {


       $.ajax({

        type : 'POST',
        url  : '../admin/getDonutChartValue.php',
        data: {},
        dataType: "json", // type of returned data

        success :  function(data)
        {
            Morris.Donut({
                element: 'morris-donut-chart',
                data: data.data,
                resize: true
            });
        },
           error: function () {
               alert("Error loading data! Please try again.");
           }
    });


});
