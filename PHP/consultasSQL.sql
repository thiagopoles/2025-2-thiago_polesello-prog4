SET @inicio = '2025-06-01';
SET @fim    = '2025-06-30';
SET @dia    = '2025-06-03';

-- ===========================================
-- PROJETO MABEL – CONSULTAS (tabela leituramabel)
-- ===========================================

-- 1. Exibir data e hora dos registros
SELECT datahora
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;

-- 2. Exibir temperaturas internas (ti)
SELECT datahora, ti
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;

-- 3. Exibir temperaturas externas (te)
SELECT datahora, te
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;

-- 4. Exibir umidades internas (hi)
SELECT datahora, hi
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;

-- 5. Exibir umidades externas (he)
SELECT datahora, he
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;

-- 6. Exibir temperatura do ninho (ninho)
SELECT datahora, ninho
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;

-- 7. Exibir ti, te, hi, he de um dia específico
SELECT datahora, ti, te, hi, he
FROM leituramabel
WHERE DATE(datahora) = @dia;


-- ===========================================
-- PROJETO MABEL – ESTATÍSTICAS
-- ===========================================

-- 1. Temperatura interna média
SELECT AVG(ti) AS media_ti
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;

-- 2. Temperatura externa média
SELECT AVG(te) AS media_te
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;

-- 3. Umidade interna média
SELECT AVG(hi) AS media_hi
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;

-- 4. Umidade externa média
SELECT AVG(he) AS media_he
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;

-- 5. Máxima temperatura do ninho
SELECT MAX(ninho) AS max_ninho
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;

-- 6. Mínima temperatura do ninho
SELECT MIN(ninho) AS min_ninho
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;

-- 7. Diferença média entre temperatura interna e externa
SELECT AVG(ti - te) AS diferenca_media
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;

-- 8. Média diária da temperatura interna
SELECT DATE(datahora) AS dia, AVG(ti) AS media_ti
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim
GROUP BY DATE(datahora)
ORDER BY dia;

-- 9. Média diária da umidade interna
SELECT DATE(datahora) AS dia, AVG(hi) AS media_hi
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim
GROUP BY DATE(datahora)
ORDER BY dia;



-- ===========================================
-- PROJETO PTQA – CONSULTAS (tabela leituraptqa)
-- ===========================================

-- 1. Exibir data, hora e temperatura, ordenado por data/hora
SELECT dataleitura, horaleitura, temperatura
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim
ORDER BY dataleitura ASC, horaleitura ASC;

-- 2. Registros com baixa qualidade do ar (AQI >= 4)
SELECT *
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim
  AND aqi >= 4;

-- 3. Registros com umidade > 70%, ordenado desc
SELECT *
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim
  AND umidade > 70
ORDER BY umidade DESC;

-- 4. CO₂ acima de 1000 ppm (eco2)
SELECT *
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim
  AND eco2 > 1000;

-- 5. Pressão atmosférica < 1000 hPa
SELECT *
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim
  AND pressao < 1000;

-- 6. Gases voláteis (tvoc) > 200 ppb
SELECT *
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim
  AND tvoc > 200;


-- ===========================================
-- PROJETO PTQA – ESTATÍSTICAS
-- ===========================================

-- 1. Temperatura média no período
SELECT AVG(temperatura) AS media_temperatura
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim;

-- 2. Umidade média por dia
SELECT dataleitura AS dia, AVG(umidade) AS umidade_media
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim
GROUP BY dataleitura
ORDER BY dia;

-- 3. Máxima concentração de CO₂
SELECT MAX(eco2) AS max_co2
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim;

-- 4. Mínima pressão por dia
SELECT dataleitura AS dia, MIN(pressao) AS pressao_minima
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim
GROUP BY dataleitura
ORDER BY dia;

-- 5. Registros com ótima qualidade do ar (AQI = 1)
SELECT *
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim
  AND aqi = 1;

-- 6. Temp máx, mín e média
SELECT
    MAX(temperatura) AS temp_max,
    MIN(temperatura) AS temp_min,
    AVG(temperatura) AS temp_media
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim;

-- 7. Nível médio de gases voláteis agrupado por AQI
SELECT aqi, AVG(tvoc) AS media_tvoc
FROM leituraptqa
WHERE dataleitura BETWEEN @inicio AND @fim
GROUP BY aqi;

-- 8. Top 5 dias com maior média de CO₂ no mês
SELECT dataleitura AS dia, AVG(eco2) AS media_co2
FROM leituraptqa
WHERE MONTH(dataleitura) = MONTH(@inicio)
GROUP BY dataleitura
ORDER BY media_co2 DESC
LIMIT 5;