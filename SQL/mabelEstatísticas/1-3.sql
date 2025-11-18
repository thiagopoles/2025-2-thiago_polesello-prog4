-- 3. Umidade interna média
SELECT AVG(hi) AS media_hi
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;