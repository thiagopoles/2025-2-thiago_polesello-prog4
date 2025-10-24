<?php
class MySQL_Connection
{
    private $host = 'localhost';
    private $db = 'mabel_ptqa_heitor_isabely_thiago'; //mabel_ptqa_n1_n2_n3, ajustar o nome no script (arquivo do DUMP)
    private $user = 'rost';
    private $password = '';
    private $charser = 'utf8mb4';

    public function connect()
    {
        try {
            $dsn = "mysql-host=$this->;dbname=$this->db;charset=$this->charset";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];

            return new PDO($dsn, $this->user, $this->password, $options);

        } catch (PDOException $e) {
            die('A conexão com o banco de dados FALHOU: ' . $e->getMessage());
        }
    }
}

/* Para utilizar a classe de conexão nos demais arquivos PHP do Projeto: 
    1º  -   vincular o arquivo com a definição/implementação da classe de conexão no aqrquivo que 
            precisa utilizar essa funcionalidade: 

            require_once "caminho relativo/mysql_connection.php"

    2º  -   No arquivo de destino, que usará a classe "MySQL_Connection", declarer e instanciar um obj
            de classe para poder ter acesso as funcionalidades da classe: 

            $dbConnection = new MySQL_Connection();
    
    3º  -   Chamar o metodo de criação da conexão com o banco de dadose atribuir a nova variavel retorno 
            do metodo:

            $correntConnection = $dbConnection-?connect();

*/

?>
