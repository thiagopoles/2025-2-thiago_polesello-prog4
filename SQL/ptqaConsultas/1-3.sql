-- 3. Registros com umidade > 70%, ordenado desc
SELECT *
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim
  AND umidade > 70
ORDER BY umidade DESC;