<?php
header('Content-Type: application/json; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

include '../mysqlConnection.php';

$dataInicial = $_GET['dataInicial'] ?? null;
$dataFinal   = $_GET['dataFinal'] ?? null;

if (!$dataInicial || !$dataFinal) {
    echo json_encode(["erro" => "Datas não enviadas"]);
    exit;
}

$sql = "SELECT DATE(datahora) AS dataleitura, ROUND(AVG(hi),2) AS umid_interna
        FROM leituramabel
        WHERE DATE(datahora) BETWEEN :dataInicial AND :dataFinal
        GROUP BY DATE(datahora)
        ORDER BY DATE(datahora) ASC";

$stmt = $conecta->prepare($sql);
$stmt->execute([
    ':dataInicial' => $dataInicial,
    ':dataFinal'   => $dataFinal
]);

$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($resultado);
?>
