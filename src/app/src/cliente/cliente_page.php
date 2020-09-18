<?php
session_start();

if($_SESSION['type']!= "cliente")
{
    die("Acceso negato");
}

?>

<!DOCTYPE html>
<html lang="it">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Dashboard Cliente</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/sb-admin.css" rel="stylesheet">

    <!-- Morris Charts CSS -->
    <link href="css/plugins/morris.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs/jqc-1.12.4/dt-1.10.15/datatables.min.css"/>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.15/css/dataTables.bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="css/client_page.css">

</head>

<body>

<div class="modal fade" id="layout-details" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Dettagli Layout</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">

                <div class="form-group">
                    <label for="id_layout">ID Layout</label>
                    <input type="text" class="form-control" id="id_layout" disabled>
                </div>

                <div class="form-group">
                    <label for="costo-totale">Costo Totale</label>
                    <input type="text" class="form-control" id="costo-totale" disabled>

                    <div class="row">
                        <div class="col-lg-12">
                            <h1 class="page-header">
                                <small>Moduli</small>
                            </h1>
                        </div>
                    </div>
                </div>

                <table id="modulo-table" class="table table-striped table-bordered" cellspacing="0" width="100%">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Funzione</th>
                        <th>Costo</th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Funzione</th>
                        <th>Costo</th>
                    </tr>
                    </tfoot>
                    <tbody>
                    </tbody>
                </table>

                <div class="row">
                    <div class="col-md-12">

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal" id="close-list-site">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="time-interval" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Ricerca Avanzata</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="from">Dal</label>
                    <input type="text" class="form-control" placeholder="YYYY-MM-DD" id="from">
                </div>
                <div class="form-group">
                    <label for="to">Al</label>
                    <input type="text" class="form-control" placeholder="YYYY-MM-DD" id="to">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" id="modal-close">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" id="search-interval">Ricerca</button>
            </div>
        </div>

    </div>
</div>

<div id="wrapper">

    <!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="cliente_page.php">Dashboard Cliente</a>
        </div>
        <!-- Top Menu Items -->
        <ul class="nav navbar-right top-nav">
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user" id="username"></i><b class="caret"></b></a>
                <ul class="dropdown-menu">
                    <li>
                        <a href="../logout.php"><i class="fa fa-fw fa-power-off"></i> Log Out</a>
                    </li>
                </ul>
            </li>
        </ul>
        <!-- Sidebar Menu Items - These collapse to the responsive navigation menu on small screens -->
        <div class="collapse navbar-collapse navbar-ex1-collapse">
            <ul class="nav navbar-nav side-nav">
                <li class="active">
                    <a href="cliente_page.php"><i class="fa fa-fw fa-dashboard"></i> Dashboard Cliente</a>
                </li>
                <li>
                    <a href="../index.php"><i class="fa fa-fw fa-home"></i> Home</a>
                </li>
            </ul>
        </div>
        <!-- /.navbar-collapse -->
    </nav>

    <div id="page-wrapper">


        <div class="container-fluid" id="content-panel">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">
                        <small>Riepilogo</small>
                    </h1>
                </div>
            </div>

        <div class="row">
            <div class="col-md-12">
                <input type="text" class="form-control" placeholder="Cerca" id="search-field">
            </div>
        </div>


        <div class="row">
            <div class="col-md-12">
                <table id="site-table" class="table table-striped table-bordered" cellspacing="0" width="100%">
                    <thead>
                    <tr>
                        <th>Codice</th>
                        <th>Url</th>
                        <th>Data Pubblicazione</th>
                        <th>Layout</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        <th>Codice</th>
                        <th>Url</th>
                        <th>Data Pubblicazione</th>
                        <th>Layout</th>
                        <th>Options</th>
                    </tr>
                    </tfoot>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="row">
            <div class="col-md-3">
                <button class="btn btn-primary btn-block" id="visite-generali">Geneali</button>
            </div>
            <div class="col-md-3">
                <button class="btn btn-info btn-block" id="ultimo-mese">Ultimo mese</button>
            </div>
            <div class="col-md-3">
                <button class="btn btn-info btn-block" id="ultimo-anno">Ultimo anno</button>
            </div>
            <div class="col-md-3">
                <button class="btn btn-info btn-block" id="ricerca-avanzata">Ricerca Avanzata</button>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-info">
                    <div class="panel-heading">
                        <h3 class="panel-title"><i class="fa fa-bar-chart" id="bar-chart-title"></i> Visite Totali</h3>
                    </div>
                    <div class="panel-body">
                        <div id="visita-bar-chart"></div>
                    </div>
                </div>
            </div>

        </div>
        <!-- /.container-fluid -->

    </div>
    <!-- /#page-wrapper -->



        <!-- /.container-fluid -->


</div>
<!-- /#wrapper -->

<script src="../node_modules/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/v/bs/jqc-1.12.4/dt-1.10.15/b-1.3.1/r-2.1.1/se-1.2.2/datatables.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/select/1.2.2/js/dataTables.select.min.js"></script>
<script src="js/client_page.js"></script>

<script src="js/bootstrap.min.js"></script>

<script src="js/plugins/morris/raphael.min.js"></script>
<script src="js/plugins/morris/morris.min.js"></script>
<script src="js/plugins/morris/morris-data.js"></script>

</body>

</html>
