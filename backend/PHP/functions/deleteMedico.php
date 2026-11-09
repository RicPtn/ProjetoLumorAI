<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once('../functions/DBcon.php');

// Verifica autenticação
if (!isset($_SESSION['email'])) {
    echo json_encode(["erro" => "Usuário não autenticado."]);
    exit();
}

$conn = DBcon('lumorai_db');
$adminEmail = $_SESSION['email'];

// Recebe o corpo da requisição
$input = json_decode(file_get_contents("php://input"), true);
$medicoEmail = $input['email'] ?? null;

if (!$medicoEmail) {
    echo json_encode(["erro" => "E-mail do médico não informado."]);
    exit();
}

// Verifica se o usuário logado é um admin
$checkTipo = $conn->prepare("SELECT tipo FROM usuarios WHERE email = ?");
$checkTipo->bind_param("s", $adminEmail);
$checkTipo->execute();
$checkTipo->store_result();
$checkTipo->bind_result($tipo);
$checkTipo->fetch();

if ($tipo !== 'admin') {
    echo json_encode(["erro" => "Apenas administradores podem excluir médicos."]);
    exit();
}

// Verifica se o médico pertence ao admin logado
$checkMedico = $conn->prepare("SELECT admin_email FROM medicos WHERE email = ?");
$checkMedico->bind_param("s", $medicoEmail);
$checkMedico->execute();
$checkMedico->store_result();
$checkMedico->bind_result($adminDoMedico);
$checkMedico->fetch();

if ($checkMedico->num_rows === 0) {
    echo json_encode(["erro" => "Médico não encontrado."]);
    exit();
}

if ($adminDoMedico !== $adminEmail) {
    echo json_encode(["erro" => "Você não tem permissão para excluir este médico."]);
    exit();
}

// Exclui o médico e seu usuário
$conn->begin_transaction();

try {
    $deleteMedico = $conn->prepare("DELETE FROM medicos WHERE email = ?");
    $deleteMedico->bind_param("s", $medicoEmail);
    $deleteMedico->execute();

    $deleteUsuario = $conn->prepare("DELETE FROM usuarios WHERE email = ?");
    $deleteUsuario->bind_param("s", $medicoEmail);
    $deleteUsuario->execute();

    $conn->commit();

    echo json_encode(["sucesso" => "Médico excluído com sucesso."]);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["erro" => "Erro ao excluir médico: " . $e->getMessage()]);
}
?>
