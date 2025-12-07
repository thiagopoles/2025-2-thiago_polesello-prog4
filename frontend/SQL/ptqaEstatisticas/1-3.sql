-- 3. Máxima concentração de CO₂
SELECT MAX(eco2) AS max_co2
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim;