<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once('../../vendor/autoload.php');
function sendEmail($email, $code) {
    $mail = new PHPMailer();
    
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = '';
        $mail->Password = "";
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
    
        $mail->setFrom('','noreply');
        $mail->addAddress($email);
    
        $mail->isHTML(true);
        $mail->Subject = 'Forgot my password';
        $mail->Body = "Seu código de recuperação é: {$code}";
        $mail->AltBody = "{$code}";
    
        $mail->send();
        echo 'Email enviado.';
        exit();
    } catch (Exception $e) {
        echo "Erro ao enviar email. {$mail->ErrorInfo}";
        exit();
    };
}


