-- 4. Mínima pressão por dia
SELECT dataleitura AS dia, MIN(pressao) AS pressao_minima
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim
GROUP BY dataleitura
ORDER BY dia;