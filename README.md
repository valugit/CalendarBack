<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Initialization

Create a `.env` file by renaming the `.env.dist` and change the database info as necessary.
You need to create a database beforehand.
Open a prompt, go in the root folder of the project and type :
```
$ npm start
```
The tables will be automatically generated, you will now be able to make requests on the following urls.

###### P.S. You may want to manually insert some games into the database before doing anything else (the route /game/add exists but you need to have the role `admin` to access it)

###### P.P.S. The default route is localhost:3001

## Routes

### POST /auth/register
```json
{
  "username": "Username",
  "email": "email@example.com",
  "password": "aVERYsafepa55word",
  "role": "player"
}
```

### POST /auth/login
Sends back a JWT Token
```json
{
  "username": "Username",
  "password": "aVERYsafepa55word"
}
```

### GET /user/profile
```
Header {Authorization : Bearer <Token>}
```

### GET /user/reservations
```
Header {Authorization : Bearer <Token>}
```

### GET /gamemaster/all
```
Header {Authorization : Bearer <Token>}
```

### GET /gamemaster/:id
```
Header {Authorization : Bearer <Token>}
```

### GET /game/all
```
Header {Authorization : Bearer <Token>}
```

### POST /seance/add
```
Header {Authorization : Bearer <Token>}
```
```json
{
    "title": "I'm a very good title",
	"game": 1,
	"date_start": "2020-12-20T13:00",
	"date_end": "2020-12-20T19:00"
}
```

### POST /seance/join
```
Header {Authorization : Bearer <Token>}
```
```json
{
    "seance_id": 1,
}
```

### POST /seance/delete
```
Header {Authorization : Bearer <Token>}
```
```json
{
    "seance_id": 1
}
```

## Installation

```bash
$ npm install
```

## Heroku

```bash
$ git push heroku master
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
