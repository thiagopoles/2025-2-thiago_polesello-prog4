-- 2. Temperatura externa média
SELECT AVG(te) AS media_te
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;