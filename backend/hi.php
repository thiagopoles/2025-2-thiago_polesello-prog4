<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "", "mabel_ptqa_heitor_isabely_thiago");

$inicio = $_GET['inicio'];
$fim = $_GET[:dataFinal];

// Consulta SQL para pegar a dataleitura e a umidade interna (campo 'hi')
$sql = "SELECT datainclusao, horainclusao, hi FROM leituramabel
        WHERE dataleitura BETWEEN :dataInicial AND :dataFinal
        ORDER BY dataleitura";

$res = $conn->query($sql);

$dados = [];
while ($row = $res->fetch_assoc()) {
    $dados[] = $row;
}

echo json_encode($dados);
?>
