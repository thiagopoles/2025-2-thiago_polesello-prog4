-- 2. Exibir temperaturas internas (ti)
SELECT datahora, ti
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;