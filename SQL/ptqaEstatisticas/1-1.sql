-- 1. Temperatura média no período
SELECT AVG(temperatura) AS media_temperatura
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim;