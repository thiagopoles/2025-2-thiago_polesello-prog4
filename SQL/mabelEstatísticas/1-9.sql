-- 9. Média diária da umidade interna
SELECT DATE(datahora) AS dia, AVG(hi) AS media_hi
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim
GROUP BY DATE(datahora)
ORDER BY dia;