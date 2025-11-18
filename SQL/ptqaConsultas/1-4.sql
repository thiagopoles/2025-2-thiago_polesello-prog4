-- 4. CO₂ acima de 1000 ppm (eco2)
SELECT *
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim
  AND eco2 > 1000;