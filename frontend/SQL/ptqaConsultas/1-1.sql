-- 1. Exibir data, hora e temperatura, ordenado por data/hora
SELECT dataleitura, horaleitura, temperatura
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim
ORDER BY dataleitura ASC, horaleitura ASC;