<?php
class MySQL_Connection
{
    private $host = 'localhost';
    private $db = 'mabel_ptqa_heitor_isabely_thiago';
    private $user = 'root';
    private $password = '';
    private $charset = 'utf8mb4';

    public function connect()
    {
        try {
            $dsn = "mysql:host={$this->host};dbname={$this->db};charset={$this->charset}";

            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];

            return new PDO($dsn, $this->user, $this->password, $options);

        } catch (PDOException $e) {
            die('Erro ao conectar ao banco de dados: ' . $e->getMessage());
        }
    }
}
?>