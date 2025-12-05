<?php
header('Content-Type: application/json; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'conecta_mysql.php'; // Inclui a conexão com o banco de dados

$dataInicial = $_GET['dataInicial'] ?? null;
$dataFinal = $_GET['dataFinal'] ?? null;
$frequencia = $_GET['freq'] ?? null; 

if (!$dataInicial || !$dataFinal) {
echo json_encode(["erro" => "Datas não enviadas"]);
exit;
}

$sql = "SELECT dataleitura, horaleitura, AVG(temperatura) AS temperatura media
FROM leituraptqa
WHERE dataleitura BETWEEN :dataInicial AND :dataFinal
ORDER BY dataleitura, horaleitura ASC";

$stmt = $conecta->prepare($sql); 
$stmt->execute([
':dataInicial' => $dataInicial,
':dataFinal' => $dataFinal
]);

$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

$dadosFiltrados = [];

// --- LOOP DE SAMPLING ---
foreach ($resultado as $index => $row) {
    if ($index % $frequencia == 0) {
        if (!empty($row['datainclusao'])) {
            $row['datainclusao'] = date("d/m/Y", strtotime($row['datainclusao']));
        }
        $dadosFiltrados[] = $row;
    }
}

echo json_encode($dadosFiltrados);
?>