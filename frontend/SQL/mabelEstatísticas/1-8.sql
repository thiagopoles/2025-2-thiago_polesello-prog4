-- 8. Média diária da temperatura interna
SELECT DATE(datahora) AS dia, AVG(ti) AS media_ti
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim
GROUP BY DATE(datahora)
ORDER BY dia;