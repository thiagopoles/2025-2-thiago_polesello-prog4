-- 6. Mínima temperatura do ninho
SELECT MIN(ninho) AS min_ninho
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;