-- 1. Exibir data e hora dos registros
SELECT datahora
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;
