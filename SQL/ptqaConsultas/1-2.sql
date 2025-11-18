-- 2. Registros com baixa qualidade do ar (AQI >= 4)
SELECT *
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim
  AND aqi >= 4;