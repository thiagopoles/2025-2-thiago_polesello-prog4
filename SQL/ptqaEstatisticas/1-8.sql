-- 8. Top 5 dias com maior média de CO₂ no mês
SELECT dataleitura AS dia, AVG(eco2) AS media_co2
FROM leituraptqa
WHERE MONTH(dataleitura) = MONTH(@inicio)
GROUP BY dataleitura
ORDER BY media_co2 DESC
LIMIT 5;