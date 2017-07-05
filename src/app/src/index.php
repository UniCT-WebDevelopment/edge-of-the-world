<?php
session_start();


if(!isset($_SESSION['username'])){
    $access_validation=1;
}
else{
    $access_validation=0;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Edge of the World</title>

    <!-- Bootstrap Core CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">


    <!-- Custom Fonts -->
    <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">

    <!-- Theme CSS -->
    <link href="css/grayscale.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">

    <script src="node_modules/jquery/dist/jquery.min.js"></script>
    <script src="js/login.js"></script>
    <script src="node_modules/js-sha512/src/sha512.js"></script>

</head>

<body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top">

    <!-- Navigation -->
    <nav class="navbar navbar-custom navbar-fixed-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse">
                    Menu <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand page-scroll" href="#page-top">
                    <i class="fa fa-fw fa-globe"></i> Edge of the World</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse navbar-right navbar-main-collapse">
                <ul class="nav navbar-nav">
                    <!-- Hidden li included to remove active class from about link when scrolled up past about section -->
                    <li class="hidden">
                        <a href="#page-top"></a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#about">About</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#contact">Contatti</a>
                    </li>
                    <li class="dropdown" id="dropdown_menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" id="access">Area Privata <span class="caret"></span></a>
                        <ul id="login-dp" class="dropdown-menu">
                            <li>
                                <?php if($access_validation == 1) : ?>
                                <div class="row" id="login-menu">
                                    <div class="col-md-12">
                                        <form method="get" id="login-nav">
                                            <div class="form-group">
                                                <label class="sr-only" for="username">Email address</label>
                                                <input type="email" class="form-control" id="username" placeholder="Email address" required>
                                            </div>
                                            <div class="form-group">
                                                <label class="sr-only" for="password">Password</label>
                                                <input type="password" class="form-control" id="password" placeholder="Password" required>
                                                <div class="help-block text-right login-text"><a href="">Forget the password ?</a></div>
                                            </div>
                                            <div class="form-group">
                                                <button type="submit" class="btn btn-primary btn-block" id="submit-button">Sign in</button>
                                            </div>
                                            <div class="checkbox login-text" >
                                                <label>
                                                    <input type="checkbox"> keep me logged-in
                                                </label>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="bottom text-center login-text">
                                        New here ? <a href="#"><b>Join Us</b></a>
                                    </div>
                                </div>
                                <?php else : ?>
                                    <div>
                                        <i class="fa fa-fw fa-user" id="user-icon"></i><a disabled id="user-name"></a>
                                    </div>
                                <div class="row" id="private-panel">
                                    <?php if(strcmp($_SESSION['type'], "admin")===0) : ?>
                                    <div class="col-md-12 private-link">
                                        <a href="./admin/riepilogo.php"><i class="fa fa-fw fa-tachometer"></i> Dashboard</a>
                                    </div>
                                    <?php elseif(strcmp($_SESSION['type'], "cliente")===0) : ?>
                                    <div class="col-md-12 private-link">
                                        <a href="./cliente/cliente_page.php"><i class="fa fa-fw fa-tachometer"></i> Dashboard</a>
                                    </div>
                                    <?php elseif(strcmp($_SESSION['type'], "developer")===0) : ?>
                                    <div class="col-md-12 private-link">
                                        <a href="./developer/developer_page.php"><i class="fa fa-fw fa-tachometer"></i> Dashboard</a>
                                    </div>
                                    <?php endif; ?>
                                    <div class="col-md-12 private-link">
                                    <a href="logout.php"><i class="fa fa-fw fa-power-off"></i> Logout</a>
                                    </div>
                                </div>
                                <?php endif; ?>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>

    <!-- Intro Header -->
    <header class="intro">
        <div class="intro-body">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2">
                        <h1 class="brand-heading">Edge of the World</h1>
                        <p class="intro-text">"Quando cominciai a trafficare con il programma che avrebbe poi fatto nascere l'idea del World Wide Web,
                            <br> lo chiamai Enquire, da Enquire Within upon Everything, 'entrate pure per avere informazioni su ogni argomento'."
                            <br>Tim Berners-Lee, L'architettura del nuovo Web, 1999
                        </p>
                        <div>
                        <img src="img/tim-berner-lee.jpg" class="img-circle" width="204" height="204">
                        </div>
                        <a href="#about" class="btn btn-circle page-scroll">
                            <i class="fa fa-angle-double-down animated"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- About Section -->
    <section id="about" class="container content-section text-center">
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2">
                <h2>About Edge of The World</h2>
                <p>Siamo un'azienda leader nella realizzazione di siti web</p>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="container content-section text-center">
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2">
                <h2>Contact Edge of the World</h2>
                <p>Manda una mail per informazioni e per eventuali preventivi!</p>
                <p><a href="mailto:support@edgeoftherworld.com">support@edgeoftheworld.com</a>
                </p>
            </div>
        </div>
    </section>
    <!-- Footer -->
    <footer>
        <div class="container text-center">
            <p>Copyright &copy; Edge of the World 2017</p>
        </div>
    </footer>

    <!-- jQuery -->
    <script src="vendor/jquery/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="vendor/bootstrap/js/bootstrap.min.js"></script>

    <!-- Plugin JavaScript Vedere se posso sotituirlo con una locale-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>

    <!-- Theme JavaScript -->
    <script src="js/grayscale.min.js"></script>

</body>

</html>
