UPDATE `sqlite_sequence`
SET `seq` = (SELECT MAX(`id`) FROM 'Game')
WHERE `name` = 'Game';