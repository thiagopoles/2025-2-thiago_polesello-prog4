-- 7. Nível médio de gases voláteis agrupado por AQI
SELECT aqi, AVG(tvoc) AS media_tvoc
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim
GROUP BY aqi;