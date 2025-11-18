-- 4. Umidade externa média
SELECT AVG(he) AS media_he
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;