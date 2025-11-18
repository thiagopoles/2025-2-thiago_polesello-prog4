-- 5. Registros com ótima qualidade do ar (AQI = 1)
SELECT *
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim
  AND aqi = 1;