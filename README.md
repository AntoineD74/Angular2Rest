#DASHBOARD PROJECT

##DESCRIPTION

Dashboard Projet, développé par 2 étudiants Ingésup M1 à Ynov Lyon.

Utilise un front-end en Angular 2 (Typescript) et une serveur NodeJs pour la communication avec une base de données MySQL.

##INSTALLATION

`clone` this PROJECT

Créer une base de données MySQL nommée `dashboard` lancer les scripts createdb.sql et inserts.sql contenus dans le dossier /server/sqlscripts

run `npm install` in both /client and /server folders
run `npm start` in both /client and /server folders

client runs on localhost:4200
server runs on localhost:3000

##INFOS

Tous les comptes créés à l'aide du script ont le mot de passe "test01", le mail du compte admin est "antoine@test.fr".

La table `operations_ope` est vide au lancement mais les fonctionnalités sont présentes.

Beaucoup de travail reste à faire sur ce projet, notamment la sécurisation de certaines routes côté serveur et la gestion des erreurs côté client.
