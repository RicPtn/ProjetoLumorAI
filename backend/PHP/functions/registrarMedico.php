<?php
session_start();

header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");

require_once('../functions/DBcon.php');
require_once('../functions/checkcpf.php');

$conn = DBcon('lumorai_db');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (!isset($_SESSION['email'])) {
        echo "Usuário não autenticado.";
        exit();
    }

    $admin_email = $_SESSION['email'];

    $name = $_POST["username"] ?? '';
    $password = $_POST["password"] ?? '';
    $passwordcon = $_POST["passwordcon"] ?? '';
    $email = $_POST["email"] ?? '';
    $tel = $_POST["tel"] ?? null;
    $cpf = $_POST["cpf"] ?? '';
    $crm = $_POST["crm"] ?? '';
    $tipo = "medico";

    if (!validaCPF($cpf)) {
        echo "CPF Inválido.";
        exit();
    }

    if (!checkCpf($cpf)) {
        echo "CPF já cadastrado.";
        exit();
    }

    if ($password !== $passwordcon) {
        echo "Senhas não coincidem.";
        exit();
    }

    $checkUser = $conn->prepare("SELECT username FROM usuarios WHERE username = ?");
    $checkUser->bind_param("s", $name);
    $checkUser->execute();
    $checkUser->store_result();

    if ($checkUser->num_rows > 0) {
        echo 'Usuário já existente.';
        $checkUser->close();
        exit();
    }
    $checkUser->close();

    $checkEmail = $conn->prepare("SELECT email FROM usuarios WHERE username = ?");
    $checkEmail->bind_param("s", $name);
    $checkEmail->execute();
    $checkEmail->store_result();

    if($checkEmail->num_rows > 0){
        echo 'Email já cadastrado.';
        exit();
    }
    $checkEmail->close();

    $password_hashed = password_hash($password, PASSWORD_DEFAULT);

    if ($tel) {
        $consulta = $conn->prepare("INSERT INTO usuarios (email, username, senha, telefone, cpf, tipo) VALUES (?, ?, ?, ?, ?, ?)");
        $consulta->bind_param("ssssss", $email, $name, $password_hashed, $tel, $cpf, $tipo);
    } else {
        $tel = null;
        $consulta = $conn->prepare("INSERT INTO usuarios (email, username, senha, telefone, cpf, tipo) VALUES (?, ?, ?, ?, ?, ?)");
        $consulta->bind_param("ssssss", $email, $name, $password_hashed, $tel, $cpf, $tipo);
    }

    $consulta2 = $conn->prepare("INSERT INTO medicos (email, crm, admin_email) VALUES (?, ?, ?)");
    $consulta2->bind_param("sss", $email, $crm, $admin_email);

    if ($consulta->execute() && $consulta2->execute()) {
        echo 'Conta criada';
    } else {
        echo "Erro na criação da conta; {$consulta->error} ; {$consulta2->error}";
    }

    $consulta->close();
    $consulta2->close();
    $conn->close();

} else {
    echo "Método inválido";
    exit();
}
?>
