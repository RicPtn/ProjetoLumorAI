<?php
session_start();
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
require_once('../functions/DBcon.php');
$conn = DBcon('lumorai_db');

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    $consulta = $conn->prepare("SELECT senha FROM usuarios WHERE email = ?");
    $consulta->bind_param("s", $email);
    $consulta->execute();
    $consulta->store_result();

    if ($consulta->num_rows > 0) {
        $consulta->bind_result($db_password);
        $consulta->fetch();

        if (password_verify($password, $db_password)) {

            session_regenerate_id();
            $_SESSION['email'] = $email;
            $checkUser = $conn->prepare("SELECT tipo FROM usuarios WHERE email = ?");
            $checkUser->bind_param("s", $email);
            $checkUser->execute();
            $checkUser->store_result();
            $checkUser->bind_result($tipo);
            $checkUser->fetch();

            switch ($tipo) {
                case 'medico': 
                    echo "Login Feito.";
                    break;
                default:
                    echo "Login feito";
                    break;
            }
            
        } else {
            echo "Usuário ou senha inválida.";
        }
    } else {
        echo "Usuário ou senha inválida.";
    }
    $consulta->close();
    $conn->close();
} else {
    echo "Método inválido";
}
?>
