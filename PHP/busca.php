<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Consulta - Projeto Mabel</title>
  <style>
    * {
      font-size: 20px;
    }
    input {
      padding: 8px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    tr:nth-child(odd) {
      background-color: silver;
    }
    th, td {
      border: 1px solid;
      text-align: left;
      padding: 6px;
    }
  </style>
</head>
<body>

  <?php
    // Verifica se os parâmetros de data foram enviados via GET
    if (isset($_GET['dat1']) && isset($_GET['dat2'])) {
        // Obtém os valores das datas do formulário
        $data1 = $_GET['dat1'];
        $data2 = $_GET['dat2'];

        // Conexão com o banco de dados
        $con = mysqli_connect('localhost', 'root', '', 'mabel_ptqa_heitor_isabely_thiago');
        
        if (!$con) {
            die("<p style='color:red;'>Erro na conexão: " . mysqli_connect_error() . "</p>");
        }

        // Protege contra SQL Injection
        $data1 = mysqli_real_escape_string($con, $data1);
        $data2 = mysqli_real_escape_string($con, $data2);

        // Consulta SQL
        $sql = "SELECT dataInclusao, horaInclusao, hi, he, ti, te, ninho 
                FROM leituramabel
                WHERE dataInclusao BETWEEN '$data1' AND '$data2'
                ORDER BY dataInclusao ASC, horaInclusao ASC";

        // Executa a consulta
        $query = mysqli_query($con, $sql);

        // Verifica se há resultados
        if (mysqli_num_rows($query) > 0) {
            echo "<h3>Resultados entre $data1 e $data2:</h3>";
            echo "<table>";
            echo "<tr>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Umidade Interna (hi)</th>
                    <th>Umidade Externa (he)</th>
                    <th>Temp. Interna (ti)</th>
                    <th>Temp. Externa (te)</th>
                    <th>Ninho</th>
                  </tr>";

            // Exibe os resultados
            while ($resultado = mysqli_fetch_assoc($query)) {
                echo "<tr>";
                echo "<td>" . htmlspecialchars($resultado['dataInclusao']) . "</td>";
                echo "<td>" . htmlspecialchars($resultado['horaInclusao']) . "</td>";
                echo "<td>" . htmlspecialchars($resultado['hi']) . "</td>";
                echo "<td>" . htmlspecialchars($resultado['he']) . "</td>";
                echo "<td>" . htmlspecialchars($resultado['ti']) . "</td>";
                echo "<td>" . htmlspecialchars($resultado['te']) . "</td>";
                echo "<td>" . htmlspecialchars($resultado['ninho']) . "</td>";
                echo "</tr>";
            }

            echo "</table>";
        } else {
            echo "<p>Nenhum registro encontrado nesse intervalo.</p>";
        }

        // Fecha a conexão com o banco de dados
        mysqli_close($con);
    }
  ?>

</body>
</html>
