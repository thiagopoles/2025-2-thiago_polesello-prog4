-- 2. Umidade média por dia
SELECT dataleitura AS dia, AVG(umidade) AS umidade_media
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim
GROUP BY dataleitura
ORDER BY dia;