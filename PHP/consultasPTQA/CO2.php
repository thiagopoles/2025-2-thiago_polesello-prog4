<?php
header('Content-Type: application/json; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORREÇÃO: Caminho relativo correto e variável certa
include '../mysqlConnection.php';

$dataInicial = $_GET['dataInicial'] ?? null;
$dataFinal   = $_GET['dataFinal'] ?? null;
$tipoGrafico = $_GET['tipoGrafico'] ?? 'linha';

if (!$dataInicial || !$dataFinal) {
    echo json_encode(["erro" => "Datas não enviadas"]);
    exit;
}

// Verificar se a conexão foi estabelecida
if (!$conecta) {
    echo json_encode(["erro" => "Erro de conexão com o banco"]);
    exit;
}

try {
    $sql = "SELECT dataleitura, ROUND(AVG(eco2),2) AS media_co2
            FROM leituraptqa
            WHERE dataleitura BETWEEN :dataInicial AND :dataFinal
            GROUP BY dataleitura
            ORDER BY dataleitura ASC";

    $stmt = $conecta->prepare($sql); // USANDO $conecta
    $stmt->execute([
        ':dataInicial' => $dataInicial,
        ':dataFinal'   => $dataFinal
    ]);

    $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($resultado);

} catch(PDOException $e) {
    echo json_encode(["erro" => "Erro no banco de dados: " . $e->getMessage()]);
}
?>