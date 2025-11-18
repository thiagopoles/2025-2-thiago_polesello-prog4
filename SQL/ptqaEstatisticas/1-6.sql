-- 6. Temp máx, mín e média
SELECT
    MAX(temperatura) AS temp_max,
    MIN(temperatura) AS temp_min,
    AVG(temperatura) AS temp_media
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim;