-- 7. Exibir ti, te, hi, he de um dia específico
SELECT datahora, ti, te, hi, he
FROM leituramabel
WHERE DATE(datahora) = @dia;