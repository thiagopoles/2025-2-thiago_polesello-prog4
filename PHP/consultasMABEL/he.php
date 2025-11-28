<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "", "mabel_ptqa_heitor_isabely_thiago");

$inicio = $_GET['inicio'];
$fim = $_GET['fim'];

// Consulta SQL para pegar a datahora e a umidade externa (campo 'he')
$sql = "SELECT datahora, he FROM leituramabel
        WHERE datahora BETWEEN '$inicio' AND '$fim'
        ORDER BY datahora";

$res = $conn->query($sql);

$dados = [];
while ($row = $res->fetch_assoc()) {
    $dados[] = $row;
}

echo json_encode($dados);
?>
