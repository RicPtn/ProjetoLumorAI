<?php
session_start();
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
require_once('../functions/DBcon.php');
$conn = DBcon('lumorai_db');

if (!isset($_SESSION['true'])) {
    echo "undefined";
    exit();
}

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $password = $_POST["password"];
        $passwordcon = $_POST["passwordcon"];
        if ($password == $passwordcon) {
            $password = password_hash($password, PASSWORD_DEFAULT);
                
            $insertnewpass = $conn->prepare('UPDATE usuarios SET senha = ? WHERE email = ?');
            $insertnewpass->bind_param('ss', $password, $_SESSION['email']);
            $insertnewpass->execute();
            echo "defined";

            session_unset();
            session_destroy();
            exit();
        } else {
            echo "As senhas não batem.";
            exit();
        }
    }

if (isset($insertnewpass)) $insertnewpass->close();
$conn->close();
?>