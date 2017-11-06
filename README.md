# Hello World - Serverless Framework

## Summary
A sample project for the [Serverless Framework](https://serverless.com) using [AWS](https://aws.amazon.com/) and [Node.js](https://nodejs.org).

See the [Serverless Guide for AWS](https://serverless.com/framework/docs/providers/aws/guide/intro/).

### Goals

Use the Serverless Framework with AWS to:

* Create Node.js Lambda Functions implementing DynamoDB CRUD functionality for a single Resource
* Create API Gateway Methods forming a RESTful API for each of the Lambda Functions
* Develop locally
* Implement Unit Tests with Mocks and Spies where appropriate
* Implement source code style conformity via JavaScript Linter rules
* Deploy to AWS _dev_ from local

## Dependencies

### Production

#### Application

* [AWS SDK](https://aws.amazon.com/sdk-for-node-js/)
* [uuid](https://www.npmjs.com/package/uuid)
* [Lodash](https://lodash.com/)

### Development

#### Operational

* [Serverless Domain Manager](https://www.npmjs.com/package/serverless-domain-manager)

#### Testing

* [Mocha](http://mochajs.org/)
* [Expect](https://facebook.github.io/jest/docs/en/expect.html)
* [rewire](https://www.npmjs.com/package/rewire)
* [Sinon](http://sinonjs.org/)

#### Linting

* [ESLint](https://eslint.org/)
