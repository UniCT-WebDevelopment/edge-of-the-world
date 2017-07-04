<?php
session_start();

echo "username is " . $_SESSION['username'] . ".<br>";
echo "type is " . $_SESSION['type'] . ".";