<?php
session_start();
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
require_once("../functions/email.php");

if(!isset($_SESSION['email'])) {
    echo "Sessão inválida.";
    session_destroy();
    exit();
}
function resendCode() {
    $newcode = rand(100000, 999999);
    $timer = time() + (10*60);
    session_regenerate_id();

    $_SESSION['codigo'] = $newcode;
    $_SESSION['expira'] = $timer;
    sendEmail($_SESSION['email'], $_SESSION['codigo']);
    echo "defined";
}

resendCode();
exit();
?>