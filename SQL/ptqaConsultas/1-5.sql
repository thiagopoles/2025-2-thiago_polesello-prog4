-- 5. Pressão atmosférica < 1000 hPa
SELECT *
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim
  AND pressao < 1000;