<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
require_once('../functions/DBcon.php');
require_once('../functions/checkcpf.php');
$conn = DBcon('lumorai_db');

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["username"] ?? '';
    $password = $_POST["password"] ?? '';
    $passwordcon = $_POST["passwordcon"] ?? '';
    $email = $_POST["email"] ?? '';
    $tel = $_POST["tel"] ?? null;
    $cpf = $_POST["cpf"] ?? '';

    if (!validaCPF($cpf)) {
        echo "CPF inválido.";
        exit();
    }

    if (!checkCpf($cpf)) {
       echo "CPF já cadastrado.";
       exit();
    }

    if ($passwordcon != $password) {
        echo "Senhas não coincidem.";
        exit();
    }
    $checkUser = $conn->prepare("SELECT username FROM usuarios WHERE username = ?");
    $checkUser->bind_param("s", $name);
    $checkUser->execute();
    $checkUser->store_result();

    if($checkUser->num_rows > 0){
        echo 'Nome de usuário já cadastrado.';
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


    $password = password_hash($password, PASSWORD_DEFAULT);
                    
    if ($tel) {
            $consulta = $conn->prepare("INSERT INTO usuarios (email, username, senha, telefone, cpf) VALUES (?, ?, ?, ?, ?)");
            $consulta->bind_param("sssss", $email, $name, $password, $tel, $cpf);
        } else {
            $tel = null;
            $consulta = $conn->prepare("INSERT INTO usuarios (email, username, senha, telefone, cpf) VALUES (?, ?, ?, ?, ?)");
            $consulta->bind_param("sssss", $email, $name, $password, $tel, $cpf);
        }
        if($consulta->execute()) {
            echo 'Conta criada';
        } else {
            echo "Erro na criação da conta; {$consulta->error}";
        }
        $consulta->close();
    }
$conn->close();
exit();
?>