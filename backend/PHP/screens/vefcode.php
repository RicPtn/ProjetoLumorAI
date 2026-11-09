<?php
session_start();
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!isset($_SESSION['codigo'])) {
        echo 'Sessão inválida.';
        exit();
    } else if (time() > $_SESSION['expira']) {
        echo "Código expirado.";
        exit();
    } else {
        $code = $_POST['code'];
        if ($code == $_SESSION['codigo']) {
            $_SESSION['true'] = true;
            echo "verified";
            exit(); 
        }
    }
}
?>