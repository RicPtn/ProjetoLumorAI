<?php
session_start();
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
require_once('../functions/DBcon.php');
require_once('../functions/email.php');
$conn = Dbcon('lumorai_db');
$message = "";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];

    $consulta = $conn->prepare('SELECT email FROM usuarios WHERE email = ?');
    $consulta->bind_param('s', $email);
    $consulta->execute();
    $consulta->store_result();
    if($consulta->num_rows>0) {
        $code = rand(100000, 999999);

        session_regenerate_id();

        $_SESSION['codigo'] = $code;
        $_SESSION['expira'] = time() + 10 * 60;
        $_SESSION['email'] = $email;

        sendEmail($email, $code);
        exit();
    } else {
        echo "Email não encontrado.";
    }
    $conn->close();
    $consulta->close();
};
?>