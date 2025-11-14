<?php
require_once "mysqlConnection.php";

$db = new MySQL_Connection();
$conn = $db->connect();

$inicio = "2025-06-01";
$fim    = "2025-06-30";
$dia    = "2025-06-03";

function query($conn, $sql, $params = [])
{
    $stmt = $conn->prepare($sql);
    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}


/* ============================================================
                    CONSULTAS MABEL
   ============================================================ */

$q1  = query($conn, "SELECT datahora FROM leituramabel WHERE datahora BETWEEN :inicio AND :fim", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q2 = query($conn, "SELECT datahora, ti FROM leituramabel WHERE datahora BETWEEN :inicio AND :fim", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q3 = query($conn, "SELECT datahora, te FROM leituramabel WHERE datahora BETWEEN :inicio AND :fim", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q4 = query($conn, "SELECT datahora, hi FROM leituramabel WHERE datahora BETWEEN :inicio AND :fim", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q5 = query($conn, "SELECT datahora, he FROM leituramabel WHERE datahora BETWEEN :inicio AND :fim", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q6 = query($conn, "SELECT datahora, ninho FROM leituramabel WHERE datahora BETWEEN :inicio AND :fim", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q7 = query($conn, "SELECT datahora, ti, te, hi, he FROM leituramabel WHERE DATE(datahora) = :dia", [
    ":dia" => $dia
]);

$q8  = query($conn, "SELECT AVG(ti) AS temp_interna_media FROM leituramabel WHERE datahora BETWEEN :inicio AND :fim", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q9  = query($conn, "SELECT AVG(te) AS temp_externa_media FROM leituramabel WHERE datahora BETWEEN :inicio AND :fim", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q10 = query($conn, "SELECT AVG(hi) AS umidade_interna_media FROM leituramabel WHERE datahora BETWEEN :inicio AND :fim", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q11 = query($conn, "SELECT AVG(he) AS umidade_externa_media FROM leituramabel WHERE datahora BETWEEN :inicio AND :fim", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q12 = query($conn, "SELECT MAX(ninho) AS ninho_max FROM leituramabel WHERE datahora BETWEEN :inicio AND :fim", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q13 = query($conn, "SELECT MIN(ninho) AS ninho_min FROM leituramabel WHERE datahora BETWEEN :inicio AND :fim", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q14 = query($conn, "SELECT AVG(ti - te) AS diferenca_media FROM leituramabel WHERE datahora BETWEEN :inicio AND :fim", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q15 = query($conn, "
    SELECT DATE(datahora) AS dia, AVG(ti) AS media_temp_interna
    FROM leituramabel
    WHERE datahora BETWEEN :inicio AND :fim
    GROUP BY DATE(datahora)
    ORDER BY dia
", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q16 = query($conn, "
    SELECT DATE(datahora) AS dia, AVG(hi) AS media_umidade_interna
    FROM leituramabel
    WHERE datahora BETWEEN :inicio AND :fim
    GROUP BY DATE(datahora)
    ORDER BY dia
", [
    ":inicio" => $inicio, ":fim" => $fim
]);


/* ============================================================
                   CONSULTAS PTQA
   ============================================================ */

$q17 = query($conn, "
    SELECT dataleitura, horaleitura, temperatura
    FROM leituraptqa
    WHERE dataleitura BETWEEN :inicio AND :fim
    ORDER BY dataleitura ASC, horaleitura ASC
", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q18 = query($conn, "
    SELECT * FROM leituraptqa
    WHERE aqi >= 4
    AND dataleitura BETWEEN :inicio AND :fim
", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q19 = query($conn, "
    SELECT * FROM leituraptqa
    WHERE umidade > 70 
    AND dataleitura BETWEEN :inicio AND :fim
    ORDER BY umidade DESC
", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q20 = query($conn, "
    SELECT * FROM leituraptqa
    WHERE eco2 > 1000 
    AND dataleitura BETWEEN :inicio AND :fim
", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q21 = query($conn, "
    SELECT * FROM leituraptqa
    WHERE pressao < 1000 
    AND dataleitura BETWEEN :inicio AND :fim
", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q22 = query($conn, "
    SELECT * FROM leituraptqa
    WHERE tvoc > 200 
    AND dataleitura BETWEEN :inicio AND :fim
", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q23 = query($conn, "
    SELECT AVG(temperatura) AS temperatura_media
    FROM leituraptqa
    WHERE dataleitura BETWEEN :inicio AND :fim
", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q24 = query($conn, "
    SELECT dataleitura AS dia, AVG(umidade) AS umidade_media
    FROM leituraptqa
    WHERE dataleitura BETWEEN :inicio AND :fim
    GROUP BY dataleitura
", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q25 = query($conn, "
    SELECT MAX(eco2) AS max_co2
    FROM leituraptqa
    WHERE dataleitura BETWEEN :inicio AND :fim
", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q26 = query($conn, "
    SELECT dataleitura AS dia, MIN(pressao) AS pressao_minima
    FROM leituraptqa
    WHERE dataleitura BETWEEN :inicio AND :fim
    GROUP BY dataleitura
", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q27 = query($conn, "
    SELECT *
    FROM leituraptqa
    WHERE aqi = 1
    AND dataleitura BETWEEN :inicio AND :fim
", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q28 = query($conn, "
    SELECT 
        MAX(temperatura) AS temp_max,
        MIN(temperatura) AS temp_min,
        AVG(temperatura) AS temp_media
    FROM leituraptqa
    WHERE dataleitura BETWEEN :inicio AND :fim
", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q29 = query($conn, "
    SELECT aqi, AVG(tvoc) AS media_tvoc
    FROM leituraptqa
    WHERE dataleitura BETWEEN :inicio AND :fim
    GROUP BY aqi
", [
    ":inicio" => $inicio, ":fim" => $fim
]);

$q30 = query($conn, "
    SELECT dataleitura AS dia, AVG(eco2) AS media_co2
    FROM leituraptqa
    WHERE MONTH(dataleitura) = MONTH(:inicio)
    GROUP BY dataleitura
    ORDER BY media_co2 DESC
    LIMIT 5
", [
    ":inicio" => $inicio
]);

?>