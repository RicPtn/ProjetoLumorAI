<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once('../functions/DBcon.php');

if (!isset($_SESSION['email'])) {
    echo json_encode(["erro" => "Usuário não autenticado"]);
    exit();
}

$conn = Dbcon('lumorai_db');


$checkUser = $conn->prepare("SELECT tipo FROM usuarios WHERE email = ?");
$checkUser->bind_param("s", $_SESSION['email']);
$checkUser->execute();
$checkUser->store_result();
$checkUser->bind_result($tipo);
$checkUser->fetch();

$sessEmail = $_SESSION['email'];
switch ($tipo) {
    case "medico":
        $query = "
            SELECT
                p.email as email_paciente,
                p.nome AS nome_paciente,
                p.cpf AS paciente_cpf,
                jm.data_hora,
                jm.data_edicao,
                jm.observacoes,
                jm.imagem
            FROM pacientes p
            JOIN jobs_medicos jm ON p.cpf = jm.paciente_cpf
            WHERE jm.medico_email = ?
            ORDER BY jm.data_hora DESC
        ";

        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $sessEmail);
        $stmt->execute();
        $result = $stmt->get_result();
        $dados = $result->fetch_all(MYSQLI_ASSOC);
        foreach ($dados as &$row) {
            if (isset($row['imagem']) && !empty($row['imagem'])) {
            $row['imagem'] = base64_encode($row['imagem']);
            }
        }

        echo json_encode([
            "sessEmail" => $sessEmail ?? null,
            "pacientes" => $dados
            ]);
        break;

    case "admin":
        $query = "
            SELECT 
                m.email,
                u.username AS nome_medico,
                MAX(jm.data_hora) AS data_hora,
                MAX(jm.data_edicao) AS data_edicao
            FROM medicos m
            JOIN usuarios u ON m.email = u.email
            LEFT JOIN jobs_medicos jm ON jm.medico_email = m.email
            WHERE m.admin_email = ?
            GROUP BY m.email, u.username
            ORDER BY data_hora DESC
        ";

        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $sessEmail);
        $stmt->execute();
        $result = $stmt->get_result();
        $dados = $result->fetch_all(MYSQLI_ASSOC);

        echo json_encode([
        "sessEmail" => $sessEmail ?? null,
        "medicos" => $dados ?? []
        ]);
        break;

    default:
        echo json_encode(["erro" => "Tipo de usuário inválido"]);
        exit();
}



exit();
?>
