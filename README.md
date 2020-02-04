<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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

### GET /gamemaster/all (unavailable)
```
Header {Authorization : Bearer <Token>}
```

### GET /gamemaster/:id (unavailable)
```
Header {Authorization : Bearer <Token>}
```

### POST /seance/add (unavailable)
```
Header {Authorization : Bearer <Token>}
```
```json
{
	"gamemaster": 6,
	"game": 1,
	"date_start": ,
	"date_end": 
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
