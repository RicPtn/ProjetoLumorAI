<?php
session_start();
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");

require_once('../functions/DBcon.php');
require_once('../functions/checkcpf.php');

$conn = DBcon('lumorai_db');


$email = $_SESSION['email'];
$data = date('Y-m-d');
$cpf = $_POST["pacientecpf"];
$obs = $_POST["obs"];
$nome = $_POST["pacientenome"];
$emailpaciente = $_POST["pacienteemail"];


if(!checkCpf($cpf)) {
    echo "CPF já existente.";
    exit();
}

if(!validaCPF($cpf)) {
    echo "CPF inválido";
    exit();
}

$imgdata = file_get_contents($_FILES["imagem"]["tmp_name"]);

$consulta = $conn->prepare("INSERT INTO jobs_medicos (medico_email, paciente_cpf, imagem, data_hora, observacoes, data_edicao) VALUES (?, ?, ?, ?, ?, ?)");
$consulta->bind_param("ssssss", $email, $cpf, $imgdata, $data, $obs, $data);
$consulta2 = $conn->prepare("INSERT INTO pacientes (cpf, nome, email) VALUES (?, ?, ?)");
$consulta2->bind_param("sss", $cpf, $nome, $emailpaciente);

if ($consulta->execute() && $consulta2->execute()) {
    echo "Paciente criado.";
} else {
    echo "Erro: {$consulta->error}";
}
$consulta->close();
$consulta2->close();
$conn->close();
exit();
?>