<?php
require_once('DBcon.php');
function checkCpf($cpf) {
    $conn = DBcon('lumorai_db');
    $consulta = $conn->prepare('SELECT cpf FROM usuarios WHERE cpf = ?');
    $consulta->bind_param('s', $cpf);
    $consulta->execute();
    $consulta->store_result();

    if($consulta->num_rows > 0) {
        return false;
    } else {
        return true;
    }
}
function validaCPF($cpf) {
    $cpf = preg_replace('/[^0-9]/is', '', $cpf);

    if (strlen($cpf) !== 11){
        return false;
    }

    if (preg_match('/(\d)\1{10}/', $cpf)) {
        return false;
    }

    for ($t = 0, $c = 10, $sum = 0; $t < 9; $t++, $c--) {
        $sum += intval($cpf[$t]) * $c;
    }

    $l = $sum % 11;
    $l = ($l < 2) ? 0 : 11 - $l;

    for ($t = 0, $c = 11, $sum = 0; $t < 10; $t++, $c--) {
        $sum += intval($cpf[$t]) * $c;
    }

    $m = $sum % 11;
    $m = ($m < 2) ? 0 : 11 - $m;
    return $cpf[9] == $l && $cpf[10] == $m;
}
?>