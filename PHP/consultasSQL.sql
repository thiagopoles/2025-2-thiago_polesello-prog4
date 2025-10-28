-- 1
SELECT datahora
FROM mabel_ptqa_heitor_isabely_thiago.leituramabel
WHERE datahora BETWEEN '2025-06-01' AND '2025-06-30';

-- 2
SELECT datahora, ti
FROM mabel_ptqa_heitor_isabely_thiago.leituramabel
WHERE datahora BETWEEN '2025-06-01' AND '2025-06-30';

-- 3
SELECT datahora, te
FROM mabel_ptqa_heitor_isabely_thiago.leituramabel
WHERE datahora BETWEEN '2025-06-01' AND '2025-06-30';

-- 4
SELECT datahora, hi
FROM mabel_ptqa_heitor_isabely_thiago.leituramabel
WHERE datahora BETWEEN '2025-06-01' AND '2025-06-30';

-- 5
SELECT datahora, he
FROM mabel_ptqa_heitor_isabely_thiago.leituramabel
WHERE datahora BETWEEN '2025-06-01' AND '2025-06-30';

-- 6
SELECT datahora, ninho
FROM mabel_ptqa_heitor_isabely_thiago.leituramabel
WHERE datahora BETWEEN '2025-06-01' AND '2025-06-30';

-- 7
SELECT datahora, ti, te, hi, he
FROM mabel_ptqa_heitor_isabely_thiago.leituramabel
WHERE DATE(datahora) = '2025-06-03';

-- 8
SELECT AVG(ti) AS temp_interna_media
FROM mabel_ptqa_heitor_isabely_thiago.leituramabel
WHERE datahora BETWEEN '2025-06-01' AND '2025-06-30';

-- 9
SELECT AVG(te) AS temp_externa_media
FROM mabel_ptqa_heitor_isabely_thiago.leituramabel
WHERE datahora BETWEEN '2025-06-01' AND '2025-06-30';

-- 10
SELECT AVG(hi) AS umidade_interna_media
FROM mabel_ptqa_heitor_isabely_thiago.leituramabel
WHERE datahora BETWEEN '2025-06-01' AND '2025-06-30';

-- 11
SELECT AVG(he) AS umidade_externa_media
FROM mabel_ptqa_heitor_isabely_thiago.leituramabel
WHERE datahora BETWEEN '2025-06-01' AND '2025-06-30';

-- 12
SELECT MAX(ninho) AS ninho_max
FROM mabel_ptqa_heitor_isabely_thiago.leituramabel
WHERE datahora BETWEEN '2025-06-01' AND '2025-06-30';

-- 13
SELECT MIN(ninho) AS ninho_min
FROM mabel_ptqa_heitor_isabely_thiago.leituramabel
WHERE datahora BETWEEN '2025-06-01' AND '2025-06-30';

-- 14
SELECT AVG(ti - te) AS diferenca_media
FROM mabel_ptqa_heitor_isabely_thiago.leituramabel
WHERE datahora BETWEEN '2025-06-01' AND '2025-06-30';

-- 15
SELECT DATE(datahora) AS dia, AVG(ti) AS media_temp_interna
FROM mabel_ptqa_heitor_isabely_thiago.leituramabel
WHERE datahora BETWEEN '2025-06-01' AND '2025-06-30'
GROUP BY DATE(datahora)
ORDER BY dia;

-- 16
SELECT DATE(datahora) AS dia, AVG(hi) AS media_umidade_interna
FROM mabel_ptqa_heitor_isabely_thiago.leituramabel
WHERE datahora BETWEEN '2025-06-01' AND '2025-06-30'
GROUP BY DATE(datahora)
ORDER BY dia;

-- 17
SELECT datahora, temperatura
FROM mabel_ptqa_heitor_isabely_thiago.leituraptqa
WHERE datahora BETWEEN '2025-06-01' AND '2025-06-30'
ORDER BY datahora ASC;

-- 18
SELECT *
FROM mabel_ptqa_heitor_isabely_thiago.leituraptqa
WHERE AQI >= 4 AND datahora BETWEEN '2025-06-01' AND '2025-06-30';

-- 19
SELECT *
FROM mabel_ptqa_heitor_isabely_thiago.leituraptqa
WHERE umidade > 70 AND datahora BETWEEN '2025-06-01' AND '2025-06-30'
ORDER BY umidade DESC;

-- 20
SELECT *
FROM mabel_ptqa_heitor_isabely_thiago.leituraptqa
WHERE co2 > 1000 AND datahora BETWEEN '2025-06-01' AND '2025-06-30';

-- 21
SELECT *
FROM mabel_ptqa_heitor_isabely_thiago.leituraptqa
WHERE pressao < 1000 AND datahora BETWEEN '2025-06-01' AND '2025-06-30';

-- 22
SELECT *
FROM mabel_ptqa_heitor_isabely_thiago.leituraptqa
WHERE gases_volateis > 200 AND datahora BETWEEN '2025-06-01' AND '2025-06-30';

-- 23
SELECT AVG(temperatura) AS temperatura_media
FROM mabel_ptqa_heitor_isabely_thiago.leituraptqa
WHERE datahora BETWEEN '2025-06-01' AND '2025-06-30';

-- 24
SELECT DATE(datahora) AS dia, AVG(umidade) AS umidade_media
FROM mabel_ptqa_heitor_isabely_thiago.leituraptqa
WHERE datahora BETWEEN '2025-06-01' AND '2025-06-30'
GROUP BY DATE(datahora);

-- 25
SELECT MAX(co2) AS max_co2
FROM mabel_ptqa_heitor_isabely_thiago.leituraptqa
WHERE datahora BETWEEN '2025-06-01' AND '2025-06-30';

-- 26
SELECT DATE(datahora) AS dia, MIN(pressao) AS pressao_minima
FROM mabel_ptqa_heitor_isabely_thiago.leituraptqa
WHERE datahora BETWEEN '2025-06-01' AND '2025-06-30'
GROUP BY DATE(datahora);

-- 27
SELECT *
FROM mabel_ptqa_heitor_isabely_thiago.leituraptqa
WHERE AQI = 1 AND datahora BETWEEN '2025-06-01' AND '2025-06-30';

-- 28
SELECT 
  MAX(temperatura) AS temp_max, 
  MIN(temperatura) AS temp_min, 
  AVG(temperatura) AS temp_media
FROM mabel_ptqa_heitor_isabely_thiago.leituraptqa
WHERE datahora BETWEEN '2025-06-01' AND '2025-06-30';

-- 29
SELECT AQI, AVG(gases_volateis) AS media_gases_volateis
FROM mabel_ptqa_heitor_isabely_thiago.leituraptqa
WHERE datahora BETWEEN '2025-06-01' AND '2025-06-30'
GROUP BY AQI;

-- 30
SELECT DATE(datahora) AS dia, AVG(co2) AS media_co2
FROM mabel_ptqa_heitor_isabely_thiago.leituraptqa
WHERE MONTH(datahora) = 6
GROUP BY DATE(datahora)
ORDER BY media_co2 DESC
LIMIT 5;
