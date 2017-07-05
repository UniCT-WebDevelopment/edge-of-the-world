<?php
session_start();

if($_SESSION['type']!= "admin")
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

    <title>Dashboard Admin</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/sb-admin.css" rel="stylesheet">

    <!-- Morris Charts CSS -->
    <link href="css/plugins/morris.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <link href="../css/grayscale.min.css" rel="stylesheet" type="text/css">

    <script src="../node_modules/jquery/dist/jquery.min.js"></script>

    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs/jqc-1.12.4/dt-1.10.15/datatables.min.css"/>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.15/css/dataTables.bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="css/modulo.css">


    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs/jqc-1.12.4/dt-1.10.15/b-1.3.1/r-2.1.1/se-1.2.2/datatables.css"/>

    <script type="text/javascript" src="https://cdn.datatables.net/v/bs/jqc-1.12.4/dt-1.10.15/b-1.3.1/r-2.1.1/se-1.2.2/datatables.js"></script>




    <script src="js/modulo.js"></script>


</head>

<body>

<div class="modal fade" id="update-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Aggiorna</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="id-modulo">ID</label>
                    <input type="text" class="form-control" placeholder="ID" id="id-modulo" disabled>
                </div>
                <div class="form-group">
                    <label for="nome-modulo">Nome</label>
                    <input type="text" class="form-control" placeholder="Nome" id="nome-modulo">
                </div>
                <div class="form-group">
                    <label for="funzione-modulo">Funzione</label>
                    <input type="text" class="form-control" placeholder="Funzione" id="funzione-modulo">
                </div>
                <div class="form-group">
                    <label for="costo-modulo">Costo</label>
                    <input type="text" class="form-control" placeholder="Costo" id="costo-modulo">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id="update-modal-save">Save changes</button>
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
            <a class="navbar-brand" href="riepilogo.php">Dashboard Admin</a>
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
                    <a href="riepilogo.php"><i class="fa fa-fw fa-dashboard"></i> Riepilogo</a>
                </li>
                <li>
                    <a href="clients.php"><i class="fa fa-fw fa-btc"></i> Gestione Clienti</a>
                </li>
                <li>
                    <a href="developer.php"><i class="fa fa-fw fa-briefcase"></i> Gestione Dipendenti</a>
                </li>
                <li>
                    <a href="layout.php"><i class="fa fa-fw fa-columns"></i> Gestione Layout</a>
                </li>
                <li>
                    <a href="modulo.php"><i class="fa fa-fw fa-cubes"></i> Gestione Moduli</a>
                </li>
                <li>
                    <a href="../index.php"><i class="fa fa-fw fa-home"></i> Home</a>
                </li>
                <li>
                    <a href="admin_stats.php"><i class="fa fa-fw fa-line-chart"></i> Statistiche</a>
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
                     Dashboard Admin<small>Gestione Moduli</small>
                    </h1>
                </div>
            </div>


            <div class="row">
                <div class="col-md-12">
                    <input type="text" class="form-control" placeholder="Cerca Modulo" id="search-field-modulo">
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <table id="modulo-table" class="table table-striped table-bordered" cellspacing="0" width="100%">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Funzione</th>
                                    <th>Costo</th>
                                    <th>Options</th>
                                </tr>
                                </thead>
                                <tfoot>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Funzione</th>
                                    <th>Costo</th>
                                    <th>Options</th>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>



            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">
                        Dashboard  <small>Nuovo Modulo</small>
                    </h1>
                </div>
            </div>


            <div class="row">
                <div class="col-md-12">
                    <form method="post" id="new_modulo">
                    <div class="form-group">
                        <label for="nome-modulo-new">Nome</label>
                        <input type="text" class="form-control" placeholder="Nome" id="nome-modulo-new">
                    </div>
                    <div class="form-group">
                        <label for="funzione-modulo-new">Funzione</label>
                        <input type="text" class="form-control" placeholder="Funzione" id="funzione-modulo-new">
                    </div>
                        <div class="form-group">
                            <label for="costo-modulo-new">Costo</label>
                            <input type="text" class="form-control" placeholder="Costo" id="costo-modulo-new">
                        </div>
                    </form>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4"></div>
                <div class="col-md-4">
                    <button type="button" class="btn btn-block btn-primary" id="new_modulo_save">Salva</button>
                </div>
                <div class="col-md-4"></div>
            </div>


        </div>
        <!-- /.container-fluid -->

    </div>
    <!-- /#page-wrapper -->

</div>
<!-- /#wrapper -->

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

    <!-- Morris Charts JavaScript -->
    <script src="js/plugins/morris/raphael.min.js"></script>
    <script src="js/plugins/morris/morris.min.js"></script>
    <script src="js/plugins/morris/morris-data.js"></script>
    <!-- Theme JavaScript -->
    <script src="../js/grayscale.min.js"></script>

</body>

</html>
