<!--barra de busca-->
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>pesquisa</title>

<style>
  *{
    font-size: 20px;
  }

  input{
    padding: 8px;
  }

  table{
    width: 100%;
  }

  tr:nth-child(odd){
    background-color: silver;
  }

  th,td{
    border: 1px solid;
    text-align: left;
  }

  td{
    font-size: 20px;
  }

</style>

</head>
<body>

  <hr>
  <form action="" method="GET">
    Data inicial: <input type="date" name="dat1" required>
    Data final: <input type="date" name="dat2" required>
    <input type="submit" name="enviar" value="Enviar">
  </form>
  <hr>

   <?php
    if(isset($_GET['dat1']) && isset($_GET['dat2'])){ //verifica se foi inicializada

        $data1 = $_GET['dat1'];
        $data2 = $_GET['dat2'];

    echo "<table>";
    echo "<th>", "dataInclusao:</th>", "<th>", "horaInclusao:</th>", "<th>", "hi:</th>", "<th>", "he:</th>", "<th>", "ti:</th>", "<th>", "te:</th>", "<th>", "ninho:</th>";

        $con = mysqli_connect('localhost','root','3306','mabel_ptqa_heitor_isabely_thiago');

        $sql = "SELECT *FROM mabel_ptqa_heitor_isabely_thiago WHERE leituramabel between '$data1' and '$data2'";

        $query = mysqli_query($con,$sql);

        while($resultado=mysql_fetch_assoc($query)){
            $nome = $resultado['nome'];
            $data_formatada = date('d/m/Y', strtotime($resultado['data']));
            
            echo"<tr>";
            echo"<td>";
            echo $dataInclusao;
            echo $horaInclusao;
            echo $hi;
            echo $he;
            echo $ti;
            echo $te;
            echo $ninho;
            echo"</td>";

            echo"<td>";
                echo $dataInclusao;
            echo"</td>";
            echo"<td>";
                echo $horaInclusao;
            echo"</td>";
            echo"<td>";
                echo $hi;
            echo"</td>";
            echo"<td>";
                echo $he;
            echo"</td>";
            echo"<td>";
                echo $ti;
            echo"</td>";
            echo"<td>";
                echo $te;
            echo"</td>";
            echo"<td>";
                echo $ninho;
            echo"</td>";

            echo"</tr>";
        }

    } 

   ?>

    </table>

</body>
</html>