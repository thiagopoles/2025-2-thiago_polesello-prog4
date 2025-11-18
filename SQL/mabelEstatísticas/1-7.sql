-- 7. Diferença média entre temperatura interna e externa
SELECT AVG(ti - te) AS diferenca_media
FROM leituramabel
WHERE datahora BETWEEN @inicio AND @fim;