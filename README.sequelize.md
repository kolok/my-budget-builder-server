# Sequelize doc

## Connexion to DB

$ docker-compose exec db psql -p 5432 -h 127.0.0.1 -U loop-admin

if the DB doesn't exists, you should create it first :

$ docker-compose exec db psql -p 5432 -h 127.0.0.1 -U loop-admin -c 'CREATE DATABASE loopdb_dev;'

## Launch migration

Run Migrations

$ docker-compose exec server npx sequelize db:migrate --config src/db/config/sequelize.js --migrations-path src/db/migrations/

> Sequelize CLI [Node: 8.14.0, CLI: 5.5.0, ORM: 5.8.12]

> Loaded configuration file "src/db/config/sequelize.js".
Using environment "development".
== 20190625113945_createtableusers: migrating =======
== 20190625113945_createtableusers: migrated (0.026s)

Rollback the last migration

$ docker-compose exec server npx sequelize db:migrate:undo --config src/db/config/sequelize.js --migrations-path src/db/migrations/

> Sequelize CLI [Node: 8.14.0, CLI: 5.5.0, ORM: 5.8.12]

> Loaded configuration file "src/db/config/sequelize.js".
Using environment "development".
== 20190625113945_createtableusers: reverting =======
== 20190625113945_createtableusers: reverted (0.015s)


## Manage seeds

$ docker-compose exec server npx sequelize db:seed:all --config src/db/config/sequelize.js --env test --seeders-path src/db/seeders/ --models-path src/models/

> Sequelize CLI [Node: 8.14.0, CLI: 5.4.0, ORM: 4.42.0]

> Loaded configuration file "src/db/config/sequelize.js".
Using environment "test".
== companies: migrating =======
== companies: migrated (0.012s)

$ docker-compose exec server npx sequelize db:seed:undo:all --config src/db/config/sequelize.js --env test --seeders-path src/db/seeders/ --models-path src/models/

> Sequelize CLI [Node: 8.14.0, CLI: 5.4.0, ORM: 4.42.0]

> Loaded configuration file "src/db/config/sequelize.js".
Using environment "test".
== companies: reverting =======
== companies: reverted (0.007s)
