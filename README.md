# backend_test_ts

## Start dev
* change name file .env.development.example to .env.development
* create database in pgsql
* change connection in .env.development
* run npx migrate:dev / yarn migrate:dev
* run npx init:prisma / yarn init:prisma
* run npx dev / yarn dev

## Start test
* change name file .env.test.example to .env.development
* create database in pgsql
* change connection in .env.test
* run npx migrate:test / yarn migrate:test
* run npx test / yarn test

## Information for Requirements
* Using TypeScript
* Simple API with (/users POST/PUT/DELETE)

Example body 
```json
{
    "first_name":"Akbar",
    "last_name":"Haryadi",
    "bday_date":"1995-04-01",
    "location": "Asia/Tokyo",
    "email": "akbarharyadi777@gmail.com"
}
```
* when creating user system will create scheduler run on bday_date on 9PM yearly. creating scheduler using package [node-scheduler](https://github.com/node-schedule/node-schedule)
* using [Kue](https://github.com/Automattic/kue) for creating queue save it in redis
* when update scheduler will update
* when delete scheduler will deleted
* when service app restart scheduler will reinitialize based on Scheduler saved in database


## License
Copyright (c) 2022
Licensed under the MIT license.
