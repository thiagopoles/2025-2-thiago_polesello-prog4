-- 5. Máxima temperatura do ninho
SELECT MAX(ninho) AS max_ninho
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;