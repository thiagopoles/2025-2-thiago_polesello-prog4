<!-- 
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
-->

<?php 
header('Content-Type: application/json; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

include '../mysqlConnection.php';

$dataInicial = $_GET['dataInicial'] ?? null;
$dataFinal   = $_GET['dataFinal'] ?? null;
$tipoGrafico = $_GET['tipoGrafico'] ?? 'linha';

// DEBUG: Log dos parâmetros recebidos
error_log("Data Inicial: $dataInicial, Data Final: $dataFinal");

if (!$dataInicial || !$dataFinal) {
    echo json_encode(["erro" => "Datas não enviadas"]);
    exit;
}

try {
    // Primeiro, vamos ver quantos registros existem no total
    $sql_count = "SELECT COUNT(*) as total FROM leituraptqa";
    $stmt_count = $conecta->prepare($sql_count);
    $stmt_count->execute();
    $total_registros = $stmt_count->fetch(PDO::FETCH_ASSOC);
    
    // DEBUG: Log do total de registros
    error_log("Total de registros na tabela: " . $total_registros['total']);

    // Agora a consulta principal
    $sql = "SELECT dataleitura, ROUND(AVG(eco2),2) AS media_co2
            FROM leituraptqa
            WHERE dataleitura BETWEEN :dataInicial AND :dataFinal
            GROUP BY dataleitura
            ORDER BY dataleitura ASC";

    $stmt = $conecta->prepare($sql);
    $stmt->execute([
        ':dataInicial' => $dataInicial,
        ':dataFinal'   => $dataFinal
    ]);

    $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // DEBUG: Log do resultado
    error_log("Registros encontrados: " . count($resultado));
    
    // Se não encontrou dados, retornar informações de debug
    if (empty($resultado)) {
        // Verificar qual é a data mínima e máxima no banco
        $sql_dates = "SELECT MIN(dataleitura) as min_date, MAX(dataleitura) as max_date FROM leituraptqa";
        $stmt_dates = $conecta->prepare($sql_dates);
        $stmt_dates->execute();
        $date_range = $stmt_dates->fetch(PDO::FETCH_ASSOC);
        
        error_log("Data mínima no BD: " . $date_range['min_date']);
        error_log("Data máxima no BD: " . $date_range['max_date']);
        
        // Retornar informações de debug
        echo json_encode([
            "debug" => [
                "total_registros" => $total_registros['total'],
                "min_date" => $date_range['min_date'],
                "max_date" => $date_range['max_date'],
                "params_received" => [
                    "dataInicial" => $dataInicial,
                    "dataFinal" => $dataFinal
                ]
            ],
            "data" => []
        ]);
    } else {
        echo json_encode($resultado);
    }

} catch(PDOException $e) {
    echo json_encode(["erro" => "Erro no banco de dados: " . $e->getMessage()]);
}
?>