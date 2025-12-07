-- 1. Temperatura interna média
SELECT AVG(ti) AS media_ti
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;