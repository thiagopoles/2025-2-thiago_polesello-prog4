<?php
header('Content-Type: application/json; charset=utf-8');

$conn = new mysqli("localhost","root","","mabel_ptqa_heitor_isabely_thiago");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Erro na conexão: " . $conn->connect_error]);
    exit;
}

$inicio = $_GET['inicio'] ?? null;
$fim    = $_GET['fim'] ?? null;

if (!$inicio || !$fim) {
    echo json_encode([]);
    exit;
}

// Normaliza para incluir horas no intervalo (data inputs vêm como YYYY-MM-DD)
$start = $inicio . " 00:00:00";
$end   = $fim    . " 23:59:59";

// Usamos a tabela correta: leituraptqa
$sql = "SELECT CONCAT(dataleitura, ' ', horaleitura) AS datahora, temperatura
        FROM leituraptqa
        WHERE CONCAT(dataleitura, ' ', horaleitura) BETWEEN ? AND ?
        ORDER BY datahora ASC";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Erro ao preparar consulta"]);
    exit;
}

$stmt->bind_param("ss", $start, $end);
$stmt->execute();
$result = $stmt->get_result();

$dados = [];
while ($row = $result->fetch_assoc()) {
    // Garantir tipos corretos (opcional)
    $row['temperatura'] = $row['temperatura'] !== null ? (float)$row['temperatura'] : null;
    $dados[] = $row;
}

echo json_encode($dados);
