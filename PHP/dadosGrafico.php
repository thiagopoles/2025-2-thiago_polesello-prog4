<?php
header("Content-Type: application/json");

require_once "mysqlConnection.php";

$db = new MySQL_Connection();
$conn = $db->connect();

$sql = "
    SELECT 
        DATE(datahora) AS dia,
        AVG(te) AS temp_externa,
        AVG(ti) AS temp_interna,
        AVG(ninho) AS temp_ninho,
        AVG(he) AS umidade_externa,
        AVG(hi) AS umidade_interna
    FROM leituramabel
    GROUP BY DATE(datahora)
    ORDER BY dia
";

$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Vetores para o ApexCharts
$categorias = [];
$temp_externa = [];
$temp_interna = [];
$temp_ninho = [];
$umid_externa = [];
$umid_interna = [];

foreach ($result as $row) {
    $categorias[]   = $row["dia"];
    $temp_externa[] = floatval($row["temp_externa"]);
    $temp_interna[] = floatval($row["temp_interna"]);
    $temp_ninho[]   = floatval($row["temp_ninho"]);
    $umid_externa[] = floatval($row["umidade_externa"]);
    $umid_interna[] = floatval($row["umidade_interna"]);
}

echo json_encode([
    "labels"         => $categorias,
    "te"             => $temp_externa,
    "ti"             => $temp_interna,
    "ninho"          => $temp_ninho,
    "he"             => $umid_externa,
    "hi"             => $umid_interna
]);

?>