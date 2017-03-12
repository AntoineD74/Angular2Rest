INSERT INTO `dashboard`.`users_usr`
(
`usr_id`,
`usr_mail`,
`usr_pwd`,
`usr_name`,
`usr_firstname`,
`usr_addr`,
`usr_postalcode`,
`usr_city`,
`usr_phone`,
`usr_role`,
`usr_counselorid`
)
VALUES
(
1,
"antoine@test.fr",
"test01",
"Dancre",
"Antoine",
"11 rue passet",
"69007",
"Lyon",
"785236545",
2,
NULL
),
(
2,
"kim@test.fr",
"test01",
"Do",
"Kim",
"11 rue passet",
"69007",
"Lyon",
"785236545",
1,
NULL
),
(
3,
"jean@test.fr",
"test01",
"Burellier",
"Jean",
"27 rue Raoul Servant",
"69007",
"Lyon",
"688995544",
0,
1
),
(
4,
"baba@test.fr",
"test01",
"Kasse",
"Baba",
"27 rue Raoul Servant",
"69007",
"Lyon",
"685785544",
0,
1
),
(
5,
"dreams@test.fr",
"test01",
"Your",
"Dreams",
"404 Not Found",
"69007",
"Your Mind",
"688995544",
0,
2);

INSERT INTO `dashboard`.`accounts_acc`
(
`usr_id`,
`acc_date`,
`acc_solde`,
`acc_type`,
`acc_actions`
)
VALUES
(
3,
DATE(now()),
15000,
0,
0
), 
(
3,
DATE(now()),
120000,
1,
55),
(
4,
DATE(now()),
18000,
0,
0
), 
(
4,
DATE(now()),
40000,
1,
0),
(
5,
DATE(now()),
45000,
0,
0
), 
(
5,
DATE(now()),
250000,
1,
100);






