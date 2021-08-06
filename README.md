# GDEC Backend Template

## Getting started

### Prerequisites

This project requires that the developer has the following installed:

1. [Node.js](https://nodejs.org/en)
2. [Postgresql](https://www.postgresql.org/)

### Starting the web server

`npm start`

### Running the tests

`npm test`

## Contributing

if one wants to contribute to this project, create a branch with an appropriate name that reflects the intention.
Then create a pull requeest with complete description of the changes made. Make sure to include appropriate testing.
A test coverage of 80% has to be maintained in order for a branch to be considered stable and valid.

### Code Review Check list

Things that need to be kept in mind when reviewing a contributor's work are but may not be limited to the following:

1. If it's a feature that corresponds to a user story, does it fulfill all the acceptance criteria?
2. If it's a bug fix, does the test replicate the actual scenario?
3. Does lint pass?
4. Are there breaking changes/failing tests?
5. Does the code follow coding guidelines?

### Coding Guidelines

#### Key Concepts

1. [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
2. [Inversion of Control](https://en.wikipedia.org/wiki/Inversion_of_control)
3. [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection)
4. [12 Factor App](https://12factor.net)

#### Project Structure

```
- config
- src
  - features
  - services
  - interfaces
  - utils
  index.ts
  types.ts
- migrations
- tests
```

##### /src/features

Contains the intended business rules and use cases.

##### /src/services

Contains code that has meaning in the process level but not exactly part of the core processes

##### /src/interfaces

Contains typescript interfaces

##### /src/utils

Contains mostly convenience methods like boilerplate and formatting code

##### /migrations

Contains database migration scripts.

##### /seeders

Contains database seed data

##### /tests

Contains mostly test utils and fixtures

#### Configuration Management

All config values, as stated in `config/default.js`, are fetched from the underlying environment. For environment specific overrides, create a json file
with that environment's name. For example, `config/test.json`. For more information, refer to [node-config](https://github.com/lorenwest/node-config)

#### Request Handling Code

All code that aims to handle requests should be placed outside the `src` folder. Requests can originate from http, from another process, serverless, queue etc.
Create a folder that will contain code that handles requests from these origins. Currently, the `/api` folder contains code handling http requests.

#### Testing

Unit and integration tests are to be placed beside the subject under test.
