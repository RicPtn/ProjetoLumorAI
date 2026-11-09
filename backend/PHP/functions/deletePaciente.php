<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once('../functions/DBcon.php');

if (!isset($_SESSION['email'])) {
    echo json_encode(["erro" => "Usuário não autenticado."]);
    exit();
}

$conn = DBcon('lumorai_db');
$medicEmail = $_SESSION['email'];

$input = json_decode(file_get_contents("php://input"), true);
$pacienteCpf = $input['cpf'] ?? null;

if (!$pacienteCpf) {
    echo json_encode(["erro" => "Cpf do paciente não informado."]);
    exit();
}

$checkMedico = $conn->prepare("SELECT medico_email FROM jobs_medicos WHERE paciente_cpf = ?");
$checkMedico->bind_param("s", $pacienteCpf);
$checkMedico->execute();
$checkMedico->store_result();
$checkMedico->bind_result($pacienteDoMedico);
$checkMedico->fetch();

if ($checkMedico->num_rows === 0) {
    echo json_encode(["erro" => "Paciente não encontrado"]);
    exit();
}

if ($pacienteDoMedico !== $medicEmail) {
    echo json_encode(["erro" => "Esse paciente não é seu, portanto não tem permissão para o excluir."]);
    exit();
}

$conn->begin_transaction();

try {
    $deletePaciente = $conn->prepare("DELETE FROM pacientes WHERE cpf = ?");
    $deletePaciente->bind_param("s", $pacienteCpf);
    $deletePaciente->execute();

    $deleteJob = $conn->prepare("DELETE FROM jobs_medicos WHERE paciente_cpf = ?");
    $deleteJob->bind_param("s", $medicoEmail);
    $deleteJob->execute();

    $conn->commit();

    echo json_encode(["sucesso" => "Paciente excluído com sucesso."]);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["erro" => "Erro ao excluir paciente: " . $e->getMessage()]);
}
?>
