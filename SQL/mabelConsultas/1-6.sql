-- 6. Exibir temperatura do ninho (ninho)
SELECT datahora, ninho
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;