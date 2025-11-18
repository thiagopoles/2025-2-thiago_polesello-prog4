<?php
// Conectar ao banco de dados
$servername = "localhost";
$username = "root"; // Altere se necessário
$password = ""; // Altere se necessário
$dbname = "seu_banco_de_dados"; // Substitua pelo nome do seu banco de dados

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Consulta SQL
$sql = "SELECT data, temperatura_interna, temperatura_externa, umidade_interna, umidade_externa FROM estatisticas_ninho";
$result = $conn->query($sql);

// Array para armazenar os dados
$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Retornar os dados como JSON
echo json_encode($data);

// Fechar a conexão
$conn->close();
?>
