-- 6. Gases voláteis (tvoc) > 200 ppb
SELECT *
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim
  AND tvoc > 200;