-- 3. Exibir temperaturas externas (te)
SELECT datahora, te
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;