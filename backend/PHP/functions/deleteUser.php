<?php
session_start();

function Delete($email) {
    $conn = DBcon("lumorai_db");
    $checkType = $conn->prepare("SELECT tipo FROM usuarios WHERE email = ?");
    $checkType->bind_param("s", $email);
    $checkType->execute();
    $checkType->fetch();
    $checkType->bind_result($tipo);
    $checkType->close();

    switch($tipo){
        case 'medico':
            $deleteMedic = $conn->prepare("DELETE FROM usuarios WHERE email = ?");
            $deleteMedic->bind_param('s', $email);
            $deleteMedic->execute();
            $deleteMedic->prepare("DELETE FROM medicos WHERE email = ?");
            $deleteMedic->bind_param('s', $email);
            $deleteMedic->execute();
            $deleteMedic->close();
            break;
        case 'admin':
            $deleteAdmin = $conn->prepare("DELETE FROM usuarios WHERE email = ?");
            $deleteAdmin->bind_param('s', $email);
            $deleteAdmin->execute();
            $deleteAdmin->close();
            break;
        default:
            echo "Usuario inexistente ou inválido.";
            exit();
    }
    exit();
}

?>