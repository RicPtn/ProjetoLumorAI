<?php
session_start();
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
require_once('DBcon.php');

$conn = DBcon("lumorai_db");

$query = "
        SELECT 
            u.username AS usuario_medico,
            u.senha AS senha_medico,
            u.email AS email_medico,
            u.telefone AS telefone_medico,
            m.crm AS crm_medico,
            u.cpf AS cpf_medico
    FROM medicos m
    JOIN usuarios u ON m.email = u.email
    WHERE m.admin_email = ?;
    ";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $_SESSION['email']);

$stmt->execute();
$result = $stmt->get_result();
$dados = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($dados);
exit();

?>