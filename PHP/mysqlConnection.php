<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

$servername = "localhost";
$username = "root"; 
$password = "";
$dbname = "mabel_ptqa_heitor_isabely_thiago";

try {
    $conecta = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $conecta->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {

    // Retorna JSON válido, sem HTML
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        "erro" => "Falha na conexão com o banco",
        "detalhes" => $e->getMessage()
    ]);
    exit;
}
?>
