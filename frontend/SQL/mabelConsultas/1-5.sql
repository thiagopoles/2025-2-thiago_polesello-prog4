-- 5. Exibir umidades externas (he)
SELECT datahora, he
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;