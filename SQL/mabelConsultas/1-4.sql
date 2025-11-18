-- 4. Exibir umidades internas (hi)
SELECT datahora, hi
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;