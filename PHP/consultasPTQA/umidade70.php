<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost","root","","mabel_ptqa_heitor_isabely_thiago");

$inicio = $_GET['inicio'];
$fim = $_GET['fim'];

$sql = "SELECT dataleitura, horaleitura, umidade FROM leituraptqa
        WHERE datahora BETWEEN '$inicio' AND '$fim'
        AND umidade > 70
        ORDER BY umidade DESC";

$res = $conn->query($sql);

$dados = [];
while($r = $res->fetch_assoc()) $dados[] = $r;

echo json_encode($dados);
